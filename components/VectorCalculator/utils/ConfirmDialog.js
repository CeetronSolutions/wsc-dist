import React from "react";
import { Button } from "@equinor/eds-core-react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
export const ConfirmDialog = (props) => {
    const [isOpen, setIsOpen] = React.useState(props.open || false);
    React.useEffect(() => {
        setIsOpen(props.open || false);
    }, [props.open]);
    const handleNoClick = React.useCallback(() => {
        props.onNo();
        setIsOpen(false);
    }, [props.onNo, setIsOpen]);
    const handleYesClick = React.useCallback(() => {
        props.onYes();
        setIsOpen(false);
    }, [props.onYes, setIsOpen]);
    return (React.createElement(Dialog, { open: isOpen, id: props.id, "aria-describedby": `${props.id}-description`, container: props.containerRef.current },
        React.createElement(DialogContent, null,
            React.createElement(DialogContentText, { id: `${props.id}-content-text` }, props.text)),
        React.createElement(DialogActions, null,
            React.createElement(Button, { onClick: () => handleNoClick(), variant: "outlined" }, "No"),
            React.createElement(Button, { onClick: () => handleYesClick() }, "Yes"))));
};
//# sourceMappingURL=ConfirmDialog.js.map