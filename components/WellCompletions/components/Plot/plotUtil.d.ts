import * as d3 from "d3";
export interface PlotLayout {
    width: number;
    height: number;
    xRange: [number, number];
    yRange: [number, number];
    xExtent: number;
    yExtent: number;
    topLeft: [number, number];
    bottomRight: [number, number];
}
export interface Padding {
    left: number;
    right: number;
    top: number;
    bottom: number;
}
export declare const getLayout: (width: number, height: number, padding?: Padding) => PlotLayout;
export declare const updateOrCreate: (selection: d3.Selection<HTMLDivElement, unknown, null, undefined>, element: string, elementClass: string) => d3.Selection<d3.BaseType, unknown, null, undefined>;
export declare const getSvg: (div: HTMLDivElement, id?: string) => d3.Selection<d3.BaseType, unknown, null, undefined>;
