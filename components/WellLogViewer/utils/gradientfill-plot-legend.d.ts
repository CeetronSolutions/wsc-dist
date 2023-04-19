import { LegendBounds } from "@equinor/videx-wellog/dist/utils/legend-helper";
import { LegendInfo } from "@equinor/videx-wellog/dist/plots/legend/interfaces";
import GradientFillPlot from "./gradientfill-plot";
declare type D3Selection = any;
/**
 * Renders area legend to a SVG group element according to bounds.
 */
export default function renderGradientFillPlotLegend(g: D3Selection, bounds: LegendBounds, legendInfo: LegendInfo, plot: GradientFillPlot): void;
export {};
