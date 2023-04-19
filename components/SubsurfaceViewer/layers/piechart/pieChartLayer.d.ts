import { Layer, PickingInfo, Color, UpdateParameters } from "@deck.gl/core/typed";
import { LayerPickInfo } from "../utils/layerTools";
import { ExtendedLayerProps } from "../utils/layerTools";
import { Model } from "@luma.gl/engine";
declare type PieProperties = [{
    color: Color;
    label: string;
}];
declare type PieData = {
    x: number;
    y: number;
    R: number;
    fractions: [{
        value: number;
        idx: number;
    }];
};
interface PiesData {
    pies: PieData[];
    properties: PieProperties;
}
export interface PieChartLayerProps<D> extends ExtendedLayerProps<D> {
    selectedPie: D;
    depthTest: boolean;
}
export default class PieChartLayer extends Layer<PieChartLayerProps<PiesData>> {
    initializeState(): void;
    shouldUpdateState(): boolean;
    updateState({ context }: UpdateParameters<this>): void;
    getModel(gl: any, pieData: PiesData): {
        model: Model;
        pieInfo: string[][];
    };
    draw(args: any): void;
    decodePickingColor(): number;
    getPickingInfo({ info }: {
        info: PickingInfo;
    }): LayerPickInfo;
}
export {};
