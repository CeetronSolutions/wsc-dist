/**
 * A particle in a given flow field. The particle decays until it
 * is dead.
 */
export default class Particle {
    /**
     * @param {number} normalX - The normalized quadrilateral x-coordinate
     *      of the particle.
     * @param {number} normalY - The normalized quadrilateral y-coordinate
     *      of the particle.
     * @param {Cell} cell - the cell the particle is in.
     * @param {Field} field - The flow field of the particle.
     */
    constructor([normalX, normalY]: number, cell: any, field: any);
    _field: any;
    _normalPosition: Vector;
    _liveness: number;
    _decayRate: number;
    _abandonDecayMult: number;
    _deadThreshold: number;
    _cell: any;
    _position: any;
    _abandoned: boolean | undefined;
    /**
     * Real coordinates of the particle.
     */
    get position(): any;
    set normalPosition(arg: Vector);
    get normalPosition(): Vector;
    _previousPosition: any;
    set cell(arg: any);
    get cell(): any;
    abandon(): void;
    get field(): any;
    /**
     * If the particle has been simulated, the position of the particle
     * before the simulation was performed.
     */
    get previousPosition(): any;
    /**
     * Whether the particle is abandoned, i.e. not belonging to a cell.
     */
    get abandoned(): boolean | undefined;
    /**
     * Whether the particle is dead, i.e. should not be showed anymore.
     */
    get dead(): boolean;
    decay(): void;
}
import { Vector } from "./linear_algebra";
