import { Layer, PickingInfo, UpdateParameters, Color } from "@deck.gl/core/typed";
import { LayerPickInfo } from "../utils/layerTools";
import { Model } from "@luma.gl/engine";
import { DeckGLLayerContext } from "../../components/Map";
import { ExtendedLayerProps, colorMapFunctionType } from "../utils/layerTools";
export declare type MeshType = {
    drawMode?: number;
    attributes: {
        positions: {
            value: Float32Array;
            size: number;
        };
        TEXCOORD_0?: {
            value: Float32Array;
            size: number;
        };
        normals?: {
            value: Float32Array;
            size: number;
        };
        properties: {
            value: Float32Array;
            size: number;
        };
        vertex_indexs: {
            value: Int32Array;
            size: number;
        };
    };
    vertexCount: number;
    indices: {
        value: Uint32Array;
        size: number;
    };
};
export declare type MeshTypeLines = {
    drawMode: number;
    attributes: {
        positions: {
            value: Float32Array;
            size: number;
        };
    };
    vertexCount: number;
};
export declare type Material = {
    ambient: number;
    diffuse: number;
    shininess: number;
    specularColor: [number, number, number];
} | boolean;
export interface privateLayerProps<D> extends ExtendedLayerProps<D> {
    mesh: MeshType;
    meshLines: MeshTypeLines;
    colorMapName: string;
    colorMapRange: [number, number];
    colorMapClampColor: Color | undefined | boolean;
    colorMapFunction?: colorMapFunctionType | false;
    propertyValueRange: [number, number];
    depthTest: boolean;
}
export default class privateLayer extends Layer<privateLayerProps<unknown>> {
    initializeState(context: DeckGLLayerContext): void;
    shouldUpdateState({ props, oldProps, context, changeFlags, }: UpdateParameters<this>): boolean;
    updateState({ context }: UpdateParameters<this>): void;
    _getModels(gl: any): Model[];
    draw(args: any): void;
    decodePickingColor(): number;
    encodePickingColor(): number[];
    getPickingInfo({ info }: {
        info: PickingInfo;
    }): LayerPickInfo;
}
