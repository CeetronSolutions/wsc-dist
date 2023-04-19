import { Component } from "react";
import { WellLogViewProps } from "./WellLogView";
import { WellLogController } from "./WellLogView";
import Scroller from "./Scroller";
export declare type WellLogViewWithScrollerProps = WellLogViewProps;
export declare const argTypesWellLogViewScrollerProp: {
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
declare class WellLogViewWithScroller extends Component<WellLogViewWithScrollerProps> {
    static propTypes: Record<string, unknown>;
    controller: WellLogController | null;
    scroller: Scroller | null;
    constructor(props: WellLogViewWithScrollerProps);
    componentDidMount(): void;
    shouldComponentUpdate(nextProps: WellLogViewWithScrollerProps): boolean;
    updateReadoutPanel(): void;
    onCreateController(controller: WellLogController): void;
    onTrackScroll(): void;
    onTrackSelection(): void;
    onContentRescale(): void;
    onContentSelection(): void;
    onScrollerScroll(x: number, y: number): void;
    calcPosTrack(f: number): number;
    getContentPosFraction(): number;
    getTrackPosFraction(): number;
    setScrollerPosAndZoom(): void;
    render(): JSX.Element;
}
export default WellLogViewWithScroller;
