import { Track, GraphTrack, StackedTrack } from "@equinor/videx-wellog";
import { TrackOptions } from "@equinor/videx-wellog/dist/tracks/interfaces";
import { GraphTrackOptions } from "@equinor/videx-wellog/dist/tracks/graph/interfaces";
import { LegendInfo } from "@equinor/videx-wellog/dist/plots/legend/interfaces";
import { GradientFillPlotOptions } from "./gradientfill-plot";
export interface ExtPlotOptions extends GradientFillPlotOptions {
    legendInfo: () => LegendInfo;
}
import WellLogView from "../components/WellLogView";
import { TemplatePlotTypes, TemplateTrack, TemplatePlot, TemplateStyle } from "../components/WellLogTemplateTypes";
import { WellLog, WellLogMetadataDiscreteObjects } from "../components/WellLogTypes";
export declare function indexOfElementByName(array: Named[], name: string): number;
declare class TracksInfo {
    tracks: Track[];
    minmaxPrimaryAxis: [number, number];
    minmaxSecondaryAxis: [number, number];
    primaries: Float32Array;
    secondaries: Float32Array;
    constructor();
}
declare type Named = {
    name: string;
};
export declare function getAvailableAxes(welllog: WellLog | undefined, axisMnemos: Record<string, string[]>): string[];
import { Plot } from "@equinor/videx-wellog";
export declare function getPlotType(plot: Plot): TemplatePlotTypes;
import { ColorTable } from "../components/ColorTableTypes";
export declare function addOrEditGraphTrackPlot(wellLogView: WellLogView, track: GraphTrack, plot: Plot | null, templatePlot: TemplatePlot): void;
export declare function removeGraphTrackPlot(wellLogView: WellLogView, track: GraphTrack, plot: Plot): void;
interface DiscreteMeta {
    iCode: number;
    iColor: number;
    objects: WellLogMetadataDiscreteObjects;
}
export declare function getDiscreteColorAndName(value: number | string | null, colorTable: ColorTable | undefined, meta?: DiscreteMeta | null): {
    color: number[];
    name: string;
};
export declare function getDiscreteMeta(welllog: WellLog, name: string): DiscreteMeta | null;
export interface TrackOptionsEx extends TrackOptions {
    __template: TemplateTrack;
}
export declare function getTrackTemplate(track: Track): TemplateTrack;
export declare function newGraphTrack(options: GraphTrackOptions): GraphTrack;
export declare function isScaleTrack(track: Track): boolean;
export declare function getScaleTrackNum(tracks: Track[]): number;
export interface AxesInfo {
    primaryAxis: string;
    secondaryAxis: string;
    titles: Record<string, string>;
    mnemos: Record<string, string[]>;
}
export declare function createTracks(welllog: WellLog | undefined, axes: AxesInfo, templateTracks: TemplateTrack[], // Part of JSON
templateStyles?: TemplateStyle[], // Part of JSON
colorTables?: ColorTable[]): TracksInfo;
export declare function addOrEditGraphTrack(wellLogView: WellLogView, track: GraphTrack | null, templateTrack: TemplateTrack, trackCurrent: Track, bAfter: boolean): GraphTrack;
export declare function addOrEditStackedTrack(wellLogView: WellLogView, track: StackedTrack | null, templateTrack: TemplateTrack, trackCurrent: Track, bAfter: boolean): StackedTrack | null;
export declare function hasDifferentialPlot(track: GraphTrack): boolean;
export {};
