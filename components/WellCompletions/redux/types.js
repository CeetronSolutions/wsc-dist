export const TimeAggregations = {
    None: (arr) => arr[arr.length - 1],
    Max: (arr) => Math.max(...arr),
    Average: (arr) => arr.reduce((a, b) => a + b) / arr.length,
};
//# sourceMappingURL=types.js.map