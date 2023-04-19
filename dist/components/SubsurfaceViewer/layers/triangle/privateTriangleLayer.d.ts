import { Layer, PickingInfo, UpdateParameters, LayerContext } from "@deck.gl/core/typed";
import { LayerPickInfo } from "../utils/layerTools";
import { DeckGLLayerContext } from "../../components/Map";
import { ExtendedLayerProps } from "../utils/layerTools";
export declare type GeometryTriangles = {
    drawMode: number;
    attributes: {
        positions: {
            value: Float32Array;
            size: number;
        };
        TEXCOORD_0?: {
            value: Float32Array;
            size: number;
        };
        normals: {
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
export declare type GeometryLines = {
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
export interface PrivateTriangleLayerProps<D> extends ExtendedLayerProps<D> {
    geometryTriangles: GeometryTriangles;
    geometryLines: GeometryLines;
    contours: [number, number];
    gridLines: boolean;
    color: [number, number, number];
    smoothShading: boolean;
    depthTest: boolean;
}
export default class PrivateTriangleLayer extends Layer<PrivateTriangleLayerProps<unknown>> {
    initializeState(context: DeckGLLayerContext): void;
    shouldUpdateState({ props, oldProps, context, changeFlags, }: UpdateParameters<this>): boolean;
    updateState({ context }: UpdateParameters<this>): void;
    _getModels(gl: WebGLRenderingContext): [unknown, unknown];
    draw(args: {
        moduleParameters?: unknown;
        uniforms: number[];
        context: LayerContext;
    }): void;
    decodePickingColor(): number;
    getPickingInfo({ info }: {
        info: PickingInfo;
    }): LayerPickInfo;
}
