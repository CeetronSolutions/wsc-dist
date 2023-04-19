import React from "react";
import { useHoverInfo } from "../../components/Map";
import SubsurfaceViewer from "../../SubsurfaceViewer";
import InfoCard from "../../components/InfoCard";
import { Slider } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { ContinuousLegend, ColorLegend, createColorMapFunction, } from "@emerson-eps/color-tables";
import { View } from "../../../..";
import MapLayer from "./mapLayer";
import { ViewFooter } from "../../components/ViewFooter";
export default {
    component: SubsurfaceViewer,
    title: "SubsurfaceViewer / Map Layer",
};
const valueRange = [-3071, 41048];
const defaultMapLayerProps = {
    id: "default_map",
    meshData: "hugin_depth_25_m.float32",
    frame: {
        origin: [432150, 6475800],
        count: [291, 229],
        increment: [25, 25],
        rotDeg: 0,
    },
    propertiesData: "kh_netmap_25_m.float32",
};
const defaultMapLayer = new MapLayer(Object.assign({}, defaultMapLayerProps));
const wellsLayer = {
    "@@type": "WellsLayer",
    id: "wells-layer",
    data: "https://raw.githubusercontent.com/equinor/webviz-subsurface-components/master/react/src/demo/example-data/volve_wells.json",
    logData: "https://raw.githubusercontent.com/equinor/webviz-subsurface-components/master/react/src/demo/example-data/volve_logs.json",
    logrunName: "BLOCKING",
    logName: "ZONELOG",
    logColor: "Stratigraphy",
};
// Example using "Map" layer. Uses float32 mesh and properties binary arrays. Not PNG.
const meshMapLayerBig = {
    "@@type": "MapLayer",
    id: "mesh-layer",
    meshUrl: "hugin_depth_5_m.float32",
    frame: {
        origin: [432150, 6475800],
        count: [1451, 1141],
        increment: [5, 5],
        rotDeg: 0,
    },
    propertiesUrl: "kh_netmap_5_m.float32",
    contours: [0, 100],
    isContoursDepth: true,
    gridLines: false,
    material: true,
    colorMapName: "Physics",
};
// Small test map. 4 by 5 cells. One inactive node => 4 inactive cells.
// property values and depth values both from 0 to 29.
// Useful for debugging.
const smallLayer = {
    "@@type": "MapLayer",
    id: "mesh-layer",
    meshUrl: "small_depths.float32",
    frame: {
        origin: [459840.7, 5929826.1],
        count: [5, 6],
        increment: [175, 150],
        rotDeg: 0,
    },
    propertiesUrl: "small_properties.float32",
    gridLines: true,
    material: false,
    // black to white colors.
    colorMapFunction: (value) => [
        value * 255,
        value * 255,
        value * 255,
    ],
    colorMapRange: [0, 29],
    colorMapClampColor: [255, 0, 0],
};
// This layer has as many property values as depth values hence each cell will be interpolated in color.
const nodeCenteredPropertiesLayer = {
    "@@type": "MapLayer",
    id: "node-centered-layer",
    meshUrl: "data:text/plain;base64,zczMP5qZ2T9mZuY/MzPzP5qZmT9mZqY/MzOzPwAAwD/NzEw/ZmZmPwAAgD/NzIw/zczMPgAAAD+amRk/MzMzPwAAAIDNzMw9zcxMPpqZmT4=",
    frame: {
        origin: [0, 0],
        count: [4, 5],
        increment: [1, 1],
        rotDeg: 0,
    },
    propertiesUrl: "data:text/plain;base64,ZmYmQM3MLEAzMzNAmpk5QM3MDEAzMxNAmpkZQAAAIEBmZuY/MzPzPwAAAEBmZgZAMzOzPwAAwD/NzMw/mpnZPwAAgD/NzIw/mpmZP2Zmpj8=",
    gridLines: true,
    material: true,
    // black to white colors.
    colorMapFunction: (value) => [
        value * 255,
        value * 255,
        value * 255,
    ],
};
const nodeCenteredPropertiesLayerWithArrayInput = {
    "@@type": "MapLayer",
    id: "node-centered-layer",
    frame: {
        origin: [0, 0],
        count: [4, 5],
        increment: [1, 1],
        rotDeg: 0,
    },
    meshData: Array.from(Array(20)).map(() => Math.random()),
    propertiesData: Array.from(Array(20)).map(() => Math.random()),
    gridLines: true,
    material: true,
    // black to white colors.
    colorMapFunction: (value) => [
        value * 255,
        value * 255,
        value * 255,
    ],
};
// This layer has as (nx-1)*(ny-1) property values and depth values are nx*ny hence each cell will be fixed in color.
const cellCenteredPropertiesLayer = {
    "@@type": "MapLayer",
    id: "cell-centered-layer",
    /*eslint-disable */
    // One depth pr node
    meshData: [
        1.6, 1.7, 1.8, 1.9,
        1.2, 1.3, 1.4, 1.5,
        0.8, 0.9, 1.0, 1.1,
        0.4, 0.5, 0.6, 0.7,
        0.0, 0.1, 0.2, 0.3
    ],
    // One property pr cell.
    propertiesData: [0.9, 1.0, 1.1,
        0.6, 0.7, 0.8,
        0.3, 0.4, 0.5,
        0.0, 0.1, 0.2],
    /*eslint-enable */
    frame: {
        origin: [0, 0],
        count: [4, 5],
        increment: [1, 1],
        rotDeg: 0,
    },
    gridLines: true,
    material: true,
    // black to white colors.
    colorMapFunction: (value) => [
        value * 255,
        value * 255,
        value * 255,
    ],
    smoothShading: true,
};
// Example using "Map" layer. Uses PNG float for mesh and properties.
const meshMapLayerPng = {
    "@@type": "MapLayer",
    id: "mesh-layer",
    meshUrl: "hugin_depth_25_m.png",
    frame: {
        origin: [432150, 6475800],
        count: [291, 229],
        increment: [25, 25],
        rotDeg: 0,
    },
    propertiesUrl: "kh_netmap_25_m.png",
    contours: [0, 100],
    isContoursDepth: true,
    gridLines: false,
    material: true,
    smoothShading: true,
    colorMapName: "Physics",
};
// Example using "Map" layer. Uses float32 float for mesh and properties.
const meshMapLayerFloat32 = {
    "@@type": "MapLayer",
    id: "mesh-layer",
    meshUrl: "hugin_depth_25_m.float32",
    frame: {
        origin: [432150, 6475800],
        count: [291, 229],
        increment: [25, 25],
        rotDeg: 0,
    },
    propertiesUrl: "kh_netmap_25_m.float32",
    contours: [0, 100],
    isContoursDepth: true,
    gridLines: false,
    material: false,
    colorMapName: "Physics",
};
// Example rotated layer
const meshMapLayerRotated = {
    "@@type": "MapLayer",
    id: "mesh-layer",
    meshUrl: "hugin_depth_25_m.float32",
    frame: {
        origin: [432150, 6475800],
        count: [291, 229],
        increment: [25, 25],
        rotDeg: 30,
        //rotPoint: [436000, 6478000],
    },
    propertiesUrl: "kh_netmap_25_m.float32",
    contours: [0, 100],
    isContoursDepth: true,
    material: false,
    colorMapName: "Physics",
};
const axes_hugin = {
    "@@type": "AxesLayer",
    id: "axes-layer2",
    bounds: [432150, 6475800, -3500, 439400, 6481500, 0],
};
const north_arrow_layer = {
    "@@type": "NorthArrow3DLayer",
    id: "north-arrow-layer",
};
const defaultArgs = {
    bounds: [432150, 6475800, 439400, 6481500],
};
const defaultParameters = {
    docs: {
        inlineStories: false,
        iframeHeight: 500,
    },
};
function gradientColorMap(x) {
    return [255 - x * 255, 255 - x * 100, 255 * x];
}
function nearestColorMap(x) {
    if (x > 0.5)
        return [100, 255, 255];
    else if (x > 0.1)
        return [255, 100, 255];
    return [255, 255, 100];
}
function breakpointColorMap(x, breakpoint) {
    if (x > breakpoint)
        return [0, 50, 200];
    return [255, 255, 0];
}
function createColorMap(breakpoint) {
    return (value) => breakpointColorMap(value, breakpoint);
}
export const MapLayer3dPng = (args) => {
    return React.createElement(SubsurfaceViewer, Object.assign({}, args));
};
MapLayer3dPng.args = {
    id: "map",
    layers: [axes_hugin, meshMapLayerPng, north_arrow_layer],
    bounds: [432150, 6475800, 439400, 6481500],
    views: {
        layout: [1, 1],
        viewports: [
            {
                id: "view_1",
                show3D: true,
            },
        ],
    },
};
MapLayer3dPng.parameters = {
    docs: Object.assign(Object.assign({}, defaultParameters.docs), { description: {
            story: "Example using png as mesh and properties data.",
        } }),
};
export const ConstantColor = (args) => {
    return React.createElement(SubsurfaceViewer, Object.assign({}, args));
};
ConstantColor.args = {
    id: "map",
    layers: [
        axes_hugin,
        Object.assign(Object.assign({}, meshMapLayerPng), { colorMapFunction: [0, 255, 0] }),
        north_arrow_layer,
    ],
    bounds: [432150, 6475800, 439400, 6481500],
    views: {
        layout: [1, 1],
        viewports: [
            {
                id: "view_1",
                show3D: true,
            },
        ],
    },
};
ConstantColor.parameters = {
    docs: Object.assign(Object.assign({}, defaultParameters.docs), { description: {
            story: 'Example using the property "colorMapFunction" to color the surface in one color only',
        } }),
};
export const ScaleZ = (args) => {
    const [layers, setLayers] = React.useState([
        axes_hugin,
        meshMapLayerPng,
        north_arrow_layer,
    ]);
    const handleChange = () => {
        setLayers([axes_hugin, meshMapLayerPng, wellsLayer, north_arrow_layer]);
    };
    const props = Object.assign(Object.assign({}, args), { layers });
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: useStyles().main },
            React.createElement(SubsurfaceViewer, Object.assign({}, props))),
        React.createElement("button", { onClick: handleChange }, " Add layer ")));
};
ScaleZ.args = {
    id: "ScaleZ",
    layers: [axes_hugin, meshMapLayerPng, north_arrow_layer],
    bounds: [432150, 6475800, 439400, 6481500],
    views: {
        layout: [1, 2],
        viewports: [
            {
                id: "view_1",
                layerIds: ["axes-layer2", "mesh-layer", "north-arrow-layer"],
                show3D: true,
                isSync: true,
            },
            {
                id: "view_2",
                layerIds: ["axes-layer2", "wells-layer", "north-arrow-layer"],
                show3D: true,
                isSync: true,
            },
        ],
    },
};
ScaleZ.parameters = {
    docs: Object.assign(Object.assign({}, defaultParameters.docs), { description: {
            story: "Example scaling in z direction using arrow up/down buttons.",
        } }),
};
export const ResetCameraProperty = (args) => {
    const [home, setHome] = React.useState(0);
    const [camera, setCamera] = React.useState({
        rotationOrbit: 0,
        rotationX: 89,
        target: [435775, 6478650, -1750],
        zoom: -3.5109619192773796,
    });
    const handleChange1 = () => {
        setHome(home + 1);
    };
    const handleChange2 = () => {
        setCamera(Object.assign(Object.assign({}, camera), { rotationOrbit: camera.rotationOrbit + 5 }));
    };
    const props = Object.assign(Object.assign({}, args), { cameraPosition: camera, triggerHome: home });
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: useStyles().main },
            React.createElement(SubsurfaceViewer, Object.assign({}, props))),
        React.createElement("button", { onClick: handleChange1 }, " Reset Camera "),
        React.createElement("button", { onClick: handleChange2 }, " Change Camera ")));
};
ResetCameraProperty.args = {
    id: "ResetCameraProperty",
    layers: [axes_hugin, meshMapLayerPng, north_arrow_layer],
    bounds: [432150, 6475800, 439400, 6481500],
    cameraPosition: {
        rotationOrbit: 0,
        rotationX: 80,
        target: [435775, 6478650, -1750],
        zoom: -3.5109619192773796,
    },
    views: {
        layout: [1, 1],
        viewports: [
            {
                id: "view_1",
                show3D: true,
            },
        ],
    },
};
ResetCameraProperty.parameters = {
    docs: Object.assign(Object.assign({}, defaultParameters.docs), { description: {
            story: `Example using optional 'triggerHome' property.
                    When this property is changed camera will reset to home position.
                    Using the button the property will change its value.`,
        } }),
};
export const AddLayer = (args) => {
    const [layers, setLayers] = React.useState([
        axes_hugin,
        meshMapLayerPng,
        north_arrow_layer,
    ]);
    const handleChange = () => {
        setLayers([axes_hugin, meshMapLayerPng, wellsLayer, north_arrow_layer]);
    };
    const props = Object.assign(Object.assign({}, args), { layers });
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: useStyles().main },
            React.createElement(SubsurfaceViewer, Object.assign({}, props))),
        React.createElement("button", { onClick: handleChange }, " Add layer ")));
};
AddLayer.args = {
    id: "map",
    bounds: [432150, 6475800, 439400, 6481500],
    views: {
        layout: [1, 1],
        viewports: [
            {
                id: "view_1",
                show3D: true,
            },
        ],
    },
};
AddLayer.parameters = {
    docs: Object.assign(Object.assign({}, defaultParameters.docs), { description: {
            story: `Example using button to add a layer.`,
        } }),
};
export const MapLayer2d = (args) => {
    return React.createElement(SubsurfaceViewer, Object.assign({}, args));
};
MapLayer2d.args = {
    id: "map",
    layers: [
        axes_hugin,
        Object.assign(Object.assign({}, meshMapLayerFloat32), { material: true }),
        north_arrow_layer,
    ],
    bounds: [432150, 6475800, 439400, 6481500],
    views: {
        layout: [1, 1],
        viewports: [
            {
                id: "view_1",
                show3D: false,
            },
        ],
    },
};
MapLayer2d.parameters = {
    docs: Object.assign(Object.assign({}, defaultParameters.docs), { description: {
            story: "Example using png as mesh and properties data.",
        } }),
};
export const MapLayer2dDarkMode = (args) => {
    return React.createElement(SubsurfaceViewer, Object.assign({}, args));
};
const white = [255, 255, 255, 255];
MapLayer2dDarkMode.args = {
    id: "map",
    layers: [
        Object.assign(Object.assign({}, axes_hugin), { labelColor: white, axisColor: white }),
        Object.assign(Object.assign({}, meshMapLayerFloat32), { material: false, gridLines: false }),
        Object.assign(Object.assign({}, north_arrow_layer), { color: white }),
    ],
    bounds: [432150, 6475800, 439400, 6481500],
    scale: {
        visible: true,
        cssStyle: { color: "white" },
    },
    views: {
        layout: [1, 1],
        viewports: [
            {
                id: "view_1",
                show3D: false,
            },
        ],
    },
};
MapLayer2dDarkMode.parameters = {
    docs: Object.assign(Object.assign({}, defaultParameters.docs), { description: {
            story: "Example using png as mesh and properties data.",
        } }),
    backgrounds: { default: "dark" },
};
export const Rotated = (args) => {
    return React.createElement(SubsurfaceViewer, Object.assign({}, args));
};
Rotated.args = {
    id: "map",
    layers: [axes_hugin, meshMapLayerRotated, north_arrow_layer],
    bounds: [432150, 6475800, 439400, 6481500],
    views: {
        layout: [1, 1],
        viewports: [
            {
                id: "view_1",
                show3D: false,
            },
        ],
    },
};
Rotated.parameters = {
    docs: Object.assign(Object.assign({}, defaultParameters.docs), { description: {
            story: "Example using png as mesh and properties data.",
        } }),
};
export const BigMap = (args) => {
    return React.createElement(SubsurfaceViewer, Object.assign({}, args));
};
BigMap.args = {
    id: "map",
    layers: [axes_hugin, meshMapLayerBig, north_arrow_layer],
    bounds: [432150, 6475800, 439400, 6481500],
};
export const BigMap3d = (args) => {
    return React.createElement(SubsurfaceViewer, Object.assign({}, args));
};
BigMap3d.args = {
    id: "map",
    layers: [axes_hugin, meshMapLayerBig, north_arrow_layer],
    bounds: [432150, 6475800, 439400, 6481500],
    views: {
        layout: [1, 1],
        viewports: [
            {
                id: "view_1",
                show3D: true,
            },
        ],
    },
};
BigMap3d.parameters = {
    docs: Object.assign(Object.assign({}, defaultParameters.docs), { description: {
            story: "Example using large map with approx. 1400x1400 cells.",
        } }),
};
const axes_small = {
    "@@type": "AxesLayer",
    id: "axes_small",
    bounds: [459790, 5929776, -30, 460590, 5930626, 0],
};
export const SmallMap = (args) => {
    return React.createElement(SubsurfaceViewer, Object.assign({}, args));
};
SmallMap.args = {
    id: "map",
    layers: [axes_small, smallLayer, north_arrow_layer],
    bounds: [459840.7, 5929826.1, 460540.7, 5930576.1],
    views: {
        layout: [1, 1],
        viewports: [
            {
                id: "view_1",
                show3D: true,
            },
        ],
    },
};
SmallMap.parameters = {
    docs: Object.assign(Object.assign({}, defaultParameters.docs), { description: {
            story: "4x5 cells.",
        } }),
};
const axes_lite = {
    "@@type": "AxesLayer",
    id: "axes_small",
    bounds: [-1, -1, -3, 4, 5, 0],
};
//-- CellCenteredPropMap --
export const CellCenteredPropMap = (args) => {
    return React.createElement(SubsurfaceViewer, Object.assign({}, args));
};
CellCenteredPropMap.args = {
    id: "map",
    layers: [axes_lite, cellCenteredPropertiesLayer, north_arrow_layer],
    bounds: [-1, -1, 4, 5],
    views: {
        layout: [1, 1],
        viewports: [
            {
                id: "view_1",
                show3D: true,
            },
        ],
    },
};
CellCenteredPropMap.parameters = {
    docs: Object.assign(Object.assign({}, defaultParameters.docs), { description: {
            story: "A small map with properties given at cell centers. Each cell will be constant colored",
        } }),
};
//-- NodeCenteredPropMap --
export const NodeCenteredPropMap = (args) => {
    return React.createElement(SubsurfaceViewer, Object.assign({}, args));
};
NodeCenteredPropMap.args = {
    id: "map",
    layers: [axes_lite, nodeCenteredPropertiesLayer, north_arrow_layer],
    bounds: [-1, -1, 4, 5],
    views: {
        layout: [1, 1],
        viewports: [
            {
                id: "view_1",
                show3D: true,
            },
        ],
    },
};
NodeCenteredPropMap.parameters = {
    docs: Object.assign(Object.assign({}, defaultParameters.docs), { description: {
            story: "A small map with properties given at nodes. Each cell will be interpolated in color.",
        } }),
};
//-- NodeCenteredPropMap  with native javascript arrays as input --
export const NodeCenteredPropMapWithArrayInput = (args) => {
    return React.createElement(SubsurfaceViewer, Object.assign({}, args));
};
NodeCenteredPropMapWithArrayInput.args = {
    id: "map",
    layers: [
        axes_lite,
        nodeCenteredPropertiesLayerWithArrayInput,
        north_arrow_layer,
    ],
    bounds: [-1, -1, 4, 5],
    views: {
        layout: [1, 1],
        viewports: [
            {
                id: "view_1",
                show3D: true,
            },
        ],
    },
};
NodeCenteredPropMapWithArrayInput.parameters = {
    docs: Object.assign(Object.assign({}, defaultParameters.docs), { description: {
            story: "Both mesh and property data given as native javascript arrays (as opposed to URL).",
        } }),
};
export const GradientFunctionColorMap = () => {
    const args = Object.assign(Object.assign({}, defaultArgs), { id: "gradient-color-map", layers: [
            Object.assign(Object.assign({}, meshMapLayerFloat32), { colorMapFunction: gradientColorMap }),
        ] });
    return React.createElement(SubsurfaceViewer, Object.assign({}, args));
};
GradientFunctionColorMap.parameters = {
    docs: Object.assign(Object.assign({}, defaultParameters.docs), { description: {
            story: "Example using gradient color mapping function.",
        } }),
};
export const StepFunctionColorMap = () => {
    const args = Object.assign(Object.assign({}, defaultArgs), { id: "nearest-color-map", layers: [
            Object.assign(Object.assign({}, meshMapLayerFloat32), { material: true, colorMapFunction: nearestColorMap }),
        ] });
    return React.createElement(SubsurfaceViewer, Object.assign({}, args));
};
StepFunctionColorMap.parameters = {
    docs: Object.assign(Object.assign({}, defaultParameters.docs), { description: {
            story: "Example using step color mapping function.",
        } }),
};
export const DefaultColorScale = () => {
    const args = Object.assign(Object.assign({}, defaultArgs), { id: "default-color-scale", layers: [Object.assign({}, meshMapLayerFloat32)] });
    return React.createElement(SubsurfaceViewer, Object.assign({}, args));
};
DefaultColorScale.parameters = {
    docs: Object.assign(Object.assign({}, defaultParameters.docs), { description: {
            story: "Default color scale.",
        } }),
};
export const Readout = () => {
    const [hoverInfo, hoverCallback] = useHoverInfo();
    const args = React.useMemo(() => {
        return Object.assign(Object.assign({}, defaultArgs), { id: "readout", layers: [Object.assign({}, meshMapLayerFloat32)], coords: {
                visible: false,
            }, onMouseEvent: hoverCallback });
    }, [hoverCallback]);
    return (React.createElement(React.Fragment, null,
        React.createElement(SubsurfaceViewer, Object.assign({}, args)),
        hoverInfo && React.createElement(InfoCard, { pickInfos: hoverInfo })));
};
Readout.parameters = {
    docs: Object.assign(Object.assign({}, defaultParameters.docs), { description: {
            story: "Readout example.",
        } }),
};
export const BigMapWithHole = () => {
    const [hoverInfo, hoverCallback] = useHoverInfo();
    const args = React.useMemo(() => {
        return Object.assign(Object.assign({}, defaultArgs), { id: "readout", layers: [
                Object.assign(Object.assign({}, meshMapLayerBig), { meshUrl: "hugin_depth_5_m_w_hole.float32", gridLines: false, material: false }),
            ], coords: {
                visible: false,
            }, onMouseEvent: hoverCallback });
    }, [hoverCallback]);
    return (React.createElement(React.Fragment, null,
        React.createElement(SubsurfaceViewer, Object.assign({}, args)),
        hoverInfo && React.createElement(InfoCard, { pickInfos: hoverInfo })));
};
BigMapWithHole.parameters = {
    docs: Object.assign(Object.assign({}, defaultParameters.docs), { description: {
            story: "Example of map with a hole.",
        } }),
};
const useStyles = makeStyles({
    main: {
        height: 500,
        border: "1px solid black",
        position: "relative",
    },
    legend: {
        width: 100,
        position: "absolute",
        top: "0",
        right: "0",
    },
});
export const BreakpointColorMap = (args) => {
    var _a;
    const [breakpoint, setBreakpoint] = React.useState(0.5);
    const colorMap = React.useCallback((value) => {
        return createColorMap(breakpoint)(value);
    }, [breakpoint]);
    const layer = Object.assign(Object.assign({}, (_a = args === null || args === void 0 ? void 0 : args.layers) === null || _a === void 0 ? void 0 : _a[0]), { colorMapFunction: colorMap });
    const props = Object.assign(Object.assign({}, args), { layers: [layer] });
    const handleChange = React.useCallback((_event, value) => {
        setBreakpoint(value / 100);
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: useStyles().main },
            React.createElement(SubsurfaceViewer, Object.assign({}, props)),
            React.createElement("div", { className: useStyles().legend },
                React.createElement(ContinuousLegend, { min: valueRange[0], max: valueRange[1], colorMapFunction: colorMap }))),
        React.createElement(Slider, { min: 0, max: 100, defaultValue: 50, step: 1, onChangeCommitted: handleChange })));
};
BreakpointColorMap.args = Object.assign(Object.assign({}, defaultArgs), { id: "breakpoint-color-map", layers: [
        Object.assign(Object.assign({}, meshMapLayerFloat32), { gridLines: false, material: true }),
    ] });
