/**
 * Two dimensional grid of Cells.
 */
export default class Grid {
    /**
     * Constructor
     * @parameter {[Cell]} cells - Array of the cells, must
     * have only one cell for each i and j coordinates.
     * @throws Error - If two cells have the same i and j coordinates.
     */
    constructor(cells: any);
    _data: any[];
    /**
     * @param {number} i
     * @param {number} j
     * @returns {Cell} The cell with given i,j-coordinate.
     */
    getCell(i: number, j: number): any;
    getCells(): any;
    get numRows(): number;
    get maxColumn(): number;
    numColumn(i: any): any;
}
