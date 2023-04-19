import { validateSchema } from "./validator";
export function validateColorTables(colorTables) {
    validateSchema(colorTables, "ColorTables");
}
export function validateLayers(layers) {
    layers.forEach((layer) => {
        if (layer.isLoaded) {
            validateLayer(layer);
            try {
                layer.validateProps();
            }
            catch (e) {
                throw `${layer.id}- ${String(e)}`;
            }
        }
    });
}
export function validateLayer(layer) {
    switch (layer.id) {
        case "wells-layer":
            validateWellsLayer(layer);
            break;
        case "pie-layer":
            validateSchema(layer.props.data, "PieChart");
            break;
        case "grid-layer":
            validateSchema(layer.props.data, "Grid");
            break;
        case "fault-polygons-layer":
            validateSchema(layer.props.data, "FaultPolygons");
            break;
        default:
            return;
    }
}
function validateWellsLayer(wellsLayer) {
    const wells_data = wellsLayer.props.data;
    validateSchema(wells_data, "Wells");
    const logs_data = getLogData(wellsLayer);
    validateSchema(logs_data, "WellLogs");
}
function getLogData(wellsLayer) {
    var _a;
    const sub_layers = (_a = wellsLayer.internalState) === null || _a === void 0 ? void 0 : _a.subLayers;
    const log_layer = sub_layers === null || sub_layers === void 0 ? void 0 : sub_layers.find((layer) => layer.id === "wells-layer-log_curve");
    return log_layer === null || log_layer === void 0 ? void 0 : log_layer.props.data;
}
//# sourceMappingURL=schemaValidationUtil.js.map