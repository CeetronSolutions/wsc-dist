declare var _default: {
    getShapeType: (layer: any) => "rectangle" | "circle" | "marker" | "polygon" | "polyline" | "circleMarker";
    makePolyline: (item: any, swapXY: any, setProps: any) => any;
    makePolygon: (item: any, swapXY: any, setProps: any) => any;
    makeMarker: (item: any, swapXY: any, setProps: any) => any;
    makeCircle: (item: any, swapXY: any, setProps: any) => any;
    makeCircleMarker: (item: any, swapXY: any) => any;
    addImage: (imageData: any) => any;
    addTile: (tileData: any) => any;
    loadImage: (src: any, config?: {}) => Promise<any>;
    scaleImage: (loadedImage: string | HTMLImageElement, scaleX: number, scaleY: number) => Promise<HTMLImageElement>;
    tilesToImage: (tiles: (string | HTMLImageElement)[], options?: {}) => [string, HTMLImageElement[], number];
    DEFAULT_COLORSCALE_CONFIG: {
        prefixZeroAlpha: boolean;
        suffixZeroAlpha: boolean;
        scaleType: string;
    };
    interpolateByFactor: (color1: ColorScaleUtils.Color, color2: ColorScaleUtils.Color, factor: number) => ColorScaleUtils.Color;
    interpolateColors: (colors: ColorScaleUtils.Color[], steps?: number) => ColorScaleUtils.Color[];
    buildColormapWithCfg: (colors: ColorScaleUtils.Color[], config?: ColorScaleUtils.ColorScaleConfig) => string;
    buildColormap: (colorScale: string | Object | string[]) => string | null;
    buildColormapFromHexColors: (hexColors: string[], config?: {}) => string;
    hexToRGB: (hex: string) => number[];
};
export default _default;
import * as ColorScaleUtils from "./colorScale";
