declare var _default: "#version 300 es\n#define SHADER_NAME graph-layer-fragment-shader\n\nprecision highp float;\n\nuniform vec4 uBackGroundColor;\n\nout vec4 fragColor;\n\nvoid main(void) {\n  vec4 color = uBackGroundColor;\n  fragColor = color;\n}\n";
export default _default;
