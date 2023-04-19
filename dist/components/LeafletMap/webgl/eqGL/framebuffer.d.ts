export default FrameBuffer;
declare class FrameBuffer {
    /**
     *
     * @param {WebGLRenderingContext} gl
     * @param {Number} textureIndex
     * @param {Number} width
     * @param {Number} height
     */
    constructor(gl: WebGLRenderingContext, textureIndex: number, width: number, height: number);
    _textureIndex: number;
    _fb: any;
    _texture: WebGLTexture | null;
    index(): number;
    bind(gl: any): void;
    /**
     *
     * @param {WebGLRenderingContext} gl
     * @param {Number} width
     * @param {Number} height
     */
    _createTexture(gl: WebGLRenderingContext, width: number, height: number): WebGLTexture | null;
    _createFrameBuffer(gl: any): any;
}
