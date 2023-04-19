import React from "react";
import { colorTablesArray } from "@emerson-eps/color-tables/";
import { ViewsType, TooltipCallback, ViewStateType, BoundsAccessor } from "./components/Map";
import { MapMouseEvent } from "./components/Map";
export interface DashSubsurfaceViewerProps {
    id: string;
    resources?: Record<string, unknown>;
    layers?: Record<string, unknown>[];
    bounds?: [number, number, number, number] | BoundsAccessor;
    views?: ViewsType;
    coords?: {
        visible?: boolean | null;
        multiPicking?: boolean | null;
        pickDepth?: number | null;
    };
    scale?: {
        visible?: boolean | null;
        incrementValue?: number | null;
        widthPerUnit?: number | null;
        cssStyle?: Record<string, unknown> | null;
    };
    coordinateUnit?: string;
    colorTables?: colorTablesArray;
    editedData?: Record<string, unknown>;
    setProps?: (data: Record<string, unknown>) => void;
    /**
     * Validate JSON datafile against schema
     */
    checkDatafileSchema?: boolean;
    /**
     * For get mouse events
     */
    onMouseEvent?: (event: MapMouseEvent) => void;
    getCameraPosition?: (input: ViewStateType) => void;
    /**
     * If changed will reset camera to default position.
     */
    triggerHome?: number;
    triggerResetMultipleWells?: number;
    /**
     * Range selection of the current well
     */
    selection?: {
        well: string | undefined;
        selection: [number | undefined, number | undefined] | undefined;
    };
    /**
     * Override default tooltip with a callback.
     */
    getTooltip?: TooltipCallback;
    cameraPosition?: ViewStateType | undefined;
    children?: React.ReactNode;
}
declare const DashSubsurfaceViewer: React.FC<DashSubsurfaceViewerProps>;
export default DashSubsurfaceViewer;
