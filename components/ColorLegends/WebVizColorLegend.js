import React from "react";
import PropTypes from "prop-types";
import { ColorLegend } from "@emerson-eps/color-tables";
const ColorLegendWrapper = ({ colorTables, min, max, title, colorName, horizontal, discreteData, reverseRange, isModal, isRangeShown, legendFontSize, tickFontSize, numberOfTicks, legendScaleSize, cssLegendStyles, openColorSelector, }) => {
    return (React.createElement(ColorLegend, { colorTables: colorTables, min: min, max: max, dataObjectName: title, colorName: colorName, horizontal: horizontal, discreteData: discreteData, reverseRange: reverseRange, isModal: isModal, isRangeShown: isRangeShown, legendFontSize: legendFontSize, tickFontSize: tickFontSize, numberOfTicks: numberOfTicks, legendScaleSize: legendScaleSize, cssLegendStyles: cssLegendStyles, openColorSelector: openColorSelector }));
};
ColorLegendWrapper.propTypes = {
    colorTables: PropTypes.array,
    min: PropTypes.number,
    max: PropTypes.number,
    title: PropTypes.string,
    colorName: PropTypes.string,
    horizontal: PropTypes.bool,
    discreteData: PropTypes.any,
    reverseRange: PropTypes.bool,
    isModal: PropTypes.bool,
    cssLegendStyles: PropTypes.objectOf(PropTypes.string),
    isRangeShown: PropTypes.bool,
    legendFontSize: PropTypes.number,
    tickFontSize: PropTypes.number,
    numberOfTicks: PropTypes.number,
    legendScaleSize: PropTypes.number,
    openColorSelector: PropTypes.bool,
};
export default ColorLegendWrapper;
//# sourceMappingURL=WebVizColorLegend.js.map