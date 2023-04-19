import { Component } from "react";
import { WellLogViewWithScrollerProps } from "./components/WellLogViewWithScroller";
import { WellLogController } from "./components/WellLogView";
import { LogViewer } from "@equinor/videx-wellog";
import { Info, InfoOptions } from "./components/InfoTypes";
export interface WellLogViewerProps extends WellLogViewWithScrollerProps {
    readoutOptions?: InfoOptions;
    onContentRescale?: () => void;
    onContentSelection?: () => void;
    onTemplateChanged?: () => void;
    onCreateController?: (controller: WellLogController) => void;
}
export declare const argTypesWellLogViewerProp: {
    readoutOptions: {
        description: string;
    };
    horizontal: {
        description: string;
    };
    welllog: {
        description: string;
    };
    template: {
        description: string;
    };
    colorTables: {
        description: string;
    };
    wellpick: {
        description: string;
    };
    patternsTable: {
        description: string;
    };
    patterns: {
        description: string;
    };
    domain: {
        description: string;
    };
    selection: {
        description: string;
    };
    primaryAxis: {
        description: string;
    };
    axisMnemos: {
        description: string;
    };
    axisTitles: {
        description: string;
    };
    viewTitle: {
        description: string;
    };
    options: {
        description: string;
    };
};
interface State {
    axes: string[];
    primaryAxis: string;
    infos: Info[];
    sliderValue: number;
}
declare class WellLogViewer extends Component<WellLogViewerProps, State> {
    static propTypes: Record<string, unknown>;
    controller: WellLogController | null;
    collapsedTrackIds: (string | number)[];
    constructor(props: WellLogViewerProps);
    componentDidMount(): void;
    shouldComponentUpdate(nextProps: WellLogViewerProps, nextState: State): boolean;
    componentDidUpdate(prevProps: WellLogViewerProps): void;
    updateReadoutPanel(): void;
    onInfo(x: number, logController: LogViewer, iFrom: number, iTo: number): void;
    onCreateController(controller: WellLogController): void;
    onContentRescale(): void;
    onContentSelection(): void;
    onTemplateChanged(): void;
    onChangePrimaryAxis(value: string): void;
    onZoomSliderChange(value: number): void;
    setSliderValue(): void;
    onInfoGroupClick(trackId: string | number): void;
    render(): JSX.Element;
}
export default WellLogViewer;
