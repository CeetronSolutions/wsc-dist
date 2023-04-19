import { Icon } from "@equinor/eds-core-react";
import { map, well, brush, fault, pie_chart, hill_shading, surface_layer, } from "@equinor/eds-icons";
// (this needs only be done once)
Icon.add({
    map,
    well,
    brush,
    fault,
    pie_chart,
    hill_shading,
    surface_layer,
});
export const DrawModes = [
    { id: "view", displayName: "View" },
    { id: "modify", displayName: "Edit" },
    { id: "drawPoint", displayName: "Create point" },
    { id: "drawLineString", displayName: "Create polyline" },
    { id: "drawPolygon", displayName: "Create polygon" },
];
export const SliderTypeProps = [
    {
        id: "opacity",
        displayName: "Opacity",
        min: 0,
        max: 100,
        step: 1,
    },
];
export const ToggleTypeProps = [
    {
        id: "wellNameVisible",
        displayName: "Well name",
    },
    {
        id: "wellNameAtTop",
        displayName: "Well name at top",
    },
    { id: "logCurves", displayName: "Log curves", dependentOnProp: "logData" },
    {
        id: "isReadoutDepth",
        displayName: "Depth readout",
    },
];
export const MenuTypeProps = [
    { id: "mode", displayName: "Draw mode" },
];
export const NumericTypeProps = [
    {
        id: "lineWidthScale",
        displayName: "Trajectory thickness scale",
        step: 0.1,
    },
    { id: "logRadius", displayName: "Log radius", dependentOnProp: "logData" },
    {
        id: "pointRadiusScale",
        displayName: "Well head radius scale",
        step: 0.1,
    },
    {
        id: "lineWidthMinPixels",
        displayName: "Line thickness",
    },
    {
        id: "wellNameSize",
        displayName: "Well name size",
    },
];
export const LayerIcons = {
    ColormapLayer: "surface_layer",
    Hillshading2DLayer: "hill_shading",
    WellsLayer: "well",
    Map3DLayer: "map",
    PieChartLayer: "pie_chart",
    FaultPolygonsLayer: "fault",
    DrawingLayer: "brush",
    AxesLayer: "brush",
    NorthArrow3D: "brush",
};
//# sourceMappingURL=types.js.map