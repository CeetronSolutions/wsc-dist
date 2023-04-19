import React from "react";
import { WeakValidationMap } from "react";
import { SubsurfaceViewerProps } from "../SubsurfaceViewer";
import { Color } from "@deck.gl/core/typed";
import { WellLogController } from "./components/WellLogView";
import { LogViewer } from "@equinor/videx-wellog";
import { Info } from "./components/InfoTypes";
import { MapMouseEvent } from "../SubsurfaceViewer/components/Map";
import { WellLogViewOptions } from "./components/WellLogView";
interface Props extends SubsurfaceViewerProps {
    /**
     * Options for well log view
     */
    welllogOptions?: WellLogViewOptions;
}
interface State {
    wellIndex: number | undefined;
    infos: Info[];
    controller?: WellLogController;
    editedData?: Record<string, unknown>;
    layers?: Record<string, unknown>[];
    wellName?: string;
    selection?: [number | undefined, number | undefined];
    selPersistent?: boolean;
    wellColor?: Color;
}
export declare class MapAndWellLogViewer extends React.Component<Props, State> {
    static propTypes?: WeakValidationMap<Props> | undefined;
    constructor(props: Props, state: State);
    componentDidUpdate(prevProps: Props, prevState: State): void;
    onInfo(x: number, logController: LogViewer, iFrom: number, iTo: number): void;
    onCreateController(controller: WellLogController): void;
    onContentSelection(): void;
    onTrackScroll(): void;
    onMouseEvent(event: MapMouseEvent): void;
    render(): JSX.Element;
}
export {};
