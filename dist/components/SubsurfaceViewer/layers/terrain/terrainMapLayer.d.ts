import { SimpleMeshLayer, SimpleMeshLayerProps } from "@deck.gl/mesh-layers/typed";
import { Color, PickingInfo } from "@deck.gl/core/typed";
import { PropertyDataType, colorMapFunctionType } from "../utils/layerTools";
export declare type Material = {
    ambient: number;
    diffuse: number;
    shininess: number;
    specularColor: [number, number, number];
} | boolean;
export declare const DECODER: {
    rScaler: number;
    gScaler: number;
    bScaler: number;
    offset: number;
};
export declare type DataItem = {
    position: [number, number];
    angle: number;
    color: [number, number, number];
};
export declare type TerrainMapLayerData = [DataItem?];
export interface TerrainMapLayerProps<D> extends SimpleMeshLayerProps<D> {
    textureImageData: ImageData;
    meshImageData: ImageData;
    meshValueRange: [number, number];
    contours: [number, number];
    isContoursDepth: boolean;
    colorMapName: string;
    colorMapFunction?: colorMapFunctionType;
    propertyValueRange: [number, number];
    colorMapRange: [number, number];
    colorMapClampColor: Color | undefined | boolean;
    depthTest: boolean;
}
export default class TerrainMapLayer extends SimpleMeshLayer<TerrainMapLayerData, TerrainMapLayerProps<TerrainMapLayerData>> {
    properties?: PropertyDataType[];
    draw({ uniforms, context }: any): void;
    getShaders(): unknown;
    decodePickingColor(): number;
    getPickingInfo({ info }: {
        info: PickingInfo;
    }): PickingInfo & {
        properties?: PropertyDataType[];
    };
}
