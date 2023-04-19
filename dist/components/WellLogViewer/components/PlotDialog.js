import React, { Component } from "react";
// material ui
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, FormControl, InputLabel, NativeSelect, } from "@material-ui/core";
import { getTrackTemplate } from "../utils/tracks";
const typeItems = {
    // language dependent names of plot types
    line: "Line",
    linestep: "Line Step",
    dot: "Dot",
    area: "Area",
    gradientfill: "Gradient Fill",
    differential: "Differential",
};
const scaleItems = {
    // language dependent names of plot types
    linear: "Linear",
    log: "Logarithmic",
};
const colorItems = {
    // language dependent names of colors
    black: "Black",
    red: "Red",
    green: "Green",
    blue: "Blue",
    brown: "Brown",
    magenta: "Magenta",
    orange: "Orange",
    gray: "Gray",
    darkred: "Dark red",
    lightgreen: "Light green",
    lightblue: "Light blue",
    yellow: "Yellow",
    white: "White",
};
const noneValue = "-";
export function _createItems(items) {
    const nodes = [];
    for (const key in items) {
        nodes.push(React.createElement("option", { key: key, value: key }, items[key]));
    }
    return nodes;
}
function createTypeItems() {
    return _createItems(typeItems);
}
export function createScaleItems() {
    return _createItems(scaleItems);
}
function createColorItems() {
    return _createItems(colorItems);
}
function createColorTableItems(colorTables) {
    const nodes = [];
    for (const colorTable of colorTables) {
        if (colorTable.discrete)
            // skip discrete color tables
            continue;
        nodes.push(React.createElement("option", { key: colorTable.name }, colorTable.name));
    }
    return nodes;
}
function createDataItem(item) {
    return (React.createElement("option", { key: item, value: item }, item));
}
export function dataNames(welllog, track, discrete) {
    const names = [];
    if (welllog) {
        const skipUsed = !!track;
        const plots = track ? track.plots : undefined;
        const abbr = track ? track.options.abbr : undefined;
        const curves = welllog.curves;
        let iCurve = 0;
        for (const curve of curves) {
            if (discrete &&
                curve.valueType !== "string" &&
                curve.valueType !== "integer")
                continue;
            let bUsed = false;
            if (plots) {
                // GraphTrack
                for (const plot of plots)
                    if (plot.id == iCurve) {
                        bUsed = true;
                        break;
                    }
            }
            else if (abbr === curve.name) {
                // Scale tracks?
                bUsed = true;
            }
            if (!bUsed || !skipUsed)
                names.push(curve.name);
            iCurve++;
        }
    }
    return names;
}
export function createDataItems(welllog, track, discrete) {
    const names = dataNames(welllog, track, discrete);
    return names.map((name) => createDataItem(name));
}
export class PlotPropertiesDialog extends Component {
    constructor(props) {
        super(props);
        let name = "", name2 = "";
        const names = this.dataNames(true);
        if (names[0])
            name2 = name = names[0];
        if (names[1])
            name2 = names[1];
        const trackTemplate = getTrackTemplate(this.props.track);
        const templatePlot = this.props.templatePlot;
        this.state = templatePlot
            ? Object.assign(Object.assign({}, templatePlot), { open: true }) : {
            // we should fill every posible state to allow this.setState() to set it
            type: trackTemplate.scale ? "" : "line",
            name: name,
            name2: name2,
            scale: undefined,
            color: "black",
            // for 'area' plot
            fill: "red",
            fillOpacity: 0.25,
            inverseColor: "",
            // for 'gradientfill' plot
            colorTable: this.props.wellLogView.props.colorTables[0].name,
            inverseColorTable: undefined,
            colorScale: undefined,
            inverseColorScale: undefined,
            // for 'differential' plot
            color2: "black",
            fill2: "green",
            open: true,
        };
        this.closeDialog = this.closeDialog.bind(this);
        this.onOK = this.onOK.bind(this);
    }
    componentDidUpdate(_prevProps, prevState) {
        if (this.state.type !== prevState.type) {
            if (this.state.type === "area") {
                if (!this.state.fill)
                    this.setState({ fill: "black" });
            }
            else if (this.state.type === "gradientfill") {
                if (this.state.inverseColor)
                    this.setState({ inverseColor: "" });
            }
            else if (this.state.type === "differential") {
                if (!this.state.name2) {
                    const skipUsed = this.props.templatePlot
                        ? false
                        : true; /*??*/
                    this.setState({ name2: this.dataNames(skipUsed)[0] });
                }
            }
        }
    }
    onOK() {
        this.props.onOK(this.state);
        this.closeDialog();
    }
    closeDialog() {
        this.setState({ open: false });
    }
    dataNames(skipUsed) {
        return dataNames(this.props.wellLogView.props.welllog, skipUsed ? this.props.track : null);
    }
    createDataItems(skipUsed) {
        const names = this.dataNames(skipUsed);
        return names.map((name) => createDataItem(name));
    }
    createSelectControl(valueName, // use it as "a pointer to member" of an object
    label, nodes, insertEmpty) {
        let value = this.state[valueName];
        if (insertEmpty) {
            if (!value)
                value = noneValue;
            // insert at the beginning
            nodes.unshift(React.createElement("option", { key: noneValue, value: noneValue }, insertEmpty == true ? "\u2014" : insertEmpty));
        }
        return (React.createElement(FormControl, { fullWidth: true },
            React.createElement(InputLabel, null, label),
            React.createElement(NativeSelect, { value: value, onChange: (event) => {
                    const value = event.currentTarget.value === noneValue
                        ? ""
                        : event.currentTarget.value;
                    const values = new Object();
                    values[valueName] = value;
                    this.setState(values);
                } }, nodes)));
    }
    render() {
        const trackTemplate = getTrackTemplate(this.props.track);
        const title = this.props.templatePlot ? "Edit plot" : "Add New Plot";
        const skipUsed = this.props.templatePlot ? false : true; /*??*/
        const colorTables = this.props.wellLogView.props.colorTables;
        const scale = this.state.scale || trackTemplate.scale;
        return (React.createElement(Dialog, { open: this.state.open, maxWidth: "sm", fullWidth: true, onClose: () => this.setState({ open: false }) },
            React.createElement(DialogTitle, null, title),
            React.createElement(DialogContent, { style: {
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                } },
                this.createSelectControl("type", "Type", createTypeItems()),
                this.createSelectControl("scale", "Scale", createScaleItems(), "Track scale"),
                this.state.type === "gradientfill" && scale === "linear"
                    ? [
                        this.createSelectControl("colorScale", "Color Scale", createScaleItems()),
                    ]
                    : [React.createElement(FormControl, { fullWidth: true, key: "12" })],
                this.createSelectControl("name", "Data", this.createDataItems(skipUsed)),
                this.createSelectControl("color", this.state.type === "dot" ? "Dot Color" : "Line Color", createColorItems()),
                this.state.type === "area" ||
                    this.state.type === "differential"
                    ? [
                        this.createSelectControl("fill", "Fill Color", createColorItems()),
                        React.createElement(FormControl, { fullWidth: true, key: "112" }),
                        React.createElement(FormControl, { fullWidth: true, key: "113" }),
                        this.state.type === "area" ? (this.createSelectControl("inverseColor", "Inverse Color", createColorItems(), true)) : (React.createElement(FormControl, { fullWidth: true })),
                    ]
                    : this.state.type === "gradientfill"
                        ? [
                            this.createSelectControl("colorTable", "Fill Color table", createColorTableItems(colorTables)),
                            React.createElement(FormControl, { fullWidth: true, key: "211" }),
                            React.createElement(FormControl, { fullWidth: true, key: "212" }),
                            this.createSelectControl("inverseColorTable", "Inverse Color table", createColorTableItems(colorTables), true),
                        ]
                        : [],
                this.state.type === "differential"
                    ? [
                        this.createSelectControl("name2", "Data 2", this.createDataItems(skipUsed)),
                        this.createSelectControl("color2", "Line Color 2", createColorItems()),
                        this.createSelectControl("fill2", "Fill Color 2", createColorItems()),
                    ]
                    : []),
            React.createElement(DialogActions, null,
                React.createElement(Button, { color: "secondary", variant: "contained", onClick: this.closeDialog }, "Cancel"),
                React.createElement(Button, { color: "primary", variant: "contained", onClick: this.onOK }, "OK"))));
    }
}
//# sourceMappingURL=PlotDialog.js.map