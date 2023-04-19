declare const gridVertex = "#version 300 es\n#define SHADER_NAME graph-layer-axis-vertex-shader\n\nprecision highp float;\n\nin  vec3 positions;\n\nvoid main(void) {\n   vec3 position_commonspace = project_position(positions);\n   gl_Position = project_common_position_to_clipspace(vec4(position_commonspace, 0.0));\n}\n";
export default gridVertex;
