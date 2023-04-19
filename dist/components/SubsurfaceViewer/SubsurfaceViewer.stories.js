import React, { useCallback, useMemo, useState } from "react";
import { format } from "d3-format";
import { ContinuousLegend } from "@emerson-eps/color-tables";
import SubsurfaceViewer from "./SubsurfaceViewer";
import { ViewFooter, View, } from "../..";
import { WellsLayer, MapLayer } from "./layers";
import InfoCard from "./components/InfoCard";
export default {
    component: SubsurfaceViewer,
    title: "SubsurfaceViewer",
};
const defaultWellsProps = {
    data: "./volve_wells.json",
};
const defaultWellsLayer = new WellsLayer(Object.assign({}, defaultWellsProps));
const defaultProps = {
    id: "volve-wells",
    bounds: [432150, 6475800, 439400, 6481500],
    layers: [defaultWellsLayer],
};
const wellsLayerWithlogs = new WellsLayer(Object.assign(Object.assign({}, defaultWellsProps), { logData: "./volve_logs.json", logrunName: "BLOCKING", logName: "PORO", logColor: "Physics" }));
const Template = (args) => (React.createElement(SubsurfaceViewer, Object.assign({}, args)));
function mdTooltip(info) {
    var _a, _b;
    if (!info.picked)
        return null;
    const value = (_b = (_a = info) === null || _a === void 0 ? void 0 : _a.properties) === null || _b === void 0 ? void 0 : _b[0].value;
    if (!value)
        return null;
    const f = format(".2f");
    const niceValue = f(+value);
    return "MD: " + niceValue;
}
export const TooltipApi = Template.bind({});
TooltipApi.args = Object.assign(Object.assign({}, defaultProps), { layers: [
        new WellsLayer(Object.assign(Object.assign({}, defaultWellsProps), { lineStyle: { width: 7 } })),
    ], getTooltip: mdTooltip, bounds: [433000, 6476000, 439000, 6480000] });
TooltipApi.parameters = {
    docs: {
        description: {
            story: "Example of overriding the default tooltip, showing measured depth (MD) instead of the default bahaviour, which is to show the well name.",
        },
        inlineStories: false,
        iframeHeight: 500,
    },
};
export const TooltipStyle = Template.bind({});
const processPropInfo = (properties, filter) => {
    if (!properties) {
        return "";
    }
    let outputString = "";
    if (typeof filter == "boolean") {
        if (filter) {
            properties.forEach((ppobj) => {
                outputString += `\n${ppobj["name"]} : ${ppobj["value"]}`;
            });
        }
    }
    else {
        // filter is not boolean - thus it is a string array and we should check each property
        properties.forEach((ppobj) => {
            if (filter.includes(ppobj["name"])) {
                outputString += `\n${ppobj["name"]} : ${ppobj["value"]}`;
            }
        });
    }
    return outputString;
};
const tooltipImpFunc = (info) => {
    if (!info.picked || !info.layer) {
        return null;
    }
    const outputObject = {};
    const layerName = info.layer.constructor.name;
    let outputString = "";
    if (layerName === "Map3DLayer") {
        const layerProps = info.layer
            .props;
        const layerName = layerProps.name;
        const properties = info.properties;
        outputString += `Property: ${layerName}`;
        outputString += processPropInfo(properties, true);
    }
    else if (layerName === "WellsLayer") {
        const wellsPickInfo = info;
        const wellsPickInfoObject = info.object;
        const wellProperties = wellsPickInfoObject.properties;
        const name = wellProperties.name;
        outputString += `Well: ${name || ""}`;
        if (wellsPickInfo.featureType !== "points") {
            outputString += processPropInfo(wellsPickInfo.properties, true);
        }
    }
    outputObject["text"] = outputString;
    outputObject["style"] = { color: "yellow" };
    return outputObject;
};
TooltipStyle.args = Object.assign(Object.assign({}, defaultProps), { layers: [
        new WellsLayer(Object.assign(Object.assign({}, defaultWellsProps), { lineStyle: { width: 7 } })),
    ], getTooltip: tooltipImpFunc, bounds: [433000, 6476000, 439000, 6480000] });
