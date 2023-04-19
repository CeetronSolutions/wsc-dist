import { Component, ReactNode } from "react";
import WellLogSpacer from "./components/WellLogSpacer";
import { WellLog } from "./components/WellLogTypes";
import { Template } from "./components/WellLogTemplateTypes";
import { ColorTable } from "./components/ColorTableTypes";
import { PatternsTable } from "./utils/pattern";
import { WellLogController, WellPickProps } from "./components/WellLogView";
import { WellLogViewOptions } from "./components/WellLogView";
import { WellLogSpacerOptions } from "./components/WellLogSpacer";
import { LogViewer } from "@equinor/videx-wellog";
import { Info, InfoOptions } from "./components/InfoTypes";
export declare function isEqualArrays(d1: undefined | any[], d2: undefined | any[]): boolean;
interface Props {
    /**
     * Object from JSON file describing single well log data.
     */
    welllogs: WellLog[];
    /**
     * Prop containing track templates data.
     */
    templates: Template[];
    /**
     * Prop containing color table data.
     */
    colorTables: ColorTable[];
    /**
     * Set to true for default titles or to array of individial welllog titles
     */
    viewTitles?: boolean | (boolean | string | JSX.Element)[];
    /**
     * Well Picks data array
     */
    wellpicks?: WellPickProps[];
    /**
     * Patterns table
     */
    patternsTable?: PatternsTable;
    /**
     * Horizon to pattern index map
     */
    patterns?: [string, number][];
    /**
     * Horizon names for wellpick flatting (pan and zoom)
     */
    wellpickFlatting?: string[];
    /**
     * Set to true or to spacer width or to array of widths if WellLogSpacers should be used
     */
    spacers?: boolean | number | number[];
    /**
     * Distanses between wells to show on the spacers
     */
    wellDistances?: {
        units: string;
        distances: (number | undefined)[];
    };
    /**
     * Orientation of the track plots on the screen.
     */
    horizontal?: boolean;
    syncTrackPos?: boolean;
    syncContentDomain?: boolean;
    syncContentSelection?: boolean;
    syncTemplate?: boolean;
    /**
     * Primary axis id: "md", "tvd", "time"... Default is the first available from axisMnemos
     */
    primaryAxis?: string;
    /**
     * Log mnemonics for axes
     */
    axisTitles: Record<string, string>;
    /**
     * Names for axes
     */
    axisMnemos: Record<string, string[]>;
    /**
     * Initial visible range
     */
    domain?: [number, number];
    /**
     * Initial selected range
     */
    selection?: [number | undefined, number | undefined];
    /**
     * Options for well log views
     */
    welllogOptions?: WellLogViewOptions;
    /**
     * Options for well log spacers
     */
    spacerOptions?: WellLogSpacerOptions;
    /**
     * Options for readout
     */
    readoutOptions?: InfoOptions;
    onContentRescale?: (iView: number) => void;
    onContentSelection?: (iView: number) => void;
    onTemplateChanged?: (iView: number) => void;
    onCreateController?: (iView: number, controller: WellLogController) => void;
}
export declare const argTypesSyncLogViewerProp: {
    id: {
        description: string;
    };
    welllogs: {
        description: string;
    };
    templates: {
        description: string;
    };
    colorTables: {
        description: string;
    };
    wellpicks: {
        description: string;
    };
    patternsTable: {
        description: string;
    };
    patterns: {
        description: string;
    };
    spacers: {
        description: string;
    };
    wellDistances: {
        description: string;
    };
    horizontal: {
        description: string;
    };
    syncTrackPos: {
        description: string;
    };
    syncContentDomain: {
        description: string;
    };
    syncContentSelection: {
        description: string;
    };
    syncTemplate: {
        description: string;
    };
    welllogOptions: {
        description: string;
    };
    readoutOptions: {
        description: string;
    };
    domain: {
        description: string;
    };
    selection: {
        description: string;
    };
    viewTitles: {
        description: string;
    };
};
interface State {
    axes: string[];
    primaryAxis: string;
    infos: Info[][];
    sliderValue: number;
}
declare class SyncLogViewer extends Component<Props, State> {
    static propTypes: Record<string, unknown>;
    controllers: (WellLogController | null)[];
    spacers: (WellLogSpacer | null)[];
    collapsedTrackIds: (string | number)[];
    callbacks: {
        onCreateControllerBind: (controller: WellLogController) => void;
        onInfoBind: (x: number, logController: LogViewer, iFrom: number, iTo: number) => void;
        onTrackScrollBind: () => void;
        onTrackSelectionBind: () => void;
        onContentRescaleBind: () => void;
        onContentSelectionBind: () => void;
        onTemplateChangedBind: () => void;
    }[];
    constructor(props: Props);
    componentDidMount(): void;
    shouldComponentUpdate(nextProps: Props, nextState: State): boolean;
    componentDidUpdate(prevProps: Props): void;
    updateReadoutPanel(): void;
    onInfo(iView: number, x: number, logController: LogViewer, iFrom: number, iTo: number): void;
    onCreateController(iView: number, controller: WellLogController): void;
    onTrackScroll(iView: number): void;
    onTrackSelection(iView: number): void;
    onContentRescale(iView: number): void;
    onContentSelection(iView: number): void;
    onTemplateChanged(iView: number): void;
    onChangePrimaryAxis(value: string): void;
    onZoomSliderChange(value: number): void;
    onScrollerScroll(iView: number, x: number, y: number): void;
    setSliderValue(): void;
    syncTrackScrollPos(iView: number): void;
    syncTrackSelection(iView: number): void;
    getCommonContentBaseDomain(): [number, number];
    syncContentBaseDomain(): boolean;
    makeFlattingCoeffs(): {
        A: number[][];
        B: number[][];
        newBaseDomain: [number, number][];
    };
    syncContentScrollPos(iView: number): void;
    syncContentSelection(iView: number): void;
    syncTemplate(iView: number): void;
    setControllersZoom(): void;
    setControllersSelection(): void;
    onInfoGroupClick(trackId: string | number): void;
    createView(index: number): ReactNode;
    createSpacer(index: number): ReactNode;
    createRightPanel(): ReactNode;
    render(): JSX.Element;
}
export default SyncLogViewer;
