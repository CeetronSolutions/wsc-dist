export declare type DrawMode = "view" | "modify" | "drawPoint" | "drawLineString" | "drawPolygon";
export declare const DrawModes: readonly [{
    readonly id: "view";
    readonly displayName: "View";
}, {
    readonly id: "modify";
    readonly displayName: "Edit";
}, {
    readonly id: "drawPoint";
    readonly displayName: "Create point";
}, {
    readonly id: "drawLineString";
    readonly displayName: "Create polyline";
}, {
    readonly id: "drawPolygon";
    readonly displayName: "Create polygon";
}];
export declare type ToolPropType = {
    id: string;
    displayName: string;
    dependentOnProp?: string;
};
export declare type NumberType = ToolPropType & {
    min?: number;
    max?: number;
    step?: number;
};
export declare const SliderTypeProps: NumberType[];
export declare const ToggleTypeProps: ToolPropType[];
export declare const MenuTypeProps: ToolPropType[];
export declare const NumericTypeProps: NumberType[];
export declare const LayerIcons: {
    ColormapLayer: string;
    Hillshading2DLayer: string;
    WellsLayer: string;
    Map3DLayer: string;
    PieChartLayer: string;
    FaultPolygonsLayer: string;
    DrawingLayer: string;
    AxesLayer: string;
    NorthArrow3D: string;
};
export declare type LayerType = keyof typeof LayerIcons;
