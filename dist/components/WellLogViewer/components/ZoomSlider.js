import React, { Component } from "react";
import Slider from "@material-ui/core/Slider";
function convertLevelToValue(level) {
    // convert zoom level to zoom value
    return Math.pow(2, level);
}
function convertValueToLevel(value) {
    // convert zoom value to zoom level
    return value > 0 ? Math.log2(value) : 0;
}
function valueLabelFormat(value /*, index: number*/) {
    return value.toFixed(Number.isInteger(value) || value > 20 ? 0 : 1);
}
class ZoomSlider extends Component {
    constructor(props, state) {
        super(props, state);
        const level = convertValueToLevel(this.props.value);
        this.state = {
            level: level,
        };
        this.onChange = this.onChange.bind(this);
    }
    componentDidUpdate(prevProps) {
        if (this.props.value !== prevProps.value) {
            this.setState((state) => {
                const level = convertValueToLevel(this.props.value);
                if (state.level == level)
                    return null;
                return { level: level };
            });
        }
    }
    // callback function from Zoom slider
    onChange(_event, level // zoom level
    ) {
        if (typeof level === "number") {
            this.setState((state) => {
                if (state.level === level)
                    return null;
                if (this.props.onChange)
                    this.props.onChange(convertLevelToValue(level));
                else
                    console.error("ZoomSlider props.onChange not set");
                return { level: level };
            });
        }
    }
    render() {
        return (React.createElement(Slider, { value: this.state.level, defaultValue: 0, min: 0, step: this.props.step || 0.5, max: convertValueToLevel(this.props.max || 256), scale: convertLevelToValue, onChange: this.onChange, getAriaValueText: valueLabelFormat, valueLabelFormat: valueLabelFormat, "aria-labelledby": "non-linear-slider", valueLabelDisplay: "auto" }));
    }
}
export default ZoomSlider;
//# sourceMappingURL=ZoomSlider.js.map