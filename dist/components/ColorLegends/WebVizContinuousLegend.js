import React from "react";
import PropTypes from "prop-types";
import { ContinuousLegend } from "@emerson-eps/color-tables";
const ContinuousLegendWrapper = ({ min, max, title, cssLegendStyles, colorName, horizontal, colorTables, id, isRangeShown, legendFontSize, tickFontSize, numberOfTicks, legendScaleSize, }) => {
    return (React.createElement(ContinuousLegend, { min: min, max: max, dataObjectName: title, cssLegendStyles: cssLegendStyles, colorName: colorName, horizontal: horizontal, colorTables: colorTables, id: id, isRangeShown: isRangeShown, legendFontSize: legendFontSize, tickFontSize: tickFontSize, numberOfTicks: numberOfTicks, legendScaleSize: legendScaleSize }));
};
ContinuousLegendWrapper.propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    title: PropTypes.string,
    cssLegendStyles: PropTypes.objectOf(PropTypes.string),
    colorName: PropTypes.string.isRequired,
    horizontal: PropTypes.bool,
    colorTables: PropTypes.array,
    id: PropTypes.string,
    isRangeShown: PropTypes.bool,
    legendFontSize: PropTypes.number,
    tickFontSize: PropTypes.number,
    numberOfTicks: PropTypes.number,
    legendScaleSize: PropTypes.number,
};
export default ContinuousLegendWrapper;
//# sourceMappingURL=WebVizContinuousLegend.js.map