TooltipStyle.parameters = {
    docs: {
        description: {
            story: "Example of overriding tooltip style.",
        },
        inlineStories: false,
        iframeHeight: 500,
    },
};
const CustomTemplate = (args) => {
    const [state, setState] = React.useState(args.cameraPosition);
    const getCameraPosition = React.useCallback((input) => {
        setState(input);
        return input;
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement(SubsurfaceViewer, Object.assign({}, args, { cameraPosition: args.cameraPosition, getCameraPosition: getCameraPosition })),
        React.createElement("div", { style: {
                position: "absolute",
                marginLeft: 200,
            } },
            React.createElement("div", null,
                "zoom: ", state === null || state === void 0 ? void 0 :
                state.zoom),
            React.createElement("div", null,
                "rotationX: ", state === null || state === void 0 ? void 0 :
                state.rotationX),
            React.createElement("div", null,
                "rotationOrbit: ", state === null || state === void 0 ? void 0 :
                state.rotationOrbit),
            React.createElement("div", null,
                "targetX: ", state === null || state === void 0 ? void 0 :
                state.target[0]),
            React.createElement("div", null,
                "targetY: ", state === null || state === void 0 ? void 0 :
                state.target[1]))));
};
export const customizedCameraPosition = CustomTemplate.bind({});
const cameraPosition = {
    target: [437500, 6475000],
    zoom: -5.0,
    rotationX: 90,
    rotationOrbit: 0,
};
customizedCameraPosition.args = Object.assign(Object.assign({}, defaultProps), { cameraPosition });
const mapProps = {
    id: "kh_netmap",
    meshData: "hugin_depth_25_m.float32",
    frame: {
        origin: [432150, 6475800],
        count: [291, 229],
        increment: [25, 25],
        rotDeg: 0,
    },
    propertiesData: "kh_netmap_25_m.float32",
    contours: [0, 100],
    material: false,
};
const netmapLayer = new MapLayer(Object.assign({}, mapProps));
const huginLayer = new MapLayer(Object.assign(Object.assign({}, mapProps), { id: "hugin", propertiesData: "hugin_depth_25_m.float32" }));
const MultiViewAnnotationTemplate = (args) => (React.createElement(SubsurfaceViewer, Object.assign({}, args),
    React.createElement(View, { id: "view_1" },
        React.createElement(ContinuousLegend, { min: -3071, max: 41048 }),
        React.createElement(ViewFooter, null, "kH netmap")),
    React.createElement(View, { id: "view_2" },
        React.createElement(ContinuousLegend, { min: 2725, max: 3396 }),
        React.createElement(ViewFooter, null, "Hugin"))));
export const MultiViewAnnotation = MultiViewAnnotationTemplate.bind({});
MultiViewAnnotation.args = {
    id: "multi_view_annotation",
    layers: [netmapLayer, huginLayer],
    views: {
        layout: [1, 2],
        showLabel: true,
        viewports: [
            {
                id: "view_1",
                layerIds: ["hugin"],
            },
            {
                id: "view_2",
                layerIds: ["kh_netmap"],
            },
        ],
    },
};
export const ViewObjectInitializedAsEmpty = MultiViewAnnotationTemplate.bind({});
ViewObjectInitializedAsEmpty.args = {
    id: "view_initialized_as_empty",
    layers: [netmapLayer, huginLayer],
    views: {},
};
const wellsLayerNoDepthTest = new WellsLayer(Object.assign(Object.assign({}, defaultWellsProps), { id: "wells-layer-no-depth-test", depthTest: false }));
export const DepthTest = (args) => {
    const props = Object.assign(Object.assign({}, args), { layers: [netmapLayer, defaultWellsLayer, wellsLayerNoDepthTest] });
    return (React.createElement(React.Fragment, null,
        React.createElement("div", null,
            React.createElement(SubsurfaceViewer, Object.assign({}, props))),
        React.createElement("h4", null, "View on the right depthTest for the wells layer property is set to false and wells layer is given last so that it will be painted on top. On the left parts of the wells are hidden beneath the surface.")));
};
DepthTest.args = {
    id: "DepthTest",
    views: {
        layout: [1, 2],
        viewports: [
            {
                id: "view_1",
                layerIds: ["hugin", "wells-layer"],
                show3D: false,
                isSync: true,
            },
            {
                id: "view_2",
                layerIds: ["hugin", "wells-layer-no-depth-test"],
                show3D: false,
                isSync: true,
            },
        ],
    },
};
DepthTest.parameters = {
    docs: {
        description: {
            story: "Example using the depthTest property. If this is set to false it will disable depth testing for the layer",
        },
    },
};
function getReadout(event) {
    const pickInfo = event.infos;
    return React.createElement(InfoCard, { pickInfos: pickInfo });
}
const MouseEventStory = (args) => {
    const [event, setEvent] = useState({
        type: "click",
        infos: [],
    });
    const handleEvent = useCallback((event) => {
        setEvent(event);
    }, [setEvent]);
    const useProps = useMemo(() => {
        const props = Object.assign(Object.assign({}, defaultProps), { layers: [wellsLayerWithlogs, netmapLayer], onMouseEvent: handleEvent, views: {
                layout: [1, 1],
                viewports: [{ id: "test", show3D: args.show3d }],
            }, coords: { visible: false } });
        return props;
    }, [handleEvent, args.show3d]);
    return (React.createElement(SubsurfaceViewer, Object.assign({}, useProps),
        React.createElement(View, { id: "test" },
            getReadout(event),
            React.createElement(ViewFooter, null, "Mouse event example"))));
};
export const MouseEvent = (args) => {
    return React.createElement(MouseEventStory, Object.assign({}, args));
};
MouseEvent.args = {
    show3d: true,
};
//# sourceMappingURL=SubsurfaceViewer.stories.js.map