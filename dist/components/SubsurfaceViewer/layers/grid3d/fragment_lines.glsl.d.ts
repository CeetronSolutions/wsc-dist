declare const fragmentShader = "#version 300 es\n#define SHADER_NAME graph-layer-fragment-shader\n\nprecision highp float;\n\nout vec4 fragColor;\n\nvoid main(void) {\n  \n  // Picking pass.\n  if (picking_uActive) {\n    discard;\n    return;\n  }\n\n  fragColor = vec4(0.0, 0.0, 0.0, 1.0);\n}\n";
export default fragmentShader;
