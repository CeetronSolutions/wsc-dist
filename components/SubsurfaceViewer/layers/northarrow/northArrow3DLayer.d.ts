import { Layer, LayerContext, UpdateParameters } from "@deck.gl/core/typed";
import { Model } from "@luma.gl/engine";
import { Color } from "@deck.gl/core/typed";
import { ExtendedLayerProps } from "../utils/layerTools";
export interface NorthArrow3DLayerProps<D> extends ExtendedLayerProps<D> {
    color: Color;
}
export default class NorthArrow3DLayer extends Layer<NorthArrow3DLayerProps<unknown>> {
    initializeState(context: LayerContext): void;
    shouldUpdateState(): boolean;
    updateState({ context }: UpdateParameters<this>): void;
    draw({ moduleParameters, uniforms, context }: any): void;
    _getModels(gl: any): {
        model: Model;
        models: Model[];
        modelsByName: {
            grids: Model;
        };
    };
}
