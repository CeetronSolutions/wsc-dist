import { LegendBounds } from "@equinor/videx-wellog/dist/utils/legend-helper";
declare type D3Selection = any;
/**
 * Renders label, min/max values for domain and unit
 */
export declare function renderTextLabels(g: D3Selection, bounds: LegendBounds, label: string, unit: string, domain: number[], color: string, addLabelBg?: boolean): void;
/**
 * Renders a basic/standard set of layout that are common for most plot-type legends
 */
export declare function renderBasicPlotLegend(g: D3Selection, bounds: LegendBounds, label: string, unit: string, domain: number[], color: string, addLabelBg?: boolean): void;
export {};
