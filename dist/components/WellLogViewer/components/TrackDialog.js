import React, { Component } from "react";
// material ui
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, } from "@material-ui/core";
import { FormControl, InputLabel, NativeSelect } from "@material-ui/core";
import { createDataItems, dataNames } from "./PlotDialog";
import { createScaleItems } from "./PlotDialog";
import { _createItems } from "./PlotDialog";
const noneValue = "-";
export class TrackPropertiesDialog extends Component {
    constructor(props) {
        var _a;
        super(props);
        let name = "";
        const names = dataNames(this.props.wellLogView.props.welllog, null, true);
        if (names[0])
            name = names[0];
        const templateTrack = this.props.templateTrack;
        this.bStacked =
            templateTrack &&
                templateTrack.plots &&
                templateTrack.plots[0] &&
                templateTrack.plots[0].type === "stacked";
        this.state = templateTrack
            ? Object.assign(Object.assign({}, templateTrack), { stacked: this.bStacked ? "1" : "0", stackedName: (_a = templateTrack.plots[0]) === null || _a === void 0 ? void 0 : _a.name, open: true }) : {
            // we should fill every posible state to allow this.setState() to set it
            title: "New Track",
            scale: undefined,
            domain: undefined,
            plots: [],
            stacked: "0",
            stackedName: name,
            open: true,
        };
        this.closeDialog = this.closeDialog.bind(this);
        this.onOK = this.onOK.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeChecked = this.onChangeChecked.bind(this);
    }
    onOK() {
        if (parseInt(this.state.stacked)) {
            this.state.plots.splice(0, this.state.plots.length); // clear array
            const plot = {
                type: "stacked",
                name: this.state.stackedName,
                color: "not used", // not used in stacked
            };
            this.state.plots.push(plot);
        }
        this.props.onOK(this.state);
        this.closeDialog();
    }
    onChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }
    onChangeChecked(e) {
        this.setState({ [e.target.id]: e.target.checked });
    }
    closeDialog() {
        this.setState({ open: false });
    }
    createSelectControl(valueName, // use it as "a pointer to member" of an object
    label, nodes, insertEmpty) {
        let value = this.state[valueName];
        if (insertEmpty) {
            if (!value)
                value = noneValue;
            // insert at the beginning
            nodes.unshift(React.createElement("option", { key: noneValue, value: noneValue }, "\u2014"));
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
        const templateTrack = this.props.templateTrack;
        const title = templateTrack ? "Edit track" : "Add New Track";
        return (React.createElement(Dialog, { open: this.state.open, maxWidth: "sm", fullWidth: true, onClose: () => this.setState({ open: false }) },
            React.createElement(DialogTitle, null, title),
            React.createElement(DialogContent, { style: {
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                } },
                React.createElement(TextField, { id: "title", label: "Title", value: this.state.title, onChange: this.onChange }),
                templateTrack ? (React.createElement(React.Fragment, null)) : (this.createSelectControl("stacked", "Type", _createItems({ "0": "Graph", "1": "Stacked" }), false)),
                parseInt(this.state.stacked)
                    ? this.createSelectControl("stackedName", // data
                    "Data", createDataItems(this.props.wellLogView.props.welllog, null, true))
                    : this.createSelectControl("scale", "Scale", createScaleItems(), true)),
            React.createElement(DialogActions, null,
                React.createElement(Button, { color: "secondary", variant: "contained", onClick: this.closeDialog }, "Cancel"),
                React.createElement(Button, { color: "primary", variant: "contained", onClick: this.onOK }, "OK"))));
    }
}
//# sourceMappingURL=TrackDialog.js.map