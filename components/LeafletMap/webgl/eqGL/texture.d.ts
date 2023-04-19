export default Texture;
declare class Texture {
    /**
     *
     * @param {WebGLRenderingContext} gl
     * @param {String} type
     */
    static _getType(gl: WebGLRenderingContext, type: string): number;
    constructor(gl: any, textureIndex: any, options?: {});
    _textureIndex: any;
    _options: {};
    index(): any;
    /**
     *
     * @param {WebGLRenderingContext} gl
     * @returns {Number} The index of the texture
     */
    bind(gl: WebGLRenderingContext): number;
}
