import { FormControlLabel, makeStyles, Switch } from "@material-ui/core";
// import { PickInfo } from "lib";
import React from "react";
import SubsurfaceViewer from "../../SubsurfaceViewer";
export default {
    component: SubsurfaceViewer,
    title: "SubsurfaceViewer / Box Selection Layer",
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
export const boxSelection = () => {
    const [argsState, setArgsState] = React.useState(enableLassoArgs);
    const [state, setState] = React.useState(true);
    const handleChange = React.useCallback(() => {
        const boxSelectionLayer = enableLassoArgs.layers.filter((item) => item["@@type"] === "BoxSelectionLayer");
        if (boxSelectionLayer[0].visible !== undefined) {
            boxSelectionLayer[0].visible = !boxSelectionLayer[0].visible;
        }
        if (boxSelectionLayer[0].visible) {
            setArgsState(enableLassoArgs);
        }
        else {
            setArgsState(disableLassoArgs);
        }
        setState(!state);
    }, [state]);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: useStyles().main },
            React.createElement(SubsurfaceViewer, Object.assign({ id: "DeckGL-Map" }, argsState))),
        React.createElement("div", { style: { textAlign: "center" } },
            React.createElement(FormControlLabel, { control: React.createElement(Switch, { checked: state, onChange: handleChange, color: "primary", name: "checkedB", inputProps: { "aria-label": "primary checkbox" } }), label: "Display Lasso Selection" }))));
};
const disableLassoArgs = {
    id: "DeckGL-Map",
    resources: {
        wellsData: "./volve_wells.json",
    },
    bounds: [432205, 6475078, 437720, 6481113],
    layers: [
        {
            "@@type": "WellsLayer",
            data: "@@#resources.wellsData",
        },
        {
            "@@type": "BoxSelectionLayer",
            visible: false,
        },
    ],
    editedData: {},
    views: {
        layout: [1, 1],
        showLabel: false,
        viewports: [
            {
                id: "view_1",
                show3D: false,
                layerIds: [],
            },
        ],
    },
};
const enableLassoArgs = Object.assign(Object.assign({}, disableLassoArgs), { layers: [
        {
            "@@type": "WellsLayer",
            data: "@@#resources.wellsData",
        },
        {
            "@@type": "BoxSelectionLayer",
            visible: true,
        },
    ] });
export const boxSelectionWithCallback = () => {
    const [data, setData] = React.useState([]);
    const getSelectedWellsDataCallBack = React.useCallback((pickingInfos) => {
        const selectedWells = pickingInfos
            .map((item) => item.object)
            .filter((item) => item.type === "Feature")
            .map((item) => item.properties["name"]);
        setData(selectedWells);
    }, []);
    const lassoArgsWithSelectedWellsDataCallback = Object.assign(Object.assign({}, disableLassoArgs), { layers: [
            {
                "@@type": "WellsLayer",
                data: "@@#resources.wellsData",
            },
            {
                "@@type": "BoxSelectionLayer",
                visible: true,
                handleSelection: getSelectedWellsDataCallBack,
            },
        ] });
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: useStyles().main },
            React.createElement(SubsurfaceViewer, Object.assign({ id: "DeckGL-Map" }, lassoArgsWithSelectedWellsDataCallback))),
        React.createElement("div", null,
            React.createElement("div", null, "Selected Wells:"),
            data.map((item) => (React.createElement("div", { key: item }, item))))));
};
//# sourceMappingURL=boxSelectionLayer.stories.js.map