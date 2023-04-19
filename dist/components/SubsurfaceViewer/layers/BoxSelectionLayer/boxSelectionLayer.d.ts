import { CompositeLayer, PickingInfo, LayersList } from "@deck.gl/core/typed";
import { FeatureCollection } from "@nebula.gl/edit-modes";
import { ExtendedLayerProps } from "../utils/layerTools";
import { Color } from "@deck.gl/core/typed";
import { Feature } from "geojson";
declare type PickInfo = any;
export interface BoxSelectionLayerProps<D> extends ExtendedLayerProps<D> {
    mode: string;
    selectedFeatureIndexes: number[];
    pickingInfos: PickingInfo[];
    refine: boolean;
    pointRadiusScale: number;
    lineWidthScale: number;
    lineStyle: LineStyleAccessor;
    wellHeadStyle: WellHeadStyleAccessor;
    handleSelection: (pickingInfos: PickInfo[]) => void;
}
declare type StyleAccessorFunction = (object: Feature, objectInfo?: Record<string, unknown>) => StyleData;
declare type NumberPair = [number, number];
declare type DashAccessor = boolean | NumberPair | StyleAccessorFunction | undefined;
declare type ColorAccessor = Color | StyleAccessorFunction | undefined;
declare type SizeAccessor = number | StyleAccessorFunction | undefined;
declare type StyleData = NumberPair | Color | number;
declare type LineStyleAccessor = {
    color?: ColorAccessor;
    dash?: DashAccessor;
    width?: SizeAccessor;
};
declare type WellHeadStyleAccessor = {
    color?: ColorAccessor;
    size?: SizeAccessor;
};
export default class BoxSelectionLayer extends CompositeLayer<BoxSelectionLayerProps<FeatureCollection>> {
    setMultiSelection(pickingInfos: any[]): void;
    renderLayers(): LayersList;
}
export {};
