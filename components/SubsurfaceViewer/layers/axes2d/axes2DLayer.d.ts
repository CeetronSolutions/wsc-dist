import { Layer, LayerContext } from "@deck.gl/core/typed";
import { Model } from "@luma.gl/engine";
import { ExtendedLayerProps, Position3D } from "../utils/layerTools";
import { Color } from "@deck.gl/core/typed";
declare enum TEXT_ANCHOR {
    start = 0,
    middle = 1,
    end = 2
}
declare enum ALIGNMENT_BASELINE {
    top = 1,
    center = 0,
    bottom = -1
}
declare type LabelData = {
    label: string;
    pos: Position3D;
    anchor?: TEXT_ANCHOR;
    aligment?: ALIGNMENT_BASELINE;
};
declare type LabelsData = LabelData[];
export interface Axes2DLayerProps<D> extends ExtendedLayerProps<D> {
    marginH: number;
    marginV: number;
    labelColor?: Color;
    labelFontSize?: number;
    fontFamily?: string;
    axisColor?: Color;
    backgroundColor?: Color;
}
export default class Axes2DLayer extends Layer<Axes2DLayerProps<unknown>> {
    initializeState(context: LayerContext): void;
    makeLabelsData(tick_lines: number[], tick_labels: string[]): LabelsData;
    draw({ moduleParameters, uniforms, context, }: {
        moduleParameters: unknown;
        uniforms: unknown;
        context: LayerContext;
    }): void;
    _getModels(gl: WebGLRenderingContext): {
        label_models: Model[];
        line_model: Model;
        background_model: Model;
    };
}
export {};
