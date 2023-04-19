import React from "react";
// @rmt: Changed require to import - added type dependency
import convert from "convert-units";
const roundToStep = function (num, step) {
    return Math.floor(num / step + 0.5) * step;
};
const DistanceScale = ({ zoom, incrementValue, widthPerUnit, style, scaleUnit, }) => {
    // @rmt: added scaleUnit check - NOTE: if any of the values below === 0 || === "", this will return null
    if (!zoom || !widthPerUnit || !incrementValue || scaleUnit === undefined) {
        return null;
    }
    const [rulerWidth, setRulerWidth] = React.useState(0);
    const widthInUnits = widthPerUnit / Math.pow(2, zoom);
    const scaleRulerStyle = {
        width: rulerWidth,
        height: "4px",
        border: "2px solid",
        borderTop: "none",
        display: "inline-block",
        marginLeft: "3px",
    };
    const scaleValue = widthInUnits < incrementValue
        ? Math.round(widthInUnits)
        : roundToStep(widthInUnits, incrementValue);
    // @rmt: scaleUnit could be undefined? - scaleUnit: string !instanceof convert.Unit
    const convertedUnit = convert(scaleValue)
        .from(scaleUnit)
        .toBest().unit;
    const convertedValue = convert(scaleValue)
        .from(scaleUnit)
        .toBest().val;
    React.useEffect(() => {
        setRulerWidth(scaleValue * Math.pow(2, zoom));
    }, [zoom]);
    return (React.createElement("div", { style: Object.assign({ position: "absolute" }, style) },
        React.createElement("label", { style: Object.assign({}, style) },
            convertedValue.toFixed(0),
            convertedUnit),
        React.createElement("div", { style: scaleRulerStyle })));
};
DistanceScale.defaultProps = {
    zoom: -3,
    incrementValue: 100,
    widthPerUnit: 100,
    scaleUnit: "m",
};
export default DistanceScale;
//# sourceMappingURL=DistanceScale.js.map