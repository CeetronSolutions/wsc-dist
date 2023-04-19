import { Component } from "react";
import { LogViewer } from "@equinor/videx-wellog";
import { ScaleInterpolator } from "@equinor/videx-wellog";
import { Track } from "@equinor/videx-wellog";
import { Plot } from "@equinor/videx-wellog";
import "./styles.scss";
import { WellLog } from "./WellLogTypes";
import { Template } from "./WellLogTemplateTypes";
import { ColorTable } from "./ColorTableTypes";
import { PatternsTable } from "../utils/pattern";
import { AxesInfo } from "../utils/tracks";
import { TemplatePlot, TemplateTrack } from "./WellLogTemplateTypes";
export interface WellPickProps {
    wellpick: WellLog;
    name: string;
    md?: string;
    /**
     * Prop containing color table data for well picks
     */
    colorTables: ColorTable[];
    color: string;
}
interface WellPick {
    vMD: number;
    vPrimary: number | undefined;
    vSecondary: number | undefined;
    horizon: string;
    color: number[];
}
export declare function getWellPicks(wellLogView: WellLogView): WellPick[];
export declare function addTrack(parent: HTMLElement, wellLogView: WellLogView, onOK: (templateTrack: TemplateTrack) => void): void;
export declare function editTrack(parent: HTMLElement, wellLogView: WellLogView, templateTrack: TemplateTrack, onOK: (templateTrack: TemplateTrack) => void): void;
export interface TrackMouseEvent {
    track: Track;
    type: /*string, */ "click" | "contextmenu" | "dblclick";
    area: /*string, */ "title" | "legend" | "container";
    plot: Plot | null;
    element: HTMLElement;
    ev: Event;
}
export interface WellLogController {
    zoomContentTo(domain: [number, number]): boolean;
    scrollContentTo(f: number): boolean;
    zoomContent(zoom: number): void;
    selectContent(selection: [number | undefined, number | undefined]): void;
    setContentBaseDomain(domain: [number, number]): void;
    getContentBaseDomain(): [number, number];
    getContentDomain(): [number, number];
    getContentZoom(): number;
    getContentSelection(): [number | undefined, number | undefined];
    scrollTrackTo(pos: number): void;
    scrollTrackBy(delta: number): void;
    getTrackScrollPos(): number;
    getTrackScrollPosMax(): number;
    getTrackZoom(): number;
    setSelectedTrackIndices(selection: number[]): boolean;
    getSelectedTrackIndices(): number[];
    setTemplate(template: Template): void;
    getTemplate(): Template;
}
import { Info } from "./InfoTypes";
export interface WellLogViewOptions {
    /**
     * Fill with color between well picks
     */
    wellpickColorFill?: boolean;
    /**
     * Fill with pattern between well picks
     */
    wellpickPatternFill?: boolean;
    /**
     * The maximum zoom value
     */
    maxContentZoom?: number;
    /**
     * The maximum number of visible tracks
     */
    maxVisibleTrackNum?: number;
    /**
     * Validate JSON datafile against schema
     */
    checkDatafileSchema?: boolean;
    /**
     * Hide titles of the track. Default is false
     */
    hideTrackTitle?: boolean;
    /**
     * Hide Legends on the tracks
     */
    hideTrackLegend?: boolean;
}
export interface WellLogViewProps {
    /**
     * Object from JSON file describing single well log data.
     */
    welllog: WellLog | undefined;
    /**
     * Prop containing track template data.
     */
    template: Template;
    /**
     * Prop containing color table data for discrete well logs
     */
    colorTables: ColorTable[];
    /**
     * Well Picks data
     */
    wellpick?: WellPickProps;
    /**
     * Patterns table
     */
    patternsTable?: PatternsTable;
    /**
     * Horizon to pattern index map
     */
    patterns?: [string, number][];
    /**
     * Orientation of the track plots on the screen.
     */
    horizontal?: boolean;
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
     * The view title. Set desired string or react element or true for default value from welllog file
     */
    viewTitle?: boolean | string | JSX.Element;
    /**
     * Initial visible range
     */
    domain?: [number, number];
    /**
     * Initial selected range
     */
    selection?: [number | undefined, number | undefined];
    /**
     * Additional options
     */
    options?: WellLogViewOptions;
    onCreateController?: (controller: WellLogController) => void;
    onInfo?: (x: number, logController: LogViewer, iFrom: number, iTo: number) => void;
    /**
     * called when track scrolling is changed
     */
    onTrackScroll?: () => void;
    /**
     * called when track selection is changed
     */
    onTrackSelection?: () => void;
    /**
     * called when content zoom and scrolling are changed
     */
    onContentRescale?: () => void;
    /**
     * called when content zoom and scrolling are changed
     */
    onContentSelection?: () => void;
    /**
     * called when mouse click on a track
     */
    onTrackMouseEvent?: (wellLogView: WellLogView, ev: TrackMouseEvent) => void;
    /**
     * called when template is changed
     */
    onTemplateChanged?: () => void;
}
export declare const argTypesWellLogViewProp: {
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
export declare function shouldUpdateWellLogView(props: WellLogViewProps, nextProps: WellLogViewProps): boolean;
export declare function isEqualRanges(d1: undefined | [any, any], d2: undefined | [any, any]): boolean;
interface State {
    infos: Info[];
    scrollTrackPos: number;
    errorText?: string;
}
declare class WellLogView extends Component<WellLogViewProps, State> implements WellLogController {
    static propTypes: Record<string, unknown>;
    container?: HTMLElement;
    resizeObserver: ResizeObserver;
    logController?: LogViewer;
    selCurrent: number | undefined;
    selPinned: number | undefined;
    selPersistent: boolean | undefined;
    template: Template;
    scaleInterpolator: ScaleInterpolator | undefined;
    constructor(props: WellLogViewProps);
    componentDidMount(): void;
    shouldComponentUpdate(nextProps: WellLogViewProps, nextState: State): boolean;
    componentDidUpdate(prevProps: WellLogViewProps, prevState: State): void;
    createLogViewer(): void;
    getAxesInfo(): AxesInfo;
    setTracks(checkSchema?: boolean): void;
    findTrackById(trackId: string | number): Track | undefined;
    setControllerZoom(): void;
    setControllerSelection(): void;
    /**
      Display current state of track scrolling
      */
    onTrackScroll(): void;
    onTrackSelection(): void;
    setInfo(x?: number): void;
    onContentRescale(): void;
    onContentSelection(): void;
    onTrackMouseEvent(ev: TrackMouseEvent): void;
    onTemplateChanged(): void;
    zoomContentTo(domain: [number, number]): boolean;
    scrollContentTo(f: number): boolean;
    zoomContent(zoom: number): boolean;
    showSelection(): void;
    selectContent(selection: [number | undefined, number | undefined]): void;
    setContentBaseDomain(domain: [number, number]): void;
    getContentBaseDomain(): [number, number];
    getContentDomain(): [number, number];
    getContentZoom(): number;
    getContentSelection(): [number | undefined, number | undefined];
    _graphTrackMax(): number;
    _newTrackScrollPos(pos: number): number;
    _maxVisibleTrackNum(): number;
    scrollTrackBy(delta: number): void;
    scrollTrackTo(pos: number): void;
    getTrackScrollPos(): number;
    getTrackScrollPosMax(): number;
    getTrackZoom(): number;
    getSelectedTrackIndices(): number[];
    setSelectedTrackIndices(selection: number[]): boolean;
    getTemplate(): Template;
    setTemplate(template: Template): void;
    _generateTemplate(): Template;
    _addTrack(trackCurrent: Track, templateTrack: TemplateTrack): void;
    _editTrack(track: Track, templateTrack: TemplateTrack): void;
    removeTrack(track: Track): void;
    isTrackSelected(track: Track): boolean;
    selectTrack(track: Track, selected: boolean): boolean;
    addTrackPlot(track: Track, templatePlot: TemplatePlot): void;
    _editTrackPlot(track: Track, plot: Plot, _templatePlot: TemplatePlot): void;
    removeTrackPlot(track: Track, plot: Plot): void;
    addTrack(parent: HTMLElement | null, trackCurrent: Track): void;
    editTrack(parent: HTMLElement | null, track: Track): void;
    addPlot(parent: HTMLElement | null, track: Track): void;
    editPlot(parent: HTMLElement | null, track: Track, plot: Plot): void;
    render(): JSX.Element;
}
export declare function _propTypesWellLogView(): Record<string, unknown>;
export default WellLogView;
