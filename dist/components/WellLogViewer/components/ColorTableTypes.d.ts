export interface ColorTable {
    name: string;
    colors: [number, number, number, number][];
    discrete?: boolean;
    colorNaN?: [number, number, number];
    colorBelow?: [number, number, number];
    colorAbove?: [number, number, number];
}
