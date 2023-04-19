import { Color, Layer, UpdateParameters } from "@deck.gl/core/typed";
import { Model } from "@luma.gl/engine";
import { DeckGLLayerContext } from "../../components/Map";
import { ExtendedLayerProps } from "../utils/layerTools";
export interface BoxLayerProps<D> extends ExtendedLayerProps<D> {
    lines: [number];
    color: Color;
}
export default class BoxLayer extends Layer<BoxLayerProps<unknown>> {
    initializeState(context: DeckGLLayerContext): void;
    shouldUpdateState(): boolean;
    updateState({ context }: UpdateParameters<this>): void;
    _getModels(gl: any): {
        model: Model;
        models: Model[];
        modelsByName: {
            grids: Model;
        };
    };
}
