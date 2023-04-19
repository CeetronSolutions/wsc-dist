import React from "react";
import PropTypes from "prop-types";
export const ViewAnnotation = ({ children }) => {
    return React.createElement(React.Fragment, null,
        " ",
        children,
        " ");
};
ViewAnnotation.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.any,
};
//# sourceMappingURL=ViewAnnotation.js.map