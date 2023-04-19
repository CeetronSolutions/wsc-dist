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
import privateMapLayer from "./privateMapLayer";
import { getModelMatrix } from "../utils/layerTools";
import { isEqual } from "lodash";
import * as png from "@vivaxy/png";
import { makeFullMesh } from "./webworker";
// Rotate x,y around x0, y0 rad radians
function rotate(x, y, x0, y0, rad) {
    const xRot = Math.cos(rad) * (x - x0) - Math.sin(rad) * (y - y0) + x0; // eslint-disable-line
    const yRot = Math.sin(rad) * (x - x0) + Math.cos(rad) * (y - y0) + y0; // eslint-disable-line
    return [xRot, yRot];
}
function load_mesh_and_properties(meshData, propertiesData, ZIncreasingDownwards) {
    return __awaiter(this, void 0, void 0, function* () {
        // Keep
        //const t0 = performance.now();
        const isMesh = typeof meshData !== "undefined";
        const isProperties = typeof propertiesData !== "undefined";
        if (!isMesh && !isProperties) {
            console.error("Error. One or both of texture and mesh must be given!");
        }
        if (isMesh && !isProperties) {
            propertiesData = meshData;
        }
        //-- PROPERTIES. --
        let properties;
        if (Array.isArray(propertiesData)) {
            // Input data is native javascript array.
            properties = new Float32Array(propertiesData);
        }
        else {
            // Input data is an URL.
            const response = yield fetch(propertiesData);
            if (!response.ok) {
                console.error("Could not load ", propertiesData);
            }
            const blob = yield response.blob();
            const contentType = response.headers.get("content-type");
            const isPng = contentType === "image/png";
            if (isPng) {
                // Load as Png  with abolute float values.
                properties = yield new Promise((resolve) => {
                    const fileReader = new FileReader();
                    fileReader.readAsArrayBuffer(blob);
                    fileReader.onload = () => {
                        const arrayBuffer = fileReader.result;
                        const imgData = png.decode(arrayBuffer);
                        const data = imgData.data; // array of int's
                        const n = data.length;
                        const buffer = new ArrayBuffer(n);
                        const view = new DataView(buffer);
                        for (let i = 0; i < n; i++) {
                            view.setUint8(i, data[i]);
                        }
                        const floatArray = new Float32Array(buffer);
                        resolve(floatArray);
                    };
                });
            }
            else {
                // Load as binary array of floats.
                const buffer = yield blob.arrayBuffer();
                properties = new Float32Array(buffer);
            }
        }
        //-- MESH --
        let mesh = new Float32Array();
        if (isMesh) {
            if (Array.isArray(meshData)) {
                // Input data is native javascript array.
                mesh = new Float32Array(meshData);
            }
            else {
                // Input data is an URL.
                const response_mesh = yield fetch(meshData);
                if (!response_mesh.ok) {
                    console.error("Could not load mesh");
                }
                const blob_mesh = yield response_mesh.blob();
                const contentType_mesh = response_mesh.headers.get("content-type");
                const isPng_mesh = contentType_mesh === "image/png";
                if (isPng_mesh) {
                    // Load as Png  with abolute float values.
                    mesh = yield new Promise((resolve) => {
                        const fileReader = new FileReader();
                        fileReader.readAsArrayBuffer(blob_mesh);
                        fileReader.onload = () => {
                            const arrayBuffer = fileReader.result;
                            const imgData = png.decode(arrayBuffer);
                            const data = imgData.data; // array of int's
                            const n = data.length;
                            const buffer = new ArrayBuffer(n);
                            const view = new DataView(buffer);
                            for (let i = 0; i < n; i++) {
                                view.setUint8(i, data[i]);
                            }
                            const floatArray = new Float32Array(buffer);
                            resolve(floatArray);
                        };
                    });
                }
                else {
                    // Load as binary array of floats.
                    const buffer = yield blob_mesh.arrayBuffer();
                    mesh = new Float32Array(buffer);
                }
            }
        }
        if (!ZIncreasingDownwards) {
            for (let i = 0; i < meshData.length; i++) {
                mesh[i] *= -1;
            }
        }
        //const t1 = performance.now();
        // Keep this.
        //console.log(`Task loading took ${(t1 - t0) * 0.001}  seconds.`);
        return Promise.all([isMesh, mesh, properties]);
    });
}
const defaultProps = {
    "@@type": "MapLayer",
    name: "Map",
    id: "map3d-layer-float32",
    pickable: true,
    visible: true,
    bounds: { type: "object", value: null, false: true, compare: true },
    colorMapRange: { type: "array" },
    contours: [-1.0, -1.0],
    // If contour lines should follow depth or properties.
    isContoursDepth: true,
    gridLines: false,
    smoothShading: true,
    material: true,
    depthTest: true,
    ZIncreasingDownwards: true,
};
export default class MapLayer extends CompositeLayer {
    rebuildData(reportBoundingBox) {
        var _a, _b;
        if (typeof this.props.meshUrl !== "undefined") {
            console.warn('"meshUrl" is deprecated. Use "meshData"');
        }
        if (typeof this.props.propertiesUrl !== "undefined") {
            console.warn('"propertiesUrl" is deprecated. Use "propertiesData"');
        }
        const meshData = (_a = this.props.meshData) !== null && _a !== void 0 ? _a : this.props.meshUrl;
        const propertiesData = (_b = this.props.propertiesData) !== null && _b !== void 0 ? _b : this.props.propertiesUrl;
        const p = load_mesh_and_properties(meshData, propertiesData, this.props.ZIncreasingDownwards);
        p.then(([isMesh, meshData, propertiesData]) => {
            // Using inline web worker for calculating the triangle mesh from
            // loaded input data so not to halt the GUI thread.
            const blob = new Blob(["self.onmessage = ", makeFullMesh.toString()], { type: "text/javascript" });
            const url = URL.createObjectURL(blob);
            const webWorker = new Worker(url);
            const webworkerParams = {
                meshData,
                propertiesData,
                isMesh,
                frame: this.props.frame,
                smoothShading: this.props.smoothShading,
            };
            webWorker.postMessage(webworkerParams);
            webWorker.onmessage = (e) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
                const [mesh, mesh_lines, meshZValueRange, propertyValueRange] = e.data;
                this.setState({
                    mesh,
                    mesh_lines,
                    propertyValueRange,
                });
                if (typeof this.props.setReportedBoundingBox !== "undefined" &&
                    reportBoundingBox) {
                    const xinc = (_c = (_b = (_a = this.props.frame) === null || _a === void 0 ? void 0 : _a.increment) === null || _b === void 0 ? void 0 : _b[0]) !== null && _c !== void 0 ? _c : 0;
                    const yinc = (_f = (_e = (_d = this.props.frame) === null || _d === void 0 ? void 0 : _d.increment) === null || _e === void 0 ? void 0 : _e[1]) !== null && _f !== void 0 ? _f : 0;
                    const nnodes_x = (_j = (_h = (_g = this.props.frame) === null || _g === void 0 ? void 0 : _g.count) === null || _h === void 0 ? void 0 : _h[0]) !== null && _j !== void 0 ? _j : 2; // number of nodes in x direction
                    const nnodes_y = (_m = (_l = (_k = this.props.frame) === null || _k === void 0 ? void 0 : _k.count) === null || _l === void 0 ? void 0 : _l[1]) !== null && _m !== void 0 ? _m : 2;
                    const xMin = (_q = (_p = (_o = this.props.frame) === null || _o === void 0 ? void 0 : _o.origin) === null || _p === void 0 ? void 0 : _p[0]) !== null && _q !== void 0 ? _q : 0;
                    const yMin = (_t = (_s = (_r = this.props.frame) === null || _r === void 0 ? void 0 : _r.origin) === null || _s === void 0 ? void 0 : _s[1]) !== null && _t !== void 0 ? _t : 0;
                    const zMin = -meshZValueRange[0];
                    const xMax = xMin + xinc * (nnodes_x - 1);
                    const yMax = yMin + yinc * (nnodes_y - 1);
                    const zMax = -meshZValueRange[1];
                    // If map is rotated the bounding box must reflect that.
                    const center = (_u = this.props.frame.rotPoint) !== null && _u !== void 0 ? _u : this.props.frame.origin;
                    const rotDeg = (_v = this.props.frame.rotDeg) !== null && _v !== void 0 ? _v : 0;
                    const rotRad = (rotDeg * (2.0 * Math.PI)) / 360.0;
                    // Rotate x,y around "center" "rad" radians
                    const [x0, y0] = rotate(xMin, yMin, center[0], center[1], rotRad); // eslint-disable-line
                    const [x1, y1] = rotate(xMax, yMin, center[0], center[1], rotRad); // eslint-disable-line
                    const [x2, y2] = rotate(xMax, yMax, center[0], center[1], rotRad); // eslint-disable-line
                    const [x3, y3] = rotate(xMin, yMax, center[0], center[1], rotRad); // eslint-disable-line
                    // Rotated bounds in x/y plane.
                    const x_min = Math.min(x0, x1, x2, x3);
                    const x_max = Math.max(x0, x1, x2, x3);
                    const y_min = Math.min(y0, y1, y2, y3);
                    const y_max = Math.max(y0, y1, y2, y3);
                    this.props.setReportedBoundingBox([
                        x_min,
                        y_min,
                        zMin,
                        x_max,
                        y_max,
                        zMax,
                    ]);
                }
                webWorker.terminate();
            };
        });
    }
    initializeState() {
        const reportBoundingBox = true;
        this.rebuildData(reportBoundingBox);
    }
    updateState({ props, oldProps }) {
        const needs_reload = !isEqual(props.meshUrl, oldProps.meshUrl) ||
            !isEqual(props.propertiesUrl, oldProps.propertiesUrl) ||
            !isEqual(props.meshData, oldProps.meshData) ||
            !isEqual(props.propertiesData, oldProps.propertiesData) ||
            !isEqual(props.frame, oldProps.frame) ||
            !isEqual(props.gridLines, oldProps.gridLines);
        if (needs_reload) {
            const reportBoundingBox = false;
            this.rebuildData(reportBoundingBox);
        }
    }
    renderLayers() {
        var _a, _b;
        if (Object.keys(this.state).length === 0) {
            return [];
        }
        const [minX, minY] = this.props.frame.origin;
        const center = (_a = this.props.frame.rotPoint) !== null && _a !== void 0 ? _a : [minX, minY];
        const rotatingModelMatrix = getModelMatrix((_b = this.props.frame.rotDeg) !== null && _b !== void 0 ? _b : 0, center[0], center[1]);
        const isMesh = (typeof this.props.meshUrl !== "undefined" &&
            this.props.meshUrl !== "") ||
            (typeof this.props.meshData !== "undefined" &&
                this.props.meshData !== "");
        const isModelMatrix = typeof this.props.modelMatrix !== "undefined" &&
            this.props.modelMatrix !== null;
        if (isModelMatrix) {
            rotatingModelMatrix.multiplyRight(this.props.modelMatrix);
        }
        const layer = new privateMapLayer(this.getSubLayerProps({
            mesh: this.state["mesh"],
            meshLines: this.state["mesh_lines"],
            pickable: this.props.pickable,
            modelMatrix: rotatingModelMatrix,
            contours: this.props.contours,
            gridLines: this.props.gridLines,
            isContoursDepth: !isMesh ? false : this.props.isContoursDepth,
            colorMapName: this.props.colorMapName,
            colorMapRange: this.props.colorMapRange,
            colorMapClampColor: this.props.colorMapClampColor,
            colorMapFunction: this.props.colorMapFunction,
            propertyValueRange: this.state["propertyValueRange"],
            material: this.props.material,
            smoothShading: this.props.smoothShading,
            depthTest: this.props.depthTest,
        }));
        return [layer];
    }
}
MapLayer.layerName = "MapLayer";
MapLayer.defaultProps = defaultProps;
//# sourceMappingURL=mapLayer.js.map