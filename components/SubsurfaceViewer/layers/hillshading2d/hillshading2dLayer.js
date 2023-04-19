import { BitmapLayer } from "@deck.gl/layers/typed";
import { decoder } from "../shader_modules";
import { decodeRGB } from "../utils/propertyMapTools";
import { getModelMatrix } from "../utils/layerTools";
import fsHillshading from "./hillshading2d.fs.glsl";
const defaultProps = {
    "@@type": "Hillshading2DLayer",
    name: "Hill shading",
    id: "hillshading-layer",
    opacity: 1.0,
    pickable: true,
    visible: true,
    rotDeg: 0,
    valueRange: { type: "array", value: [0, 1] },
    lightDirection: [1, 1, 1],
    ambientLightIntensity: 0.5,
    diffuseLightIntensity: 0.5,
    valueDecoder: {
        rgbScaler: [1, 1, 1],
        // By default, scale the [0, 256*256*256-1] decoded values to [0, 1]
        floatScaler: 1.0 / (256.0 * 256.0 * 256.0 - 1.0),
        offset: 0,
        step: 0,
    },
};
export default class Hillshading2DLayer extends BitmapLayer {
    initializeState() {
        this.setState({
            isLoaded: false,
        });
        super.initializeState();
    }
    // Signature from the base class, eslint doesn't like the any type.
    // eslint-disable-next-line
    draw({ moduleParameters, uniforms }) {
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
        if (this.props.image) {
            const mergedModuleParams = Object.assign(Object.assign({}, moduleParameters), { valueDecoder: Object.assign(Object.assign({}, defaultProps.valueDecoder), moduleParameters.valueDecoder), modelMatrix: getModelMatrix(this.props.rotDeg, this.props.bounds[0], // Rotate around upper left corner of bounds
                this.props.bounds[3]) });
            super.setModuleParameters(mergedModuleParams);
            const valueRangeMin = (_a = this.props.valueRange[0]) !== null && _a !== void 0 ? _a : 0.0;
            const valueRangeMax = (_b = this.props.valueRange[1]) !== null && _b !== void 0 ? _b : 1.0;
            const colorMapRangeMin = (_d = (_c = this.props.colorMapRange) === null || _c === void 0 ? void 0 : _c[0]) !== null && _d !== void 0 ? _d : valueRangeMin;
            const colorMapRangeMax = (_f = (_e = this.props.colorMapRange) === null || _e === void 0 ? void 0 : _e[1]) !== null && _f !== void 0 ? _f : valueRangeMax;
            const [minVal, maxVal] = this.props.valueRange;
            super.draw({
                uniforms: Object.assign(Object.assign({}, uniforms), { 
                    // Send extra uniforms to the shader.
                    bitmapResolution: [
                        this.props.image.width,
                        this.props.image.height,
                    ], valueRangeSize: maxVal - minVal, lightDirection: this.props.lightDirection, ambientLightIntensity: this.props.ambientLightIntensity, diffuseLightIntensity: this.props.diffuseLightIntensity, valueRangeMin,
                    valueRangeMax,
                    colorMapRangeMin,
                    colorMapRangeMax }),
                moduleParameters: mergedModuleParams,
            });
        }
    }
    // Signature from the base class, eslint doesn't like the any type.
    // eslint-disable-next-line
    getShaders() {
        const parentShaders = super.getShaders();
        // Overwrite the BitmapLayer's default fragment shader with ours, that does hillshading.
        parentShaders.fs = fsHillshading;
        // Add the decoder shader module to our colormap shader, so we can use the decoder function from our shader.
        parentShaders.modules.push(decoder);
        return parentShaders;
    }
    getPickingInfo({ info }) {
        if (this.state["pickingDisabled"] || !info.color) {
            return info;
        }
        const mergedDecoder = Object.assign(Object.assign({}, defaultProps.valueDecoder), this.props.valueDecoder);
        // The picked color is the one in raw image, not the one after hillshading.
        // We just need to decode that RGB color into a property float value.
        const val = decodeRGB(info.color, mergedDecoder, this.props.valueRange);
        return Object.assign(Object.assign({}, info), { 
            // Picking color doesn't represent object index in this layer.
            // For more details, see https://deck.gl/docs/developer-guide/custom-layers/picking
            index: 0, propertyValue: val });
    }
}
Hillshading2DLayer.layerName = "Hillshading2DLayer";
Hillshading2DLayer.defaultProps = defaultProps;
//# sourceMappingURL=hillshading2dLayer.js.map