/* eslint-disable react/display-name */
import { Button, Dialog, Icon, Menu, Scrim } from "@equinor/eds-core-react";
import { sort } from "@equinor/eds-icons";
import { createStyles, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import SortTable from "./SortTable";
// Use library approach
Icon.add({ sort }); // (this needs only be done once)
const useStyles = makeStyles(() => createStyles({
    action: { margin: "5px" },
}));
/**
 * A menu button that shows a dialog for sorting wells by attributes
 */
const SortButton = React.memo(() => {
    const classes = useStyles();
    // Dialogs
    const [visibleScrim, setVisibleScrim] = useState(false);
    const handleClose = () => {
        setVisibleScrim(!visibleScrim);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Menu.Item, { onClick: () => setVisibleScrim(true) }, "Sort/Group by Attributes"),
        visibleScrim && (React.createElement(Scrim, { onClose: handleClose },
            React.createElement(Dialog, { style: { minWidth: "400px" } },
                React.createElement(Dialog.Title, null, "Well sorting levels"),
                React.createElement(Dialog.CustomContent, null,
                    React.createElement(SortTable, null)),
                React.createElement(Dialog.Actions, null,
                    React.createElement(Button, { className: classes.action, onClick: () => setVisibleScrim(false) }, "OK")))))));
});
SortButton.displayName = "SortButton";
export default SortButton;
//# sourceMappingURL=SortButton.js.map