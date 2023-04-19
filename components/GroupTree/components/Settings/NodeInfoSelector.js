import { NativeSelect } from "@equinor/eds-core-react";
import { createStyles, makeStyles } from "@material-ui/core";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentNodeInfo } from "../../redux/actions";
const useStyles = makeStyles((theme) => createStyles({
    root: {
        maxWidth: "250px",
        padding: theme.spacing(1),
    },
}));
const NodeInfoSelector = React.memo(({ node_options }) => {
    const classes = useStyles();
    // Redux
    const dispatch = useDispatch();
    const currentNodeInfo = useSelector((st) => st.ui.currentNodeInfo);
    // handlers
    const handleSelectedItemChange = useCallback((event) => {
        dispatch(updateCurrentNodeInfo(event.target.value));
    }, [dispatch]);
    return (React.createElement(NativeSelect, { className: classes.root, id: "node-info-selector", label: "Node Data", value: currentNodeInfo, onChange: handleSelectedItemChange }, node_options.map((key) => (React.createElement("option", { key: `option-${key.name}`, value: key.name }, key.label)))));
});
NodeInfoSelector.displayName = "NodeInfoSelector";
export default NodeInfoSelector;
//# sourceMappingURL=NodeInfoSelector.js.map