import React from "react";
import { createStyles, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
const useStyles = makeStyles((theme) => createStyles({
    viewFooter: {
        position: "absolute",
        bottom: theme.spacing(0),
        right: theme.spacing(2),
        zIndex: 999999,
        float: "right",
        backgroundColor: "#ffffffcc",
        color: "#000000ff",
        paddingLeft: "3px",
        display: "tableRow",
    },
}));
export const ViewFooter = ({ children, }) => {
    const classes = useStyles();
    return React.createElement("div", { className: classes.viewFooter }, children);
};
ViewFooter.propTypes = {
    children: PropTypes.any,
};
//# sourceMappingURL=ViewFooter.js.map