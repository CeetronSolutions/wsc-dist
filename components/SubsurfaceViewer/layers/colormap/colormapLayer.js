import { BitmapLayer } from "@deck.gl/layers/typed";
import GL from "@luma.gl/constants";
import { Texture2D } from "@luma.gl/webgl";
import { decoder } from "../shader_modules";
import { decodeRGB } from "../utils/propertyMapTools";
import { getModelMatrix } from "../utils/layerTools";
import fsColormap from "./colormap.fs.glsl";
import { getRgbData } from "@emerson-eps/color-tables";
const DEFAULT_TEXTURE_PARAMETERS = {
    [GL.TEXTURE_MIN_FILTER]: GL.LINEAR_MIPMAP_LINEAR,
    [GL.TEXTURE_MAG_FILTER]: GL.LINEAR,
    [GL.TEXTURE_WRAP_S]: GL.CLAMP_TO_EDGE,
    [GL.TEXTURE_WRAP_T]: GL.CLAMP_TO_EDGE,
};
function getImageData(colorMapName, colorTables, colorMapFunction) {
    const isColorMapFunctionDefined = typeof colorMapFunction !== "undefined";
    const data = new Uint8Array(256 * 3);
    for (let i = 0; i < 256; i++) {
        const value = i / 255.0;
        const rgb = isColorMapFunctionDefined
            ? colorMapFunction(i / 255)
            : getRgbData(value, colorMapName, colorTables);
        let color = [];
        if (rgb != undefined) {
            if (Array.isArray(rgb)) {
                color = rgb;
            }
            else {
                color = [rgb.r, rgb.g, rgb.b];
            }
        }
        data[3 * i + 0] = color[0];
        data[3 * i + 1] = color[1];
        data[3 * i + 2] = color[2];
    }
    return data;
}
const defaultProps = {
    "@@type": "ColormapLayer",
    name: "Property map",
    id: "colormap-layer",
    pickable: true,
    visible: true,
    valueRange: { type: "array", value: [0, 1] },
    colorMapRange: { type: "array" },
    valueDecoder: {
        rgbScaler: [1, 1, 1],
        // By default, scale the [0, 256*256*256-1] decoded values to [0, 1]
        floatScaler: 1.0 / (256.0 * 256.0 * 256.0 - 1.0),
        offset: 0,
        step: 0,
    },
    rotDeg: 0,
    colorMapName: "Rainbow",
};
export default class ColormapLayer extends BitmapLayer {
    initializeState() {
        this.setState({
            isLoaded: false,
        });
        super.initializeState();
    }
    // Signature from the base class, eslint doesn't like the any type.
    // eslint-disable-next-line
    draw({ moduleParameters, uniforms, context }) {
        var _a, _b, _c, _d, _e, _f;
        if (!this.state["isLoaded"]) {
            this.setState({
                isLoaded: true,
            });
            if (typeof this.props.setReportedBoundingBox !== "undefined") {
                const xMin = this.props.bounds[0];
                const yMin = this.props.bounds[1];
                const zMin = 1;
                const xMax = this.props.bounds[2];
                const yMax = this.props.bounds[3];
                const zMax = -1;
                const bbox = [xMin, yMin, zMin, xMax, yMax, zMax];
                this.props.setReportedBoundingBox(bbox);
            }
        }
        const mergedModuleParams = Object.assign(Object.assign({}, moduleParameters), { valueDecoder: Object.assign(Object.assign({}, defaultProps.valueDecoder), moduleParameters.valueDecoder), modelMatrix: getModelMatrix(this.props.rotDeg, this.props.bounds[0], // Rotate around upper left corner of bounds
            this.props.bounds[3]) });
        super.setModuleParameters(mergedModuleParams);
        const valueRangeMin = (_a = this.props.valueRange[0]) !== null && _a !== void 0 ? _a : 0.0;
        const valueRangeMax = (_b = this.props.valueRange[1]) !== null && _b !== void 0 ? _b : 1.0;
        // If specified color map will extend from colorMapRangeMin to colorMapRangeMax.
        // Otherwise it will extend from valueRangeMin to valueRangeMax.
        const colorMapRangeMin = (_d = (_c = this.props.colorMapRange) === null || _c === void 0 ? void 0 : _c[0]) !== null && _d !== void 0 ? _d : valueRangeMin;
        const colorMapRangeMax = (_f = (_e = this.props.colorMapRange) === null || _e === void 0 ? void 0 : _e[1]) !== null && _f !== void 0 ? _f : valueRangeMax;
        super.draw({
            uniforms: Object.assign(Object.assign({}, uniforms), { 
                // Send the colormap texture to the shader.
                colormap: new Texture2D(context.gl, {
                    width: 256,
                    height: 1,
                    format: GL.RGB,
                    data: getImageData(this.props.colorMapName, this.context.userData
                        .colorTables, this.props.colorMapFunction),
                    parameters: DEFAULT_TEXTURE_PARAMETERS,
                }), valueRangeMin,
                valueRangeMax,
                colorMapRangeMin,
                colorMapRangeMax }),
            moduleParameters: mergedModuleParams,
        });
    }
    // Signature from the base class, eslint doesn't like the any type.
    // eslint-disable-next-line
    getShaders() {
        const parentShaders = super.getShaders();
        // Overwrite the BitmapLayer's default fragment shader with ours, that does colormapping.
        parentShaders.fs = fsColormap;
        // Add the decoder shader module to our colormap shader, so we can use the decoder function from our shader.
        parentShaders.modules.push(decoder);
        return parentShaders;
    }
    getPickingInfo({ info }) {
        if (this.state["pickingDisabled"] || !info.color) {
            return info;
        }
        const mergedDecoder = Object.assign(Object.assign({}, defaultProps.valueDecoder), this.props.valueDecoder);
        // The picked color is the one in raw image, not the one after colormapping.
        // We just need to decode that RGB color into a property float value.
        const val = decodeRGB(info.color, mergedDecoder, this.props.valueRange);
        return Object.assign(Object.assign({}, info), { 
            // Picking color doesn't represent object index in this layer.
            // For more details, see https://deck.gl/docs/developer-guide/custom-layers/picking
            index: 0, propertyValue: val });
    }
    getLegendData() {
        var _a, _b, _c, _d, _e, _f;
        const valueRangeMin = (_a = this.props.valueRange[0]) !== null && _a !== void 0 ? _a : 0.0;
        const valueRangeMax = (_b = this.props.valueRange[1]) !== null && _b !== void 0 ? _b : 1.0;
        // If specified color map will extend from colorMapRangeMin to colorMapRangeMax.
        // Otherwise it will extend from valueRangeMin to valueRangeMax.
        const min = (_d = (_c = this.props.colorMapRange) === null || _c === void 0 ? void 0 : _c[0]) !== null && _d !== void 0 ? _d : valueRangeMin;
        const max = (_f = (_e = this.props.colorMapRange) === null || _e === void 0 ? void 0 : _e[1]) !== null && _f !== void 0 ? _f : valueRangeMax;
        return {
            discrete: false,
            valueRange: [min, max],
            colorName: this.props.colorMapName,
            title: "PropertyMapLayer",
            colorMapFunction: this.props.colorMapFunction,
        };
    }
}
ColormapLayer.layerName = "ColormapLayer";
ColormapLayer.defaultProps = defaultProps;
//# sourceMappingURL=colormapLayer.js.map