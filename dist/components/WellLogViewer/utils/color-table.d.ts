import { ColorTable } from "../components/ColorTableTypes";
export declare function colorToString(color: [number, number, number] | undefined, // [r,g,b]
cDefault: string): string;
export declare function color4ToString(color: [number, number, number, number]): string;
export declare function getInterpolatedColor(colorTable: ColorTable, v: number): [number, number, number];
export declare function getInterpolatedColorString(colorTable: ColorTable, v: number): string;
