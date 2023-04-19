/// <reference types="lib/custom" />
declare namespace _default {
    export { SyncLogViewer as component };
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
        horizontal: {
            description: string;
        };
        syncTrackPos: {
            description: string;
        };
        syncContentDomain: {
            description: string;
        };
        syncContentSelection: {
            description: string;
        };
        syncTemplate: {
            description: string;
        };
        welllogOptions: {
            description: string;
        };
        spacerOptions: {
            description: string;
        };
        readoutOptions: {
            description: string;
        };
        domain: {
            description: string;
        };
        selection: {
            description: string;
        };
        viewTitles: {
            description: string;
        };
        id: {
            description: string;
        };
        welllogs: {
            description: string;
        };
        templates: {
            description: string;
        };
        colorTables: {
            description: string;
        };
        wellpicks: {
            description: string;
        };
        patternsTable: {
            description: string;
        };
        patterns: {
            description: string;
        };
        spacers: {
            description: string;
        };
        wellDistances: {
            description: string;
        };
    };
}
export default _default;
export function Default(args: any): JSX.Element;
export namespace Default {
    namespace args {
        export const id: string;
        export const syncTrackPos: boolean;
        export const syncContentDomain: boolean;
        export const syncContentSelection: boolean;
        export const syncTemplate: boolean;
        export const horizontal: boolean;
        export const welllogs: {
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
        export const templates: {
            name: string;
            scale: {
                primary: string;
                allowSecondary: boolean;
            };
            tracks: ({
                plots: {
                    name: string;
                }[];
            } | {
                plots: {
                    name: string;
                    type: string;
                }[];
            } | {
                plots: {
                    name: string;
                    style: string;
                }[];
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
        }[];
        export { colorTables };
        export const wellpicks: {
            wellpick: {
                header: {
                    name: string;
                    well: string;
                };
                curves: ({
                    name: string;
                    quantity: string;
                    unit: string;
                    valueType: string;
                    dimensions: number;
                } | {
                    name: string;
                    valueType: string;
                    dimensions: number;
                    quantity?: undefined;
                    unit?: undefined;
                })[];
                data: (string | number)[][];
                metadata_discrete: {
                    HORIZON: {
                        attributes: string[];
                        objects: {
                            Hor_1: (number | number[])[];
                            Hor_2: (number | number[])[];
                            Hor_3: (number | number[])[];
                            Hor_4: (number | number[])[];
                            Hor_5: (number | number[])[];
                            Hor_6: (number | number[])[];
                        };
                    };
                };
            };
            name: string;
            colorTables: ({
                name: string;
                discrete: boolean;
                description: string;
                colorNaN: number[];
                colorBelow: number[];
                colorAbove: number[];
                colors: number[][];
            } | {
                name: string;
                discrete: boolean;
                colors: number[][];
                description?: undefined;
                colorNaN?: undefined;
                colorBelow?: undefined;
                colorAbove?: undefined;
            } | {
                name: string;
                discrete: string;
                colors: number[][];
                description?: undefined;
                colorNaN?: undefined;
                colorBelow?: undefined;
                colorAbove?: undefined;
            } | {
                name: string;
                discrete: boolean;
                colorNaN: number[];
                colors: number[][];
                description?: undefined;
                colorBelow?: undefined;
                colorAbove?: undefined;
            })[];
            color: string;
        }[];
        export namespace patternsTable {
            export const patternSize: number;
            export { patternImages };
            export { patternNamesEnglish as names };
        }
        export const patterns: (string | number)[][];
        export const wellpickFlatting: string[];
        export const spacers: number[];
        export namespace wellDistances {
            const units: string;
            const distances: number[];
        }
        export { axisTitles };
        export { axisMnemos };
        export const viewTitles: boolean;
        export namespace welllogOptions {
            const wellpickColorFill: boolean;
            const wellpickPatternFill: boolean;
        }
        export namespace spacerOptions {
            const wellpickColorFill_1: boolean;
            export { wellpickColorFill_1 as wellpickColorFill };
            const wellpickPatternFill_1: boolean;
            export { wellpickPatternFill_1 as wellpickPatternFill };
        }
    }
}
import SyncLogViewer from "./SyncLogViewer";
declare const ComponentCode: string;
import { "@emerson-eps/color-tables" as colorTables } from "@emerson-eps/color-tables";
declare const patternImages: any[];
declare const patternNamesEnglish: string[];
import { axisTitles } from "./utils/axes";
import { axisMnemos } from "./utils/axes";
