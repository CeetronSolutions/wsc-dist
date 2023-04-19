import { NativeSelect } from "@equinor/eds-core-react";
import { createStyles, makeStyles } from "@material-ui/core";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentFlowRate } from "../../redux/actions";
const useStyles = makeStyles((theme) => createStyles({
    root: {
        maxWidth: "250px",
        padding: theme.spacing(1),
    },
}));
const FlowRateSelector = React.memo(({ edge_options }) => {
    const classes = useStyles();
    // Redux
    const dispatch = useDispatch();
    const currentFlowRate = useSelector((st) => st.ui.currentFlowRate);
    // handlers
    const handleSelectedItemChange = useCallback((event) => {
        dispatch(updateCurrentFlowRate(event.target.value));
    }, [dispatch]);
    return (React.createElement(NativeSelect, { className: classes.root, id: "flow-rate-selector", label: "Flow Rate", value: currentFlowRate, onChange: handleSelectedItemChange }, edge_options.map((key) => (React.createElement("option", { key: `option-${key.name}`, value: key.name }, key.label)))));
});
FlowRateSelector.displayName = "FlowRateSelector";
export default FlowRateSelector;
//# sourceMappingURL=FlowRateSelector.js.map