/// <reference types="lib/custom" />
declare namespace _default {
    export { WellLogView as component };
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
        export { welllogDefault as welllog };
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
        export const viewTitle: JSX.Element;
        export { colorTables };
        export { axisTitles };
        export { axisMnemos };
    }
}
export function Discrete(args: any): JSX.Element;
export namespace Discrete {
    export namespace args_1 {
        const id_1: string;
        export { id_1 as id };
        const horizontal_1: boolean;
        export { horizontal_1 as horizontal };
        export { welllogDiscrete as welllog };
        const template_1: {
            name: string;
            scale: {
                primary: string;
            };
            tracks: ({
                plots: {
                    name: string;
                    style: string;
                }[];
            } | {
                plots: {
                    name: string;
                }[];
            } | {
                plots: {
                    name: string;
                    type: string;
                }[];
            })[];
            styles: {
                name: string;
                type: string;
                colorTable: string;
            }[];
        };
        export { template_1 as template };
        const viewTitle_1: string;
        export { viewTitle_1 as viewTitle };
        export { colorTables };
        export { axisTitles };
        export { axisMnemos };
        export namespace options {
            const checkDatafileSchema: boolean;
        }
    }
    export { args_1 as args };
}
import WellLogView from "./WellLogView";
declare const ComponentCode: string;
declare const welllogDefault: {
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
declare const welllogDiscrete: ({
    header: {
        name: string;
        well: string;
        startIndex: number;
        endIndex: number;
        step: null;
    };
    curves: {
        name: string;
        description: string;
        quantity: string;
        unit: string;
        valueType: string;
        dimensions: number;
    }[];
    data: (number | null)[][];
    metadata_discrete: {
        ZONELOG: {
            attributes: string[];
            objects: {
                Above_BCU: (number | number[])[];
                ABOVE: (number | number[])[];
                H12: (number | number[])[];
                H11: (number | number[])[];
                H10: (number | number[])[];
                H9: (number | number[])[];
                H8: (number | number[])[];
                H7: (number | number[])[];
                H6: (number | number[])[];
                H5: (number | number[])[];
                H4: (number | number[])[];
                H3: (number | number[])[];
                H2: (number | number[])[];
                H1: (number | number[])[];
                BELOW: (number | number[])[];
                "2"?: undefined;
                "3"?: undefined;
                "4"?: undefined;
                "5"?: undefined;
                "6"?: undefined;
                "7"?: undefined;
                "8"?: undefined;
                "9"?: undefined;
                "10"?: undefined;
                "11"?: undefined;
                "12"?: undefined;
            };
        };
        RDE_ORIG: {
            attributes: string[];
            objects: {
                F_OFFSHORE: (number | number[])[];
                F_LOWER_SHOREFACE: (number | number[])[];
                F_UPPER_SHOREFACE: (number | number[])[];
                F_MOUTH_BAR: (number | number[])[];
                F_TIDAL_BAR: (number | number[])[];
                F_TIDAL_CHANNEL: (number | number[])[];
                F_TIDAL_FLAT_SANDY: (number | number[])[];
                F_TIDAL_FLAT_MUDDY: (number | number[])[];
                F_MARSH: (number | number[])[];
                F_CALCITE: (number | number[])[];
                R_OFFSHORE: (number | number[])[];
                R_SHOREFACE: (number | number[])[];
                R_TIDAL: (number | number[])[];
                R_ONSHORE: (number | number[])[];
                R_USF: (number | number[])[];
                R_LSF: (number | number[])[];
                "11"?: undefined;
                "12"?: undefined;
                "13"?: undefined;
                "10"?: undefined;
            };
        };
        FACIES: {
            attributes: string[];
            objects: {
                OS: (number | number[])[];
                LSF: (number | number[])[];
                USF: (number | number[])[];
                MB: (number | number[])[];
                TB: (number | number[])[];
                TC: (number | number[])[];
                TFS: (number | number[])[];
                TFM: (number | number[])[];
                MSH: (number | number[])[];
                CAL: (number | number[])[];
            };
        };
        ZONE_MAIN: {
            attributes: string[];
            objects: {
                "0": (number | number[])[];
                UPPER: (number | number[])[];
                MID: (number | number[])[];
                LOWER: (number | number[])[];
                "4": (number | number[])[];
                "1"?: undefined;
                "2"?: undefined;
                "3"?: undefined;
                ABOVE?: undefined;
                BELOW?: undefined;
            };
        };
        FaultDistance_HUM: {
            attributes: string[];
            objects: {
                no: (number | number[])[];
                yes: (number | number[])[];
            };
        };
        FAULT_PROXIMITY_FLAG: {
            attributes: string[];
            objects: {
                no: (number | number[])[];
                yes: (number | number[])[];
            };
        };
        FACIES_NoCalcite: {
            attributes: string[];
            objects: {
                F_OFFSHORE: (number | number[])[];
                F_LOWER_SHOREFACE: (number | number[])[];
                F_UPPER_SHOREFACE: (number | number[])[];
                F_MOUTH_BAR: (number | number[])[];
                F_TIDAL_BAR: (number | number[])[];
                F_TIDAL_CHANNEL: (number | number[])[];
                F_TIDAL_FLAT_SANDY: (number | number[])[];
                F_TIDAL_FLAT_MUDDY: (number | number[])[];
                F_MARSH: (number | number[])[];
                F_CALCITE: (number | number[])[];
                "8"?: undefined;
            };
        };
        RDE: {
            attributes: string[];
            objects: {
                OFFSHORE: (number | number[])[];
                LSF: (number | number[])[];
                USF: (number | number[])[];
                TIDAL: (number | number[])[];
                ONSHORE: (number | number[])[];
                "1"?: undefined;
            };
        };
    };
} | {
    header: {
        name: string;
        well: string;
        startIndex: number;
        endIndex: number;
        step: null;
    };
    curves: {
        name: string;
        description: string;
        quantity: string;
        unit: string;
        valueType: string;
        dimensions: number;
    }[];
    data: (number | null)[][];
    metadata_discrete: {
        ZONELOG: {
            attributes: string[];
            objects: {
                Above_BCU: (number | number[])[];
                ABOVE: (number | number[])[];
                H12: (number | number[])[];
                H11: (number | number[])[];
                H10: (number | number[])[];
                H9: (number | number[])[];
                H8: (number | number[])[];
                H7: (number | number[])[];
                H6: (number | number[])[];
                H5: (number | number[])[];
                H4: (number | number[])[];
                H3: (number | number[])[];
                H2: (number | number[])[];
                H1: (number | number[])[];
                BELOW: (number | number[])[];
                "2"?: undefined;
                "3"?: undefined;
                "4"?: undefined;
                "5"?: undefined;
                "6"?: undefined;
                "7"?: undefined;
                "8"?: undefined;
                "9"?: undefined;
                "10"?: undefined;
                "11"?: undefined;
                "12"?: undefined;
            };
        };
        RDE_ORIG: {
            attributes: string[];
            objects: {
                "11": (number | number[])[];
                "12": (number | number[])[];
                "13": (number | number[])[];
                R_USF: (number | number[])[];
                F_OFFSHORE?: undefined;
                F_LOWER_SHOREFACE?: undefined;
                F_UPPER_SHOREFACE?: undefined;
                F_MOUTH_BAR?: undefined;
                F_TIDAL_BAR?: undefined;
                F_TIDAL_CHANNEL?: undefined;
                F_TIDAL_FLAT_SANDY?: undefined;
                F_TIDAL_FLAT_MUDDY?: undefined;
                F_MARSH?: undefined;
                F_CALCITE?: undefined;
                R_OFFSHORE?: undefined;
                R_SHOREFACE?: undefined;
                R_TIDAL?: undefined;
                R_ONSHORE?: undefined;
                R_LSF?: undefined;
                "10"?: undefined;
            };
        };
        FACIES: {
            attributes: string[];
            objects: {
                OS: (number | number[])[];
                USF: (number | number[])[];
                MB: (number | number[])[];
                TB: (number | number[])[];
                TC: (number | number[])[];
                MSH: (number | number[])[];
                LSF?: undefined;
                TFS?: undefined;
                TFM?: undefined;
                CAL?: undefined;
            };
        };
        ZONE_MAIN: {
            attributes: string[];
            objects: {
                "0": (number | number[])[];
                "1": (number | number[])[];
                "2": (number | number[])[];
                "3": (number | number[])[];
                "4": (number | number[])[];
                UPPER?: undefined;
                MID?: undefined;
                LOWER?: undefined;
                ABOVE?: undefined;
                BELOW?: undefined;
            };
        };
        FaultDistance_HUM: {
            attributes: string[];
            objects: {
                no: (number | number[])[];
                yes: (number | number[])[];
            };
        };
        FAULT_PROXIMITY_FLAG: {
            attributes: string[];
            objects: {
                no: (number | number[])[];
                yes: (number | number[])[];
            };
        };
        FACIES_NoCalcite: {
            attributes: string[];
            objects: {
                F_UPPER_SHOREFACE: (number | number[])[];
                F_MOUTH_BAR: (number | number[])[];
                F_TIDAL_BAR: (number | number[])[];
                F_TIDAL_CHANNEL: (number | number[])[];
                "8": (number | number[])[];
                F_OFFSHORE?: undefined;
                F_LOWER_SHOREFACE?: undefined;
                F_TIDAL_FLAT_SANDY?: undefined;
                F_TIDAL_FLAT_MUDDY?: undefined;
                F_MARSH?: undefined;
                F_CALCITE?: undefined;
            };
        };
        RDE: {
            attributes: string[];
            objects: {
                "1": (number | number[])[];
                USF: (number | number[])[];
                TIDAL: (number | number[])[];
                OFFSHORE?: undefined;
                LSF?: undefined;
                ONSHORE?: undefined;
            };
        };
    };
} | {
    header: {
        name: string;
        well: string;
        startIndex: number;
        endIndex: number;
        step: null;
    };
    curves: {
        name: string;
        description: string;
        quantity: string;
        unit: string;
        valueType: string;
        dimensions: number;
    }[];
    data: (number | null)[][];
    metadata_discrete: {
        ZONELOG: {
            attributes: string[];
            objects: {
                Above_BCU: (number | number[])[];
                ABOVE: (number | number[])[];
                H12: (number | number[])[];
                H11: (number | number[])[];
                H10: (number | number[])[];
                H9: (number | number[])[];
                H8: (number | number[])[];
                H7: (number | number[])[];
                H6: (number | number[])[];
                H5: (number | number[])[];
                H4: (number | number[])[];
                H3: (number | number[])[];
                H2: (number | number[])[];
                H1: (number | number[])[];
                BELOW: (number | number[])[];
                "2"?: undefined;
                "3"?: undefined;
                "4"?: undefined;
                "5"?: undefined;
                "6"?: undefined;
                "7"?: undefined;
                "8"?: undefined;
                "9"?: undefined;
                "10"?: undefined;
                "11"?: undefined;
                "12"?: undefined;
            };
        };
        RDE_ORIG: {
            attributes: string[];
            objects: {
                F_OFFSHORE: (number | number[])[];
                F_LOWER_SHOREFACE: (number | number[])[];
                F_UPPER_SHOREFACE: (number | number[])[];
                F_MOUTH_BAR: (number | number[])[];
                F_TIDAL_BAR: (number | number[])[];
                F_TIDAL_CHANNEL: (number | number[])[];
                F_TIDAL_FLAT_SANDY: (number | number[])[];
                F_TIDAL_FLAT_MUDDY: (number | number[])[];
                F_MARSH: (number | number[])[];
                F_CALCITE: (number | number[])[];
                R_OFFSHORE: (number | number[])[];
                R_SHOREFACE: (number | number[])[];
                R_TIDAL: (number | number[])[];
                "13": (number | number[])[];
                R_USF: (number | number[])[];
                R_LSF: (number | number[])[];
                R_ONSHORE?: undefined;
                "11"?: undefined;
                "12"?: undefined;
                "10"?: undefined;
            };
        };
        FACIES: {
            attributes: string[];
            objects: {
                OS: (number | number[])[];
                LSF: (number | number[])[];
                USF: (number | number[])[];
                MB: (number | number[])[];
                TB: (number | number[])[];
                TC: (number | number[])[];
                TFS: (number | number[])[];
                TFM: (number | number[])[];
                MSH: (number | number[])[];
                CAL: (number | number[])[];
            };
        };
        ZONE_MAIN: {
            attributes: string[];
            objects: {
                "0": (number | number[])[];
                UPPER: (number | number[])[];
                MID: (number | number[])[];
                LOWER: (number | number[])[];
                "4": (number | number[])[];
                "1"?: undefined;
                "2"?: undefined;
                "3"?: undefined;
                ABOVE?: undefined;
                BELOW?: undefined;
            };
        };
        FaultDistance_HUM: {
            attributes: string[];
            objects: {
                no: (number | number[])[];
                yes: (number | number[])[];
            };
        };
        FAULT_PROXIMITY_FLAG: {
            attributes: string[];
            objects: {
                no: (number | number[])[];
                yes: (number | number[])[];
            };
        };
        FACIES_NoCalcite: {
            attributes: string[];
            objects: {
                F_OFFSHORE: (number | number[])[];
                F_LOWER_SHOREFACE: (number | number[])[];
                F_UPPER_SHOREFACE: (number | number[])[];
                F_MOUTH_BAR: (number | number[])[];
                F_TIDAL_BAR: (number | number[])[];
                F_TIDAL_CHANNEL: (number | number[])[];
                F_TIDAL_FLAT_SANDY: (number | number[])[];
                F_TIDAL_FLAT_MUDDY: (number | number[])[];
                "8": (number | number[])[];
                F_CALCITE: (number | number[])[];
                F_MARSH?: undefined;
            };
        };
        RDE: {
            attributes: string[];
            objects: {
                OFFSHORE: (number | number[])[];
                LSF: (number | number[])[];
                USF: (number | number[])[];
                TIDAL: (number | number[])[];
                ONSHORE: (number | number[])[];
                "1"?: undefined;
            };
        };
    };
} | {
    header: {
        name: string;
        well: string;
        startIndex: number;
        endIndex: number;
        step: null;
    };
    curves: {
        name: string;
        description: string;
        quantity: string;
        unit: string;
        valueType: string;
        dimensions: number;
    }[];
    data: (number | null)[][];
    metadata_discrete: {
        ZONELOG: {
            attributes: string[];
            objects: {
                Above_BCU: (number | number[])[];
                ABOVE: (number | number[])[];
                H12: (number | number[])[];
                H11: (number | number[])[];
                H10: (number | number[])[];
                H9: (number | number[])[];
                H8: (number | number[])[];
                H7: (number | number[])[];
                H6: (number | number[])[];
                H5: (number | number[])[];
                H4: (number | number[])[];
                H3: (number | number[])[];
                H2: (number | number[])[];
                H1: (number | number[])[];
                BELOW: (number | number[])[];
                "2"?: undefined;
                "3"?: undefined;
                "4"?: undefined;
                "5"?: undefined;
                "6"?: undefined;
                "7"?: undefined;
                "8"?: undefined;
                "9"?: undefined;
                "10"?: undefined;
                "11"?: undefined;
                "12"?: undefined;
            };
        };
        RDE_ORIG: {
            attributes: string[];
            objects: {
                F_OFFSHORE: (number | number[])[];
                F_LOWER_SHOREFACE: (number | number[])[];
                F_UPPER_SHOREFACE: (number | number[])[];
                F_MOUTH_BAR: (number | number[])[];
                F_TIDAL_BAR: (number | number[])[];
                F_TIDAL_CHANNEL: (number | number[])[];
                F_TIDAL_FLAT_SANDY: (number | number[])[];
                F_TIDAL_FLAT_MUDDY: (number | number[])[];
                F_MARSH: (number | number[])[];
                F_CALCITE: (number | number[])[];
                "10": (number | number[])[];
                "12": (number | number[])[];
                R_OFFSHORE?: undefined;
                R_SHOREFACE?: undefined;
                R_TIDAL?: undefined;
                R_ONSHORE?: undefined;
                R_USF?: undefined;
                R_LSF?: undefined;
                "11"?: undefined;
                "13"?: undefined;
            };
        };
        FACIES: {
            attributes: string[];
            objects: {
                OS: (number | number[])[];
                LSF: (number | number[])[];
                USF: (number | number[])[];
                MB: (number | number[])[];
                TB: (number | number[])[];
                TC: (number | number[])[];
                TFS: (number | number[])[];
                TFM: (number | number[])[];
                MSH: (number | number[])[];
                CAL: (number | number[])[];
            };
        };
        FAULT_PROXIMITY_FLAG: {
            attributes: string[];
            objects: {
                no: (number | number[])[];
                yes: (number | number[])[];
            };
        };
        FACIES_NoCalcite: {
            attributes: string[];
            objects: {
                F_OFFSHORE: (number | number[])[];
                F_LOWER_SHOREFACE: (number | number[])[];
                F_UPPER_SHOREFACE: (number | number[])[];
                F_MOUTH_BAR: (number | number[])[];
                F_TIDAL_BAR: (number | number[])[];
                F_TIDAL_CHANNEL: (number | number[])[];
                F_TIDAL_FLAT_SANDY: (number | number[])[];
                F_TIDAL_FLAT_MUDDY: (number | number[])[];
                F_MARSH: (number | number[])[];
                F_CALCITE: (number | number[])[];
                "8"?: undefined;
            };
        };
        RDE: {
            attributes: string[];
            objects: {
                TIDAL: (number | number[])[];
                OFFSHORE?: undefined;
                LSF?: undefined;
                USF?: undefined;
                ONSHORE?: undefined;
                "1"?: undefined;
            };
        };
        ZONE_MAIN?: undefined;
        FaultDistance_HUM?: undefined;
    };
} | {
    header: {
        name: string;
        well: string;
        startIndex: number;
        endIndex: number;
        step: null;
    };
    curves: {
        name: string;
        description: string;
        quantity: string;
        unit: string;
        valueType: string;
        dimensions: number;
    }[];
    data: (number | null)[][];
    metadata_discrete: {
        ZONELOG: {
            attributes: string[];
            objects: {
                Above_BCU: (number | number[])[];
                ABOVE: (number | number[])[];
                H12: (number | number[])[];
                H11: (number | number[])[];
                H10: (number | number[])[];
                H9: (number | number[])[];
                H8: (number | number[])[];
                H7: (number | number[])[];
                H6: (number | number[])[];
                H5: (number | number[])[];
                H4: (number | number[])[];
                H3: (number | number[])[];
                H2: (number | number[])[];
                H1: (number | number[])[];
                BELOW: (number | number[])[];
                "2"?: undefined;
                "3"?: undefined;
                "4"?: undefined;
                "5"?: undefined;
                "6"?: undefined;
                "7"?: undefined;
                "8"?: undefined;
                "9"?: undefined;
                "10"?: undefined;
                "11"?: undefined;
                "12"?: undefined;
            };
        };
        RDE_ORIG: {
            attributes: string[];
            objects: {
                F_OFFSHORE: (number | number[])[];
                F_LOWER_SHOREFACE: (number | number[])[];
                F_UPPER_SHOREFACE: (number | number[])[];
                F_MOUTH_BAR: (number | number[])[];
                F_TIDAL_BAR: (number | number[])[];
                F_TIDAL_CHANNEL: (number | number[])[];
                F_TIDAL_FLAT_SANDY: (number | number[])[];
                F_TIDAL_FLAT_MUDDY: (number | number[])[];
                F_MARSH: (number | number[])[];
                F_CALCITE: (number | number[])[];
                "10": (number | number[])[];
                "11": (number | number[])[];
                "12": (number | number[])[];
                "13": (number | number[])[];
                R_USF: (number | number[])[];
                R_LSF: (number | number[])[];
                R_OFFSHORE?: undefined;
                R_SHOREFACE?: undefined;
                R_TIDAL?: undefined;
                R_ONSHORE?: undefined;
            };
        };
        FACIES: {
            attributes: string[];
            objects: {
                OS: (number | number[])[];
                LSF: (number | number[])[];
                USF: (number | number[])[];
                MB: (number | number[])[];
                TB: (number | number[])[];
                TC: (number | number[])[];
                TFS: (number | number[])[];
                TFM: (number | number[])[];
                MSH: (number | number[])[];
                CAL: (number | number[])[];
            };
        };
        ZONE_MAIN: {
            attributes: string[];
            objects: {
                "1": (number | number[])[];
                "2": (number | number[])[];
                "3": (number | number[])[];
                "4": (number | number[])[];
                "0"?: undefined;
                UPPER?: undefined;
                MID?: undefined;
                LOWER?: undefined;
                ABOVE?: undefined;
                BELOW?: undefined;
            };
        };
        FaultDistance_HUM: {
            attributes: string[];
            objects: {
                no: (number | number[])[];
                yes: (number | number[])[];
            };
        };
        FAULT_PROXIMITY_FLAG: {
            attributes: string[];
            objects: {
                no: (number | number[])[];
                yes: (number | number[])[];
            };
        };
        FACIES_NoCalcite: {
            attributes: string[];
            objects: {
                F_OFFSHORE: (number | number[])[];
                F_LOWER_SHOREFACE: (number | number[])[];
                F_UPPER_SHOREFACE: (number | number[])[];
                F_MOUTH_BAR: (number | number[])[];
                F_TIDAL_BAR: (number | number[])[];
                F_TIDAL_CHANNEL: (number | number[])[];
                F_TIDAL_FLAT_SANDY: (number | number[])[];
                F_TIDAL_FLAT_MUDDY: (number | number[])[];
                F_MARSH: (number | number[])[];
                F_CALCITE: (number | number[])[];
                "8"?: undefined;
            };
        };
        RDE: {
            attributes: string[];
            objects: {
                OFFSHORE: (number | number[])[];
                LSF: (number | number[])[];
                USF: (number | number[])[];
                TIDAL: (number | number[])[];
                ONSHORE: (number | number[])[];
                "1"?: undefined;
            };
        };
    };
} | {
    header: {
        name: string;
        well: string;
        startIndex: number;
        endIndex: number;
        step: null;
    };
    curves: {
        name: string;
        description: string;
        quantity: string;
        unit: string;
        valueType: string;
        dimensions: number;
    }[];
    data: (number | null)[][];
    metadata_discrete: {
        ZONELOG: {
            attributes: string[];
            objects: {
                Above_BCU: (number | number[])[];
                ABOVE: (number | number[])[];
                H12: (number | number[])[];
                H11: (number | number[])[];
                H10: (number | number[])[];
                H9: (number | number[])[];
                H8: (number | number[])[];
                H7: (number | number[])[];
                H6: (number | number[])[];
                H5: (number | number[])[];
                H4: (number | number[])[];
                H3: (number | number[])[];
                H2: (number | number[])[];
                H1: (number | number[])[];
                BELOW: (number | number[])[];
                "2"?: undefined;
                "3"?: undefined;
                "4"?: undefined;
                "5"?: undefined;
                "6"?: undefined;
                "7"?: undefined;
                "8"?: undefined;
                "9"?: undefined;
                "10"?: undefined;
                "11"?: undefined;
                "12"?: undefined;
            };
        };
        RDE_ORIG: {
            attributes: string[];
            objects: {
                F_OFFSHORE: (number | number[])[];
                F_LOWER_SHOREFACE: (number | number[])[];
                F_UPPER_SHOREFACE: (number | number[])[];
                F_MOUTH_BAR: (number | number[])[];
                F_TIDAL_BAR: (number | number[])[];
                F_TIDAL_CHANNEL: (number | number[])[];
                F_TIDAL_FLAT_SANDY: (number | number[])[];
                F_TIDAL_FLAT_MUDDY: (number | number[])[];
                F_MARSH: (number | number[])[];
                F_CALCITE: (number | number[])[];
                R_OFFSHORE?: undefined;
                R_SHOREFACE?: undefined;
                R_TIDAL?: undefined;
                R_ONSHORE?: undefined;
                R_USF?: undefined;
                R_LSF?: undefined;
                "11"?: undefined;
                "12"?: undefined;
                "13"?: undefined;
                "10"?: undefined;
            };
        };
        FACIES: {
            attributes: string[];
            objects: {
                TB: (number | number[])[];
                CAL: (number | number[])[];
                OS?: undefined;
                LSF?: undefined;
                USF?: undefined;
                MB?: undefined;
                TC?: undefined;
                TFS?: undefined;
                TFM?: undefined;
                MSH?: undefined;
            };
        };
        FAULT_PROXIMITY_FLAG: {
            attributes: string[];
            objects: {
                no: (number | number[])[];
                yes: (number | number[])[];
            };
        };
        FACIES_NoCalcite: {
            attributes: string[];
            objects: {
                F_TIDAL_BAR: (number | number[])[];
                F_OFFSHORE?: undefined;
                F_LOWER_SHOREFACE?: undefined;
                F_UPPER_SHOREFACE?: undefined;
                F_MOUTH_BAR?: undefined;
                F_TIDAL_CHANNEL?: undefined;
                F_TIDAL_FLAT_SANDY?: undefined;
                F_TIDAL_FLAT_MUDDY?: undefined;
                F_MARSH?: undefined;
                F_CALCITE?: undefined;
                "8"?: undefined;
            };
        };
        RDE: {
            attributes: string[];
            objects: {
                OFFSHORE?: undefined;
                LSF?: undefined;
                USF?: undefined;
                TIDAL?: undefined;
                ONSHORE?: undefined;
                "1"?: undefined;
            };
        };
        ZONE_MAIN?: undefined;
        FaultDistance_HUM?: undefined;
    };
} | {
    header: {
        name: string;
        well: string;
        startIndex: number;
        endIndex: number;
        step: null;
    };
    curves: {
        name: string;
        description: string;
        quantity: string;
        unit: string;
        valueType: string;
        dimensions: number;
    }[];
    data: (number | null)[][];
    metadata_discrete: {
        ZONELOG: {
            attributes: string[];
            objects: {
                Above_BCU: (number | number[])[];
                ABOVE: (number | number[])[];
                H12: (number | number[])[];
                H11: (number | number[])[];
                H10: (number | number[])[];
                H9: (number | number[])[];
                H8: (number | number[])[];
                H7: (number | number[])[];
                H6: (number | number[])[];
                H5: (number | number[])[];
                H4: (number | number[])[];
                H3: (number | number[])[];
                H2: (number | number[])[];
                H1: (number | number[])[];
                BELOW: (number | number[])[];
                "2"?: undefined;
                "3"?: undefined;
                "4"?: undefined;
                "5"?: undefined;
                "6"?: undefined;
                "7"?: undefined;
                "8"?: undefined;
                "9"?: undefined;
                "10"?: undefined;
                "11"?: undefined;
                "12"?: undefined;
            };
        };
        RDE_ORIG: {
            attributes: string[];
            objects: {
                F_OFFSHORE: (number | number[])[];
                F_LOWER_SHOREFACE: (number | number[])[];
                F_UPPER_SHOREFACE: (number | number[])[];
                F_MOUTH_BAR: (number | number[])[];
                F_TIDAL_BAR: (number | number[])[];
                F_TIDAL_CHANNEL: (number | number[])[];
                F_TIDAL_FLAT_SANDY: (number | number[])[];
                F_TIDAL_FLAT_MUDDY: (number | number[])[];
                F_MARSH: (number | number[])[];
                F_CALCITE: (number | number[])[];
                R_OFFSHORE?: undefined;
                R_SHOREFACE?: undefined;
                R_TIDAL?: undefined;
                R_ONSHORE?: undefined;
                R_USF?: undefined;
                R_LSF?: undefined;
                "11"?: undefined;
                "12"?: undefined;
                "13"?: undefined;
                "10"?: undefined;
            };
        };
        FAULT_PROXIMITY_FLAG: {
            attributes: string[];
            objects: {
                no: (number | number[])[];
                yes: (number | number[])[];
            };
        };
        FACIES: {
            attributes: string[];
            objects: {
                OS?: undefined;
                LSF?: undefined;
                USF?: undefined;
                MB?: undefined;
                TB?: undefined;
                TC?: undefined;
                TFS?: undefined;
                TFM?: undefined;
                MSH?: undefined;
                CAL?: undefined;
            };
        };
        RDE: {
            attributes: string[];
            objects: {
                OFFSHORE?: undefined;
                LSF?: undefined;
                USF?: undefined;
                TIDAL?: undefined;
                ONSHORE?: undefined;
                "1"?: undefined;
            };
        };
        ZONE_MAIN?: undefined;
        FaultDistance_HUM?: undefined;
        FACIES_NoCalcite?: undefined;
    };
} | {
    header: {
        name: string;
        well: string;
        startIndex: number;
        endIndex: number;
        step: null;
    };
    curves: {
        name: string;
        description: string;
        quantity: string;
        unit: string;
        valueType: string;
        dimensions: number;
    }[];
    data: (number | null)[][];
    metadata_discrete: {
        ZONELOG: {
            attributes: string[];
            objects: {
                Above_BCU: (number | number[])[];
                ABOVE: (number | number[])[];
                H12: (number | number[])[];
                H11: (number | number[])[];
                H10: (number | number[])[];
                H9: (number | number[])[];
                H8: (number | number[])[];
                H7: (number | number[])[];
                H6: (number | number[])[];
                H5: (number | number[])[];
                H4: (number | number[])[];
                H3: (number | number[])[];
                H2: (number | number[])[];
                H1: (number | number[])[];
                BELOW: (number | number[])[];
                "2"?: undefined;
                "3"?: undefined;
                "4"?: undefined;
                "5"?: undefined;
                "6"?: undefined;
                "7"?: undefined;
                "8"?: undefined;
                "9"?: undefined;
                "10"?: undefined;
                "11"?: undefined;
                "12"?: undefined;
            };
        };
        RDE_ORIG: {
            attributes: string[];
            objects: {
                F_OFFSHORE: (number | number[])[];
                F_LOWER_SHOREFACE: (number | number[])[];
                F_UPPER_SHOREFACE: (number | number[])[];
                F_MOUTH_BAR: (number | number[])[];
                F_TIDAL_BAR: (number | number[])[];
                F_TIDAL_CHANNEL: (number | number[])[];
                F_TIDAL_FLAT_SANDY: (number | number[])[];
                F_TIDAL_FLAT_MUDDY: (number | number[])[];
                F_MARSH: (number | number[])[];
                F_CALCITE: (number | number[])[];
                R_OFFSHORE?: undefined;
                R_SHOREFACE?: undefined;
                R_TIDAL?: undefined;
                R_ONSHORE?: undefined;
                R_USF?: undefined;
                R_LSF?: undefined;
                "11"?: undefined;
                "12"?: undefined;
                "13"?: undefined;
                "10"?: undefined;
            };
        };
        ZONE_MAIN: {
            attributes: string[];
            objects: {
                "0": (number | number[])[];
                "1": (number | number[])[];
                "2": (number | number[])[];
                "3": (number | number[])[];
                "4": (number | number[])[];
                UPPER?: undefined;
                MID?: undefined;
                LOWER?: undefined;
                ABOVE?: undefined;
                BELOW?: undefined;
            };
        };
        FaultDistance_HUM: {
            attributes: string[];
            objects: {
                no: (number | number[])[];
                yes: (number | number[])[];
            };
        };
        FAULT_PROXIMITY_FLAG: {
            attributes: string[];
            objects: {
                no: (number | number[])[];
                yes: (number | number[])[];
            };
        };
        FACIES: {
            attributes: string[];
            objects: {
                CAL: (number | number[])[];
                OS?: undefined;
                LSF?: undefined;
                USF?: undefined;
                MB?: undefined;
                TB?: undefined;
                TC?: undefined;
                TFS?: undefined;
                TFM?: undefined;
                MSH?: undefined;
            };
        };
        RDE: {
            attributes: string[];
            objects: {
                OFFSHORE?: undefined;
                LSF?: undefined;
                USF?: undefined;
                TIDAL?: undefined;
                ONSHORE?: undefined;
                "1"?: undefined;
            };
        };
        FACIES_NoCalcite?: undefined;
    };
} | {
    header: {
        name: string;
        well: string;
        startIndex: number;
        endIndex: number;
        step: null;
    };
    curves: {
        name: string;
        description: string;
        quantity: string;
        unit: string;
        valueType: string;
        dimensions: number;
    }[];
    data: (number | null)[][];
    metadata_discrete: {
        ZONELOG: {
            attributes: string[];
            objects: {
                Above_BCU: (number | number[])[];
                ABOVE: (number | number[])[];
                H12: (number | number[])[];
                H11: (number | number[])[];
                H10: (number | number[])[];
                H9: (number | number[])[];
                H8: (number | number[])[];
                H7: (number | number[])[];
                H6: (number | number[])[];
                H5: (number | number[])[];
                H4: (number | number[])[];
                H3: (number | number[])[];
                H2: (number | number[])[];
                H1: (number | number[])[];
                BELOW: (number | number[])[];
                "2"?: undefined;
                "3"?: undefined;
                "4"?: undefined;
                "5"?: undefined;
                "6"?: undefined;
                "7"?: undefined;
                "8"?: undefined;
                "9"?: undefined;
                "10"?: undefined;
                "11"?: undefined;
                "12"?: undefined;
            };
        };
        RDE_ORIG: {
            attributes: string[];
            objects: {
                F_OFFSHORE: (number | number[])[];
                F_LOWER_SHOREFACE: (number | number[])[];
                F_UPPER_SHOREFACE: (number | number[])[];
                F_MOUTH_BAR: (number | number[])[];
                F_TIDAL_BAR: (number | number[])[];
                F_TIDAL_CHANNEL: (number | number[])[];
                F_TIDAL_FLAT_SANDY: (number | number[])[];
                F_TIDAL_FLAT_MUDDY: (number | number[])[];
                F_MARSH: (number | number[])[];
                F_CALCITE: (number | number[])[];
                R_OFFSHORE: (number | number[])[];
                R_TIDAL: (number | number[])[];
                R_SHOREFACE?: undefined;
                R_ONSHORE?: undefined;
                R_USF?: undefined;
                R_LSF?: undefined;
                "11"?: undefined;
                "12"?: undefined;
                "13"?: undefined;
                "10"?: undefined;
            };
        };
        ZONE_MAIN: {
            attributes: string[];
            objects: {
                "0": (number | number[])[];
                UPPER: (number | number[])[];
                MID: (number | number[])[];
                LOWER: (number | number[])[];
                "4": (number | number[])[];
                "1"?: undefined;
                "2"?: undefined;
                "3"?: undefined;
                ABOVE?: undefined;
                BELOW?: undefined;
            };
        };
        FaultDistance_HUM: {
            attributes: string[];
            objects: {
                no: (number | number[])[];
                yes: (number | number[])[];
            };
        };
        FACIES: {
            attributes: string[];
            objects: {
                CAL: (number | number[])[];
                OS?: undefined;
                LSF?: undefined;
                USF?: undefined;
                MB?: undefined;
                TB?: undefined;
                TC?: undefined;
                TFS?: undefined;
                TFM?: undefined;
                MSH?: undefined;
            };
        };
        FAULT_PROXIMITY_FLAG: {
            attributes: string[];
            objects: {
                no: (number | number[])[];
                yes: (number | number[])[];
            };
        };
        FACIES_NoCalcite: {
            attributes: string[];
            objects: {
                F_OFFSHORE?: undefined;
                F_LOWER_SHOREFACE?: undefined;
                F_UPPER_SHOREFACE?: undefined;
                F_MOUTH_BAR?: undefined;
                F_TIDAL_BAR?: undefined;
                F_TIDAL_CHANNEL?: undefined;
                F_TIDAL_FLAT_SANDY?: undefined;
                F_TIDAL_FLAT_MUDDY?: undefined;
                F_MARSH?: undefined;
                F_CALCITE?: undefined;
                "8"?: undefined;
            };
        };
        RDE: {
            attributes: string[];
            objects: {
                OFFSHORE: (number | number[])[];
                TIDAL: (number | number[])[];
                LSF?: undefined;
                USF?: undefined;
                ONSHORE?: undefined;
                "1"?: undefined;
            };
        };
    };
} | {
    header: {
        name: string;
        well: string;
        startIndex: number;
        endIndex: number;
        step: null;
    };
    curves: {
        name: string;
        description: string;
        quantity: string;
        unit: string;
        valueType: string;
        dimensions: number;
    }[];
    data: (number | null)[][];
    metadata_discrete: {
        ZONELOG: {
            attributes: string[];
            objects: {
                Above_BCU: (number | number[])[];
                ABOVE: (number | number[])[];
                H12: (number | number[])[];
                H11: (number | number[])[];
                H10: (number | number[])[];
                H9: (number | number[])[];
                H8: (number | number[])[];
                H7: (number | number[])[];
                H6: (number | number[])[];
                H5: (number | number[])[];
                H4: (number | number[])[];
                H3: (number | number[])[];
                H2: (number | number[])[];
                H1: (number | number[])[];
                BELOW: (number | number[])[];
                "2"?: undefined;
                "3"?: undefined;
                "4"?: undefined;
                "5"?: undefined;
                "6"?: undefined;
                "7"?: undefined;
                "8"?: undefined;
                "9"?: undefined;
                "10"?: undefined;
                "11"?: undefined;
                "12"?: undefined;
            };
        };
        RDE_ORIG: {
            attributes: string[];
            objects: {
                F_OFFSHORE: (number | number[])[];
                F_LOWER_SHOREFACE: (number | number[])[];
                F_UPPER_SHOREFACE: (number | number[])[];
                F_MOUTH_BAR: (number | number[])[];
                F_TIDAL_BAR: (number | number[])[];
                F_TIDAL_CHANNEL: (number | number[])[];
                F_TIDAL_FLAT_SANDY: (number | number[])[];
                F_TIDAL_FLAT_MUDDY: (number | number[])[];
                F_MARSH: (number | number[])[];
                F_CALCITE: (number | number[])[];
                R_OFFSHORE: (number | number[])[];
                R_SHOREFACE: (number | number[])[];
                R_TIDAL: (number | number[])[];
                R_ONSHORE: (number | number[])[];
                R_USF: (number | number[])[];
                R_LSF: (number | number[])[];
                "11"?: undefined;
                "12"?: undefined;
                "13"?: undefined;
                "10"?: undefined;
            };
        };
        ZONE_MAIN: {
            attributes: string[];
            objects: {
                ABOVE: (number | number[])[];
                UPPER: (number | number[])[];
                MID: (number | number[])[];
                LOWER: (number | number[])[];
                BELOW: (number | number[])[];
                "0"?: undefined;
                "4"?: undefined;
                "1"?: undefined;
                "2"?: undefined;
                "3"?: undefined;
            };
        };
        FaultDistance_HUM: {
            attributes: string[];
            objects: {
                no: (number | number[])[];
                yes: (number | number[])[];
            };
        };
        FACIES: {
            attributes: string[];
            objects: {
                OS: (number | number[])[];
                LSF: (number | number[])[];
                USF: (number | number[])[];
                MB: (number | number[])[];
                TB: (number | number[])[];
                TC: (number | number[])[];
                MSH: (number | number[])[];
                CAL: (number | number[])[];
                TFS?: undefined;
                TFM?: undefined;
            };
        };
        FAULT_PROXIMITY_FLAG: {
            attributes: string[];
            objects: {
                no: (number | number[])[];
                yes: (number | number[])[];
            };
        };
        FACIES_NoCalcite: {
            attributes: string[];
            objects: {
                F_OFFSHORE: (number | number[])[];
                F_LOWER_SHOREFACE: (number | number[])[];
                F_UPPER_SHOREFACE: (number | number[])[];
                F_MOUTH_BAR: (number | number[])[];
                F_TIDAL_BAR: (number | number[])[];
                F_TIDAL_CHANNEL: (number | number[])[];
                F_MARSH: (number | number[])[];
                F_CALCITE: (number | number[])[];
                F_TIDAL_FLAT_SANDY?: undefined;
                F_TIDAL_FLAT_MUDDY?: undefined;
                "8"?: undefined;
            };
        };
        RDE: {
            attributes: string[];
            objects: {
                OFFSHORE: (number | number[])[];
                LSF: (number | number[])[];
                USF: (number | number[])[];
                TIDAL: (number | number[])[];
                ONSHORE: (number | number[])[];
                "1"?: undefined;
            };
        };
    };
} | {
    header: {
        name: string;
        well: string;
        startIndex: number;
        endIndex: number;
        step: null;
    };
    curves: {
        name: string;
        description: string;
        quantity: string;
        unit: string;
        valueType: string;
        dimensions: number;
    }[];
    data: (number | null)[][];
    metadata_discrete: {
        ZONELOG: {
            attributes: string[];
            objects: {
                Above_BCU: (number | number[])[];
                ABOVE: (number | number[])[];
                H12: (number | number[])[];
                H11: (number | number[])[];
                H10: (number | number[])[];
                H9: (number | number[])[];
                H8: (number | number[])[];
                H7: (number | number[])[];
                H6: (number | number[])[];
                H5: (number | number[])[];
                H4: (number | number[])[];
                H3: (number | number[])[];
                H2: (number | number[])[];
                H1: (number | number[])[];
                BELOW: (number | number[])[];
                "2"?: undefined;
                "3"?: undefined;
                "4"?: undefined;
                "5"?: undefined;
                "6"?: undefined;
                "7"?: undefined;
                "8"?: undefined;
                "9"?: undefined;
                "10"?: undefined;
                "11"?: undefined;
                "12"?: undefined;
            };
        };
        RDE_ORIG: {
            attributes: string[];
            objects: {
                F_OFFSHORE: (number | number[])[];
                F_LOWER_SHOREFACE: (number | number[])[];
                F_UPPER_SHOREFACE: (number | number[])[];
                F_MOUTH_BAR: (number | number[])[];
                F_TIDAL_BAR: (number | number[])[];
                F_TIDAL_CHANNEL: (number | number[])[];
                F_TIDAL_FLAT_SANDY: (number | number[])[];
                F_TIDAL_FLAT_MUDDY: (number | number[])[];
                F_MARSH: (number | number[])[];
                F_CALCITE: (number | number[])[];
                R_OFFSHORE: (number | number[])[];
                R_SHOREFACE: (number | number[])[];
                R_TIDAL: (number | number[])[];
                R_ONSHORE: (number | number[])[];
                R_USF: (number | number[])[];
                R_LSF: (number | number[])[];
                "11"?: undefined;
                "12"?: undefined;
                "13"?: undefined;
                "10"?: undefined;
            };
        };
        ZONE_MAIN: {
            attributes: string[];
            objects: {
                "0": (number | number[])[];
                UPPER: (number | number[])[];
                MID: (number | number[])[];
                LOWER: (number | number[])[];
                "4"?: undefined;
                "1"?: undefined;
                "2"?: undefined;
                "3"?: undefined;
                ABOVE?: undefined;
                BELOW?: undefined;
            };
        };
        FaultDistance_HUM: {
            attributes: string[];
            objects: {
                no: (number | number[])[];
                yes: (number | number[])[];
            };
        };
        FACIES: {
            attributes: string[];
            objects: {
                OS: (number | number[])[];
                LSF: (number | number[])[];
                USF: (number | number[])[];
                MB: (number | number[])[];
                TB: (number | number[])[];
                TC: (number | number[])[];
                TFS?: undefined;
                TFM?: undefined;
                MSH?: undefined;
                CAL?: undefined;
            };
        };
        FAULT_PROXIMITY_FLAG: {
            attributes: string[];
            objects: {
                no: (number | number[])[];
                yes: (number | number[])[];
            };
        };
        FACIES_NoCalcite: {
            attributes: string[];
            objects: {
                F_OFFSHORE: (number | number[])[];
                F_LOWER_SHOREFACE: (number | number[])[];
                F_UPPER_SHOREFACE: (number | number[])[];
                F_MOUTH_BAR: (number | number[])[];
                F_TIDAL_BAR: (number | number[])[];
                F_TIDAL_CHANNEL: (number | number[])[];
                F_TIDAL_FLAT_SANDY?: undefined;
                F_TIDAL_FLAT_MUDDY?: undefined;
                F_MARSH?: undefined;
                F_CALCITE?: undefined;
                "8"?: undefined;
            };
        };
        RDE: {
            attributes: string[];
            objects: {
                OFFSHORE: (number | number[])[];
                LSF: (number | number[])[];
                USF: (number | number[])[];
                TIDAL: (number | number[])[];
                ONSHORE?: undefined;
                "1"?: undefined;
            };
        };
    };
} | {
    header: {
        name: string;
        well: string;
        startIndex: number;
        endIndex: number;
        step: null;
    };
    curves: {
        name: string;
        description: string;
        quantity: string;
        unit: string;
        valueType: string;
        dimensions: number;
    }[];
    data: (number | null)[][];
    metadata_discrete: {
        FACIES: {
            attributes: string[];
            objects: {
                OS?: undefined;
                LSF?: undefined;
                USF?: undefined;
                MB?: undefined;
                TB?: undefined;
                TC?: undefined;
                TFS?: undefined;
                TFM?: undefined;
                MSH?: undefined;
                CAL?: undefined;
            };
        };
        RDE_ORIG: {
            attributes: string[];
            objects: {
                F_OFFSHORE?: undefined;
                F_LOWER_SHOREFACE?: undefined;
                F_UPPER_SHOREFACE?: undefined;
                F_MOUTH_BAR?: undefined;
                F_TIDAL_BAR?: undefined;
                F_TIDAL_CHANNEL?: undefined;
                F_TIDAL_FLAT_SANDY?: undefined;
                F_TIDAL_FLAT_MUDDY?: undefined;
                F_MARSH?: undefined;
                F_CALCITE?: undefined;
                R_OFFSHORE?: undefined;
                R_SHOREFACE?: undefined;
                R_TIDAL?: undefined;
                R_ONSHORE?: undefined;
                R_USF?: undefined;
                R_LSF?: undefined;
                "11"?: undefined;
                "12"?: undefined;
                "13"?: undefined;
                "10"?: undefined;
            };
        };
        ZONE_MAIN: {
            attributes: string[];
            objects: {
                "0": (number | number[])[];
                "1": (number | number[])[];
                "2": (number | number[])[];
                "3": (number | number[])[];
                UPPER?: undefined;
                MID?: undefined;
                LOWER?: undefined;
                "4"?: undefined;
                ABOVE?: undefined;
                BELOW?: undefined;
            };
        };
        ZONELOG: {
            attributes: string[];
            objects: {
                "2": (number | number[])[];
                "3": (number | number[])[];
                "4": (number | number[])[];
                "5": (number | number[])[];
                "6": (number | number[])[];
                "7": (number | number[])[];
                "8": (number | number[])[];
                "9": (number | number[])[];
                "10": (number | number[])[];
                "11": (number | number[])[];
                "12": (number | number[])[];
                Above_BCU?: undefined;
                ABOVE?: undefined;
                H12?: undefined;
                H11?: undefined;
                H10?: undefined;
                H9?: undefined;
                H8?: undefined;
                H7?: undefined;
                H6?: undefined;
                H5?: undefined;
                H4?: undefined;
                H3?: undefined;
                H2?: undefined;
                H1?: undefined;
                BELOW?: undefined;
            };
        };
        FaultDistance_HUM: {
            attributes: string[];
            objects: {
                no: (number | number[])[];
                yes: (number | number[])[];
            };
        };
        FAULT_PROXIMITY_FLAG: {
            attributes: string[];
            objects: {
                no: (number | number[])[];
                yes: (number | number[])[];
            };
        };
        FACIES_NoCalcite: {
            attributes: string[];
            objects: {
                F_OFFSHORE?: undefined;
                F_LOWER_SHOREFACE?: undefined;
                F_UPPER_SHOREFACE?: undefined;
                F_MOUTH_BAR?: undefined;
                F_TIDAL_BAR?: undefined;
                F_TIDAL_CHANNEL?: undefined;
                F_TIDAL_FLAT_SANDY?: undefined;
                F_TIDAL_FLAT_MUDDY?: undefined;
                F_MARSH?: undefined;
                F_CALCITE?: undefined;
                "8"?: undefined;
            };
        };
        RDE: {
            attributes: string[];
            objects: {
                OFFSHORE?: undefined;
                LSF?: undefined;
                USF?: undefined;
                TIDAL?: undefined;
                ONSHORE?: undefined;
                "1"?: undefined;
            };
        };
    };
})[];
