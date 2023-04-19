import { COORDINATE_SYSTEM, CompositeLayer } from "@deck.gl/core/typed";
import { GeoJsonLayer } from "@deck.gl/layers/typed";
import GL from "@luma.gl/constants";
const getColor = (d) => {
    var _a, _b, _c, _d;
    const c = (_a = d === null || d === void 0 ? void 0 : d.properties) === null || _a === void 0 ? void 0 : _a["color"];
    const r = (_b = c[0]) !== null && _b !== void 0 ? _b : 0;
    const g = (_c = c[1]) !== null && _c !== void 0 ? _c : 0;
    const b = (_d = c[2]) !== null && _d !== void 0 ? _d : 0;
    return [r, g, b, 30]; // make fill color transparent
};
const defaultProps = {
    "@@type": "FaultPolygonsLayer",
    name: "Fault polygons",
    id: "fault-polygons-layer",
    pickable: true,
    visible: true,
    filled: true,
    lineWidthMinPixels: 2,
    depthTest: true,
};
export default class FaultPolygonsLayer extends CompositeLayer {
    renderLayers() {
        const layer = new GeoJsonLayer(this.getSubLayerProps({
            id: this.props.id,
            data: this.props.data,
            pickable: this.props.pickable,
            visible: this.props.visible,
            filled: this.props.filled,
            lineWidthMinPixels: this.props.lineWidthMinPixels,
            coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
            getLineColor: (d) => { var _a, _b; return (_b = (_a = d === null || d === void 0 ? void 0 : d.properties) === null || _a === void 0 ? void 0 : _a["color"]) !== null && _b !== void 0 ? _b : [0, 0, 0, 255]; },
            getFillColor: getColor,
            parameters: {
                [GL.DEPTH_TEST]: this.props.depthTest,
            },
        }));
        return [layer];
    }
}
FaultPolygonsLayer.layerName = "FaultPolygonsLayer";
FaultPolygonsLayer.defaultProps = defaultProps;
//# sourceMappingURL=faultPolygonsLayer.js.map