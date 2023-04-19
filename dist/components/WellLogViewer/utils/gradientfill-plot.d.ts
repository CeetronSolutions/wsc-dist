import { Scale } from "@equinor/videx-wellog/dist/common/interfaces";
import { Plot } from "@equinor/videx-wellog";
import { ColorTable } from "../components/ColorTableTypes";
import { AreaPlotOptions } from "@equinor/videx-wellog/dist/plots/interfaces";
export interface GradientFillPlotOptions extends AreaPlotOptions {
    colorTable?: ColorTable;
    inverseColorTable?: ColorTable;
    colorScale?: "linear" | "log";
    inverseColorScale?: "linear" | "log";
}
/**
 * GradientFill plot
 */
export default class GradientFillPlot extends Plot {
    constructor(id: string | number, options?: GradientFillPlotOptions);
    /**
     * Renders area plot to canvas context
     * @param ctx canvas context instance
     * @param scale y-scale
     */
    plot(ctx: CanvasRenderingContext2D, scale: Scale): void;
}
