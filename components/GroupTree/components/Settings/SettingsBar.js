import { TopBar } from "@equinor/eds-core-react";
import { createStyles, makeStyles } from "@material-ui/core";
import React from "react";
import DateTimeSlider from "./DateTimeSlider";
import FlowRateSelector from "./FlowRateSelector";
import NodeInfoSelector from "./NodeInfoSelector";
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
const SettingsBar = React.memo(({ edge_options, node_options }) => {
    const classes = useStyles();
    return (React.createElement(TopBar, { className: classes.topBar },
        React.createElement(TopBar.Header, { className: classes.actions },
            React.createElement(FlowRateSelector, { edge_options: edge_options }),
            React.createElement(NodeInfoSelector, { node_options: node_options })),
        React.createElement(TopBar.Actions, { className: classes.actions },
            React.createElement(DateTimeSlider, null))));
});
SettingsBar.displayName = "SettingsBar";
export default SettingsBar;
//# sourceMappingURL=SettingsBar.js.map