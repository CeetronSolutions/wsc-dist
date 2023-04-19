import { Color } from "@deck.gl/core/typed";
export interface ValueDecoder {
    rgbScaler: [number, number, number];
    floatScaler: number;
    offset: number;
    step: number;
}
export declare function decodeRGB([r, g, b]: Color, decoder: ValueDecoder, remapToRange?: [number, number]): number;
