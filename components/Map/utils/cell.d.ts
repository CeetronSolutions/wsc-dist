export function outsideUnitSquare(x: any, y: any): boolean;
/**
 * Represents one Cell in a grid with flux of fluid/gas
 * going in/out of it. Internally the cell uses normalized
 * quadrilateral coordinates, which it can be convert to
 * non-normalized coordinates, but *not* vice-versa.
 * @param {[[number]]} corners - List of x/y coordinates for
 *      the corners of the cell.
 * @param {number} i - horizontal index of the cell in the grid.
 * @param {number} j - vertical index of the cell in the grid.
 * @param {number} fluxX0 - Flux going into the cell from the left.
 * @param {number} fluxY0 - Flux going into the cell from the bottom.
 * @param {number} fluxX1 - Flux going out of the cell from the right.
 * @param {number} fluxY1 - Flux going out of the cell from the top.
 */
export class Cell {
    constructor(corners: any, i: any, j: any, fluxX0: any, fluxY0: any, fluxX1: any, fluxY1: any);
    _corners: Matrix;
    _i: any;
    _j: any;
    _flux: Matrix;
    _leftFlux: Vector;
    _rightFlux: Vector;
    get corners(): Matrix;
    set i(arg: any);
    get i(): any;
    set j(arg: any);
    get j(): any;
    get flux(): Matrix;
    /**
     * @returns {float} - maximum speed (in normal coordinates) within the cell
     */
    get maxNormalSpeed(): any;
    /**
     * @returns - the jacobian of the transformation to normalized coordinates at
     *  the given coordinate.
     * @param x - normalized (quadrilateral) x-coordinate.
     * @param y - normalized (quadrilateral) y-coordinate.
     */
    jacobian([x, y]: [any, any]): Matrix;
    /**
     * Transforms normal coordinates to non-normalized coordinates.
     * @param {number} x - normal (quadrilateral) x-coordinate.
     * @param {number} y - normal (quadrilateral) y-coordinate.
     * @returns {Vector} - non-normalized coordinates
     */
    denormalize([x, y]: number): Vector;
    /**
     * @param {Vector} position - Normal position.
     * @returns {Vector} - velocity of flux, in normal coordinates.
     */
    normalVelocity(position: Vector): Vector;
}
import { Matrix } from "./linear_algebra";
import { Vector } from "./linear_algebra";
