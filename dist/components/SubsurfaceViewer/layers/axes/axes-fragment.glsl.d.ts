declare const fragmentShader = "#version 300 es\n#define SHADER_NAME graph-layer-fragment-shader\n\nprecision highp float;\n\nout vec4 fragColor;\n\nuniform vec4 uColor;\n\nvoid main(void) {\n  fragColor = uColor;\n}\n";
export default fragmentShader;
