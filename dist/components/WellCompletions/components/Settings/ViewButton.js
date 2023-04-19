import { Button, Icon, Tooltip } from "@equinor/eds-core-react";
import { view_column } from "@equinor/eds-icons";
import { Box, createStyles, makeStyles, Menu } from "@material-ui/core";
import React from "react";
import SortButton from "./SortButton";
import TimeAggregationSelector from "./TimeAggregationSelector";
import WellsPerPageSelector from "./WellsPerPageSelector";
Icon.add({ view_column }); // (this needs only be done once)
const useStyles = makeStyles((theme) => createStyles({
    paper: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        alignSelf: "center",
        width: "200px",
    },
}));
/**
 * A menu button that shows a list of viewing options
 */
const ViewButton = React.memo(() => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    // Handlers
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    // Render
    return (React.createElement("div", null,
        React.createElement(Tooltip, { title: "View" },
            React.createElement(Button, { variant: "ghost_icon", onClick: handleClick },
                React.createElement(Icon, { color: "currentColor", name: "view_column" }))),
        React.createElement(Menu, { id: "view-menu", anchorEl: anchorEl, keepMounted: true, open: Boolean(anchorEl), onClose: handleClose, classes: { paper: classes.paper } },
            React.createElement(Box, { marginY: 1 },
                React.createElement(SortButton, null),
                React.createElement(TimeAggregationSelector, null),
                React.createElement(WellsPerPageSelector, null)))));
});
ViewButton.displayName = "ViewMenu";
export default ViewButton;
//# sourceMappingURL=ViewButton.js.map