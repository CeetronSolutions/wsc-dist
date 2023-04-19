declare namespace _default {
    export { MapAndWellLogViewer as component };
    export const title: string;
    export namespace argTypes {
        namespace id {
            const description: string;
        }
        namespace resources {
            const description_1: string;
            export { description_1 as description };
        }
        namespace layers {
            const description_2: string;
            export { description_2 as description };
        }
        namespace bounds {
            const description_3: string;
            export { description_3 as description };
        }
        namespace zoom {
            const description_4: string;
            export { description_4 as description };
        }
        namespace views {
            const description_5: string;
            export { description_5 as description };
        }
        namespace coords {
            const description_6: string;
            export { description_6 as description };
        }
        namespace scale {
            const description_7: string;
            export { description_7 as description };
        }
        namespace coordinateUnit {
            const description_8: string;
            export { description_8 as description };
        }
        namespace legend {
            const description_9: string;
            export { description_9 as description };
        }
        namespace colorTables {
            const description_10: string;
            export { description_10 as description };
        }
        namespace editedData {
            const description_11: string;
            export { description_11 as description };
        }
        namespace setProps {
            const description_12: string;
            export { description_12 as description };
        }
        namespace welllogOptions {
            const description_13: string;
            export { description_13 as description };
        }
    }
}
export default _default;
export function Default(args: any): JSX.Element;
export namespace Default {
    const args: {
        colorTables: any;
        id: string;
        coords: {
            visible: boolean;
            multiPicking: boolean;
            pickDepth: number;
        };
        scale: {
            visible: boolean;
            incrementValue: number;
            widthPerUnit: number;
            cssStyle: {
                left: number;
                top: number;
            };
        };
        legend: {
            visible: boolean;
            cssStyle: {
                right: number;
                top: number;
            };
            horizontal: boolean;
        };
        toolbar: {
            visible: boolean;
        };
        coordinateUnit: string;
        resources: {
            propertyMap: string;
            depthMap: string;
            wellsData: string;
            logData: string;
        };
        bounds: number[];
        layers: ({
            "@@type": string;
            image: string;
            rotDeg: number;
            bounds: number[];
            colorMapName: string;
            valueRange: number[];
            colorMapRange: number[];
            meshMaxError?: undefined;
            mesh?: undefined;
            meshValueRange?: undefined;
            propertyTexture?: undefined;
            propertyValueRange?: undefined;
            contours?: undefined;
            isContoursDepth?: undefined;
            visible?: undefined;
            data?: undefined;
            logData?: undefined;
            logrunName?: undefined;
            logName?: undefined;
            logColor?: undefined;
        } | {
            "@@type": string;
            bounds: number[];
            valueRange: number[];
            rotDeg: number;
            image: string;
            colorMapName?: undefined;
            colorMapRange?: undefined;
            meshMaxError?: undefined;
            mesh?: undefined;
            meshValueRange?: undefined;
            propertyTexture?: undefined;
            propertyValueRange?: undefined;
            contours?: undefined;
            isContoursDepth?: undefined;
            visible?: undefined;
            data?: undefined;
            logData?: undefined;
            logrunName?: undefined;
            logName?: undefined;
            logColor?: undefined;
        } | {
            "@@type": string;
            bounds: number[];
            meshMaxError: number;
            mesh: string;
            meshValueRange: number[];
            propertyTexture: string;
            propertyValueRange: number[];
            rotDeg: number;
            contours: number[];
            isContoursDepth: boolean;
            colorMapName: string;
            colorMapRange: number[];
            visible: boolean;
            image?: undefined;
            valueRange?: undefined;
            data?: undefined;
            logData?: undefined;
            logrunName?: undefined;
            logName?: undefined;
            logColor?: undefined;
        } | {
            "@@type": string;
            data: string;
            logData: string;
            logrunName: string;
            logName: string;
            logColor: string;
            image?: undefined;
            rotDeg?: undefined;
            bounds?: undefined;
            colorMapName?: undefined;
            valueRange?: undefined;
            colorMapRange?: undefined;
            meshMaxError?: undefined;
            mesh?: undefined;
            meshValueRange?: undefined;
            propertyTexture?: undefined;
            propertyValueRange?: undefined;
            contours?: undefined;
            isContoursDepth?: undefined;
            visible?: undefined;
        } | {
            "@@type": string;
            data: string;
            image?: undefined;
            rotDeg?: undefined;
            bounds?: undefined;
            colorMapName?: undefined;
            valueRange?: undefined;
            colorMapRange?: undefined;
            meshMaxError?: undefined;
            mesh?: undefined;
            meshValueRange?: undefined;
            propertyTexture?: undefined;
            propertyValueRange?: undefined;
            contours?: undefined;
            isContoursDepth?: undefined;
            visible?: undefined;
            logData?: undefined;
            logrunName?: undefined;
            logName?: undefined;
            logColor?: undefined;
        } | {
            "@@type": string;
            visible: boolean;
            image?: undefined;
            rotDeg?: undefined;
            bounds?: undefined;
            colorMapName?: undefined;
            valueRange?: undefined;
            colorMapRange?: undefined;
            meshMaxError?: undefined;
            mesh?: undefined;
            meshValueRange?: undefined;
            propertyTexture?: undefined;
            propertyValueRange?: undefined;
            contours?: undefined;
            isContoursDepth?: undefined;
            data?: undefined;
            logData?: undefined;
            logrunName?: undefined;
            logName?: undefined;
            logColor?: undefined;
        } | {
            "@@type": string;
            image?: undefined;
            rotDeg?: undefined;
            bounds?: undefined;
            colorMapName?: undefined;
            valueRange?: undefined;
            colorMapRange?: undefined;
            meshMaxError?: undefined;
            mesh?: undefined;
            meshValueRange?: undefined;
            propertyTexture?: undefined;
            propertyValueRange?: undefined;
            contours?: undefined;
            isContoursDepth?: undefined;
            visible?: undefined;
            data?: undefined;
            logData?: undefined;
            logrunName?: undefined;
            logName?: undefined;
            logColor?: undefined;
        })[];
        editedData: {};
        views: {
            layout: number[];
            showLabel: boolean;
            viewports: {
                id: string;
                show3D: boolean;
                layerIds: never[];
            }[];
        };
    };
}
import { MapAndWellLogViewer } from "./MapAndWellLogViewer";
