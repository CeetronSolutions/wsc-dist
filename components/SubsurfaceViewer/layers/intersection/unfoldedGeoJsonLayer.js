import { GeoJsonLayer } from "@deck.gl/layers/typed";
import { isEqual, zip } from "lodash";
import { distance } from "mathjs";
import IntersectionViewport from "../../viewports/intersectionViewport";
const planeY = 2000;
function computeUnfoldedPath(worldCoordinates) {
    const z = worldCoordinates.map((v) => v[2]);
    const delta = worldCoordinates.map((v, i, coordinates) => {
        const prev = coordinates[i - 1] || v;
        return distance([prev[0], prev[1]], [v[0], v[1]]);
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const a = [];
    delta.forEach((d) => {
        const prev = a.at(-1) || 0;
        a.push(d + prev);
    });
    const vAbscissa = zip(a, [...a].fill(planeY), z);
    return vAbscissa;
}
function computeUnfoldedPolygon(coordinates) {
    const half = Math.floor(coordinates.length / 2);
    const upper_line = coordinates.splice(0, half);
    const lower_line = coordinates.splice(0, half);
    const uul = computeUnfoldedPath(upper_line);
    const ull = computeUnfoldedPath(lower_line.reverse());
    const unfolded_coordinates = uul.concat(ull.reverse());
    unfolded_coordinates.push(uul[0]);
    return unfolded_coordinates;
}
function getUnfoldedPath(object) {
    const worldCoordinates = object.geometry
        .coordinates;
    // check if the path is polygon i.e. closed
    const is_closed = isEqual(worldCoordinates[0], worldCoordinates.at(-1));
    if (is_closed) {
        return computeUnfoldedPolygon(worldCoordinates);
    }
    else {
        return computeUnfoldedPath(worldCoordinates);
    }
}
export default class UnfoldedGeoJsonLayer extends GeoJsonLayer {
    renderLayers() {
        const layers = super.renderLayers();
        const path_layers = layers
            .flat()
            .filter((layer) => (layer === null || layer === void 0 ? void 0 : layer.constructor.name) === "PathLayer");
        path_layers.forEach((layer) => {
            const unfolded_layer = layer.clone(this.getSubLayerProps(Object.assign(Object.assign({}, layer), { id: layer.id + "-for-intersection-view", getPath: (object) => getUnfoldedPath(object) })));
            if (unfolded_layer)
                layers.push(unfolded_layer);
        });
        return layers;
    }
    filterSubLayer({ layer, viewport, }) {
        if (viewport.constructor === IntersectionViewport) {
            return layer.id.search("-for-intersection-view") != -1;
        }
        return layer.id.search("-for-intersection-view") == -1;
    }
}
UnfoldedGeoJsonLayer.layerName = "UnfoldedGeoJsonLayer";
//# sourceMappingURL=unfoldedGeoJsonLayer.js.map