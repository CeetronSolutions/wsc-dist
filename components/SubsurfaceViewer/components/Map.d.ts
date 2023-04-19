import { Color, LayersList, LayerProps, LayerContext, View, PickingInfo } from "@deck.gl/core/typed";
import React from "react";
import { colorTablesArray } from "@emerson-eps/color-tables/";
export declare type BoundsAccessor = () => [number, number, number, number];
export declare type TooltipCallback = (info: PickingInfo) => string | Record<string, unknown> | null;
export interface ViewportType {
    /**
     * Viewport id
     */
    id: string;
    /**
     * Viewport name
     */
    name?: string;
    /**
     * If true, displays map in 3D view, default is 2D view (false)
     */
    show3D?: boolean;
    /**
     * Layers to be displayed on viewport
     */
    layerIds?: string[];
    target?: [number, number];
    zoom?: number;
    rotationX?: number;
    rotationOrbit?: number;
    isSync?: boolean;
}
export interface ViewsType {
    /**
     * Layout for viewport in specified as [row, column]
     */
    layout: [number, number];
    /**
     * Show views label
     */
    showLabel?: boolean;
    /**
     * Layers configuration for multiple viewport
     */
    viewports: ViewportType[];
}
export interface ViewStateType {
    target: number[];
    zoom: number;
    rotationX: number;
    rotationOrbit: number;
}
export interface DeckGLLayerContext extends LayerContext {
    userData: {
        setEditedData: (data: Record<string, unknown>) => void;
        colorTables: colorTablesArray;
    };
}
export declare type EventCallback = (event: MapMouseEvent) => void;
export interface MapProps {
    /**
     * The ID of this component, used to identify dash components
     * in callbacks. The ID needs to be unique across all of the
     * components in an app.
     */
    id: string;
    /**
     * Resource dictionary made available in the DeckGL specification as an enum.
     * The values can be accessed like this: `"@@#resources.resourceId"`, where
     * `resourceId` is the key in the `resources` dict. For more information,
     * see the DeckGL documentation on enums in the json spec:
     * https://deck.gl/docs/api-reference/json/conversion-reference#enumerations-and-using-the--prefix
     */
    resources?: Record<string, unknown>;
    layers?: LayersList;
    /**
     * Coordinate boundary for the view defined as [left, bottom, right, top].
     */
    bounds?: [number, number, number, number] | BoundsAccessor;
    /**
     * Views configuration for map. If not specified, all the layers will be
     * displayed in a single 2D viewport
     */
    views?: ViewsType;
    /**
     * Parameters for the InfoCard component
     */
    coords?: {
        visible?: boolean | null;
        multiPicking?: boolean | null;
        pickDepth?: number | null;
    };
    /**
     * Parameters for the Distance Scale component
     */
    scale?: {
        visible?: boolean | null;
        incrementValue?: number | null;
        widthPerUnit?: number | null;
        cssStyle?: Record<string, unknown> | null;
    };
    coordinateUnit?: string;
    /**
     * Parameters to control toolbar
     */
    toolbar?: {
        visible?: boolean | null;
    };
    /**
     * Prop containing color table data
     */
    colorTables?: colorTablesArray;
    /**
     * Prop containing edited data from layers
     */
    editedData?: Record<string, unknown>;
    /**
     * For reacting to prop changes
     */
    setEditedData?: (data: Record<string, unknown>) => void;
    /**
     * Validate JSON datafile against schema
     */
    checkDatafileSchema?: boolean;
    /**
     * For get mouse events
     */
    onMouseEvent?: EventCallback;
    getCameraPosition?: (input: ViewStateType) => void;
    /**
     * If changed will reset camera to default position.
     */
    triggerHome?: number;
    triggerResetMultipleWells?: number;
    selection?: {
        well: string | undefined;
        selection: [number | undefined, number | undefined] | undefined;
    };
    children?: React.ReactNode;
    getTooltip?: TooltipCallback;
    cameraPosition?: ViewStateType;
}
export interface MapMouseEvent {
    type: "click" | "hover" | "contextmenu";
    infos: PickingInfo[];
    x?: number;
    y?: number;
    wellname?: string;
    wellcolor?: Color;
    md?: number;
    tvd?: number;
}
export declare function useHoverInfo(): [PickingInfo[], EventCallback];
declare const Map: React.FC<MapProps>;
export default Map;
export declare function jsonToObject(data: Record<string, unknown>[] | LayerProps[], enums?: Record<string, unknown>[] | undefined): LayersList | View[];
