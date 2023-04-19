import React from "react";
import { PlotData } from "../../utils/dataUtil";
import { Padding, PlotLayout } from "./plotUtil";
interface Props {
    plotData: PlotData;
    layout: PlotLayout;
    padding: Padding;
}
declare const CompletionsPlot: React.FC<Props>;
export default CompletionsPlot;
