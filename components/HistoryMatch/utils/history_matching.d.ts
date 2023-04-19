export default class HistoryMatching {
    init(container: any, data: any): void;
    container: any;
    data: any;
    initVisualisation(): void;
    margin: {
        left: number;
        right: number;
        bottom: number;
        top: number;
    } | undefined;
    plotWidth: number | undefined;
    plotHeight: number | undefined;
    svg: d3.Selection<SVGSVGElement, any, null, undefined> | undefined;
    initPlot(): void;
    plot: HistoryMatchingPlot | undefined;
    initIterationPicker(): void;
    sliderContainer: d3.Selection<SVGGElement, any, null, undefined> | undefined;
    iterationPicker: Slider | undefined;
    initResize(): void;
    _setIteration(index: any): void;
    _reorderTooltipLegendElements(): void;
}
import * as d3 from "d3";
import HistoryMatchingPlot from "../components/history_matching_plot";
import Slider from "../../../shared/slider";
