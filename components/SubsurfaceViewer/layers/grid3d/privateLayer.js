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
    const isColorMapFunctionDefined = typeof colorMapFunction === "function";
    const isColorMapNameDefined = !!colorMapName;
    const data = new Uint8Array(256 * 3);
    const defaultColorMap = createDefaultContinuousColorScale;
    const colorMap = isColorMapFunctionDefined
        ? colorMapFunction
        : isColorMapNameDefined
            ? (value) => rgbValues(value, colorMapName, colorTables)
            : defaultColorMap();
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
    colorMapName: "",
    coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
    propertyValueRange: [0.0, 1.0],
    depthTest: true,
};
// This is a private layer used only by the composite Map3DLayer
export default class privateLayer extends Layer {
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
        const [model_mesh, mesh_lines_model] = this.state["models"];
        const valueRangeMin = (_b = (_a = this.props.propertyValueRange) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : 0.0;
        const valueRangeMax = (_d = (_c = this.props.propertyValueRange) === null || _c === void 0 ? void 0 : _c[1]) !== null && _d !== void 0 ? _d : 1.0;
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
        gl.enable(gl.POLYGON_OFFSET_FILL);
        gl.polygonOffset(1, 1);
        if (!this.props.depthTest) {
            gl.disable(gl.DEPTH_TEST);
        }
        model_mesh
            .setUniforms(Object.assign(Object.assign({}, uniforms), { colormap: new Texture2D(context.gl, {
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
            isClampColor }))
            .draw();
        gl.disable(gl.POLYGON_OFFSET_FILL);
        // Draw lines.
        mesh_lines_model.draw();
        if (!this.props.depthTest) {
            gl.enable(gl.DEPTH_TEST);
        }
    }
    decodePickingColor() {
        return this.nullPickingColor();
    }
    encodePickingColor() {
        return this.nullPickingColor();
    }
    getPickingInfo({ info }) {
        if (!info.color) {
            return info;
        }
        const layer_properties = [];
        // Note these colors are in the 0-255 range.
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
privateLayer.layerName = "privateLayer";
privateLayer.defaultProps = defaultProps;
//# sourceMappingURL=privateLayer.js.map