import React from "react";
import { colorTablesArray } from "@emerson-eps/color-tables/";
interface LegendProps {
    min: number;
    max: number;
    title?: string;
    cssLegendStyles?: Record<string, unknown>;
    colorName?: string;
    horizontal?: boolean | null;
    colorTables?: colorTablesArray;
    id?: string;
    isRangeShown?: boolean;
    legendFontSize?: number;
    tickFontSize?: number;
    numberOfTicks?: number;
    legendScaleSize?: number;
}
declare const ContinuousLegendWrapper: React.FC<LegendProps>;
export default ContinuousLegendWrapper;
