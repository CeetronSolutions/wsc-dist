import { BitmapLayer, BitmapLayerProps } from "@deck.gl/layers/typed";
import { PickingInfo } from "@deck.gl/core/typed";
import { LayerPickInfo } from "../../layers/utils/layerTools";
import { ValueDecoder } from "../utils/propertyMapTools";
import { colorMapFunctionType } from "../utils/layerTools";
import { ContinuousLegendDataType } from "../../components/ColorLegend";
export interface ColormapLayerProps extends BitmapLayerProps {
    colorMapName: string;
    colorMapFunction?: colorMapFunctionType;
    valueRange: [number, number];
    colorMapRange: [number, number];
    valueDecoder: ValueDecoder;
    rotDeg: number;
    setReportedBoundingBox?: any;
}
export default class ColormapLayer extends BitmapLayer<ColormapLayerProps> {
    initializeState(): void;
    draw({ moduleParameters, uniforms, context }: any): void;
    getShaders(): any;
    getPickingInfo({ info }: {
        info: PickingInfo;
    }): LayerPickInfo;
    getLegendData(): ContinuousLegendDataType;
}
