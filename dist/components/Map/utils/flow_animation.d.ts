/**
 *  Visualises flow by simulating particles being moved by the flow.
 */
export default class FlowAnimation {
    /**
     *  Constructor
     *  @param {object} canvas - The html canvas to use for drawing.
     *  @param {number} minflow - The minimum length of travel between
     *      steps in the simulation by any particle.
     *  @param {number} maxflow - The maximum length of travel between
     *      steps in the simulation by any particle.
     *  @param {ParticleGenerator} particleGenerator
     *  @param {number} numParticles - number of particles the be showed in
     *      the canvas at any given time.
     */
    constructor(canvas: object, minflow: number, maxflow: number, particleGenerator: any, numParticles: number, pixelScale: any);
    _canvas: object | null;
    _bounds: any;
    _colors: string[];
    _colorScale: number[] & d3.ScaleThreshold<number, number, never>;
    _particleGenerator: any;
    _particles: any[];
    _numParticles: number;
    _context: any;
    _fpsInterval: number;
    _pixelScale: any;
    _drawBuckets: Map<any, any>;
    set particleGenerator(arg: any);
    get particleGenerator(): any;
    /**
     * Resets fill and line styles.
     */
    _resetDrawStyle(): void;
    /**
     * Goes through all particles and simulates their movement.
     * If any of the particles are dead, they are replaced.
     */
    _stepParticles(): void;
    get pixelScale(): any;
    /**
     * Loops simulating particles and drawing, called by
     * window.requestAnimationFrame. The method requests new animation frames
     * until this._stop. particles are animated when time elapsed matches the
     * fpsInterval.
     */
    _animate(): void;
    _requestStep: boolean | undefined;
    _requestFillBuckets: boolean | undefined;
    _animationId: number | undefined;
    _then: any;
    /**
     * Fades the trail of particles
     */
    _fadeTrails(): void;
    /**
     * Adds new lines to be drawn into this._drawBuckets which
     * is indexed by the color to draw the line.
     */
    _fillDrawBuckets(): void;
    /**
     * Draw all particle lines in this._drawBuckets.
     */
    _drawParticleLines(): void;
    _drawClear(): void;
    /**
     * Clear the screen if a clear has been requested,
     * fade the previous particle trails and draw new lines.
     */
    _draw(): void;
    _requestClear: boolean | undefined;
    /**
     * Starts the animation.
     */
    start(): void;
    _stop: boolean | undefined;
    /**
     * Clear the canvas of all lines.
     */
    clear(): void;
    /**
     *  Sets the transform of the animation inside the canvas.
     *  See canvas.getContext('2d').setTransform.
     *
     * @param {number} x - Number of pixels to translate to the right from origin
     * @param {number} y - Number of pixels to translate downwards from origin
     * @param {number} k - Scaling parameter
     * @param {number} kInit - Initial scaling
     * @param {number} angle - Number of degrees to rotate the canvas
     * @param {[x, y]} rotationCenter - Point in untranslated, unscaled canvas to rotate around
     *
     */
    setTransform(x: number, y: number, k: number, kInit: number, angle: number, rotationCenter: [number, number]): void;
    /**
     * Stops the animation.
     */
    stop(): void;
}
import * as d3 from "d3";
