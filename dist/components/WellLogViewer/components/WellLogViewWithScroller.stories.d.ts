/// <reference types="lib/custom" />
declare namespace _default {
    export { WellLogViewWithScroller as component };
    export const title: string;
    export namespace parameters {
        namespace docs {
            namespace description {
                const component: string;
            }
        }
        namespace componentSource {
            export { ComponentCode as code };
            export const language: string;
        }
    }
    export const argTypes: {
        id: {
            description: string;
        };
        horizontal: {
            description: string;
        };
        welllog: {
            description: string;
        };
        template: {
            description: string;
        };
        colorTables: {
            description: string;
        };
        wellpick: {
            description: string;
        };
        patternsTable: {
            description: string;
        };
        patterns: {
            description: string;
        };
        domain: {
            description: string;
        };
        selection: {
            description: string;
        };
        primaryAxis: {
            description: string;
        };
        axisMnemos: {
            description: string;
        };
        axisTitles: {
            description: string;
        };
        viewTitle: {
            description: string;
        };
        options: {
            description: string;
        };
    };
}
export default _default;
export function Default(args: any): JSX.Element;
export namespace Default {
    namespace args {
        export const id: string;
        export const horizontal: boolean;
        export { wellLog as welllog };
        export const template: {
            name: string;
            scale: {
                primary: string;
                allowSecondary: boolean;
            };
            tracks: ({
                title: string;
                plots: ({
                    name: string;
                    style?: undefined;
                } | {
                    name: string;
                    style: string;
                })[];
                scale?: undefined;
                required?: undefined;
            } | {
                title: string;
                scale: string;
                plots: {
                    name: string;
                    style: string;
                    type: string;
                    color: string;
                    fill: string;
                    inverseColor: string;
                }[];
                required?: undefined;
            } | {
                title: string;
                plots: {
                    name: string;
                    name2: string;
                    type: string;
                    scale: string;
                    color: string;
                    color2: string;
                    fill: string;
                    fill2: string;
                }[];
                scale?: undefined;
                required?: undefined;
            } | {
                title: string;
                plots: {
                    name: string;
                    type: string;
                    color: string;
                    colorTable: string;
                    inverseColorTable: string;
                }[];
                scale?: undefined;
                required?: undefined;
            } | {
                plots: {
                    name: string;
                }[];
                title?: undefined;
                scale?: undefined;
                required?: undefined;
            } | {
                required: boolean;
                plots: {
                    name: string;
                    type: string;
                }[];
                title?: undefined;
                scale?: undefined;
            } | {
                plots: {
                    name: string;
                    type: string;
                }[];
                title?: undefined;
                scale?: undefined;
                required?: undefined;
            } | {
                plots: {
                    name: string;
                    style: string;
                }[];
                title?: undefined;
                scale?: undefined;
                required?: undefined;
            })[];
            styles: ({
                name: string;
                type: string;
                colorTable: string;
                color: string;
                scale?: undefined;
                fill?: undefined;
            } | {
                name: string;
                scale: string;
                type: string;
                color: string;
                fill: string;
                colorTable?: undefined;
            })[];
        };
        export const viewTitle: string;
        export { colorTables };
        export { axisTitles };
        export { axisMnemos };
        export namespace options {
            const checkDatafileSchema: boolean;
        }
    }
}
import WellLogViewWithScroller from "./WellLogViewWithScroller";
declare const ComponentCode: string;
declare const wellLog: {
    header: {
        name: string;
        well: string;
        operator: string;
        source: string;
        startIndex: number;
        endIndex: number;
        step: number;
    };
    curves: {
        name: string;
        description: null;
        quantity: null;
        unit: string;
        valueType: string;
        dimensions: number;
    }[];
    data: (number | null)[][];
}[];
import { "@emerson-eps/color-tables" as colorTables } from "@emerson-eps/color-tables";
import { axisTitles } from "../utils/axes";
import { axisMnemos } from "../utils/axes";
