export function create(x?: number, y?: number, z?: number): Vec3;
export function add(out: any, vec: any, vec2: any): any;
export function scale(out: Vec3, vec: Vec3, scale: number): Vec3;
export function normalize(out: any, vec: any): any;
export function random(out: any, scale: number): any;
declare namespace _default {
    export { create };
    export { add };
    export { scale };
    export { normalize };
    export { random };
}
export default _default;
export type Vec3 = Array<number>;
