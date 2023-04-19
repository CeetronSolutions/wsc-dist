export function linearIndependent(vectors: any): boolean;
export function affineIndependent([v1, ...rest]: [any, ...any[]]): boolean;
/**
 * A vector of numerical values.
 * Vectors are iterable and immutable.
 */
export class Vector {
    /**
     * Constructor
     * Can be instantiated either with an array of floats or
     * with the floats given directly as arguments:
     *
     *     new Vector([1.0, 2.0]) === new Vector(1.0, 2.0)
     *
     * @param {[number]} data - An array-like of numerical values.
     */
    constructor(...args: any[]);
    /**
     * Initializes the vector as being empty;
     */
    _initEmpty(): void;
    _length: any;
    /**
     * Initializes the vector with the given
     * array of elements and length.
     */
    _initArray(array: any, length: any): void;
    _data: any;
    values(): any[];
    /**
     * @type {number}
     * Length of the vector.
     */
    get length(): number;
    /**
     * @type {float}
     * Magnitude of the vector (L2 norm)
     */
    get magnitude(): any;
    /**
     * @param {number} i - Index of value to get.
     * @returns {number} The value at the given index.
     */
    value(i: number): number;
    /**
     * @param {Vector} vector - A vector to multiply with.
     * @returns {Vector} The result of multiplying this with given
     *      vector, element-wise.
     */
    multiply(vector: Vector): Vector;
    /**
     * @param {number} scalar - A scalar to multiply all elements with.
     * @returns {Vector} The result of multiplying all elements in the vector
     *     with the given scalar.
     */
    scalarMultiply(scalar: number): Vector;
    /**
     * @param {Vector} vector - A vector to sum with.
     * @returns {Vector} The result of summing this with given
     *      vector, element-wise.
     */
    sum(vector: Vector): Vector;
    /**
     * @param {Vector} vector - A vector to subtract with.
     * @returns {Vector} The result of subtracting this with given
     *      vector, element-wise.
     */
    minus(vector: Vector): Vector;
    /**
     * @param { function(float64, index) } - function to apply
     *      to every value.
     * @returns {Vector} - Vector which is the result of
     *      applying the given function to each element.
     */
    transform(f: any): Vector;
    [Symbol.iterator](): {
        next(): {
            value: any;
            done: boolean;
        } | {
            done: boolean;
            value?: undefined;
        };
    };
}
/**
 * A matrix of numerical values. Matrix are iterable and immutable.
 * Iterating of the Matrix gives you vectors of rows.
 */
export class Matrix {
    /**
     * @returns The identity matrix of size n.
     */
    static identity(n: any): Matrix;
    /**
     * Constructor
     * @param {[[number]]} data - An  array-like of rows.
     *      Each row is an array-like of numerical values.
     * @param {boolean} [unsafe=false] -
     *      Perform an unchecked instantiation of the Matrix, the data will not
     *      be copied, possibly breaking immutability and length/rowLength
     *      will be taken *unchecked* as parameters. Only provided for
     *      performance reasons.
     * @param {number} [length=auto] - Length of data, only
     *      used if instantiated unsafe.
     * @param {number} [rowLength=auto] - Length of rows in
     *      data, only used if instantiated unsafe.
     */
    constructor(data: [[number]], unsafe?: boolean | undefined, length?: number | undefined, rowLength?: number | undefined);
    _data: any[];
    _length: number | undefined;
    _rowLength: number | undefined;
    values(): any;
    /**
     * @type {number}
     * Number of rows
     */
    get length(): number;
    /**
     * @type {number}
     * Length of each row.
     */
    get rowLength(): number;
    /**
     * @param {number} i - Index of a column. Must
     *     be between 0 and rowLength.
     * @returns {Vector} The ith column.
     */
    column(i: number): Vector;
    /**
     * @param {number} i - Index of a row. Must be
     *   between 0 and length.
     * @returns {Vector} The ith row.
     */
    row(i: number): Vector;
    /**
     * @param {number} i - Index of a row. Must be
     *   between 0 and length.
     * @param {number} j - Index of a column. Must
     *     be between 0 and rowLength.
     * @returns {number} The value at the given position.
     */
    value(i: number, j: number): number;
    /**
     * @returns {number} The determinant of the matrix.
     */
    determinant(): number;
    /**
     * @return {Matrix} The transpose of the matrix
     */
    transpose(): Matrix;
    /**
     * @param {Matrix} matrix2 - A matrix to multiply with
     * @returns {Matrix} The matrix product of this and matrix2.
     */
    multiply(matrix2: Matrix): Matrix;
    /**
     * @param {number} scalar - A scalar to multiply all elements with.
     * @returns {Matrix} The result of multiplying all elements in the matrix
     *     with the given scalar.
     */
    scalarMultiply(scalar: number): Matrix;
    /**
     * @param {Vector} vector - A vector to multiply with.
     * @returns {Matrix} The result of multiplying the matrix with the vector.
     */
    vectorMultiply(vector: Vector): Matrix;
    [Symbol.iterator](): {
        next(): {
            value: Vector;
            done: boolean;
        } | {
            done: boolean;
            value?: undefined;
        };
    };
}
