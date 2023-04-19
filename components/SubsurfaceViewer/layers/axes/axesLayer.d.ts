import { Color, CompositeLayer, UpdateParameters, LayersList } from "@deck.gl/core/typed";
import { Position3D, ExtendedLayerProps } from "../utils/layerTools";
export interface AxesLayerProps<D> extends ExtendedLayerProps<D> {
    bounds: [number, number, number, number, number, number];
    labelColor?: Color;
    labelFontSize?: number;
    fontFamily?: string;
    axisColor?: Color;
    /** If true means that input z values are interpreted as depths.
     * For example depth of z = 1000 corresponds to -1000 on the z axis. Default false.
     */
    ZIncreasingDownwards: boolean;
}
declare type TextLayerData = {
    label: string;
    from: Position3D;
    to: Position3D;
    size: number;
};
export default class AxesLayer extends CompositeLayer<AxesLayerProps<unknown>> {
    initializeState(): void;
    shouldUpdateState({ props, oldProps, context, changeFlags, }: UpdateParameters<this>): boolean;
    updateState(): void;
    getAnchor(d: TextLayerData, is_orthographic: boolean): string;
    getLabelPosition(d: TextLayerData): Position3D;
    getBaseLine(d: TextLayerData, is_orthographic: boolean): string;
    renderLayers(): LayersList;
}
export {};
