import { Icon } from "@equinor/eds-core-react";
import { layers } from "@equinor/eds-icons";
import { createStyles, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LayersButton from "./LayersButton";
import LayerSettingsButton from "./LayerSettingsButton";
import { getLayersInViewport } from "../../layers/utils/layerTools";
Icon.add({ layers }); // (this needs only be done once)
const useStyles = makeStyles((theme) => createStyles({
    root: {
        position: "absolute",
        bottom: theme.spacing(4),
        right: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
}));
const Settings = React.memo(({ viewportId, layerIds }) => {
    const classes = useStyles();
    const spec = useSelector((st) => st.spec);
    const [layersInView, setLayersInView] = useState([]);
    useEffect(() => {
        const layers_in_viewport = getLayersInViewport(spec["layers"], layerIds);
        setLayersInView(layers_in_viewport);
    }, [spec, layerIds]);
    if (!(layersInView === null || layersInView === void 0 ? void 0 : layersInView.length))
        return null;
    return (React.createElement("div", { className: classes.root },
        layersInView.map((layer) => layer && (React.createElement(LayerSettingsButton, { layer: layer, key: `layer-settings-button-${layer["id"]}-${viewportId}` }))),
        React.createElement(LayersButton, { id: `layers-button-${viewportId}`, layers: layersInView })));
});
Settings.displayName = "Settings";
export default Settings;
//# sourceMappingURL=Settings.js.map