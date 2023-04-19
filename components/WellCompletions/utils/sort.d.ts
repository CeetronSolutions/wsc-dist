import { AttributeType, SortDirection } from "../redux/types";
import { WellPlotData } from "./dataUtil";
export declare const SORT_BY_NAME = "well name";
export declare const SORT_BY_STRATIGRAPHY_DEPTH = "stratigraphy depth";
export declare const SORT_BY_COMPLETION_DATE = "earliest comp date";
export declare const createAttributeKeyFunction: (sortMethod: string) => (well: WellPlotData) => AttributeType;
export declare const createSortFunction: (sortBy: Record<string, SortDirection>) => (a: WellPlotData, b: WellPlotData) => 0 | 1 | -1;
