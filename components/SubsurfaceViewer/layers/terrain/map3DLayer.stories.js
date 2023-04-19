import React from "react";
import { useHoverInfo } from "../../components/Map";
import SubsurfaceViewer from "../../SubsurfaceViewer";
import InfoCard from "../../components/InfoCard";
import { Slider } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { ContinuousLegend } from "@emerson-eps/color-tables";
export default {
    component: SubsurfaceViewer,
    title: "SubsurfaceViewer / Map 3D Delatin mesh Layer",
};
const meshMapLayer = {
    "@@type": "Map3DLayer",
    id: "mesh-layer",
    bounds: [432205, 6475078, 437720, 6481113],
    mesh: "hugin_depth_25_m_normalized_margin.png",
    meshValueRange: [2782, 3513],
    propertyTexture: "kh_netmap_25_m_normalized_margin.png",
    propertyValueRange: [-3071, 41048],
    contours: [0, 50.0],
    isContoursDepth: true,
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
const axes = {
    "@@type": "AxesLayer",
    id: "axes-layer",
    bounds: [432205, 6475078, -3500, 437720, 6481113, 0],
};
const north_arrow_layer = {
    "@@type": "NorthArrow3DLayer",
    id: "north-arrow-layer",
};
export const MapLayer3d = (args) => {
    return React.createElement(SubsurfaceViewer, Object.assign({}, args));
};
MapLayer3d.args = {
    id: "map",
    layers: [axes, meshMapLayer, north_arrow_layer],
    bounds: [432205, 6475078, 437720, 6481113],
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
MapLayer3d.parameters = {
    docs: Object.assign(Object.assign({}, defaultParameters.docs), { description: {
            story: "3d example.",
        } }),
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
export const GradientFunctionColorMap = () => {
    const args = Object.assign(Object.assign({}, defaultArgs), { id: "gradient-color-map", layers: [Object.assign(Object.assign({}, meshMapLayer), { colorMapFunction: gradientColorMap })] });
    return React.createElement(SubsurfaceViewer, Object.assign({}, args));
};
GradientFunctionColorMap.parameters = {
    docs: Object.assign(Object.assign({}, defaultParameters.docs), { description: {
            story: "Example using gradient color mapping function.",
        } }),
};
export const StepFunctionColorMap = () => {
    const args = Object.assign(Object.assign({}, defaultArgs), { id: "nearest-color-map", layers: [Object.assign(Object.assign({}, meshMapLayer), { colorMapFunction: nearestColorMap })] });
    return React.createElement(SubsurfaceViewer, Object.assign({}, args));
};
StepFunctionColorMap.parameters = {
    docs: Object.assign(Object.assign({}, defaultParameters.docs), { description: {
            story: "Example using step color mapping function.",
        } }),
};
export const DefaultColorScale = () => {
    const args = Object.assign(Object.assign({}, defaultArgs), { id: "default-color-scale", layers: [Object.assign({}, meshMapLayer)] });
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
        return Object.assign(Object.assign({}, defaultArgs), { id: "readout", layers: [Object.assign({}, meshMapLayer)], coords: {
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
    const [breakpoint, setBreakpoint] = React.useState(0.5);
    const colorMap = React.useCallback((value) => {
        return createColorMap(breakpoint)(value);
    }, [breakpoint]);
    const props = React.useMemo(() => {
        return Object.assign(Object.assign({}, args), { layers: [
                Object.assign(Object.assign({}, meshMapLayer), { colorMapFunction: colorMap }),
            ], legend: { visible: false } });
    }, [breakpoint]);
    const handleChange = React.useCallback((_event, value) => {
        setBreakpoint(value / 100);
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: useStyles().main },
            React.createElement(SubsurfaceViewer, Object.assign({}, props)),
            React.createElement("div", { className: useStyles().legend },
                React.createElement(ContinuousLegend, { min: meshMapLayer.propertyValueRange[0], max: meshMapLayer.propertyValueRange[1] }))),
        React.createElement(Slider, { min: 0, max: 100, defaultValue: 50, step: 1, onChange: handleChange })));
};
BreakpointColorMap.args = Object.assign(Object.assign({}, defaultArgs), { id: "breakpoint-color-map" });
BreakpointColorMap.parameters = {
    docs: Object.assign(Object.assign({}, defaultParameters.docs), { description: {
            story: "Example using a color scale with a breakpoint.",
        } }),
};
export const ColorMapRange = (args) => {
    const [colorMapUpper, setColorMapUpper] = React.useState(41048);
    const props = React.useMemo(() => {
        return Object.assign(Object.assign({}, args), { layers: [
                Object.assign(Object.assign({}, meshMapLayer), { colorMapName: "Seismic", colorMapRange: [-3071, colorMapUpper], colorMapClampColor: false }),
            ], legend: { visible: true } });
    }, [colorMapUpper]);
    const handleChange = React.useCallback((_event, value) => {
        setColorMapUpper(value);
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: useStyles().main },
            React.createElement(SubsurfaceViewer, Object.assign({}, props))),
        React.createElement(Slider, { min: 10000, max: 41048, defaultValue: 41048, step: 1, onChange: handleChange })));
};
ColorMapRange.args = Object.assign(Object.assign({}, defaultArgs), { id: "breakpoint-color-map" });
ColorMapRange.parameters = {
    docs: Object.assign(Object.assign({}, defaultParameters.docs), { description: {
            story: 'Example changin the colorcamp range ("ColorMapRange" property).',
        } }),
};
//# sourceMappingURL=map3DLayer.stories.js.map