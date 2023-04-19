import React, { useMemo } from "react";
const shortenName = (str) => str.length >= 13 ? "..." + str.substring(str.length - 10, str.length) : str;
/* eslint-disable react/prop-types */
const StratigraphyPlot = React.memo(({ data, layout, padding }) => {
    const barHeight = useMemo(() => layout.yExtent / Math.max(data.length, 1), [layout.yExtent, data.length]);
    return (React.createElement("g", null, data.map((zone, i) => {
        return (React.createElement("g", { transform: `translate(0,${padding.top + i * barHeight})`, key: `zone-${zone.name}` },
            React.createElement("rect", { transform: `translate(${padding.left}, 0)`, width: layout.xExtent, height: barHeight, fill: zone.color }),
            React.createElement("title", null, zone.name),
            React.createElement("text", { style: { fontSize: "11px" }, textAnchor: "end", x: padding.left - 4, y: barHeight / 2, dy: ".35em", fontFamily: "sans-serif" }, shortenName(zone.name))));
    })));
});
StratigraphyPlot.displayName = "StratigraphyPlot";
export default StratigraphyPlot;
//# sourceMappingURL=StratigraphyPlot.js.map