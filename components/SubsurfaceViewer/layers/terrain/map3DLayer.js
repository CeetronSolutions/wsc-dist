var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CompositeLayer } from "@deck.gl/core/typed";
import TerrainMapLayer, { DECODER } from "./terrainMapLayer";
import { TerrainLoader } from "@loaders.gl/terrain";
import { ImageLoader } from "@loaders.gl/images";
import { load } from "@loaders.gl/core";
import { Vector3 } from "@math.gl/core";
import { getModelMatrix } from "../utils/layerTools";
import { isEqual } from "lodash";
function getMinMax(dim) {
    const nx = dim.count[0];
    const ny = dim.count[1];
    const dx = dim.increment[0];
    const dy = dim.increment[1];
    const xmin = dim.origin[0];
    const ymin = dim.origin[1];
    const xmax = xmin + nx * dx;
    const ymax = ymin + ny * dy;
    return [xmin, ymin, xmax, ymax];
}
function mapToRange(resolved_mesh, meshValueRange) {
    const floatScaler = 1.0 / (256.0 * 256.0 * 256.0 - 1.0);
    const [min, max] = meshValueRange;
    const delta = max - min;
    const vertexs = resolved_mesh.attributes.POSITION.value;
    const nvertexs = vertexs.length / 3;
    for (let i = 0; i < nvertexs; i++) {
        let Z = vertexs[i * 3 + 2];
        Z = Z * floatScaler; // maps to [0-1]
        Z = min + Z * delta;
        vertexs[i * 3 + 2] = -Z; // depths are positive along negative z axis.
    }
    return resolved_mesh;
}
function add_normals(resolved_mesh, meshImageData, bounds) {
    const vertexs = resolved_mesh.attributes.POSITION.value;
    let indices = resolved_mesh.indices.value;
    let ntriangles = indices.length / 3;
    ////////////////////////////////////////////////////////////////
    // Remove all triangles that are in undefined areas. That is triangles which
    const [xmin, ymin, xmax, ymax] = bounds;
    const w = meshImageData.width;
    const h = meshImageData.height;
    const int_view = new Uint8ClampedArray(meshImageData.data, 0, meshImageData.data.length);
    const dx = (xmax - xmin) / (w - 1);
    const dy = (ymax - ymin) / (h - 1);
    const indices_reduced = [];
    for (let tn = 0; tn < ntriangles; tn++) {
        const i0 = indices[tn * 3 + 0];
        const i1 = indices[tn * 3 + 1];
        const i2 = indices[tn * 3 + 2];
        const triangle_indices = [i0, i1, i2];
        const alphas = triangle_indices.map((index) => {
            const x = vertexs[index * 3 + 0];
            const y = vertexs[index * 3 + 1];
            // Note: assumes increasing 'j' along increasing X axis and Y axis and
            // increasing 'i' along decreasing Y axis.
            // 'j' along image width. 'i' along image height.
            const j = Math.round((x - xmin) / dx);
            const i = h - Math.round((y - ymin) / dy);
            const pixelNo = i * w + j;
            // Check alpha (transparency) for this triangle corner.
            const is_transparent = int_view[pixelNo * 4 + 3] < 255;
            return is_transparent;
        });
        const do_remove = alphas.some((a) => a);
        if (!do_remove) {
            indices_reduced.push(i0);
            indices_reduced.push(i1);
            indices_reduced.push(i2);
        }
    }
    resolved_mesh.indices.value = new Uint32Array(indices_reduced);
    indices = resolved_mesh.indices.value;
    ntriangles = indices.length / 3;
    ////////////////////////////////////////////////////////////////
    // Calculate one normal pr triangle. And record the triangles each vertex' belongs to.
    const no_unique_vertexes = vertexs.length / 3;
    const vertex_triangles = Array(no_unique_vertexes); // for each vertex a list of triangles it belongs to.
    for (let i = 0; i < no_unique_vertexes; i++) {
        vertex_triangles[i] = new Set();
    }
    const triangle_normals = Array(ntriangles);
    for (let t = 0; t < ntriangles; t++) {
        const i0 = indices[t * 3 + 0];
        const i1 = indices[t * 3 + 1];
        const i2 = indices[t * 3 + 2];
        vertex_triangles[i0].add(t);
        vertex_triangles[i1].add(t);
        vertex_triangles[i2].add(t);
        // Triangles' three corners.
        const v0 = new Vector3(vertexs[i0 * 3 + 0], vertexs[i0 * 3 + 1], vertexs[i0 * 3 + 2]);
        const v1 = new Vector3(vertexs[i1 * 3 + 0], vertexs[i1 * 3 + 1], vertexs[i1 * 3 + 2]);
        const v2 = new Vector3(vertexs[i2 * 3 + 0], vertexs[i2 * 3 + 1], vertexs[i2 * 3 + 2]);
        const vec1 = v1.subtract(v0);
        const vec2 = v2.subtract(v0);
        const normal = vec1.cross(vec2).normalize();
        triangle_normals[t] = normal;
    }
    // Calculate normals. The vertex normal will be the mean of the normals of every triangle the vertex
    // belongs to.
    const normals = Array(vertexs.length).fill(0.0);
    for (let i = 0; i < no_unique_vertexes; i++) {
        const triangles = [...vertex_triangles[i]];
        // Set normal to mean of all triangle normals.
        const v = triangles.length !== 0
            ? triangle_normals[triangles[0]]
            : new Vector3(0.0, 0.0, 1.0);
        for (let t = 1; t < triangles.length; t++) {
            v.add(triangle_normals[triangles[t]]);
        }
        v.normalize();
        const idx = i * 3;
        normals[idx + 0] = v[0];
        normals[idx + 1] = v[1];
        normals[idx + 2] = v[2];
    }
    resolved_mesh.attributes.normals = {
        value: new Float32Array(normals),
        size: 3,
    };
    return resolved_mesh;
}
function load_mesh_and_texture(mesh_name, bounds, meshMaxError, meshValueRange, smoothShading, texture_name) {
    return __awaiter(this, void 0, void 0, function* () {
        const isMesh = mesh_name !== "";
        const isTexture = texture_name !== "";
        if (!isMesh && !isTexture) {
            console.error("Error. One or both of texture and mesh must be given!");
        }
        const image_name = isTexture ? texture_name : mesh_name;
        const texture = yield load(image_name, ImageLoader, {
            image: { type: "data" }, // Will load as ImageData.
        });
        // @rmt: missing type
        let meshImageData = null;
        let mesh;
        if (isMesh) {
            mesh = yield load(mesh_name, TerrainLoader, {
                terrain: {
                    elevationDecoder: DECODER,
                    bounds,
                    meshMaxError,
                    skirtHeight: 0.0,
                },
                worker: false,
            });
            // Remap height to meshValueRange
            mesh = mapToRange(mesh, meshValueRange);
            meshImageData = yield load(mesh_name, ImageLoader, {
                image: { type: "data" }, // Will load as ImageData.
            });
            // Note: mesh contains triangles. No normals they must be added.
            // @rmt: MeshImageData might be null?
            if (smoothShading && meshImageData) {
                mesh = add_normals(mesh, meshImageData, bounds);
            }
        }
        else {
            // Mesh data is missing.
            // Make a flat square size of enclosing dim using two triangles.  z = 0.
            const [minX, minY, maxX, maxY] = bounds;
            const p0 = [minX, minY, 0.0];
            const p1 = [minX, maxY, 0.0];
            const p2 = [maxX, maxY, 0.0];
            const p3 = [maxX, minY, 0.0];
            const vertexes = [...p0, ...p1, ...p2, ...p3];
            const texture_coord = [0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0];
            mesh = {
                attributes: {
                    POSITION: { value: new Float32Array(vertexes), size: 3 },
                    TEXCOORD_0: { value: new Float32Array(texture_coord), size: 2 },
                },
                indices: { value: new Uint32Array([0, 1, 3, 1, 3, 2]), size: 1 },
            };
        }
        return Promise.all([mesh, meshImageData, texture]);
    });
}
const defaultProps = {
    "@@type": "Map3DLayer",
    name: "Map 3D",
    id: "map3d-layer",
    pickable: true,
    visible: true,
    // Url to png image for height field.
    mesh: "",
    meshValueRange: { type: "array", value: [0, 1] },
    // Mesh error in meters. The output mesh is in higher resolution (more vertices) if the error is smaller.
    meshMaxError: { type: "number", value: 5 },
    // Url to png image for map properties. (ex, poro or perm values as a texture)
    propertyTexture: "",
    propertyValueRange: { type: "array", value: [0, 1] },
    contours: [-1.0, -1.0],
    // If contour lines should follow depth or properties.
    isContoursDepth: true,
    smoothShading: true,
    material: true,
    depthTest: true,
};
export default class Map3DLayer extends CompositeLayer {
    initializeState() {
        // Load mesh and texture and store in state.
        const isBounds = typeof this.props.bounds !== "undefined";
        if (isBounds) {
            console.warn('"bounds" is deprecated. Use "frame" instead.');
        }
        const isFrame = typeof this.props.frame !== "undefined";
        if (!isBounds && !isFrame) {
            console.error('Error. Either "Frame" or "bounds" must be given for map3DLayer!');
        }
        const bounds = (isFrame ? getMinMax(this.props.frame) : this.props.bounds);
        const p = load_mesh_and_texture(this.props.mesh, bounds, this.props.meshMaxError, this.props.meshValueRange, this.props.smoothShading, this.props.propertyTexture);
        p.then(([mesh, meshImageData, texture]) => {
            this.setState({
                mesh,
                meshImageData,
                texture,
            });
        });
        // Report back calculated bounding box now that data is loaded.
        p.then(() => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
            const xinc = (_c = (_b = (_a = this.props.frame) === null || _a === void 0 ? void 0 : _a.increment) === null || _b === void 0 ? void 0 : _b[0]) !== null && _c !== void 0 ? _c : 0;
            const yinc = (_f = (_e = (_d = this.props.frame) === null || _d === void 0 ? void 0 : _d.increment) === null || _e === void 0 ? void 0 : _e[1]) !== null && _f !== void 0 ? _f : 0;
            const xcount = (_j = (_h = (_g = this.props.frame) === null || _g === void 0 ? void 0 : _g.count) === null || _h === void 0 ? void 0 : _h[0]) !== null && _j !== void 0 ? _j : 1;
            const ycount = (_m = (_l = (_k = this.props.frame) === null || _k === void 0 ? void 0 : _k.count) === null || _l === void 0 ? void 0 : _l[1]) !== null && _m !== void 0 ? _m : 1;
            const xMin = (_q = (_p = (_o = this.props.frame) === null || _o === void 0 ? void 0 : _o.origin) === null || _p === void 0 ? void 0 : _p[0]) !== null && _q !== void 0 ? _q : bounds[0];
            const yMin = (_t = (_s = (_r = this.props.frame) === null || _r === void 0 ? void 0 : _r.origin) === null || _s === void 0 ? void 0 : _s[1]) !== null && _t !== void 0 ? _t : bounds[1];
            const zMin = -this.props.meshValueRange[1];
            const xMax = isFrame ? xMin + xinc * xcount : bounds[2];
            const yMax = isFrame ? yMin + yinc * ycount : bounds[3];
            const zMax = -this.props.meshValueRange[0];
            if (typeof this.props.setReportedBoundingBox !== "undefined") {
                this.props.setReportedBoundingBox([
                    xMin,
                    yMin,
                    zMin,
                    xMax,
                    yMax,
                    zMax,
                ]);
            }
        });
    }
    updateState({ props, oldProps, }) {
        const needs_reload = !isEqual(props.mesh, oldProps.mesh) ||
            !isEqual(props.bounds, oldProps.bounds) ||
            !isEqual(props.frame, oldProps.frame) ||
            !isEqual(props.meshMaxError, oldProps.meshMaxError) ||
            !isEqual(props.meshValueRange, oldProps.meshValueRange) ||
            !isEqual(props.smoothShading, oldProps.smoothShading) ||
            !isEqual(props.propertyTexture, oldProps.propertyTexture);
        if (needs_reload) {
            // Reload mesh and texture.
            this.initializeState();
        }
    }
    renderLayers() {
        var _a, _b, _c, _d;
        const isBounds = typeof this.props.bounds !== "undefined";
        const bounds = (isBounds ? this.props.bounds : getMinMax(this.props.frame));
        // Note: these are deprecated so this code may be deleted later.
        const isRotDegDefined = typeof this.props.rotDeg !== "undefined";
        const isRotPointDefined = typeof this.props.rotPoint !== "undefined";
        if (isRotDegDefined) {
            console.warn('"rotDeg" is deprecated. Use "frame.rotDeg" instead.');
        }
        if (isRotPointDefined) {
            console.warn('"rotPoint" is deprecated. Use "frame.rotPoint" instead.');
        }
        const [minX, minY] = [bounds[0], bounds[1]];
        const center = (_b = (_a = this.props.frame) === null || _a === void 0 ? void 0 : _a.rotPoint) !== null && _b !== void 0 ? _b : (isRotPointDefined ? this.props.rotPoint : [minX, minY]);
        const rotatingModelMatrix = getModelMatrix((_d = (_c = this.props.frame) === null || _c === void 0 ? void 0 : _c.rotDeg) !== null && _d !== void 0 ? _d : (isRotDegDefined ? this.props.rotDeg : 0), center[0], center[1]);
        const isModelMatrix = typeof this.props.modelMatrix !== "undefined" &&
            this.props.modelMatrix !== null;
        if (isModelMatrix) {
            rotatingModelMatrix.multiplyRight(this.props.modelMatrix);
        }
        const isMesh = typeof this.props.mesh !== "undefined" && this.props.mesh !== "";
        const layer = new TerrainMapLayer(this.getSubLayerProps({
            mesh: this.state["mesh"],
            texture: this.state["texture"],
            textureImageData: this.state["texture"],
            meshImageData: this.state["meshImageData"],
            meshValueRange: this.props.meshValueRange,
            pickable: this.props.pickable,
            modelMatrix: rotatingModelMatrix,
            contours: this.props.contours,
            colorMapName: this.props.colorMapName,
            colorMapFunction: this.props.colorMapFunction,
            propertyValueRange: this.props.propertyValueRange,
            colorMapRange: this.props.colorMapRange,
            colorMapClampColor: this.props.colorMapClampColor,
            isContoursDepth: !isMesh ? false : this.props.isContoursDepth,
            material: this.props.material,
            wireframe: false,
            depthTest: this.props.depthTest,
        }));
        return [layer];
    }
    getLegendData() {
        const colorRange = this.props.colorMapRange;
        const propertyRange = this.props.propertyTexture && this.props.propertyValueRange;
        const meshRange = this.props.mesh && this.props.meshValueRange;
        const legendRange = colorRange || propertyRange || meshRange;
        return {
            discrete: false,
            valueRange: legendRange,
            colorName: this.props.colorMapName,
            title: "Map3dLayer",
            colorMapFunction: this.props.colorMapFunction,
        };
    }
}
Map3DLayer.layerName = "Map3DLayer";
Map3DLayer.defaultProps = defaultProps;
//# sourceMappingURL=map3DLayer.js.map