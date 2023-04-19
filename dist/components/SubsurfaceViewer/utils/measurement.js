/* eslint-disable @typescript-eslint/ban-ts-comment */
import { segmentReduce, geomReduce } from "@turf/meta";
/*
@rmt: The types seem pretty messed up here and this problem was hidden due to using require instead of import.
      @aspentech: Nice, if you can fix this issue. I will disable typechecking for now.
*/
export function length(geojson) {
    // Calculate distance from 2-vertex line segments
    return segmentReduce(
    // @ts-ignore
    geojson, function (previousValue, segment) {
        if (segment === undefined || previousValue === undefined)
            return 0;
        const coords = segment.geometry.coordinates;
        return previousValue + distance(coords[0], coords[1]);
    }, 0);
}
/**
 * Takes one or more features and returns their area in square meters.
 */
export function area(geojson) {
    return geomReduce(
    // @ts-ignore
    geojson, function (value, geom) {
        return value + calculateArea(geom);
    }, 0);
}
// return distance between two points in XY plane
function distance(from, to) {
    const [x1, y1, z1] = from;
    const [x2, y2, z2] = to;
    let a = Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
    if (z1 && z2)
        a += Math.pow(z2 - z1, 2);
    return Math.sqrt(a);
}
// Calculate Area
function calculateArea(geom) {
    const coords = geom.coordinates[0];
    let total = 0;
    for (let i = 0, l = coords.length; i < l; i++) {
        const addX = coords[i][0];
        const addY = coords[i == coords.length - 1 ? 0 : i + 1][1];
        const subX = coords[i == coords.length - 1 ? 0 : i + 1][0];
        const subY = coords[i][1];
        total += addX * addY * 0.5;
        total -= subX * subY * 0.5;
    }
    return Math.abs(total);
}
//# sourceMappingURL=measurement.js.map