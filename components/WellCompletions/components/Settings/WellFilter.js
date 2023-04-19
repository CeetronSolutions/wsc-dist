import { Search } from "@equinor/eds-core-react";
import { createStyles, makeStyles } from "@material-ui/core";
import { throttle } from "lodash";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateWellSearchText } from "../../redux/actions";
const useStyles = makeStyles((theme) => createStyles({
    root: {
        padding: theme.spacing(1),
        maxWidth: "250px",
    },
}));
/**
 * A search textfield to search wells by their names
 */
const WellFilter = React.memo(() => {
    const classes = useStyles();
    // Redux
    const dispatch = useDispatch();
    // Handlers
    const onChange = useCallback(
    // Reduce the update frequency to 0.2 second
    throttle((event) => dispatch(updateWellSearchText(event.target.value)), 20, {
        trailing: true,
    }), [dispatch]);
    return (React.createElement("div", { className: classes.root },
        React.createElement(Search, { "aria-label": "sitewide", id: "search-well-name", placeholder: "Search well names", onChange: onChange })));
});
WellFilter.displayName = "WellFilter";
export default WellFilter;
//# sourceMappingURL=WellFilter.js.map