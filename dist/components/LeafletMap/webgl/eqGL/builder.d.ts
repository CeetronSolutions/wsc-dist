export default DrawCmdBuilder;
/**
 * DrawCmdBuilder is a builder for building draw commands that can be used
 * in WebGL environments. It basically creates a configuration on how to draw with WebGL.
 */
declare class DrawCmdBuilder {
    /**
     *
     * @param {EQGLContext} context
     */
    constructor(context: any);
    _context: any;
    _vertexShader: any;
    _fragmentShader: any;
    _attributes: {};
    _uniforms: {};
    _textures: {};
    _vertexCount: number;
    _framebuffer: any;
    cmd: {
        id: number;
        frag: any;
        vert: any;
        attributes: {};
        uniforms: {};
        textures: {};
        vertexCount: number;
        viewport: any[] | undefined;
        framebuffer: any;
    } | null;
    vert(vertexShader: any): DrawCmdBuilder;
    frag(fragmentShader: any): DrawCmdBuilder;
    attribute(attributeName: any, value: any): DrawCmdBuilder;
    uniformf(uniformName: any, ...args: any[]): DrawCmdBuilder | undefined;
    uniformi(uniformName: any, ...args: any[]): DrawCmdBuilder | undefined;
    uniform(uniformName: any, type: any, value: any): DrawCmdBuilder;
    /**
     *
     * @param {String} textureName
     * @param {Number|Texture|FrameBuffer|Variable} textureUnit
     * @param {HTMLImageElement} textureImage
     *
     * @example
     * // With texture
     * eqGL.new().texture("u_image", eqGl.texture({image}))
     *
     * @example
     * // With raw image and custom textureIndex
     * eqGL.new().texture("u_image", 0, image)
     *
     * @example
     * // With framebuffer
     * const fb = eqGl.framebuffer({width, height})
     * ...
     * eqGL.new().texture("u_image", fb)
     */
    texture(textureName: string, textureUnit: number | any | any | any, textureImage: HTMLImageElement): DrawCmdBuilder;
    vertexCount(vertexCount: any): DrawCmdBuilder;
    viewport(x: any, y: any, width: any, height: any): DrawCmdBuilder;
    _viewport: any[] | undefined;
    /**
     *
     * @param {FrameBuffer|Variable} framebuffer
     */
    framebuffer(framebuffer: any | any): DrawCmdBuilder;
    /**
     * @param {DrawCmdBuilder} builder
     */
    extend(builder: DrawCmdBuilder): DrawCmdBuilder;
    build(): (props: any) => void;
}
