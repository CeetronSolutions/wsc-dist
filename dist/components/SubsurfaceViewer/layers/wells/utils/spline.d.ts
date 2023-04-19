import { FeatureCollection } from "geojson";
import { Position3D } from "../../utils/layerTools";
/**
 * Given four points P0, P1, P2, P4 and a argument t in the interval [0,1].
 * returns function value at t. t == 0 corresponds to P1 and t == 1 corrsponds to P2
 *
 * See https://qroph.github.io/2018/07/30/smooth-paths-using-catmull-rom-splines.html
 */
export declare function CatmullRom1D(P0: number, P1: number, P2: number, P3: number, t: number): number;
/**
 * Given four 3D points P0, P1, P2, P4 and a scalar argument t in the interval [0,1].
 * returns function value (3D) at t. t == 0 corresponds to P1 and t == 1 corrsponds to P2
 *
 * See https://qroph.github.io/2018/07/30/smooth-paths-using-catmull-rom-splines.html
 */
export declare function CatmullRom(P0: Position3D, P1: Position3D, P2: Position3D, P3: Position3D, t: number): Position3D;
/**
 * Will interpolate and refine wellpaths using spline interploation resulting
 * in smoother curves with more points.
 * Assumes 3D data.
 */
export declare function splineRefine(data_in: FeatureCollection): FeatureCollection;
export declare function flattenPath(data_in: FeatureCollection): FeatureCollection;
export declare function invertPath(data_in: FeatureCollection): FeatureCollection;
/**
 * Calculates bounding box of all wells.
 */
export declare function GetBoundingBox(data: FeatureCollection): [number, number, number, number, number, number];
