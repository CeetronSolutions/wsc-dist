export declare type TemplatePlotScaleTypes = "linear" | "log";
export declare type TemplatePlotTypes = "" | "line" | "linestep" | "dot" | "area" | "differential" | "gradientfill" | "stacked";
export declare type CSSColor = string;
export declare type TemplatePlotProps = {
    type: TemplatePlotTypes;
    scale?: TemplatePlotScaleTypes;
    domain?: [number, number];
    color: CSSColor;
    inverseColor?: CSSColor;
    fill?: CSSColor;
    fillOpacity?: number;
    colorTable?: string;
    inverseColorTable?: string;
    colorScale?: TemplatePlotScaleTypes;
    inverseColorScale?: TemplatePlotScaleTypes;
    color2?: CSSColor;
    fill2?: CSSColor;
};
export interface TemplatePlot extends TemplatePlotProps {
    name: string;
    style?: string;
    scale?: TemplatePlotScaleTypes | undefined;
    name2?: string;
}
export declare type TemplateTrack = {
    title: string;
    required?: boolean;
    plots: TemplatePlot[];
    scale?: TemplatePlotScaleTypes;
    domain?: [number, number];
};
export interface TemplateStyle extends TemplatePlotProps {
    name: string;
}
export interface Template {
    name: string;
    scale: {
        primary: string;
        allowSecondary?: boolean;
    };
    tracks: TemplateTrack[];
    styles?: TemplateStyle[];
}
