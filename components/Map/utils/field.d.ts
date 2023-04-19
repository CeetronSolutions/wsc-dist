/**
 * A velocity Field over a given Grid.
 *
 * @param
 */
export default class Field {
    /**
     * Constructor
     * @param {Grid} grid - The grid of cells
     */
    constructor(grid: any);
    _grid: any;
    get grid(): any;
    /**
     * Given normalized coordinates. If the coordinates
     * are outside the unit square, returns the new cell the coordinates
     * belong to.
     * @param {number} x - The normalized x-coordinate.
     * @param {number} y - The normalized y-coordinate.
     * @returns {[Cell, Vector]} - The new cell of the position, along
     *      with normalized position with overflow subtracted. The position is
     *      *not* the correct normal coordinates in the new cell as the
     *      quadrilateral transformation is not linear.
     */
    calculateNewCell(position: any, cell: any): [any, Vector];
    /**
     * Simulates the movement of a massless particle
     * at given normalized position, in a cell for given
     * time. Returns a new normalized position and cell.
     * @param {Cell} cell - The cell to simulate a particle in.
     * @param {Vector} normalPosition - The position of the particle
     * @param {[Cell, Vector]} - The new cell and position of the
     *      particle.
     */
    simulate(cell: any, normalPosition: Vector): any[];
}
import { Vector } from "./linear_algebra";
