import { ValueDecoder } from "../utils/propertyMapTools";
declare const DEFAULT_DECODER: ValueDecoder;
interface DecoderUniforms {
    "decoder.rgbScaler": typeof DEFAULT_DECODER.rgbScaler;
    "decoder.floatScaler": typeof DEFAULT_DECODER.floatScaler;
    "decoder.offset": typeof DEFAULT_DECODER.offset;
    "decoder.step": typeof DEFAULT_DECODER.step;
}
declare function getUniforms(opts: any): DecoderUniforms | {};
declare const _default: {
    name: string;
    fs: string;
    getUniforms: typeof getUniforms;
};
export default _default;
