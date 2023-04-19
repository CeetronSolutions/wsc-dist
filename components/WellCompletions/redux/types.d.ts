export interface Data {
    version: string;
    units: Units;
    stratigraphy: Zone[];
    wells: Well[];
    timeSteps: string[];
}
export interface Units {
    kh: {
        unit: string;
        decimalPlaces: number;
    };
}
export interface Zone {
    name: string;
    color: string;
    subzones?: Zone[];
}
export interface WellInfo {
    name: string;
    earliestCompDateIndex: number;
    attributes: Record<string, AttributeType>;
}
export interface Well extends WellInfo {
    completions: Record<string, Completions>;
}
export interface Completions {
    t: number[];
    open: number[];
    shut: number[];
    khMean: number[];
    khMin: number[];
    khMax: number[];
}
export declare const TimeAggregations: {
    None: (arr: number[]) => number;
    Max: (arr: number[]) => number;
    Average: (arr: number[]) => number;
};
export declare type TimeAggregation = keyof typeof TimeAggregations;
export declare type SortDirection = "Ascending" | "Descending";
export interface Attributes {
    attributeKeys: string[];
}
export declare type AttributeType = string | number | boolean | undefined;
export interface UISettings {
    timeIndexRange: [number, number];
    wellsPerPage: number;
    currentPage: number;
    timeAggregation: TimeAggregation;
    sortBy: Record<string, SortDirection>;
    isDrawerOpen: boolean;
    filteredZones: string[];
    wellSearchText: string;
    hideZeroCompletions: boolean;
    filterByAttributes: string[];
}
