import { Color, CompositeLayer, PickingInfo, LayerContext, LayersList } from "@deck.gl/core/typed";
import { ExtendedLayerProps, LayerPickInfo } from "../utils/layerTools";
import { EditAction, Feature, FeatureCollection } from "@nebula.gl/edit-modes";
export interface DrawingLayerProps<D> extends ExtendedLayerProps<D> {
    mode: string;
    selectedFeatureIndexes: number[];
}
export default class DrawingLayer extends CompositeLayer<DrawingLayerProps<FeatureCollection>> {
    initializeState(context: LayerContext): void;
    onClick(info: PickingInfo): boolean;
    getPickingInfo({ info }: {
        info: PickingInfo;
    }): LayerPickInfo;
    _onEdit(editAction: EditAction<FeatureCollection>): void;
    _getLineColor(feature: Feature): Color;
    renderLayers(): LayersList;
}
