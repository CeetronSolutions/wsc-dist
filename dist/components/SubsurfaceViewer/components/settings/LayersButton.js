import { Icon, Menu, Tooltip } from "@equinor/eds-core-react";
import { createStyles, Fab, makeStyles } from "@material-ui/core";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateLayerProp, updateVisibleLayers } from "../../redux/actions";
import ToggleButton from "./ToggleButton";
const useStyles = makeStyles(() => createStyles({
    root: {
        flexDirection: "column",
        display: "flex",
    },
}));
const LayersButton = React.memo(({ id, layers }) => {
    const classes = useStyles();
    // Redux
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    // handlers
    const handleClick = useCallback((event) => {
        // hack to disable click propagation on drawing layer
        dispatch(updateLayerProp(["drawing-layer", "mode", "view"]));
        setAnchorEl(anchorEl ? null : event.currentTarget);
    }, [anchorEl]);
    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);
    const updateChecked = useCallback((layer, checked) => dispatch(updateVisibleLayers([layer, checked])), [dispatch]);
    if (!layers.length)
        return null;
    return (React.createElement("div", { id: id },
        React.createElement(Fab, { id: "layers-selector-button", onClick: handleClick },
            React.createElement(Tooltip, { title: "Layers" },
                React.createElement(Icon, { color: "currentColor", name: "layers" }))),
        React.createElement(Menu, { anchorEl: anchorEl, "aria-labelledby": "layers-selector-button", id: "layers-selector", onClose: handleClose, placement: "left", open: Boolean(anchorEl), className: classes.root }, layers.slice().reverse().map((layer) => (React.createElement(ToggleButton, { label: layer["name"], checked: layer["visible"], onChange: (e) => {
                updateChecked(layer["id"], e.target.checked);
            }, key: `layer-toggle-${layer["id"]}` }))))));
});
LayersButton.displayName = "LayersButton";
export default LayersButton;
//# sourceMappingURL=LayersButton.js.map