import React from "react";
import { PlotData } from "../../utils/dataUtil";
interface Props {
    timeSteps: string[];
    plotData: PlotData;
}
declare const WellCompletionsPlot: React.FC<Props>;
export default WellCompletionsPlot;
