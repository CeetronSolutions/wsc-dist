import { Icon, Menu, Tooltip } from "@equinor/eds-core-react";
import { createStyles, Fab, makeStyles } from "@material-ui/core";
import React, { useCallback, useMemo } from "react";
import { LayerIcons } from "../../redux/types";
import { getPropVisibility } from "../../utils/specExtractor";
import LayerProperty from "./LayerProperty";
import { useDispatch } from "react-redux";
import { updateLayerProp } from "../../redux/actions";
const useStyles = makeStyles((theme) => createStyles({
    root: {
        marginBottom: theme.spacing(1),
    },
    menu: {
        display: "flex",
        flexDirection: "column",
    },
}));
const LayerSettingsButton = React.memo(({ layer }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    // handlers
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = useCallback((event) => {
        // hack to disable click propagation on drawing layer
        dispatch(updateLayerProp(["drawing-layer", "mode", "view"]));
        setAnchorEl(anchorEl ? null : event.currentTarget);
    }, [anchorEl]);
    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);
    const propVisibility = useMemo(() => getPropVisibility(layer), [layer]);
    if (!LayerIcons[layer["@@type"]] ||
        !layer["visible"] ||
        !propVisibility)
        return null;
    return (React.createElement(React.Fragment, null,
        React.createElement(Fab, { id: `${layer["id"]}-button`, size: "medium", onClick: handleClick, className: classes.root },
            React.createElement(Tooltip, { title: layer["name"] },
                React.createElement(Icon, { color: "currentColor", name: LayerIcons[layer["@@type"]] }))),
        React.createElement(Menu, { className: classes.menu, anchorEl: anchorEl, "aria-labelledby": `${layer["id"]}-button`, onClose: handleClose, placement: "left", open: Boolean(anchorEl) },
            React.createElement(LayerProperty, { layer: layer, key: `layer-property-${layer["id"]}` }))));
});
LayerSettingsButton.displayName = "LayerSettingsButton";
export default LayerSettingsButton;
//# sourceMappingURL=LayerSettingsButton.js.map