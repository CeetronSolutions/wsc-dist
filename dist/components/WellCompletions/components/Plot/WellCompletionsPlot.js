import { createStyles, makeStyles } from "@material-ui/core";
import React, { useMemo } from "react";
import { useResizeDetector } from "react-resize-detector";
import { TooltipProvider } from "../Common/TooltipProvider";
import CompletionsPlot from "./CompletionsPlot";
import { getLayout } from "./plotUtil";
import StratigraphyPlot from "./StratigraphyPlot";
import WellsPlot from "./WellsPlot";
const useStyles = makeStyles((theme) => createStyles({
    root: {
        display: "flex",
        flex: 1,
        height: "80%",
        padding: theme.spacing(1),
    },
}));
const padding = { left: 80, right: 50, top: 70, bottom: 50 };
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
const WellCompletionsPlot = React.memo(({ timeSteps, plotData }) => {
    const classes = useStyles();
    const { width, height, ref } = useResizeDetector({
        refreshMode: "debounce",
        refreshRate: 50,
        refreshOptions: { trailing: true },
    });
    const layout = useMemo(() => width !== undefined && height !== undefined
        ? getLayout(width, height, padding)
        : undefined, [width, height]);
    return (React.createElement(TooltipProvider, null,
        React.createElement("div", { className: classes.root, ref: ref, "data-tip": true, "data-for": "plot-tooltip" }, layout && (React.createElement("svg", { id: "svg-context", width: width, height: height, style: { position: "relative" } },
            React.createElement(StratigraphyPlot, { data: plotData.stratigraphy, layout: layout, padding: padding }),
            React.createElement(WellsPlot, { timeSteps: timeSteps, plotData: plotData, layout: layout, padding: padding }),
            React.createElement(CompletionsPlot, { plotData: plotData, layout: layout, padding: padding }))))));
});
WellCompletionsPlot.displayName = "WellCompletionsPlot";
export default WellCompletionsPlot;
//# sourceMappingURL=WellCompletionsPlot.js.map