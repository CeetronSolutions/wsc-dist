declare const fsShader = "#version 300 es\n#define SHADER_NAME terrainmap-shader\n\nprecision highp float;\n\nuniform bool hasTexture;\nuniform sampler2D sampler;\nuniform bool flatShading;\nuniform float opacity;\n\nuniform bool isContoursDepth;\n\nuniform float contourReferencePoint;\nuniform float contourInterval;\n\nin vec2 vTexCoord;\nin vec3 cameraPosition;\nin vec3 normals_commonspace;\nin vec4 position_commonspace;\nin vec4 vColor;\nin vec4 positions;\n\nout vec4 fragColor;\n\nin vec3 worldPos; // we export this from vertex shader (by injecting into it).\n\nuniform sampler2D colormap;\n\nuniform float valueRangeMin;\nuniform float valueRangeMax;\nuniform float colorMapRangeMin;\nuniform float colorMapRangeMax;\n\nuniform vec3 colorMapClampColor;\nuniform bool isClampColor;\nuniform bool isColorMapClampColorTransparent;\n\n\nvoid main(void) {\n   geometry.uv = vTexCoord;\n\n   vec3 normal;\n   if (flatShading) {\n#ifdef DERIVATIVES_AVAILABLE\n      normal = normalize(cross(dFdx(position_commonspace.xyz), dFdy(position_commonspace.xyz)));\n#else\n      normal = vec3(0.0, 0.0, 1.0);\n#endif\n   } else {\n      normal = normals_commonspace;\n   }\n\n   vec4 color = hasTexture ? texture(sampler, vTexCoord) : vColor;\n\n   float texture_alpha = color.a;\n\n   // Discard transparent pixels.\n   if (!picking_uActive && color.w < 0.99) {\n         discard;\n         return;\n   }\n\n   // Picking pass.\n   if (picking_uActive) {\n      // Send texture coordinates.\n      float s = vTexCoord.x;\n      float t = vTexCoord.y;\n      float b = texture_alpha > 0.95 ? 255.0 : 0.0;\n\n      fragColor = vec4(s, t, b, 1.0);\n      return;\n   }\n\n   float propertyValue = 0.0;\n   if (hasTexture) {\n      float opcacity = color.w;\n      float floatScaler =  1.0 / (256.0 * 256.0 * 256.0 - 1.0);\n      vec3 rgb = color.rgb;\n      rgb *= vec3(16711680.0, 65280.0, 255.0); //255*256*256, 255*256, 255\n      float propertyValue_norm = (rgb.r + rgb.g + rgb.b) * floatScaler; // propertyValue_norm will be in range [0-1]\n\n      // If colorMapRangeMin/Max specified, color map will span this interval.\n      propertyValue  = propertyValue_norm * (valueRangeMax - valueRangeMin) + valueRangeMin;\n      float x = (propertyValue - colorMapRangeMin) / (colorMapRangeMax - colorMapRangeMin);\n;\n      if (x < 0.0 || x > 1.0) {\n         // Out of range. Use clampcolor.\n         if (isClampColor) {\n            color = vec4(colorMapClampColor.rgb, 1.0);\n\n         }\n         else if (isColorMapClampColorTransparent) {\n            discard;\n            return;\n         }\n         else {\n            // Use min/max color to clamp.\n            x = max(0.0, x);\n            x = min(1.0, x);\n\n            color = texture2D(colormap, vec2(x, 0.5));\n            color.a = opcacity;\n         }\n      }\n      else {\n         color = texture2D(colormap, vec2(x, 0.5));\n         color.a = opcacity;\n      }\n   }\n\n   bool is_contours = contourReferencePoint != -1.0 && contourInterval != -1.0;\n   if (is_contours) {\n      // Contours are made of either depths or properties.\n      float val =  (hasTexture && !isContoursDepth) ? (propertyValue - contourReferencePoint) / contourInterval\n                                                    : (abs(worldPos.z) - contourReferencePoint) / contourInterval;\n\n      float f  = fract(val);\n      float df = fwidth(val);\n\n      // keep: float c = smoothstep(df * 1.0, df * 2.0, f); // smootstep from/to no of pixels distance fronm contour line.\n      float c = smoothstep(0.0, df * 2.0, f);\n\n      color = color * vec4(c, c, c, 1.0);\n   }\n\n   // Use normal lighting.\n   vec3 lightColor = lighting_getLightColor(color.rgb, cameraPosition, position_commonspace.xyz, normal);\n   fragColor = vec4(lightColor, color.a * opacity);\n\n   DECKGL_FILTER_COLOR(fragColor, geometry);\n}\n";
export default fsShader;