import React, { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { SORT_BY_COMPLETION_DATE } from "../../utils/sort";
import { capitalizeFirstLetter } from "../../utils/stringUtil";
import { useTooltip } from "../Common/TooltipProvider";
/* eslint-disable react/prop-types */
const WellsPlot = React.memo(({ timeSteps, plotData, layout, padding }) => {
    const { setContent } = useTooltip();
    const attributeKeys = useSelector((st) => st.attributes.attributeKeys);
    const wellWidth = useMemo(() => layout.xExtent / Math.max(plotData.wells.length, 1), [layout.xExtent, plotData.wells.length]);
    const barHeight = useMemo(() => layout.yExtent / Math.max(plotData.stratigraphy.length, 1), [layout.yExtent, plotData.stratigraphy.length]);
    const onMouseOver = useCallback((well) => {
        setContent(() => (React.createElement("table", { style: { color: "#fff" } },
            React.createElement("tbody", null,
                React.createElement("tr", { key: `well-tooltip-${well.name}-earliest-comp` },
                    React.createElement("td", null,
                        React.createElement("b", null, capitalizeFirstLetter(SORT_BY_COMPLETION_DATE))),
                    React.createElement("td", null, timeSteps[well.earliestCompDateIndex])),
                attributeKeys.map((attribute) => (React.createElement("tr", { key: `well-tooltip-${well.name}-${attribute}` },
                    React.createElement("td", null,
                        React.createElement("b", null, capitalizeFirstLetter(attribute))),
                    React.createElement("td", null, well.attributes[attribute] ||
                        "Undefined"))))))));
    }, [setContent]);
    const onMouseOut = useCallback(() => setContent(() => null), [setContent]);
    return (React.createElement("g", null, plotData.wells.map((well, i) => {
        const lastCompletion = Array.from(well.completions)
            .reverse()
            .find((comp) => comp.open + comp.shut > 0);
        const height = lastCompletion
            ? (lastCompletion.zoneIndex + 1) * barHeight
            : 0;
        return (React.createElement("g", { transform: `translate(${padding.left + (i + 0.5) * wellWidth},0)`, key: `well-${well.name}` },
            React.createElement("text", { style: { fontSize: "9px" }, textAnchor: "start", transform: `translate(0,${padding.top - 10}) rotate(-60)`, x: 0, y: 0, dy: ".35em", fontFamily: "sans-serif", onMouseOver: () => onMouseOver(well), onMouseOut: onMouseOut }, well.name),
            React.createElement("rect", { transform: `translate(0,${padding.top - 4})`, width: 0.5, height: height + 4, fill: "#111" })));
    })));
});
WellsPlot.displayName = "WellsPlot";
export default WellsPlot;
//# sourceMappingURL=WellsPlot.js.map