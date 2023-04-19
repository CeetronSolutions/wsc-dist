import React from "react";
import { colorTablesArray } from "@emerson-eps/color-tables/";
interface LegendProps {
    colorTables?: colorTablesArray;
    min?: number;
    max?: number;
    title?: string;
    colorName?: string;
    horizontal?: boolean | null;
    discreteData?: {
        objects: Record<string, [number[], number]>;
    };
    reverseRange?: boolean;
    isModal?: boolean;
    isRangeShown?: boolean;
    legendFontSize?: number;
    tickFontSize?: number;
    numberOfTicks?: number;
    legendScaleSize?: number;
    cssLegendStyles?: Record<string, unknown>;
    openColorSelector?: boolean;
}
declare const ColorLegendWrapper: React.FC<LegendProps>;
export default ColorLegendWrapper;
