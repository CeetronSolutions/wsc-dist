export namespace DEFAULT_COLORSCALE_CONFIG {
    const prefixZeroAlpha: boolean;
    const suffixZeroAlpha: boolean;
    const scaleType: string;
}
export function interpolateByFactor(color1: Color, color2: Color, factor: number): Color;
export function interpolateColors(colors: Array<Color>, steps?: number): Array<Color>;
export function buildColormapWithCfg(colors: Array<Color>, config?: ColorScaleConfig): string;
export function buildColormap(colorScale: string | Object | Array<string>): string | null;
export function buildColormapFromHexColors(hexColors: Array<string>, config?: {}): string;
export function hexToRGB(hex: string): number[];
/**
 * - [r, g, b, a]
 */
export type Color = Array<number>;
export type ColorScaleConfig = {
    /**
     * - Decides if the first color should have an alpha equals to 0.
     */
    prefixZeroAlpha: boolean | undefined;
    /**
     * - Decides if the last color should have an alpha equals to 0.
     */
    suffixZeroAlpha: boolean | undefined;
    scaleType: string;
    cutPointMin: number;
    cutPointMax: number;
};
