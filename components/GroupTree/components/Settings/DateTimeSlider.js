import { createStyles, makeStyles, Slider, 
// eslint-disable-next-line prettier/prettier
withStyles } from "@material-ui/core";
import React, { useCallback, useContext, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentDateTime } from "../../redux/actions";
import { DataContext } from "../DataLoader";
const useStyles = makeStyles((theme) => createStyles({
    root: {
        width: "200px",
        marginRight: theme.spacing(4),
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
const DateTimeSlider = React.memo(() => {
    const classes = useStyles();
    const data = useContext(DataContext);
    // Redux
    const dispatch = useDispatch();
    const currentDateTime = useSelector((state) => state.ui.currentDateTime);
    const times = useMemo(
    // list of all dates
    () => {
        const times = data.reduce((total, currentValue) => {
            return total.concat(currentValue.dates);
        }, []);
        return times;
    }, [data]);
    const currentDateTimeIndex = useMemo(() => times.indexOf(currentDateTime), [times, currentDateTime]);
    // handlers
    const outputFunction = useCallback((step) => times[step], [times]);
    const onChange = useCallback((_, step) => dispatch(updateCurrentDateTime(times[step])), [dispatch, times]);
    return (React.createElement("div", { className: classes.root },
        React.createElement("span", null, "Time Steps"),
        React.createElement(EdsSlider, { track: false, "aria-labelledby": "date-time-slider-label", value: currentDateTimeIndex, valueLabelDisplay: "on", onChange: onChange, min: 0, max: times.length - 1, step: 1, marks: true, valueLabelFormat: outputFunction })));
});
DateTimeSlider.displayName = "DateTimeSlider";
export default DateTimeSlider;
//# sourceMappingURL=DateTimeSlider.js.map