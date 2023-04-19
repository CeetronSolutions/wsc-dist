import React from "react";
import { ExtendedLayer } from "../layers/utils/layerTools";
import { Color } from "@deck.gl/core/typed";
import { colorTablesArray } from "@emerson-eps/color-tables/";
import { colorMapFunctionType } from "../layers/utils/layerTools";
interface LegendBaseData {
    title: string;
    colorName: string;
    discrete: boolean;
    colorMapFunction?: colorMapFunctionType;
}
export interface DiscreteLegendDataType extends LegendBaseData {
    metadata: Record<string, [Color, number]>;
}
export interface ContinuousLegendDataType extends LegendBaseData {
    valueRange: [number, number];
}
interface ColorLegendProps {
    horizontal?: boolean | null;
    layer: ExtendedLayer<unknown>;
    colorTables: colorTablesArray | string | undefined;
    reverseRange?: boolean;
}
declare const ColorLegend: React.FC<ColorLegendProps>;
export default ColorLegend;
