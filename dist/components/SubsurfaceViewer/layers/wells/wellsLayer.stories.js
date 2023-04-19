import React, { useState } from "react";
import SubsurfaceViewer from "../../SubsurfaceViewer";
import { NativeSelect } from "@equinor/eds-core-react";
import { createColorMapFunction, ColorLegend, colorTables, } from "@emerson-eps/color-tables";
import { makeStyles } from "@material-ui/core";
export default {
    component: SubsurfaceViewer,
    title: "SubsurfaceViewer / Wells Layer",
};
const Template = (args) => (React.createElement(SubsurfaceViewer, Object.assign({}, args)));
const defaultProps = {
    id: "volve-wells",
    resources: {
        wellsData: "./volve_wells.json",
    },
    bounds: [432150, 6475800, 439400, 6481500],
    layers: [
        {
            "@@type": "WellsLayer",
            data: "@@#resources.wellsData",
        },
    ],
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
const continuousLogsLayer = Object.assign(Object.assign({}, defaultProps.layers[0]), { refine: false, outline: false, logData: "./volve_logs.json", logrunName: "BLOCKING", logName: "PORO", logColor: "Physics" });
// Volve wells default example.
export const VolveWells = Template.bind({});
VolveWells.args = defaultProps;
VolveWells.parameters = {
    docs: {
        description: {
            story: "Volve wells example",
        },
        inlineStories: false,
        iframeHeight: 500,
    },
};
// Volve wells with mouseCallback function without logs
const VolveWellsWithMouseCallback = (args) => {
    const onMouseEvent = React.useCallback((event) => {
        console.log(event);
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement(SubsurfaceViewer, Object.assign({}, args, { onMouseEvent: onMouseEvent })),
        React.createElement("div", { style: {
                position: "absolute",
                marginLeft: 200,
            } })));
};
export const volveWells2 = VolveWellsWithMouseCallback.bind({});
volveWells2.args = {
    id: "volve-wells",
    resources: {
        wellsData: "./volve_wells.json",
    },
    bounds: [432150, 6475800, 439400, 6481500],
    layers: [
        {
            "@@type": "WellsLayer",
            data: "@@#resources.wellsData",
        },
        {
            "@@type": "Axes2DLayer",
            id: "axes-layer2D",
            axisColor: [100, 100, 255],
            marginH: 100,
            marginV: 40, // Vertical margin (in pixels)
        },
    ],
};
// Volve wells with logs.
//
export const DiscreteWellLogs = Template.bind({});
DiscreteWellLogs.args = Object.assign(Object.assign({}, defaultProps), { layers: [
        Object.assign(Object.assign({}, defaultProps.layers[0]), { refine: false, outline: false, logData: "volve_blocking_zonelog_logs.json", logrunName: "BLOCKING", logName: "ZONELOG", logColor: "Stratigraphy" }),
    ] });
DiscreteWellLogs.parameters = {
    docs: {
        description: {
            story: "Volve wells example with well logs.",
        },
        inlineStories: false,
        iframeHeight: 500,
    },
};
export const ContinuousWellLogs = Template.bind({});
ContinuousWellLogs.args = Object.assign(Object.assign({}, defaultProps), { layers: [continuousLogsLayer] });
ContinuousWellLogs.parameters = {
    docs: {
        description: {
            story: "Volve wells example with well logs.",
        },
        inlineStories: false,
        iframeHeight: 500,
    },
};
export const DashedWells = Template.bind({});
DashedWells.args = Object.assign(Object.assign({}, defaultProps), { layers: [
        Object.assign(Object.assign({}, defaultProps.layers[0]), { lineStyle: { dash: true }, refine: false, outline: false }),
    ] });
DashedWells.parameters = {
    docs: {
        description: {
            story: "Volve wells example with default dashed well trajectories.",
        },
        inlineStories: false,
        iframeHeight: 500,
    },
};
// Volve wells default example.
export const MultipleVolveWells = Template.bind({});
MultipleVolveWells.args = {
    id: "volve-wells",
    resources: {
        wellsData: "./volve_wells_1.json",
        wellsData2: "./volve_wells_2.json",
    },
    bounds: [432150, 6475800, 439400, 6481500],
    layers: [
        {
            "@@type": "WellsLayer",
            data: "@@#resources.wellsData",
            id: "id1",
        },
        {
            "@@type": "WellsLayer",
            data: "@@#resources.wellsData2",
            id: "id2",
        },
    ],
};
MultipleVolveWells.parameters = {
    docs: {
        description: {
            story: "Multiple Volve wells example",
        },
        inlineStories: false,
        iframeHeight: 500,
    },
};
export const CustomColoredWells = Template.bind({});
CustomColoredWells.args = Object.assign(Object.assign({}, defaultProps), { layers: [
        Object.assign(Object.assign({}, defaultProps.layers[0]), { lineStyle: { color: [255, 0, 0, 255], dash: [10, 3] }, wellHeadStyle: { color: [255, 0, 0, 255] }, refine: false, outline: false }),
    ] });
CustomColoredWells.parameters = {
    docs: {
        description: {
            story: "Volve wells example with dashed style and red trajectories, with custom style.",
        },
        inlineStories: false,
        iframeHeight: 500,
    },
};
export const CustomWidthWells = Template.bind({});
CustomWidthWells.args = Object.assign(Object.assign({}, defaultProps), { layers: [
        Object.assign(Object.assign({}, defaultProps.layers[0]), { lineStyle: { width: 10 }, refine: false, outline: false }),
    ] });
export const VolveWellsWithResetButton = (args) => {
    const [editedData, setEditedData] = React.useState(args.editedData);
    const [triggerResetMultipleWells, setTriggerResetMultipleWells] = React.useState(0);
    const handleChange1 = () => {
        setTriggerResetMultipleWells(triggerResetMultipleWells + 1);
    };
    React.useEffect(() => {
        setEditedData(args.editedData);
    }, [args.editedData]);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: useStyles().main },
            React.createElement(SubsurfaceViewer, Object.assign({}, args, { editedData: editedData, setProps: (updatedProps) => {
                    setEditedData(updatedProps);
                }, triggerResetMultipleWells: triggerResetMultipleWells }))),
        React.createElement("button", { onClick: handleChange1 }, " Reset Multiple Wells ")));
};
VolveWellsWithResetButton.args = {
    id: "volve-wells",
    resources: {
        wellsData: "./volve_wells.json",
    },
    bounds: [432150, 6475800, 439400, 6481500],
    layers: [
        {
            "@@type": "WellsLayer",
            data: "@@#resources.wellsData",
        },
    ],
};
function wellheadSizeCallback(object) {
    if (object["properties"]["name"].match("15/9-19"))
        return 0;
    else
        return 8;
}
function colorCallback(object) {
    if (object["properties"]["name"].match("15/9-F-10"))
        return [0, 0, 0, 0];
    else
        return object["properties"]["color"];
}
function dashCallback(object) {
    if (object["properties"]["name"].match("15/9-19"))
        return [1.5, 1.5];
    else if (object["properties"]["name"] === "15/9-F-15")
        return true;
    else
        return false;
}
function widthCallback(object) {
    if (object["properties"]["name"].match("15/9-F-1"))
        return 3;
    else if (object["properties"]["name"] === "15/9-F-4")
        return 8;
    else
        return 5;
}
export const CallbackStyledWells = Template.bind({});
CallbackStyledWells.args = Object.assign(Object.assign({}, defaultProps), { layers: [
        Object.assign(Object.assign({}, defaultProps.layers[0]), { lineStyle: {
                color: colorCallback,
                dash: dashCallback,
                width: widthCallback,
            }, wellHeadStyle: {
                size: wellheadSizeCallback,
            }, refine: false, outline: false }),
    ] });