BreakpointColorMap.parameters = {
    docs: Object.assign(Object.assign({}, defaultParameters.docs), { description: {
            story: "Example using a color scale with a breakpoint.",
        } }),
};
export const ColorMapRange = (args) => {
    var _a;
    const [colorMapUpper, setColorMapUpper] = React.useState(41048);
    const layer = Object.assign(Object.assign({}, (_a = args === null || args === void 0 ? void 0 : args.layers) === null || _a === void 0 ? void 0 : _a[0]), { colorMapRange: [-3071, colorMapUpper] });
    const props = Object.assign(Object.assign({}, args), { layers: [layer] });
    const handleChange = React.useCallback((_event, value) => {
        setColorMapUpper(value);
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: useStyles().main },
            React.createElement(SubsurfaceViewer, Object.assign({}, props))),
        React.createElement(Slider, { min: 10000, max: 41048, defaultValue: 41048, step: 1000, onChange: handleChange })));
};
ColorMapRange.args = Object.assign(Object.assign({}, defaultArgs), { id: "breakpoint-color-map", layers: [
        Object.assign(Object.assign({}, meshMapLayerFloat32), { colorMapName: "Seismic", colorMapClampColor: false, gridLines: false, material: true }),
    ] });
ColorMapRange.parameters = {
    docs: Object.assign(Object.assign({}, defaultParameters.docs), { description: {
            story: 'Example changing the "ColorMapRange" property using a slider.',
        } }),
};
// Map layer with color colorselector
const MapLayerColorSelectorTemplate = (args) => {
    const [colorName, setColorName] = React.useState("Rainbow");
    const [colorRange, setRange] = React.useState();
    const [isAuto, setAuto] = React.useState();
    const [breakPoints, setBreakPoint] = React.useState();
    const [isLog, setIsLog] = React.useState(false);
    const [isNearest, setIsNearest] = React.useState(false);
    // user defined breakpoint(domain)
    const userDefinedBreakPoint = React.useCallback((data) => {
        if (data)
            setBreakPoint(data.colorArray);
    }, []);
    // Get color name from color selector
    const colorNameFromSelector = React.useCallback((data) => {
        setColorName(data);
    }, []);
    // user defined range
    const userDefinedRange = React.useCallback((data) => {
        if (data.range)
            setRange(data.range);
        setAuto(data.isAuto);
    }, []);
    // Get interpolation method from color selector to layer
    const getInterpolateMethod = React.useCallback((data) => {
        setIsLog(data.isLog);
        setIsNearest(data.isNearest);
    }, []);
    // color map function
    const colorMapFunc = React.useCallback(() => {
        return createColorMapFunction(colorName, isLog, isNearest, breakPoints);
    }, [colorName, isLog, isNearest, breakPoints]);
    const min = 100;
    const max = 1000;
    const updatedLayerData = [
        Object.assign(Object.assign({}, meshMapLayerFloat32), { colorMapName: colorName, colorMapRange: colorRange && isAuto == false ? colorRange : [min, max], colorMapFunction: colorMapFunc() }),
    ];
    return (React.createElement(SubsurfaceViewer, Object.assign({}, args, { layers: updatedLayerData }), React.createElement(View, { id: "view_1" },
        React.createElement("div", { style: { marginTop: 50 } },
            React.createElement(ColorLegend, { min: min, max: max, colorNameFromSelector: colorNameFromSelector, getColorRange: userDefinedRange, getInterpolateMethod: getInterpolateMethod, getBreakpointValue: userDefinedBreakPoint, horizontal: true, numberOfTicks: 2 })))));
};
export const ColorSelector = MapLayerColorSelectorTemplate.bind({});
ColorSelector.args = Object.assign(Object.assign({}, defaultArgs), { id: "map_layer_color_selector", legend: {
        visible: true,
    }, layers: [Object.assign({}, meshMapLayerFloat32)], views: {
        layout: [1, 1],
        showLabel: true,
        viewports: [
            {
                id: "view_1",
                zoom: -4,
            },
        ],
    } });
