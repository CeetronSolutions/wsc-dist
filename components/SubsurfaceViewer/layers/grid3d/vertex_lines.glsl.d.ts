declare const _default: "#version 300 es\n#define SHADER_NAME vertex-lines-shader\n\nprecision highp float;\n\nin vec3 positions;\n\nout vec4 position_commonspace;\n\nvoid main(void) {\n   vec3 position_commonspace = project_position(positions);\n   gl_Position = project_common_position_to_clipspace(vec4(position_commonspace, 0.0));\n}\n";
export default _default;
