import { cloneDeep } from "lodash";
/**
 * Given four points P0, P1, P2, P4 and a argument t in the interval [0,1].
 * returns function value at t. t == 0 corresponds to P1 and t == 1 corrsponds to P2
 *
 * See https://qroph.github.io/2018/07/30/smooth-paths-using-catmull-rom-splines.html
 */
export function CatmullRom1D(P0, P1, P2, P3, t) {
    const alpha = 0.5;
    const tt = t * t;
    const ttt = t * t * t;
    const dist_p0_p1 = Math.sqrt((P1 - P0) * (P1 - P0) + (P1 - P0) * (P1 - P0) + (P1 - P0) * (P1 - P0));
    const dist_p1_p2 = Math.sqrt((P1 - P2) * (P1 - P2) + (P1 - P2) * (P1 - P2) + (P1 - P2) * (P1 - P2));
    const dist_p2_p3 = Math.sqrt((P3 - P2) * (P3 - P2) + (P3 - P2) * (P3 - P2) + (P3 - P2) * (P3 - P2));
    const t01 = Math.pow(dist_p0_p1, alpha);
    const t12 = Math.pow(dist_p1_p2, alpha);
    const t23 = Math.pow(dist_p2_p3, alpha);
    const m1 = P2 - P1 + t12 * ((P1 - P0) / t01 - (P2 - P0) / (t01 + t12));
    const m2 = P2 - P1 + t12 * ((P3 - P2) / t23 - (P3 - P1) / (t12 + t23));
    const a_x = 2 * (P1 - P2) + m1 + m2;
    const b_x = -3 * (P1 - P2) - m1 - m1 - m2;
    const c_x = m1;
    const d_x = P1;
    const x = a_x * ttt + b_x * tt + c_x * t + d_x;
    return x;
}
/**
 * Given four 3D points P0, P1, P2, P4 and a scalar argument t in the interval [0,1].
 * returns function value (3D) at t. t == 0 corresponds to P1 and t == 1 corrsponds to P2
 *
 * See https://qroph.github.io/2018/07/30/smooth-paths-using-catmull-rom-splines.html
 */
export function CatmullRom(P0, P1, P2, P3, t) {
    const alpha = 0.5;
    const tt = t * t;
    const ttt = t * t * t;
    // disable eslint for some lines due to readability.
    const dist_p0_p1 = Math.sqrt((P1[0] - P0[0]) * (P1[0] - P0[0]) + (P1[1] - P0[1]) * (P1[1] - P0[1]) + (P1[2] - P0[2]) * (P1[2] - P0[2])); // eslint-disable-line
    const dist_p1_p2 = Math.sqrt((P1[0] - P2[0]) * (P1[0] - P2[0]) + (P1[1] - P2[1]) * (P1[1] - P2[1]) + (P1[2] - P2[2]) * (P1[2] - P2[2])); // eslint-disable-line
    const dist_p2_p3 = Math.sqrt((P3[0] - P2[0]) * (P3[0] - P2[0]) + (P3[1] - P2[1]) * (P3[1] - P2[1]) + (P3[2] - P2[2]) * (P3[2] - P2[2])); // eslint-disable-line
    const t01 = Math.pow(dist_p0_p1, alpha);
    const t12 = Math.pow(dist_p1_p2, alpha);
    const t23 = Math.pow(dist_p2_p3, alpha);
    const m1_x = (P2[0] - P1[0] + t12 * ((P1[0] - P0[0]) / t01 - (P2[0] - P0[0]) / (t01 + t12))); // eslint-disable-line
    const m1_y = (P2[1] - P1[1] + t12 * ((P1[1] - P0[1]) / t01 - (P2[1] - P0[1]) / (t01 + t12))); // eslint-disable-line
    const m1_z = (P2[2] - P1[2] + t12 * ((P1[2] - P0[2]) / t01 - (P2[2] - P0[2]) / (t01 + t12))); // eslint-disable-line
    const m2_x = (P2[0] - P1[0] + t12 * ((P3[0] - P2[0]) / t23 - (P3[0] - P1[0]) / (t12 + t23))); // eslint-disable-line
    const m2_y = (P2[1] - P1[1] + t12 * ((P3[1] - P2[1]) / t23 - (P3[1] - P1[1]) / (t12 + t23))); // eslint-disable-line
    const m2_z = (P2[2] - P1[2] + t12 * ((P3[2] - P2[2]) / t23 - (P3[2] - P1[2]) / (t12 + t23))); // eslint-disable-line
    const a_x = 2 * (P1[0] - P2[0]) + m1_x + m2_x;
    const a_y = 2 * (P1[1] - P2[1]) + m1_y + m2_y;
    const a_z = 2 * (P1[2] - P2[2]) + m1_z + m2_z;
    const b_x = -3 * (P1[0] - P2[0]) - m1_x - m1_x - m2_x;
    const b_y = -3 * (P1[1] - P2[1]) - m1_y - m1_y - m2_y;
    const b_z = -3 * (P1[2] - P2[2]) - m1_z - m1_z - m2_z;
    const c_x = m1_x;
    const c_y = m1_y;
    const c_z = m1_z;
    const d_x = P1[0];
    const d_y = P1[1];
    const d_z = P1[2];
    const x = a_x * ttt + b_x * tt + c_x * t + d_x;
    const y = a_y * ttt + b_y * tt + c_y * t + d_y;
    const z = a_z * ttt + b_z * tt + c_z * t + d_z;
    return [x, y, z];
}
/**
 * Will interpolate and refine wellpaths using spline interploation resulting
 * in smoother curves with more points.
 * Assumes 3D data.
 */