CallbackStyledWells.parameters = {
    docs: {
        description: {
            story: "Volve wells example with trajectory color, width and dash style supplied as callback.",
        },
        inlineStories: false,
        iframeHeight: 500,
    },
};
export const AllTrajectoryHidden = Template.bind({});
AllTrajectoryHidden.args = Object.assign(Object.assign({}, defaultProps), { layers: [
        Object.assign(Object.assign({}, defaultProps.layers[0]), { lineStyle: { color: [0, 0, 0, 0] }, refine: false, outline: false }),
    ] });
AllTrajectoryHidden.parameters = {
    docs: {
        description: {
            story: "Volve wells example with all trajectory hidden.",
        },
        inlineStories: false,
        iframeHeight: 500,
    },
};
export const AllWellHeadsHidden = Template.bind({});
AllWellHeadsHidden.args = Object.assign(Object.assign({}, defaultProps), { layers: [
        Object.assign(Object.assign({}, defaultProps.layers[0]), { wellHeadStyle: { size: 0 }, refine: false, outline: false }),
    ] });
AllWellHeadsHidden.parameters = {
    docs: {
        description: {
            story: "Volve wells example with all well heads hidden.",
        },
        inlineStories: false,
        iframeHeight: 500,
    },
};
export const Wells3d = Template.bind({});
Wells3d.args = Object.assign(Object.assign({}, defaultProps), { views: {
        layout: [1, 1],
        viewports: [
            {
                id: "a",
                show3D: true,
            },
        ],
    } });
