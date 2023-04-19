export { default as FrameBuffer } from "./framebuffer";
export * as Utils from "./webglutils";
export class EQGLContext {
    /**
     *
     * @param {WebGLRenderingContext} gl
     * @param {HTMLCanvasElement} canvas
     */
    constructor(gl: WebGLRenderingContext, canvas: HTMLCanvasElement);
    _gl: WebGLRenderingContext;
    _canvas: HTMLCanvasElement;
    _programs: {};
    TEXTURE_INDEX_COUNT: number;
    /**
     * @returns {DrawCmdBuilder}
     */
    new(): DrawCmdBuilder;
    /**
     * @param {Number} textureIndex
     * @param {Object} options
     * @returns {FrameBuffer}
     */
    framebuffer(options: Object): FrameBuffer;
    /**
     * @param {String} variableName
     * @returns {Variable}
     */
    variable(variableName: string): Variable;
    /**
     *
     * @param {Object} options
     * @param {HTMLImageElement} options.image
     * @param {Object} options.params - Custom gl.texParamteri-configuration
     */
    texture(options?: {
        image: HTMLImageElement;
        params: Object;
    }): Texture;
    _addProgram(cmdId: any, program: any, vert: any, frag: any): void;
    _nextTextureIndex: () => number;
    /**
     * Cleans and clears the entrie context.
     */
    clean: () => void;
}
export default eqGL;
export type eqGL = Function;
import DrawCmdBuilder from "./builder";
import FrameBuffer from "./framebuffer";
import Variable from "./variable";
import Texture from "./texture";
/**
 * @typedef {Function} eqGL
 * @returns {EQGLContext}
 */
/**
 * @type {eqGL}
 * @property {WebGLRenderingContext} gl
 * @property {HTMLCanvasElement} canvas
 */
declare const eqGL: eqGL;
