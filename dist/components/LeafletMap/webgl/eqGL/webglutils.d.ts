export function loadShader(shaderPath: any): Promise<string>;
export function createShader(gl: any, shaderType: any, shaderSource: any): any;
export function createProgram(gl: any, vertexShader: any, fragmentShader: any): any;
export function createAndInitProgram(gl: any, shaderVertex: any, shaderFragment: any): any;
export function bindBuffer(gl: any, attribName: any, array: any): void;
export function bindTexture(gl: any, textureIndex: any, uniformName: any, image: any): void;
export function didShaderCompile(gl: any, shader: any, name: any): boolean;
export function didProgramLink(gl: any, program: any): boolean;
export function isProgramValid(gl: any, program: any): boolean;
