import { Typography } from "@equinor/eds-core-react";
import { createStyles, makeStyles } from "@material-ui/core";
import React from "react";
const useStyles = makeStyles(() => createStyles({
    root: {
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        userSelect: "none",
    },
}));
const ErrorPlaceholder = React.memo(({ text }) => {
    // Style
    const classes = useStyles();
    return (React.createElement("div", { className: classes.root },
        React.createElement(Typography, { color: "secondary" }, text)));
});
ErrorPlaceholder.displayName = "ErrorPlaceholder";
export default ErrorPlaceholder;
//# sourceMappingURL=ErrorPlaceholder.js.map