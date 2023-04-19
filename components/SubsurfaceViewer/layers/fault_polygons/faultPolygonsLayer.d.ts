import { CompositeLayer } from "@deck.gl/core/typed";
import { GeoJsonLayer, GeoJsonLayerProps } from "@deck.gl/layers/typed";
import { Feature } from "geojson";
export interface FaultPolygonsLayerProps extends GeoJsonLayerProps {
    depthTest: boolean;
}
export default class FaultPolygonsLayer extends CompositeLayer<FaultPolygonsLayerProps> {
    renderLayers(): GeoJsonLayer<Feature>[];
}
