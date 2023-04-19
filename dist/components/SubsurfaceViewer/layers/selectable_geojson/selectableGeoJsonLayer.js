import { GeoJsonLayer } from "@deck.gl/layers/typed";
import { isDrawingEnabled } from "../utils/layerTools";
export default class SelectableGeoJsonLayer extends GeoJsonLayer {
    onClick(info) {
        // Make selection only when drawing is disabled
        if (isDrawingEnabled(this.context.layerManager)) {
            return false;
        }
        else {
            this.context.userData.setEditedData({
                selectedGeoJsonFeature: info.object,
            });
            return true;
        }
    }
}
SelectableGeoJsonLayer.layerName = "SelectableGeoJsonLayer";
SelectableGeoJsonLayer.defaultProps = {
    visible: true,
    pickable: true,
};
//# sourceMappingURL=selectableGeoJsonLayer.js.map