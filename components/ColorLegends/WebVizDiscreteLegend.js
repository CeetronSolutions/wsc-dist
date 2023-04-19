import React from "react";
import PropTypes from "prop-types";
import { DiscreteColorLegend } from "@emerson-eps/color-tables";
const DiscreteLegendWrapper = ({ discreteData, title, cssLegendStyles, colorName, colorTables, horizontal, }) => {
    return (React.createElement(DiscreteColorLegend, { discreteData: discreteData, dataObjectName: title, cssLegendStyles: cssLegendStyles, colorName: colorName, colorTables: colorTables, horizontal: horizontal }));
};
DiscreteLegendWrapper.propTypes = {
    discreteData: PropTypes.any.isRequired,
    title: PropTypes.string,
    cssLegendStyles: PropTypes.objectOf(PropTypes.string),
    colorName: PropTypes.string.isRequired,
    colorTables: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    horizontal: PropTypes.bool,
};
export default DiscreteLegendWrapper;
//# sourceMappingURL=WebVizDiscreteLegend.js.map