Wells3d.parameters = {
    docs: {
        description: {
            story: "3D wells example",
        },
        inlineStories: false,
        iframeHeight: 500,
    },
};
export const Wells3dDashed = Template.bind({});
Wells3dDashed.args = Object.assign(Object.assign({}, defaultProps), { layers: [
        Object.assign(Object.assign({}, defaultProps.layers[0]), { lineStyle: { dash: true }, refine: false, outline: false }),
    ], views: {
        layout: [1, 1],
        viewports: [
            {
                id: "a",
                show3D: true,
            },
        ],
    } });
Wells3dDashed.parameters = {
    docs: {
        description: {
            story: "3D dashed wells example",
        },
        inlineStories: false,
        iframeHeight: 500,
    },
};
export const ContinuousColorTable = () => {
    const [colorTable, setColorTable] = useState("Physics");
    const mapProps = React.useMemo(() => {
        return Object.assign(Object.assign({}, defaultProps), { layers: [
                Object.assign(Object.assign({}, continuousLogsLayer), { logColor: colorTable }),
            ] });
    }, [colorTable]);
    const handleOnChange = (event) => {
        var _a;
        setColorTable((_a = event.target) === null || _a === void 0 ? void 0 : _a.value);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(NativeSelect, { id: "test", label: "Color table", value: colorTable, onChange: handleOnChange },
            React.createElement("option", { key: "Physics" }, "Physics"),
            React.createElement("option", { key: "Rainbow" }, "Rainbow")),
        React.createElement("div", { style: { height: "80vh", position: "relative" } },
            React.createElement(SubsurfaceViewer, Object.assign({}, mapProps)))));
};
// colorselector for welllayer
const wellLayers = [
    Object.assign(Object.assign({}, defaultProps.layers[0]), { refine: false, outline: false, logData: "./volve_logs.json", logrunName: "BLOCKING", logName: "ZONELOG", logColor: "Stratigraphy", colorMappingFunction: createColorMapFunction("Stratigraphy") }),
];
// prop for legend
const min = 0;
const max = 0.35;
const dataObjectName = "ZONELOG";
const position = [16, 10];
const horizontal = true;
const discreteData = {
    Above_BCU: [[], 0],
    ABOVE: [[], 1],
    H12: [[], 2],
    H11: [[], 3],
    H10: [[], 4],
    H9: [[], 5],
    H8: [[], 6],
    H7: [[], 7],
    H6: [[], 8],
    H5: [[], 9],
    H4: [[], 10],
    H3: [[], 11],
    H2: [[], 12],
    H1: [[], 13],
    BELOW: [[], 14],
};
const reverseRange = false;
//eslint-disable-next-line
const wellLayerTemplate = (args) => {
    const [getColorName, setColorName] = React.useState("Rainbow");
    const [isLog, setIsLog] = React.useState(false);
    const wellLayerData = React.useCallback((data) => {
        setColorName(data);
    }, []);
    // interpolation method
    const getInterpolateMethod = React.useCallback((data) => {
        setIsLog(data.isLog);
    }, []);
    const layers = [
        Object.assign(Object.assign({}, args.wellLayers[0]), { colorMappingFunction: createColorMapFunction(getColorName), logColor: getColorName ? getColorName : wellLayers[0].logColor, isLog: isLog }),
    ];
    return (React.createElement("div", null,
        React.createElement("div", { style: {
                float: "right",
                zIndex: 999,
                opacity: 1,
                position: "relative",
            } },
            React.createElement(ColorLegend, Object.assign({}, args, { getColorName: wellLayerData, getInterpolateMethod: getInterpolateMethod }))),
        React.createElement(SubsurfaceViewer, Object.assign({}, args, { layers: layers }))));
};
//eslint-disable-next-line
export const LegendWithColorSelector = wellLayerTemplate.bind({});
LegendWithColorSelector.args = Object.assign(Object.assign({ min,
    max,
    dataObjectName,
    position,
    horizontal,
    colorTables,
    discreteData }, defaultProps), { id: defaultProps.id, wellLayers, legend: {
        visible: false,
    }, reverseRange });
LegendWithColorSelector.parameters = {
    docs: {
        description: {
            story: "Clicking on legend opens(toggle) the color selector component and then click on the color scale to update the layer.",
        },
        inlineStories: false,
        iframeHeight: 500,
    },
};
//# sourceMappingURL=wellsLayer.stories.js.map