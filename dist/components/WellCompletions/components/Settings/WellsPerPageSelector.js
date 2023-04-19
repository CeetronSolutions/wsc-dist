import { NativeSelect } from "@equinor/eds-core-react";
import { createStyles, makeStyles } from "@material-ui/core";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateWellsPerPage } from "../../redux/actions";
const wellsPerPageOptions = [10, 25, 50];
const useStyles = makeStyles((theme) => createStyles({
    root: {
        padding: theme.spacing(1),
        maxWidth: "170px",
    },
}));
/**
 * A drop down for selecting how many wells to display per page
 */
const WellsPerPageSelector = React.memo(() => {
    const classes = useStyles();
    // Redux
    const dispatch = useDispatch();
    const wellsPerPage = useSelector((st) => st.ui.wellsPerPage);
    // Handlers
    const onWellsPerPageChange = useCallback((event) => dispatch(updateWellsPerPage(event.target.value)), [dispatch]);
    // Render
    return (React.createElement(NativeSelect, { label: "Wells per page", id: "wells-per-page-select", className: classes.root, onChange: onWellsPerPageChange, value: wellsPerPage }, wellsPerPageOptions.map((value) => (React.createElement("option", { key: `option-${value}`, value: value }, value)))));
});
WellsPerPageSelector.displayName = "WellsPerPageSelector";
export default WellsPerPageSelector;
//# sourceMappingURL=WellsPerPageSelector.js.map