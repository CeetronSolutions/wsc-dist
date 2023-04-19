import React from "react";
import SubsurfaceViewer from "../../SubsurfaceViewer";
export default {
    component: SubsurfaceViewer,
    title: "SubsurfaceViewer / Triangle Layer",
};
const defaultParameters = {
    docs: {
        inlineStories: false,
        iframeHeight: 500,
    },
};
const northArrowLayer = {
    "@@type": "NorthArrow3DLayer",
    id: "north-arrow-layer",
};
// Small example using triangleLayer.
const triangleLayer = {
    "@@type": "TriangleLayer",
    id: "triangle-layer",
    /*eslint-disable */
    pointsData: [0, 0, 5,
        10, 0, 5,
        10, 10, 5,
        0, 10, 0,
        5, -5, 10,
        11, -4, 6,
        11, 0, 7,
        17, 0, 8
    ],
    triangleData: [2, 1, 0,
        3, 2, 0,
        1, 4, 0,
        6, 7, 5],
    color: [100, 100, 255],
    gridLines: true,
    material: true,
    smoothShading: true, // If true will use vertex calculated mean normals for shading.
    //contours: [0, 1],          // If used will display contour lines.
    /*eslint-enable */
};
const axesLayer = {
    "@@type": "AxesLayer",
    id: "axes_small",
    bounds: [-10, -10, -10, 20, 10, 0],
};
export const SmallTriangleLayer = (args) => {
    return React.createElement(SubsurfaceViewer, Object.assign({}, args));
};
SmallTriangleLayer.args = {
    id: "map",
    layers: [axesLayer, triangleLayer, northArrowLayer],
    bounds: [-10, -10, 17, 10],
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
SmallTriangleLayer.parameters = {
    docs: Object.assign(Object.assign({}, defaultParameters.docs), { description: {
            story: "Both mesh and property data given as native javascript arrays (as opposed to URL).",
        } }),
};
//# sourceMappingURL=triangleLayer.stories.js.map