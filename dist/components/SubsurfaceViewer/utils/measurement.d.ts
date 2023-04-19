import { FeatureOf, LineString, Polygon } from "@nebula.gl/edit-modes";
export declare function length(geojson: FeatureOf<LineString>): number;
/**
 * Takes one or more features and returns their area in square meters.
 */
export declare function area(geojson: FeatureOf<Polygon>): number;
