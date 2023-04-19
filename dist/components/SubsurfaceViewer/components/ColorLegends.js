import React from "react";
import ColorLegend from "./ColorLegend";
// Todo: Adapt it for other layers too
const ColorLegends = ({ cssStyle, horizontal, layers, colorTables, reverseRange, }) => {
    if (layers.length == 0)
        return null;
    return (React.createElement("div", { style: Object.assign({ position: "absolute", display: "flex", zIndex: 999 }, cssStyle) }, layers.map((layer, index) => (React.createElement(ColorLegend, { layer: layer, horizontal: horizontal, key: index, colorTables: colorTables, reverseRange: reverseRange })))));
};
export default ColorLegends;
//# sourceMappingURL=ColorLegends.js.map