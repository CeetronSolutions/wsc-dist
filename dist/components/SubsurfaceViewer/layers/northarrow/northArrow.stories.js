import React from "react";
import SubsurfaceViewer from "../../SubsurfaceViewer";
export default {
    component: SubsurfaceViewer,
    title: "SubsurfaceViewer / North Arrow Layer",
};
const white = [255, 255, 255, 255];
const axes = {
    "@@type": "AxesLayer",
    id: "axes-layer2",
    bounds: [434150, 6476800, -100, 437400, 6480500, 100],
};
const north_arrow_layer = {
    "@@type": "NorthArrow3DLayer",
    id: "north-arrow-layer",
};
const defaultParameters = {
    docs: {
        inlineStories: false,
        iframeHeight: 500,
    },
};
const defaultArgs = {
    id: "map",
    bounds: [432150, 6475800, 439400, 6481500],
    layers: [axes, north_arrow_layer],
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
export const NorthArrow3d = (args) => {
    return React.createElement(SubsurfaceViewer, Object.assign({}, args));
};
NorthArrow3d.args = Object.assign(Object.assign({}, defaultArgs), { views: {
        layout: [1, 1],
        viewports: [
            {
                id: "view_1",
                show3D: true,
            },
        ],
    } });
NorthArrow3d.parameters = {
    docs: Object.assign(Object.assign({}, defaultParameters.docs), { description: {
            story: "Example using north arrow in 3D.",
        } }),
};
export const NorthArrow2dDarkMode = (args) => {
    return React.createElement(SubsurfaceViewer, Object.assign({}, args));
};
NorthArrow2dDarkMode.args = Object.assign(Object.assign({}, defaultArgs), { layers: [
        Object.assign(Object.assign({}, axes), { labelColor: white, axisColor: white }),
        Object.assign(Object.assign({}, north_arrow_layer), { color: white }),
    ], views: {
        layout: [1, 1],
        viewports: [
            {
                id: "view_1",
                show3D: false,
            },
        ],
    }, scale: {
        visible: true,
        cssStyle: { color: "white" },
    } });
NorthArrow2dDarkMode.parameters = {
    docs: Object.assign(Object.assign({}, defaultParameters.docs), { description: {
            story: "Example using north arrow in 2D Dark Mode.",
        } }),
    backgrounds: { default: "dark" },
};
//# sourceMappingURL=northArrow.stories.js.map