import React, { Component } from "react";
class AxisSelector extends Component {
    createItem(label, value) {
        return (React.createElement("div", { key: value },
            React.createElement("input", { type: "radio", value: value, checked: this.props.value === value, onChange: (ev) => {
                    this.props.onChange(ev.target.value);
                } }),
            label));
    }
    render() {
        if (!this.props.axes || this.props.axes.length < 1)
            return React.createElement(React.Fragment, null); // nothing to render
        return (React.createElement("div", null,
            React.createElement("fieldset", null,
                React.createElement("legend", null, this.props.header),
                this.props.axes.map((axis) => {
                    return this.createItem(this.props.axisLabels
                        ? this.props.axisLabels[axis]
                        : axis, axis);
                }))));
    }
}
export default AxisSelector;
//# sourceMappingURL=AxisSelector.js.map