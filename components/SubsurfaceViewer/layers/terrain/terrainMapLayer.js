import { SimpleMeshLayer, } from "@deck.gl/mesh-layers/typed";
import { COORDINATE_SYSTEM } from "@deck.gl/core/typed";
import fsShader from "./terrainmap.fs.glsl";
import GL from "@luma.gl/constants";
import { Texture2D } from "@luma.gl/webgl";
import { rgbValues } from "@emerson-eps/color-tables/";
import { createDefaultContinuousColorScale } from "@emerson-eps/color-tables/dist/component/Utils/legendCommonFunction";
import { createPropertyData, } from "../utils/layerTools";
const DEFAULT_TEXTURE_PARAMETERS = {
    [GL.TEXTURE_MIN_FILTER]: GL.LINEAR_MIPMAP_LINEAR,
    [GL.TEXTURE_MAG_FILTER]: GL.LINEAR,
    [GL.TEXTURE_WRAP_S]: GL.CLAMP_TO_EDGE,
    [GL.TEXTURE_WRAP_T]: GL.CLAMP_TO_EDGE,
};
export const DECODER = {
    rScaler: 256 * 256,
    gScaler: 256,
    bScaler: 1,
    offset: 0,
};
function getImageData(colorMapName, colorTables, colorMapFunction) {
    const isColorMapFunctionDefined = typeof colorMapFunction !== "undefined";
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
    data: [{ position: [0, 0], angle: 0, color: [255, 0, 0, 0] }],
    getPosition: (d) => d.position,
    getColor: (d) => d.color,
    getOrientation: (d) => [0, d.angle, 0],
    contours: [-1, -1],
    colorMapName: "",
    propertyValueRange: [0.0, 1.0],
    isContoursDepth: true,
    coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
    textureImageData: { value: null, type: "object", async: true },
    meshImageData: { value: null, type: "object", async: true },
    meshValueRange: [0.0, 1.0],
    depthTest: true,
};
// This is a private layer used only by the composite Map3DLayer.
// It is an extension of SimpleMeshLayer but with modified fragment shader
// so that the texture pixel values can be used as lookup in  a supplied color map.
export default class TerrainMapLayer extends SimpleMeshLayer {
    // Signature from the base class, eslint doesn't like the any type.
    // eslint-disable-next-line
    draw({ uniforms, context }) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const { gl } = context;
        const contourReferencePoint = (_a = this.props.contours[0]) !== null && _a !== void 0 ? _a : -1.0;
        const contourInterval = (_b = this.props.contours[1]) !== null && _b !== void 0 ? _b : -1.0;
        const isContoursDepth = this.props.isContoursDepth;
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
        if (!this.props.depthTest) {
            gl.disable(GL.DEPTH_TEST);
        }
        super.draw({
            uniforms: Object.assign(Object.assign({}, uniforms), { colormap: new Texture2D(context.gl, {
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
                contourReferencePoint,
                contourInterval,
                isContoursDepth,
                colorMapClampColor,
                isColorMapClampColorTransparent,
                isClampColor }),
        });
        if (!this.props.depthTest) {
            gl.enable(GL.DEPTH_TEST);
        }
    }
    getShaders() {
        const parentShaders = super.getShaders();
        // Overwrite the default fragment shader with ours.
        parentShaders.fs = fsShader;
        return Object.assign(Object.assign({}, parentShaders), { 
            // Inject this into vertex shader. Vi want to export vertex world position to
            // fragment shader for making contour lines.
            inject: {
                "vs:#decl": `
                  out vec3 worldPos;
                `,
                "vs:#main-start": `
                   worldPos = positions;
                `,
            } });
    }
    decodePickingColor() {
        return 0;
    }
    getPickingInfo({ info }) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const pickColor = info.color;
        if (!pickColor) {
            return info;
        }
        // Texture coordinates.
        const s = pickColor[0] / 255.0;
        const t = pickColor[1] / 255.0;
        const is_outside = pickColor[2] == 0;
        if (is_outside) {
            // Mouse is outside the non-transparent part of the map.
            return info;
        }
        // MESH HEIGHT VALUE.
        const meshImageData = this.props.meshImageData;
        const isMeshImageData = meshImageData !== null;
        const value_mesh = isMeshImageData
            ? getValue(meshImageData, s, t, DECODER)
            : 0;
        // TEXTURE PROPERTY VALUE.
        const textureImageData = this.props.textureImageData;
        const value_property = getValue(textureImageData, s, t, DECODER);
        const layer_properties = [];
        layer_properties.push(getMapProperty("Property", value_property, this.props.propertyValueRange), isMeshImageData
            ? getMapProperty("Depth", value_mesh, this.props.meshValueRange)
            : { name: "Depth", value: 0 });
        return Object.assign(Object.assign({}, info), { properties: layer_properties });
    }
}
TerrainMapLayer.layerName = "TerrainMapLayer";
TerrainMapLayer.defaultProps = defaultProps;
//================= Local help functions. ==================
function getMapProperty(name, value, value_range) {
    // Remap the [0, 1] decoded value to property value range.
    const [min, max] = value_range;
    const floatScaler = 1.0 / (256.0 * 256.0 * 256.0 - 1.0);
    const scaled_value = value * floatScaler;
    value = scaled_value * (max - min) + min;
    return createPropertyData(name, value);
}
function getValue(imageData, s, t, decoder) {
    const int_view = new Uint8ClampedArray(imageData.data, 0, imageData.data.length);
    const w = imageData.width;
    const h = imageData.height;
    const j = Math.min(Math.floor(w * s), w - 1);
    const i = Math.min(Math.floor(h * t), h - 1);
    const pixelNo = i * w + j;
    const r = int_view[pixelNo * 4 + 0] * decoder.rScaler;
    const g = int_view[pixelNo * 4 + 1] * decoder.gScaler;
    const b = int_view[pixelNo * 4 + 2] * decoder.bScaler;
    const value = r + g + b;
    return value;
}
//# sourceMappingURL=terrainMapLayer.js.map