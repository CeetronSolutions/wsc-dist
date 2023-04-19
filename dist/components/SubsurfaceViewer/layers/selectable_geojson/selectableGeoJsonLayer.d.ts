import { GeoJsonLayer } from "@deck.gl/layers/typed";
import { Feature } from "geojson";
import { PickingInfo } from "@deck.gl/core/typed";
export default class SelectableGeoJsonLayer extends GeoJsonLayer<Feature> {
    onClick(info: PickingInfo): boolean;
}
