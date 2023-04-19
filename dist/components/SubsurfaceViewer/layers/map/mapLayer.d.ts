import { CompositeLayer, Color, UpdateParameters } from "@deck.gl/core/typed";
import privateMapLayer, { Material } from "./privateMapLayer";
import { ExtendedLayerProps, colorMapFunctionType } from "../utils/layerTools";
declare type Frame = {
    /** mesh origin
     */
    origin: [number, number];
    /** cells size in each direction.
     */
    increment: [number, number];
    /** number of nodes in each direction.
     */
    count: [number, number];
    /** Rotates map counterclockwise in degrees around 'rotPoint' specified below.
     */
    rotDeg?: number;
    /** Point to rotate around using 'rotDeg'. Defaults to mesh origin.
     */
    rotPoint?: [number, number];
};
export declare type Params = {
    meshData: Float32Array;
    propertiesData: Float32Array;
    isMesh: boolean;
    frame: Frame;
    smoothShading: boolean;
};
export interface MapLayerProps<D> extends ExtendedLayerProps<D> {
    setReportedBoundingBox?: any;
    /**  Url to the height (z values) mesh.
     */
    meshUrl: string;
    meshData: string | number[];
    /**  Horizontal extent of the terrain mesh. Format:
     {
         origin: [number, number];     // mesh origin in x, y
         increment: [number, number];  // cell size dx, dy
         count: [number, number];      // number of nodes in both directions.
     }
     */
    frame: Frame;
    /**  Url to the properties (ex, poro or perm values).
     * If the number of property values equals the number of depth values
     * the property values will be placed at the nodes and the cell (4 neigboring nodes)
     * color will be linearly interpolated over the cell.
     * If the number of property values equals one less than the depth values in
     * each direction then the property values will be pr cell and the cell will be constant
     * colored.
     */
    propertiesUrl: string;
    propertiesData: string | number[];
    /**  Contourlines reference point and interval.
     * A value of [-1.0, -1.0] will disable contour lines.
     * Contour lines will also not be activated if cells are constant colored
     * and "isContoursDepth" is set to false. I.e. constant properties within cells and contourlines
     * to be calculated for properties and not depths.
     * default value: [-1.0, -1.0]
     */
    contours: [number, number];
    /**  Contourlines may be calculated either on depth/z-value or on property value
     * If this is set to false, lines will follow properties instead of depth.
     * In 2D mode this is always the case regardless.
     * default: true
     */
    isContoursDepth: boolean;
    /**  Enable gridlines.
     * default: false.
     */
    gridLines: boolean;
    /**  Name of color map. E.g "PORO"
     */
    colorMapName: string;
    /**  Use color map in this range.
     */
    colorMapRange: [number, number];
    /**  Clamp colormap to this color at ends.
     * Given as array of three values (r,g,b) e.g: [255, 0, 0]
     * If not set or set to true, it will clamp to color map min and max values.
     * If set to false the clamp color will be completely transparent.
     */
    colorMapClampColor: Color | undefined | boolean;
    /**  Optional function property.
     * If defined this function will override the color map.
     * Takes a value in the range [0,1] and returns a color.
     * E.g. (x) => [x * 255, x * 255, x * 255]
     * May also be set as constant color:
     * E.g. [255, 0, 0] for constant red surface.
     */
    colorMapFunction?: colorMapFunctionType;
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
     */
    material: Material;
    /**  Will calculate normals for each vertex and enable phong shading.
     * If not set the shader will calculate constant normal for each triangle.
     */
    smoothShading: boolean;
    /** Enable/disable depth testing when rendering layer. Default true.
     */
    depthTest: boolean;
    /**  If true means that input z values are interpreted as depths.
     * For example depth of z = 1000 corresponds to -1000 on the z axis. Default true.
     */
    ZIncreasingDownwards: boolean;
}
export default class MapLayer extends CompositeLayer<MapLayerProps<unknown>> {
    rebuildData(reportBoundingBox: boolean): void;
    initializeState(): void;
    updateState({ props, oldProps }: UpdateParameters<MapLayer>): void;
    renderLayers(): [privateMapLayer?];
}
export {};
