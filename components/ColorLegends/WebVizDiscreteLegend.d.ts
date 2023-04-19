import React from "react";
import { colorTablesArray } from "@emerson-eps/color-tables/";
interface LegendProps {
    discreteData: {
        objects: Record<string, [number[], number]>;
    };
    title?: string;
    cssLegendStyles?: Record<string, unknown>;
    colorName: string;
    colorTables: colorTablesArray | string | undefined;
    horizontal?: boolean | null;
}
declare const DiscreteLegendWrapper: React.FC<LegendProps>;
export default DiscreteLegendWrapper;
