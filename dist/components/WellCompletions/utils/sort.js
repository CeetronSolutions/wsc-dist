//Deault sort methods
export const SORT_BY_NAME = "well name";
export const SORT_BY_STRATIGRAPHY_DEPTH = "stratigraphy depth";
export const SORT_BY_COMPLETION_DATE = "earliest comp date";
export const createAttributeKeyFunction = (sortMethod) => {
    switch (sortMethod) {
        case SORT_BY_NAME:
            return (well) => well.name;
        case SORT_BY_STRATIGRAPHY_DEPTH:
            return (well) => {
                var _a;
                return (_a = well.completions.find(
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                (_, index) => well.completions[index].open > 0)) === null || _a === void 0 ? void 0 : _a.zoneIndex;
            };
        case SORT_BY_COMPLETION_DATE:
            return (well) => well.earliestCompDateIndex;
        default:
            return (well) => well.attributes[sortMethod];
    }
};
export const createSortFunction = (sortBy) => {
    const keyFunctions = new Map(Object.keys(sortBy).map((sort) => [sort, createAttributeKeyFunction(sort)]));
    return (a, b) => {
        for (const sort in sortBy) {
            const keyFunction = keyFunctions.get(sort);
            const aAttribute = keyFunction(a);
            const bAttribute = keyFunction(b);
            if (aAttribute === bAttribute)
                continue;
            if (aAttribute === undefined ||
                bAttribute === undefined ||
                (sortBy[sort] === "Ascending" && aAttribute < bAttribute) ||
                (sortBy[sort] !== "Ascending" && aAttribute > bAttribute))
                return -1;
            else
                return 1;
        }
        return 0;
    };
};
//# sourceMappingURL=sort.js.map