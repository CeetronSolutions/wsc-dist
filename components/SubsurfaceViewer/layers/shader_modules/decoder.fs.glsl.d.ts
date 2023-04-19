declare const fs = "struct Decoder\n{\n  vec3 rgbScaler; // r, g and b multipliers\n  float floatScaler; // value multiplier\n  float offset; // translation of the r, g, b sum\n  float step; // discretize the value in a number of steps\n};\n\nuniform Decoder decoder;\n\nuniform float valueRangeMin;\nuniform float valueRangeMax;\nuniform float colorMapRangeMin;\nuniform float colorMapRangeMax;\n\n// Decode the RGB value using the decoder parameter.\nfloat decode_rgb2float(vec3 rgb, Decoder dec) {\n  rgb *= dec.rgbScaler * vec3(16711680.0, 65280.0, 255.0); //255*256*256, 255*256, 255\n  float value = (rgb.r + rgb.g + rgb.b + dec.offset) * dec.floatScaler;\n\n  // Value must be in [0, 1] and step in (0, 1]\n  value = floor(value / dec.step + 0.5) * dec.step;\n\n  // If colorMapRangeMin/Max specified, color map will span this interval.\n  float x  = value * (valueRangeMax - valueRangeMin) + valueRangeMin;\n  x = (x - colorMapRangeMin) / (colorMapRangeMax - colorMapRangeMin);\n  x = max(0.0, x);\n  x = min(1.0, x);\n\n  return x;\n}\n\n// Decode the RGB value using the decoder uniform.\nfloat decode_rgb2float(vec3 rgb) {\n  return decode_rgb2float(rgb, decoder);\n}\n";
export default fs;
