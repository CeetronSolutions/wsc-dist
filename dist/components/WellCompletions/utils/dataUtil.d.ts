import { AttributeType, Data, TimeAggregation, Well, WellInfo, Zone } from "../redux/types";
/**
 * Preprocess the input data by finding the earliest completion date
 * @param data
 * @returns
 */
export declare const preprocessData: (subzones: string[], data: Data) => Data;
export interface AttributeNode {
    name: string;
    children: {
        name: AttributeType;
        key: string;
    }[];
}
/**
 * Extract well attributes into a tree structure for the use of node selector
 * @param wells
 * @param attributeKeys
 * @returns
 */
export declare const extractAttributesTree: (wells: WellInfo[], attributeKeys: string[]) => AttributeNode[];
/**
 * Compute the selected nodes from the node selector into a map of attribute keys with their allowed values
 * @param filterByAttributes an array of selected node, e.g ["name:Ann","age:37"]
 * @returns
 */
export declare const computeAllowedAttributeValues: (filterByAttributes: string[]) => Map<string, Set<string>>;
/**
 * Create a attribute predicate for well selection
 * @param filterByAttributes an array of selected node, e.g ["name:Ann","age:37"]
 * @returns
 */
export declare const createAttributePredicate: (filterByAttributes: string[]) => (well: Well) => boolean;
/**
 * DFS to find all leaf nodes
 * @param zone
 * @param result
 * @returns
 */
export declare const findSubzones: (zone: Zone, result: Zone[]) => void;
/**
 * Util method to prepare stratigraphy and well data from the given time step range and other settings for plotting
 * @param subzones
 * @param wells
 * @param range
 * @param timeAggregation
 * @param hideZeroCompletions
 * @returns
 */
export declare const computeDataToPlot: (subzones: Zone[], wells: Well[], range: [number, number], timeAggregation: TimeAggregation, hideZeroCompletions: boolean) => PlotData;
export interface PlotData {
    stratigraphy: Zone[];
    wells: WellPlotData[];
}
export interface WellPlotData extends WellInfo {
    completions: CompletionPlotData[];
}
export interface CompletionPlotData {
    zoneIndex: number;
    open: number;
    shut: number;
    khMean: number;
    khMin: number;
    khMax: number;
}
