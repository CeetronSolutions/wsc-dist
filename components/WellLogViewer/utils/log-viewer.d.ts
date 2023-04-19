import { LogViewer, Track } from "@equinor/videx-wellog";
export declare function removeOverlay(logViewer: LogViewer): void;
export declare function isTrackVisible(track: Track): boolean;
export declare function showTrack(track: Track, visible: boolean): boolean;
export declare function isTrackSelected(_logViewer: LogViewer, track: Track): boolean;
export declare function selectTrack(logViewer: LogViewer, track: Track, selected: boolean): boolean;
export declare function getSelectedTrackIndices(logViewer?: LogViewer): number[];
export declare function zoomContent(logViewer: LogViewer, zoom: number): boolean;
export declare function scrollContentTo(logViewer: LogViewer, f: number): boolean;
export declare function zoomContentTo(logViewer: LogViewer, domain: [number, number]): boolean;
export declare function setContentBaseDomain(logViewer: LogViewer, domain: [number, number]): void;
export declare function getContentBaseDomain(logViewer: LogViewer): [number, number];
export declare function getContentDomain(logViewer: LogViewer): [number, number];
export declare function getContentZoom(logViewer: LogViewer): number;
export declare function scrollTracksTo(logViewer: LogViewer, iFrom: number, iTo: number): boolean;
export declare function getFirstVisibleTrack(logViewer: LogViewer): number;
export declare function setSelectedTrackIndices(logViewer: LogViewer | undefined, selectedTrackIndices: number[]): boolean;
export declare function updateLegendRows(logViewer: LogViewer): void;
