declare function _default(gl: WebGLRenderingContext, canvas: HTMLCanvasElement, loadedImage: HTMLImageElement, loadedColorMap: HTMLImageElement, options?: Options): Promise<void>;
export default _default;
export type Options = {
    /**
     * - Minimum elevation value.
     */
    minValue: number;
    /**
     * - Maximum elevation value.
     */
    maxValue: number;
    /**
     * - Colorscale the data.
     */
    applyColorScale: boolean;
    /**
     * - "linear"/"log", apply the colorscale linearly or logarithmically.
     */
    scaleType: string;
    /**
     * - [0,1], remap the minimum data point to a different point on the colorscale.
     */
    remapPointMin: number;
    /**
     * - [0,1], remap the maximum data point to a different point on the colorscale.
     */
    remapPointMax: number;
    /**
     * - [0,1], don't display points lower than this threshold.
     */
    cutPointMin: number;
    /**
     * - [0,1], don't display points higher than this threshold.
     */
    cutPointMax: number;
    /**
     * - Apply hillshading.
     */
    applyHillshading: boolean;
    /**
     * - Multiplier applied to the elevation value when computing the hillshading.
     */
    elevationScale: number;
    /**
     * - Direction the light is coming from.
     */
    sunDirection: {
        create: (x?: number, y?: number, z?: number) => import("../vec3").Vec3;
        add: (out: any, vec: any, vec2: any) => any;
        scale: (out: import("../vec3").Vec3, vec: import("../vec3").Vec3, scale: number) => import("../vec3").Vec3;
        normalize: (out: any, vec: any) => any;
        random: (out: any, scale: number) => any;
    };
    /**
     * - Brightness added to all pixels.
     */
    ambientLightIntensity: number;
    /**
     * - Brightness of surfaces hit by light.
     */
    diffuseLightIntensity: number;
};