const ContourLinesStory = (props) => {
    const views = {
        layout: [2, 2],
        viewports: [
            {
                id: "view_1",
                show3D: props.show3d,
                layerIds: ["default_map"],
                isSync: props.syncViewports,
            },
            {
                id: "view_2",
                show3D: props.show3d,
                layerIds: ["contours"],
                isSync: props.syncViewports,
            },
            {
                id: "view_3",
                show3D: props.show3d,
                layerIds: ["property_contours"],
                isSync: props.syncViewports,
            },
            {
                id: "view_4",
                show3D: props.show3d,
                layerIds: ["flat"],
                isSync: props.syncViewports,
            },
        ],
    };
    const contourMapLayer = new MapLayer(Object.assign(Object.assign({}, defaultMapLayerProps), { id: "contours", contours: [props.contourOffset, props.zContourInterval] }));
    const propertyContourMapLayer = new MapLayer(Object.assign(Object.assign({}, defaultMapLayerProps), { id: "property_contours", contours: [props.contourOffset, props.propertyContourInterval], isContoursDepth: false }));
    const flatMapLayerProps = Object.assign(Object.assign({}, defaultMapLayerProps), { id: "flat", meshData: undefined, contours: [props.contourOffset, props.propertyContourInterval] });
    const flatPropertyContourMapLayer = new MapLayer(Object.assign({}, flatMapLayerProps));
    return (React.createElement(SubsurfaceViewer, { id: "test", layers: [
            defaultMapLayer,
            contourMapLayer,
            propertyContourMapLayer,
            flatPropertyContourMapLayer,
        ], views: views },
        React.createElement(View, { id: "view_1" },
            React.createElement(ViewFooter, null, "Default - no contour lines")),
        React.createElement(View, { id: "view_2" },
            React.createElement(ViewFooter, null, "Contour lines enabled - default is Z value")),
        React.createElement(View, { id: "view_3" },
            React.createElement(ViewFooter, null, "Contour lines on property value")),
        React.createElement(View, { id: "view_4" },
            React.createElement(ViewFooter, null, "Contour lines on flat map - default is property value"))));
};
export const ContourLines = (args) => {
    return React.createElement(ContourLinesStory, Object.assign({}, args));
};
ContourLines.args = {
    syncViewports: true,
    show3d: true,
    contourOffset: 0,
    zContourInterval: 100,
    propertyContourInterval: 5000,
};
//# sourceMappingURL=mapLayer.stories.js.map