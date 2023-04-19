import { CompositeLayer, Color } from "@deck.gl/core/typed";
import TerrainMapLayer, { Material } from "./terrainMapLayer";
import { ExtendedLayerProps, colorMapFunctionType } from "../utils/layerTools";
import { ContinuousLegendDataType } from "../../components/ColorLegend";
declare type Frame = {
    origin: [number, number];
    increment: [number, number];
    count: [number, number];
    rotDeg?: number;
    rotPoint?: [number, number];
};
export interface Map3DLayerProps<D> extends ExtendedLayerProps<D> {
    setReportedBoundingBox?: any;
    mesh: string;
    frame?: Frame;
    bounds?: [number, number, number, number];
    meshMaxError: number;
    propertyTexture: string;
    rotDeg?: number;
    rotPoint?: [number, number];
    contours: [number, number];
    isContoursDepth: boolean;
    colorMapName: string;
    meshValueRange: [number, number];
    propertyValueRange: [number, number];
    colorMapRange: [number, number];
    colorMapClampColor: Color | undefined | boolean;
    colorMapFunction?: colorMapFunctionType;
    smoothShading: boolean;
    material: Material;
    depthTest: boolean;
}
export default class Map3DLayer extends CompositeLayer<Map3DLayerProps<unknown>> {
    initializeState(): void;
    updateState({ props, oldProps, }: {
        props: Map3DLayerProps<unknown>;
        oldProps: Map3DLayerProps<unknown>;
    }): void;
    renderLayers(): [TerrainMapLayer];
    getLegendData(): ContinuousLegendDataType;
}
export {};
