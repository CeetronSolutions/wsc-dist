import { CompositeLayer } from "@deck.gl/core/typed";
import { SelectionLayer } from "@nebula.gl/layers";
import { GeoJsonLayer } from "@deck.gl/layers/typed";
import { getSize } from "../wells/wellsLayer";
const defaultProps = {
    "@@type": "BoxSelectionLayer",
    name: "boxSelection",
    id: "boxSelection-layer",
    pickable: true,
    visible: true,
    // Props used to get/set data in the box selection layer.
    selectedFeatureIndexes: [],
    data: {
        type: "FeatureCollection",
        features: [],
    },
};
// Composite layer that contains an Selection Lyaer from nebula.gl
// See https://nebula.gl/docs/api-reference/layers/selection-layer
export default class BoxSelectionLayer extends CompositeLayer {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setMultiSelection(pickingInfos) {
        if (this.internalState) {
            const data = pickingInfos
                .map((item) => item.object)
                .filter((item) => item.type === "Feature");
            this.setState({
                pickingInfos: pickingInfos,
                data: data,
            });
        }
    }
    renderLayers() {
        var _a, _b;
        if (this.props.visible == false) {
            return [];
        }
        const LINE = "line";
        const POINT = "point";
        const isOrthographic = this.context.viewport.constructor.name === "OrthographicViewport";
        const positionFormat = isOrthographic ? "XY" : "XYZ";
        const geoJsonLayer = new GeoJsonLayer({
            id: "geoJson",
            data: this.state["data"],
            pickable: false,
            stroked: false,
            positionFormat,
            pointRadiusUnits: "pixels",
            lineWidthUnits: "pixels",
            pointRadiusScale: this.props.pointRadiusScale
                ? this.props.pointRadiusScale
                : 1,
            lineWidthScale: this.props.lineWidthScale
                ? this.props.lineWidthScale
                : 1,
            getLineWidth: getSize(LINE, (_a = this.props.lineStyle) === null || _a === void 0 ? void 0 : _a.width, -1),
            getPointRadius: getSize(POINT, (_b = this.props.wellHeadStyle) === null || _b === void 0 ? void 0 : _b.size, 2),
            getFillColor: [255, 140, 0],
            getLineColor: [255, 140, 0],
        });
        const selectionLayer = new SelectionLayer(
        // @ts-expect-error: EditableGeoJsonLayer from nebula.gl has no typing
        this.getSubLayerProps({
            id: "selection",
            selectionType: "rectangle",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onSelect: ({ pickingInfos }) => {
                this.setMultiSelection(pickingInfos);
                if (this.props.handleSelection) {
                    this.props.handleSelection(pickingInfos);
                }
            },
            layerIds: ["wells-layer"],
            getTentativeFillColor: () => [255, 0, 255, 100],
            getTentativeLineColor: () => [0, 0, 255, 255],
            getTentativeLineDashArray: () => [0, 0],
            lineWidthMinPixels: 3,
        }));
        // @ts-expect-error: EditableGeoJsonLayer from nebula.gl has no typing
        return [selectionLayer, geoJsonLayer];
    }
}
BoxSelectionLayer.layerName = "BoxSelectionLayer";
BoxSelectionLayer.defaultProps =
    defaultProps;
//# sourceMappingURL=boxSelectionLayer.js.map