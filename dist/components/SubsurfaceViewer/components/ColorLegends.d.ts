import React from "react";
import { ExtendedLayer } from "../layers/utils/layerTools";
import { colorTablesArray } from "@emerson-eps/color-tables/";
interface ColorLegendsProps {
    cssStyle?: Record<string, unknown> | null;
    horizontal?: boolean | null;
    layers: ExtendedLayer<unknown>[];
    colorTables: colorTablesArray | string | undefined;
    reverseRange?: boolean;
}
declare const ColorLegends: React.FC<ColorLegendsProps>;
export default ColorLegends;
