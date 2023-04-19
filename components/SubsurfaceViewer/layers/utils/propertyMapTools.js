// Decode an RGB pixel to a float value. Same operation the one performed in decoder.fs.glsl,
// but this time performed in the js world.
// Optionally, this function can also remap an [0, 1] value to a different range, [min, max].
export function decodeRGB([r, g, b], decoder, remapToRange) {
    const { rgbScaler, floatScaler, offset, step } = decoder;
    const [rScale, gScale, bScale] = rgbScaler;
    r *= rScale * 256.0 * 256.0;
    g *= gScale * 256.0;
    b *= bScale;
    let decodedValue = (r + g + b + offset) * floatScaler;
    if (step > 0) {
        decodedValue = Math.floor(decodedValue / step + 0.5) * step;
    }
    if (remapToRange) {
        const [min, max] = remapToRange;
        // If we know the min and max values, remap the [0, 1] decoded value to [min, max]
        decodedValue = decodedValue * (max - min) + min;
    }
    return decodedValue;
}
//# sourceMappingURL=propertyMapTools.js.map