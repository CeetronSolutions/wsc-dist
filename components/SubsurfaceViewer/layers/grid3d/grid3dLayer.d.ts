import { CompositeLayer, Color } from "@deck.gl/core/typed";
import privateLayer, { Material } from "./privateLayer";
import { ExtendedLayerProps, colorMapFunctionType } from "../utils/layerTools";
export declare type WebWorkerParams = {
    points: number[];
    polys: number[];
    properties: number[];
};
export interface Grid3DLayerProps<D> extends ExtendedLayerProps<D> {
    setReportedBoundingBox?: any;
    /**  Url or native javascript array. Set of points.
     * [x1, y1, z1, x2, y2, z2, ...]
     */
    pointsData: string | number[];
    /**  Url or native javascript array.
     * For each polygon ["number of points in poly", p1, , p2 ... ]
     * Example One polygn ith 4 poitns and one with 3 points.
     * [4, 3, 1, 9, 77, 3, 6, 44, 23]
     */
    polysData: string | number[];
    /**  Url or native javascript array..
     *  A scalar property for each polygon.
     * [0.23, 0.11. 0.98, ...]
     */
    propertiesData: string | number[];
    /**  Name of color map. E.g "PORO"
     */
    colorMapName: string;
    /**  Use color map in this range.
     */
    colorMapRange?: [number, number];
    /** Clamp colormap to this color at ends.
     *   Given as array of three values (r,g,b) e.g: [255, 0, 0]
     *   If not set or set to true, it will clamp to color map min and max values.
     *   If set to false the clamp color will be completely transparent.
     */
    colorMapClampColor: Color | undefined | boolean;
    /**  Optional function property.
     * If defined this function will override the color map.
     * Takes a value in the range [0,1] and returns a color.
     * E.g. (x) => [x * 255, x * 255, x * 255]
     */
    colorMapFunction?: colorMapFunctionType | false;
    /** Surface material properties.
     * material: true  = default material, coloring depends on surface orientation and lighting.
     *           false = no material,  coloring is independent on surface orientation and lighting.
     *           or full spec:
     *      material: {
     *           ambient: 0.35,
     *           diffuse: 0.6,
     *           shininess: 32,
     *           specularColor: [255, 255, 255],
     *       }
     */
    material: Material;
    /** Enable/disable depth testing when rendering layer. Default true.
     */
    depthTest: boolean;
    /** If true means that input z values are interpreted as depths.
     *   For example depth of z = 1000 corresponds to -1000 on the z axis. Default true.
     */
    ZIncreasingDownwards: boolean;
}
export default class Grid3DLayer extends CompositeLayer<Grid3DLayerProps<unknown>> {
    rebuildData(reportBoundingBox: boolean): void;
    initializeState(): void;
    updateState({ props, oldProps, }: {
        props: Grid3DLayerProps<unknown>;
        oldProps: Grid3DLayerProps<unknown>;
    }): void;
    renderLayers(): [privateLayer?];
}
