import { Layer, Viewport } from "@deck.gl/core/typed";
import { GeoJsonLayer } from "@deck.gl/layers/typed";
import { Feature } from "geojson";
export default class UnfoldedGeoJsonLayer<D extends Feature = Feature> extends GeoJsonLayer<D> {
    renderLayers(): Layer[];
    filterSubLayer({ layer, viewport, }: {
        layer: Layer;
        viewport: Viewport;
    }): boolean;
}
