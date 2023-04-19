import React from "react";
export function patternId(uid, index) {
    return "pattern" + uid + "_" + index;
}
export function createPattern(uid, index, patternsTable) {
    const patternSize = patternsTable.patternSize;
    const patternImage = patternsTable.patternImages[index];
    const id = patternId(uid, index);
    return (React.createElement("pattern", { key: id, id: id, width: patternSize, height: patternSize, patternUnits: "userSpaceOnUse" },
        React.createElement("image", { width: patternSize, height: patternSize, href: patternImage })));
}
export function createDefs(uid, patternsTable) {
    if (!patternsTable)
        return null;
    return (React.createElement("defs", { key: "defs" }, patternsTable.patternImages.map((_value, index) => createPattern(uid, index, patternsTable))));
}
//# sourceMappingURL=pattern.js.map