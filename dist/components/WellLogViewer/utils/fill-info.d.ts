import { Info, InfoOptions } from "../components/InfoTypes";
import { LogViewer } from "@equinor/videx-wellog";
export declare function fillInfos(x: number, logController: LogViewer, iFrom: number, iTo: number, collapsedTrackIds: (string | number)[], options?: InfoOptions): Info[];
