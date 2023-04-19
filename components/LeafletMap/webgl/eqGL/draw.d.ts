export function drawCommand(context: any, cmd: DrawCmd, props?: {}): void;
export default drawCommand;
/**
 * A number, or a string containing a number.
 */
export type DrawCmd = {
    id: number;
    /**
     * - The fragment shader
     */
    frag: string;
    /**
     * - The vertex shader
     */
    vert: string;
    /**
     * - The attributes - { [attributeName]: { value } }
     */
    attributes: Object;
    /**
     * - The uniforms - { [uniformName]: { value, type } }
     */
    uniforms: Object;
    /**
     * - The textures - { [textureName]: { textureUnit, textureImage }}
     */
    textures: Object;
    /**
     * - The number of indicies to draw with gl.drawArrays(..., ..., vertexCount)
     */
    vertexCount: number;
    /**
     * - The color of clear the canvas with
     */
    bgColor: Array<number>;
    /**
     * - The framebuffer to render the texture to
     */
    framebuffer: FrameBuffer;
    /**
     * - [x, y, width, height]
     */
    viewport: Array<number>;
};
import { FrameBuffer } from "./index";
