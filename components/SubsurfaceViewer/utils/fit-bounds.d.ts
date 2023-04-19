export function clamp(x: any, min: any, max: any): any;
export default function fitBounds({ width, height, bounds, minExtent, maxZoom, padding, offset, }: {
    width: any;
    height: any;
    bounds: any;
    minExtent?: number | undefined;
    maxZoom?: number | undefined;
    padding?: number | undefined;
    offset?: number[] | undefined;
}): {
    x: number;
    y: number;
    zoom: number;
};
export const log2: (x: number) => number;
