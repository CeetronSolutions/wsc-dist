import React from "react";
import SubsurfaceViewer from "../../SubsurfaceViewer";
export default {
    component: SubsurfaceViewer,
    title: "SubsurfaceViewer / Axes2D",
};
const layerProps = {
    marginH: 100,
    marginV: 40, // Vertical margin (in pixels)
};
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
const axes2D = Object.assign({ "@@type": "Axes2DLayer", id: "axes-layer2D" }, layerProps);
export const Base = (args) => {
    return React.createElement(SubsurfaceViewer, Object.assign({}, args));
};
Base.args = {
    id: "map",
    layers: [meshMapLayerPng, axes2D],
    bounds: [432150, 6475800, 439400, 6481500],
    views: {
        layout: [1, 1],
        viewports: [
            {
                id: "view_1",
                zoom: -3.5,
                show3D: false,
            },
        ],
    },
};
export const ColoredTextAndBackGround = (args) => {
    return React.createElement(SubsurfaceViewer, Object.assign({}, args));
};
ColoredTextAndBackGround.args = {
    id: "map",
    layers: [
        meshMapLayerPng,
        Object.assign(Object.assign({}, axes2D), { axisColor: [100, 100, 255], backgroundColor: [255, 255, 100] }),
    ],
    bounds: [432150, 6475800, 439400, 6481500],
    views: {
        layout: [1, 1],
        viewports: [
            {
                id: "view_1",
                zoom: -3.5,
                show3D: false,
            },
        ],
    },
};
//# sourceMappingURL=axes2DLayer.stories.js.map