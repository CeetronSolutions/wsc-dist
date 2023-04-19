import { PickingInfo } from "@deck.gl/core/typed";
import { Color } from "@deck.gl/core/typed";
import { Layer, LayersList, LayerManager, CompositeLayerProps } from "@deck.gl/core/typed";
import { Matrix4 } from "math.gl";
import { ContinuousLegendDataType, DiscreteLegendDataType } from "../../components/ColorLegend";
export declare type Position3D = [number, number, number];
export declare type colorMapFunctionType = (x: number) => [number, number, number];
export interface ExtendedLayerProps<D> extends CompositeLayerProps<D> {
    "@@type"?: string;
    name: string;
}
export interface ExtendedLayer<D> extends Layer<D> {
    getLegendData?: () => DiscreteLegendDataType | ContinuousLegendDataType;
}
export interface PropertyDataType {
    name: string;
    value: string | number;
    color?: Color;
}
export interface LayerPickInfo extends PickingInfo {
    propertyValue?: number;
    properties?: PropertyDataType[];
}
export declare function createPropertyData(name: string, value: string | number, color?: Color): PropertyDataType;
export declare function getModelMatrix(deg: number, x: number, y: number): Matrix4;
export declare function getModelMatrixScale(scaleZ: number): Matrix4;
export declare function getLayersInViewport(layers: Record<string, unknown>[] | LayersList, layerIds: string[] | undefined): Record<string, unknown>[] | LayersList;
export declare function getLayersByType(layers: LayersList, type: string): LayersList;
export declare type NewLayersList = LayersList & {
    id: string;
    props: prop;
};
declare type prop = {
    data: wellData;
    visible: boolean;
};
declare type wellData = {
    features: feature[];
    type: string;
    unit?: string;
};
declare type feature = {
    properties: {
        name: string;
    };
};
export declare function getWellLayerByTypeAndSelectedWells(layers: LayersList, type: string, selectedWell: string): LayersList;
export declare function getLayersById(layers: LayersList, id: string): LayersList;
export declare function isDrawingEnabled(layer_manager: LayerManager): boolean;
export {};
