export function makeFlowLayers(data: any): any;
export function make2DLayers(data: any): any[];
export default Map;
declare class Map extends React.Component<any, any, any> {
    constructor(props: any);
    canvas: HTMLCanvasElement | null;
    canvasId: string;
    elementId: string;
}
declare namespace Map {
    namespace defaultProps {
        const height: number;
        const layerNames: never[];
    }
    namespace propTypes {
        export const id: PropTypes.Validator<string>;
        export const data: PropTypes.Validator<object>;
        const height_1: PropTypes.Requireable<number>;
        export { height_1 as height };
        const layerNames_1: PropTypes.Requireable<(string | null | undefined)[]>;
        export { layerNames_1 as layerNames };
    }
}
import React from "react";
import PropTypes from "prop-types";
