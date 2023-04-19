declare var _default: "#version 300 es\n#define SHADER_NAME graph-layer-axis-vertex-shader\n\nprecision highp float;\n\nin vec3 positions;\nin vec3 colors;\nin float do_scale;\nin float mx;\nin float my;\nin int pie_index;\n\nflat out int pie_index_;\n\nuniform float scale;\n\nout vec4 vColor;\n\nvoid main(void) {\n\n   vec3 v = positions;\n\n   if (do_scale == 1.0) {\n      // Triangle vertex' are (mx,my) and two more. The\n      // latter two will be scaled so that the triangle (or the pie piece its part of) will\n      // have constant size depending on zoom.\n      float x = scale * (positions.x - mx);\n      float y = scale * (positions.y - my);\n\n      v = vec3(x + mx, y + my, 0.0);\n   }\n\n   vec3 position_commonspace = project_position(v);\n\n   vColor = vec4(colors.rgb, 1.0);\n\n   pie_index_ = pie_index;\n\n   gl_Position = project_common_position_to_clipspace(vec4(position_commonspace, 0.0));\n}\n";
export default _default;
