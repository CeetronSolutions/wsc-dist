export default Controls;
declare class Controls extends React.Component<any, any, any> {
    constructor(props: any);
    constructor(props: any, context: any);
}
declare namespace Controls {
    namespace propTypes {
        export const map: PropTypes.Validator<object>;
        export const setProps: PropTypes.Requireable<(...args: any[]) => any>;
        export const mouseCoords: PropTypes.Requireable<PropTypes.InferProps<{
            position: PropTypes.Requireable<string>;
        }>>;
        export const colorBar: PropTypes.Requireable<PropTypes.InferProps<{
            position: PropTypes.Requireable<string>;
        }>>;
        export const unitScale: PropTypes.Requireable<PropTypes.InferProps<{
            position: PropTypes.Requireable<string>;
        }>>;
        export const syncDrawings: PropTypes.Requireable<boolean>;
        export const mousePosition: PropTypes.Requireable<PropTypes.InferProps<{
            coordinatePosition: PropTypes.Requireable<string>;
        }>>;
        export const scaleY: PropTypes.Requireable<PropTypes.InferProps<{
            scaleY: PropTypes.Requireable<number>;
            maxScaleY: PropTypes.Requireable<number>;
            minScaleY: PropTypes.Requireable<number>;
            position: PropTypes.Requireable<string>;
        }>>;
        export const drawTools: PropTypes.Requireable<PropTypes.InferProps<{
            position: PropTypes.Requireable<string>;
            drawMarker: PropTypes.Requireable<boolean>;
            drawPolygon: PropTypes.Requireable<boolean>;
            drawPolyline: PropTypes.Requireable<boolean>;
            markerCoords: PropTypes.Requireable<(...args: any[]) => any>;
            lineCoords: PropTypes.Requireable<(...args: any[]) => any>;
            polygonCoords: PropTypes.Requireable<(...args: any[]) => any>;
        }>>;
        const _switch: PropTypes.Requireable<PropTypes.InferProps<{
            value: PropTypes.Requireable<boolean>;
            disabled: PropTypes.Requireable<boolean>;
            position: PropTypes.Requireable<string>;
            label: PropTypes.Requireable<string>;
        }>>;
        export { _switch as switch };
    }
}
import React from "react";
import PropTypes from "prop-types";
