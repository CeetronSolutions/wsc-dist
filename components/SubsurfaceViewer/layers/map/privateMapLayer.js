import { COORDINATE_SYSTEM, Layer, picking, project, phongLighting, } from "@deck.gl/core/typed";
import { createPropertyData, } from "../utils/layerTools";
import { Model, Geometry } from "@luma.gl/engine";
import vsShader from "./vertex.glsl";
import fsShader from "./fragment.fs.glsl";
import vsLineShader from "./vertex_lines.glsl";
import fsLineShader from "./fragment_lines.glsl";
import { rgbValues } from "@emerson-eps/color-tables/";
import { createDefaultContinuousColorScale } from "@emerson-eps/color-tables/dist/component/Utils/legendCommonFunction";
import { Texture2D } from "@luma.gl/webgl";
import GL from "@luma.gl/constants";
const DEFAULT_TEXTURE_PARAMETERS = {
    [GL.TEXTURE_MIN_FILTER]: GL.LINEAR_MIPMAP_LINEAR,
    [GL.TEXTURE_MAG_FILTER]: GL.LINEAR,
    [GL.TEXTURE_WRAP_S]: GL.CLAMP_TO_EDGE,
    [GL.TEXTURE_WRAP_T]: GL.CLAMP_TO_EDGE,
};
function getImageData(colorMapName, colorTables, colorMapFunction) {
    const isColorMapFunctionDefined = typeof colorMapFunction !== "undefined";
    const isColorMapNameDefined = !!colorMapName;
    const defaultColorMap = createDefaultContinuousColorScale;
    let colorMap = defaultColorMap();
    if (isColorMapFunctionDefined) {
        colorMap =
            typeof colorMapFunction === "function"
                ? colorMapFunction
                : (() => colorMapFunction);
    }
    else if (isColorMapNameDefined) {
        colorMap = (value) => rgbValues(value, colorMapName, colorTables);
    }
    const data = new Uint8Array(256 * 3);
    for (let i = 0; i < 256; i++) {
        const value = i / 255.0;
        const color = colorMap ? colorMap(value) : [0, 0, 0];
        if (color) {
            data[3 * i + 0] = color[0];
            data[3 * i + 1] = color[1];
            data[3 * i + 2] = color[2];
        }
    }
    return data ? data : [0, 0, 0];
}
const defaultProps = {
    data: ["dummy"],
    contours: [-1, -1],
    isContoursDepth: true,
    gridLines: false,
    colorMapName: "",
    coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
    propertyValueRange: [0.0, 1.0],
    meshValueRange: [0.0, 1.0],
    depthTest: true,
};
// This is a private layer used only by the composite Map3DLayer
export default class privateMapLayer extends Layer {
    initializeState(context) {
        const { gl } = context;
        const [model_mesh, mesh_lines_model] = this._getModels(gl);
        this.setState({ models: [model_mesh, mesh_lines_model] });
    }
    shouldUpdateState({ props, oldProps, context, changeFlags, }) {
        return (super.shouldUpdateState({
            props,
            oldProps,
            context,
            changeFlags,
        }) || changeFlags.propsOrDataChanged);
    }
    updateState({ context }) {
        this.initializeState(context);
    }
    //eslint-disable-next-line
    _getModels(gl) {
        // MESH MODEL
        const mesh_model = new Model(gl, {
            id: `${this.props.id}-mesh`,
            vs: vsShader,
            fs: fsShader,
            geometry: new Geometry({
                drawMode: this.props.mesh.drawMode,
                attributes: {
                    positions: this.props.mesh.attributes.positions,
                    normals: this.props.mesh.attributes.normals,
                    properties: this.props.mesh.attributes.properties,
                    vertex_indexs: this.props.mesh.attributes.vertex_indexs,
                },
                vertexCount: this.props.mesh.vertexCount,
                indices: this.props.mesh.indices,
            }),
            modules: [project, picking, phongLighting],
            isInstanced: false, // This only works when set to false.
        });
        // MESH LINES
        const mesh_lines_model = new Model(gl, {
            id: `${this.props.id}-lines`,
            vs: vsLineShader,
            fs: fsLineShader,
            geometry: new Geometry(this.props.meshLines),
            modules: [project, picking],
            isInstanced: false,
        });
        return [mesh_model, mesh_lines_model];
    }
    // Signature from the base class, eslint doesn't like the any type.
    // eslint-disable-next-line
    draw(args) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (!this.state["models"]) {
            return;
        }
        const { uniforms, context } = args;
        const { gl } = context;
        const contourReferencePoint = (_a = this.props.contours[0]) !== null && _a !== void 0 ? _a : -1.0;
        const contourInterval = (_b = this.props.contours[1]) !== null && _b !== void 0 ? _b : -1.0;
        const isContoursDepth = this.props.isContoursDepth;
        const [model_mesh, mesh_lines_model] = this.state["models"];
        const valueRangeMin = (_c = this.props.propertyValueRange[0]) !== null && _c !== void 0 ? _c : 0.0;
        const valueRangeMax = (_d = this.props.propertyValueRange[1]) !== null && _d !== void 0 ? _d : 1.0;
        // If specified color map will extend from colorMapRangeMin to colorMapRangeMax.
        // Otherwise it will extend from valueRangeMin to valueRangeMax.
        const colorMapRangeMin = (_f = (_e = this.props.colorMapRange) === null || _e === void 0 ? void 0 : _e[0]) !== null && _f !== void 0 ? _f : valueRangeMin;
        const colorMapRangeMax = (_h = (_g = this.props.colorMapRange) === null || _g === void 0 ? void 0 : _g[1]) !== null && _h !== void 0 ? _h : valueRangeMax;
        const isClampColor = this.props.colorMapClampColor !== undefined &&
            this.props.colorMapClampColor !== true &&
            this.props.colorMapClampColor !== false;
        let colorMapClampColor = isClampColor
            ? this.props.colorMapClampColor
            : [0, 0, 0];
        // Normalize to [0,1] range.
        colorMapClampColor = colorMapClampColor.map((x) => (x !== null && x !== void 0 ? x : 0) / 255);
        const isColorMapClampColorTransparent = this.props.colorMapClampColor === false;
        const smoothShading = this.props.smoothShading;
        gl.enable(GL.POLYGON_OFFSET_FILL);
        if (!this.props.depthTest) {
            gl.disable(GL.DEPTH_TEST);
        }
        gl.polygonOffset(1, 1);
        model_mesh
            .setUniforms(Object.assign(Object.assign({}, uniforms), { contourReferencePoint,
            contourInterval,
            isContoursDepth, colormap: new Texture2D(context.gl, {
                width: 256,
                height: 1,
                format: GL.RGB,
                data: getImageData(this.props.colorMapName, this.context.userData
                    .colorTables, this.props.colorMapFunction),
                parameters: DEFAULT_TEXTURE_PARAMETERS,
            }), valueRangeMin,
            valueRangeMax,
            colorMapRangeMin,
            colorMapRangeMax,
            colorMapClampColor,
            isColorMapClampColorTransparent,
            isClampColor,
            smoothShading }))
            .draw();
        gl.disable(GL.POLYGON_OFFSET_FILL);
        if (!this.props.depthTest) {
            gl.enable(GL.DEPTH_TEST);
        }
        if (this.props.gridLines) {
            mesh_lines_model.draw();
        }
    }
    decodePickingColor() {
        return 0;
    }
    getPickingInfo({ info }) {
        if (!info.color) {
            return info;
        }
        const layer_properties = [];
        // Note these colors are in the  0-255 range.
        const r = info.color[0];
        const g = info.color[1];
        const b = info.color[2];
        const vertexIndex = 256 * 256 * r + 256 * g + b;
        const vertexs = this.props.mesh.attributes.positions.value;
        const depth = -vertexs[3 * vertexIndex + 2];
        layer_properties.push(createPropertyData("Depth", depth));
        const properties = this.props.mesh.attributes.properties.value;
        const property = properties[vertexIndex];
        layer_properties.push(createPropertyData("Property", property));
        return Object.assign(Object.assign({}, info), { properties: layer_properties });
    }
}
privateMapLayer.layerName = "privateMapLayer";
privateMapLayer.defaultProps = defaultProps;
//# sourceMappingURL=privateMapLayer.js.map