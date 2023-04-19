import React from "react";
import { PlotData } from "../../utils/dataUtil";
import { Padding, PlotLayout } from "./plotUtil";
interface Props {
    timeSteps: string[];
    plotData: PlotData;
    layout: PlotLayout;
    padding: Padding;
}
declare const WellsPlot: React.FC<Props>;
export default WellsPlot;