export function splineRefine(data_in) {
    var _a, _b;
    const data = cloneDeep(data_in);
    const no_wells = data.features.length;
    for (let well_no = 0; well_no < no_wells; well_no++) {
        const mds = (_a = data.features[well_no].properties) === null || _a === void 0 ? void 0 : _a["md"];
        if (mds === undefined) {
            continue;
        }
        const geometryCollection = data.features[well_no]
            .geometry;
        const lineString = geometryCollection === null || geometryCollection === void 0 ? void 0 : geometryCollection.geometries[1];
        if (((_b = lineString.coordinates) === null || _b === void 0 ? void 0 : _b.length) === undefined) {
            continue;
        }
        const coords = lineString.coordinates;
        const n = coords.length;
        const ts = n > 3 ? [0.2, 0.4, 0.6, 0.8] : [];
        // Point before first.
        const x0 = coords[0][0] - coords[1][0] + coords[0][0];
        const y0 = coords[0][1] - coords[1][1] + coords[0][1];
        const z0 = coords[0][2] - coords[1][2] + coords[0][2];
        const P_first = [x0, y0, z0];
        const md_first = mds[0][0] - mds[0][1] + mds[0][0];
        // Point after last.
        const xn = coords[n - 1][0] - coords[n - 2][0] + coords[n - 1][0];
        const yn = coords[n - 1][1] - coords[n - 2][1] + coords[n - 1][1];
        const zn = coords[n - 1][2] - coords[n - 2][2] + coords[n - 1][2];
        const P_n = [xn, yn, zn];
        const md_n = mds[0][n - 1] - mds[0][n - 2] + mds[0][n - 1];
        const newCoordinates = [];
        const newMds = [];
        newMds.push([]);
        for (let i = 0; i < n - 1; i += 1) {
            let P0, P1, P2, P3;
            let md0, md1, md2, md3;
            if (i === 0) {
                P0 = P_first;
                P1 = coords[i + 0];
                P2 = coords[i + 1];
                P3 = coords[i + 2];
                md0 = md_first;
                md1 = mds[0][i + 0];
                md2 = mds[0][i + 1];
                md3 = mds[0][i + 2];
            }
            else if (i === n - 2) {
                P0 = coords[n - 3];
                P1 = coords[n - 2];
                P2 = coords[n - 1];
                P3 = P_n;
                md0 = mds[0][n - 3];
                md1 = mds[0][n - 2];
                md2 = mds[0][n - 1];
                md3 = md_n;
            }
            else {
                P0 = coords[i - 1];
                P1 = coords[i - 0];
                P2 = coords[i + 1];
                P3 = coords[i + 2];
                md0 = mds[0][i - 1];
                md1 = mds[0][i - 0];
                md2 = mds[0][i + 1];
                md3 = mds[0][i + 2];
            }
            newCoordinates.push(P1);
            newMds[0].push(md1);
            // Skip first leg from platform to first survey point.
            if (i > 1) {
                for (let t_i = 0; t_i < ts.length; t_i += 1) {
                    const t = ts[t_i];
                    const [x, y, z] = CatmullRom(P0, P1, P2, P3, t);
                    const md = CatmullRom1D(md0, md1, md2, md3, t);
                    newCoordinates.push([x, y, z]);
                    newMds[0].push(md);
                }
            }
        }
        newCoordinates.push(coords[n - 1]);
        newMds[0].push(mds[0][n - 1]);
        data.features[well_no].geometry
            .geometries[1].coordinates = newCoordinates;
        if (data.features[well_no].properties) {
            data.features[well_no].properties["md"] = newMds; // eslint-disable-line
        }
    }
    return data;
}
export function flattenPath(data_in) {
    var _a;
    const data = cloneDeep(data_in);
    const no_wells = data.features.length;
    for (let well_no = 0; well_no < no_wells; well_no++) {
        const geometryCollection = data.features[well_no]
            .geometry;
        const lineString = geometryCollection === null || geometryCollection === void 0 ? void 0 : geometryCollection.geometries[1];
        if (((_a = lineString.coordinates) === null || _a === void 0 ? void 0 : _a.length) === undefined) {
            continue;
        }
        const coords = lineString.coordinates;
        // flatten by setting z value constant.
        const coords_flat = coords.map((e) => {
            return [e[0], e[1], 0.0];
        });
        data.features[well_no].geometry
            .geometries[1].coordinates = coords_flat;
    }
    return data;
}
export function invertPath(data_in) {
    var _a;
    const data = cloneDeep(data_in);
    const no_wells = data.features.length;
    for (let well_no = 0; well_no < no_wells; well_no++) {
        const geometryCollection = data.features[well_no]
            .geometry;
        const lineString = geometryCollection === null || geometryCollection === void 0 ? void 0 : geometryCollection.geometries[1];
        if (((_a = lineString.coordinates) === null || _a === void 0 ? void 0 : _a.length) === undefined) {
            continue;
        }
        const coords = lineString.coordinates;
        // Invert path by multiplying depth with -1.
        const coords_inverted = coords.map((e) => {
            return [e[0], e[1], -e[2]];
        });
        data.features[well_no].geometry
            .geometries[1].coordinates = coords_inverted;
    }
    return data;
}
/**
 * Calculates bounding box of all wells.
 */
