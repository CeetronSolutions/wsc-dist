import React from "react";
import { Zone } from "../../redux/types";
import { Padding, PlotLayout } from "./plotUtil";
interface Props {
    data: Zone[];
    layout: PlotLayout;
    padding: Padding;
}
declare const StratigraphyPlot: React.FC<Props>;
export default StratigraphyPlot;
