import { CompositeLayer, UpdateParameters } from "@deck.gl/core/typed";
import PrivateTriangleLayer, { Material } from "./privateTriangleLayer";
import { ExtendedLayerProps } from "../utils/layerTools";
import React from "react";
export declare type Params = {
    vertexArray: Float32Array;
    indexArray: Uint32Array;
    smoothShading: boolean;
};
export interface TriangleLayerProps<D> extends ExtendedLayerProps<D> {
    /** Triangle vertexes.
     * Either an URL or an array of numbers.
     */
    pointsData: string | number[];
    triangleData: string | number[];
    color: [number, number, number];
    /**  Contourlines reference point and interval.
     */
    contours: [number, number];
    /** Enable lines around triangles.
     *  default: false.
     */
    gridLines: boolean;
    /**  Surface material properties.
     * material: true  = default material, coloring depends on surface orientation and lighting.
     *           false = no material,  coloring is independent on surface orientation and lighting.
     *           or full spec:
     *      material: {
     *           ambient: 0.35,
     *           diffuse: 0.6,
     *           shininess: 32,
     *           specularColor: [255, 255, 255],
     *       }
     * Default value: true.
     */
    material: Material;
    /**  Will calculate normals for each vertex and enable phong shading.
     * If not set the shader will calculate constant normal for each triangle.
     * Only has effect if "material" is not set to false.
     */
    smoothShading: boolean;
    /** Enable/disable depth testing when rendering layer. Default true.
     */
    depthTest: boolean;
    /**  If true means that input z values are interpreted as depths.
     * For example depth of z = 1000 corresponds to -1000 on the z axis. Default true.
     */
    ZIncreasingDownwards: boolean;
    setReportedBoundingBox?: React.Dispatch<React.SetStateAction<[number, number, number, number, number, number]>>;
}
export default class TriangleLayer extends CompositeLayer<TriangleLayerProps<unknown>> {
    rebuildData(reportBoundingBox: boolean): void;
    initializeState(): void;
    updateState({ props, oldProps }: UpdateParameters<TriangleLayer>): void;
    renderLayers(): [PrivateTriangleLayer?];
}