export function GetBoundingBox(data) {
    var _a;
    let xMin = 9999999999;
    let yMin = 9999999999;
    let zMin = 9999999999;
    let xMax = -9999999999;
    let yMax = -9999999999;
    let zMax = -9999999999;
    const no_wells = data.features.length;
    for (let well_no = 0; well_no < no_wells; well_no++) {
        const geometryCollection = data.features[well_no]
            .geometry;
        const lineString = geometryCollection === null || geometryCollection === void 0 ? void 0 : geometryCollection.geometries[1];
        if (((_a = lineString.coordinates) === null || _a === void 0 ? void 0 : _a.length) === undefined) {
            continue;
        }
        const coords = lineString.coordinates;
        const n = coords.length;
        for (let i = 0; i < n; i++) {
            const xyz = coords[i];
            xMin = xyz[0] < xMin ? xyz[0] : xMin;
            yMin = xyz[1] < yMin ? xyz[1] : yMin;
            zMin = xyz[2] < zMin ? xyz[2] : zMin;
            xMax = xyz[0] > xMax ? xyz[0] : xMax;
            yMax = xyz[1] > yMax ? xyz[1] : yMax;
            zMax = xyz[2] > zMax ? xyz[2] : zMax;
        }
    }
    return [xMin, yMin, zMin, xMax, yMax, zMax];
}
//# sourceMappingURL=spline.js.map