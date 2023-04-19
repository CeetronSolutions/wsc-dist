import { TopBar } from "@equinor/eds-core-react";
import { createStyles, makeStyles } from "@material-ui/core";
import React from "react";
import FilterButton from "./FilterButton";
import TimeRangeSelector from "./TimeRangeSelector";
import ViewButton from "./ViewButton";
const useStyles = makeStyles(() => createStyles({
    topBar: {
        minHeight: "90px",
    },
    actions: {
        position: "relative",
        display: "flex",
        flexDirection: "row",
    },
}));
/**
 * A settings bar that offers time selection and other viewing/filtering functions
 */
const SettingsBar = React.memo(() => {
    const classes = useStyles();
    return (React.createElement(TopBar, { className: classes.topBar },
        React.createElement(TopBar.Header, { className: classes.actions },
            React.createElement(TimeRangeSelector, null)),
        React.createElement(TopBar.Actions, { className: classes.actions },
            React.createElement(ViewButton, null),
            React.createElement(FilterButton, null))));
});
SettingsBar.displayName = "SettingsBar";
export default SettingsBar;
//# sourceMappingURL=SettingsBar.js.map