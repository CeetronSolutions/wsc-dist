import { Matrix4 } from "math.gl";
// Creates property object which will be used to display layer property
// in the info card.
export function createPropertyData(name, value, color) {
    return {
        name: name,
        value: value,
        color: color,
    };
}
// Return a model matrix representing a rotation of "deg" degrees around the point x, y
export function getModelMatrix(deg, x, y) {
    const rad = deg * 0.017453;
    const IDENTITY = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    const m1 = new Matrix4(IDENTITY).translate([-x, -y, 0, 1]); // translate to origin
    const mRot = new Matrix4(IDENTITY).rotateZ(rad); // rotate
    const m2 = new Matrix4(IDENTITY).translate([x, y, 0, 1]); // translate back
    // Make  m2*mRot*m1
    mRot.multiplyRight(m1);
    const m2mRotm1 = m2.multiplyRight(mRot);
    return m2mRotm1;
}
// Return a model matrix representing a rotation of "deg" degrees around the point x, y
export function getModelMatrixScale(scaleZ) {
    const IDENTITY = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    const mScaleZ = new Matrix4(IDENTITY).scale([1, 1, scaleZ]);
    return mScaleZ;
}
export function getLayersInViewport(layers, layerIds) {
    if (layerIds && layerIds.length > 0 && layers) {
        const layers_in_view = layers.filter((layer) => layerIds.includes(layer["id"]));
        return layers_in_view;
    }
    else {
        return layers;
    }
}
export function getLayersByType(layers, type) {
    if (!layers)
        return [];
    return layers.filter((l) => (l === null || l === void 0 ? void 0 : l.constructor.name) === type);
}
export function getWellLayerByTypeAndSelectedWells(layers, type, selectedWell) {
    if (!layers)
        return [];
    return layers.filter((l) => {
        return ((l === null || l === void 0 ? void 0 : l.constructor.name) === type &&
            l.props.data.features.find((item) => item.properties.name === selectedWell));
    });
}
export function getLayersById(layers, id) {
    if (!layers)
        return [];
    return layers.filter((l) => l.id === id);
}
export function isDrawingEnabled(layer_manager) {
    var _a;
    const drawing_layer = (_a = layer_manager.getLayers({
        layerIds: ["drawing-layer"],
    })) === null || _a === void 0 ? void 0 : _a[0];
    return (drawing_layer &&
        drawing_layer.props.visible &&
        drawing_layer.props.mode != "view");
}
//# sourceMappingURL=layerTools.js.map