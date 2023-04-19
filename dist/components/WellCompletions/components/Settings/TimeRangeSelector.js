import { NativeSelect } from "@equinor/eds-core-react";
import { createStyles, makeStyles, Slider, 
// eslint-disable-next-line prettier/prettier
withStyles } from "@material-ui/core";
import { isEqual } from "lodash";
import React, { useCallback, useContext, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTimeIndexRange } from "../../redux/actions";
import { DataContext } from "../DataLoader";
const useStyles = makeStyles((theme) => createStyles({
    root: {
        display: "flex",
        flexDirection: "row",
    },
    slider: {
        width: "200px",
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
    },
    selector: {
        maxWidth: "130px",
    },
}));
const EdsSlider = withStyles({
    root: {
        color: "#007079",
    },
    valueLabel: {
        top: 22,
        "& *": {
            background: "transparent",
            color: "#000",
        },
    },
})(Slider);
/**
 * A React component for selecting time step(s) to display in the plot
 */
const TimeRangeSelector = React.memo(() => {
    const classes = useStyles();
    // Direct access to the input data
    const data = useContext(DataContext);
    // Redux
    const dispatch = useDispatch();
    const timeAggregation = useSelector((state) => state.ui.timeAggregation);
    const timeIndexRange = useSelector((state) => state.ui.timeIndexRange, isEqual);
    // Memo
    // Arry of date time strings
    const times = useMemo(() => data.timeSteps, [data]);
    // Handlers
    // Get date time string by index
    const outputFunction = useCallback((step) => times[step], [times]);
    // Update time range in redux. When the time aggregation is off,
    // only the upper bound of the range will be used in computing the plot data
    const onChange = useCallback((range) => dispatch(updateTimeIndexRange(range)), [dispatch]);
    // Render
    return (React.createElement("div", { className: classes.root },
        timeAggregation !== "None" && (React.createElement(NativeSelect, { className: classes.selector, id: "time-start-selector", label: "Start", value: Math.min(...timeIndexRange), onChange: (event) => onChange([
                parseInt(event.target.value),
                Math.max(parseInt(event.target.value), timeIndexRange[1]),
            ]) }, times.map((time, index) => (React.createElement("option", { key: `time-dropdown-start-${time}`, value: index }, time))))),
        React.createElement("div", { className: classes.slider },
            React.createElement("span", null, "Time Steps"),
            React.createElement(EdsSlider, { track: timeAggregation === "None" ? false : "normal", "aria-labelledby": "time-step-slider-label", value: timeAggregation === "None"
                    ? Math.max(...timeIndexRange)
                    : timeIndexRange.slice(), valueLabelDisplay: "on", onChange: (_, value) => onChange(
                //If time aggregation is off, we only need to know the end date
                timeAggregation === "None"
                    ? [0, value]
                    : // This is due to a feature (or a bug) in EdsSlider that the first
                        //value in the range is not necessarily the lower bound
                        [
                            Math.min(...value),
                            Math.max(...value),
                        ]), min: 0, max: times.length - 1, step: 1, marks: true, valueLabelFormat: outputFunction })),
        React.createElement(NativeSelect, { className: classes.selector, id: "time-end-selector", label: timeAggregation === "None" ? "Select Time" : "End", value: Math.max(...timeIndexRange), onChange: (event) => onChange([
                timeAggregation === "None" ? 0 : timeIndexRange[0],
                parseInt(event.target.value),
            ]) }, (timeAggregation === "None"
            ? times
            : times.filter((_, index) => index >= Math.min(...timeIndexRange))).map((time, index) => (React.createElement("option", { key: `time-dropdown-end-${time}`, value: index +
                (timeAggregation === "None"
                    ? 0
                    : Math.min(...timeIndexRange)) }, time))))));
});
TimeRangeSelector.displayName = "TimeRangeSelector";
export default TimeRangeSelector;
//# sourceMappingURL=TimeRangeSelector.js.map