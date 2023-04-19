export default LeafletMap;
declare class LeafletMap extends React.Component<any, any, any> {
    static mapReferences: {};
    static syncedDrawLayer: {
        data: never[];
    };
    constructor(props: any);
    mapEl: React.RefObject<any>;
    onSizeChange: (() => void) | undefined;
    setEvents: (map: any) => void;
    getMap: () => null;
    setPropsExist: (value: any) => void;
    drawLayerAdd: (newLayers: any) => void;
    drawLayerDelete: (layerTypes: any) => void;
    syncedDrawLayerAdd: (newLayers: any) => void;
    syncedDrawLayerDelete: (layerTypes: any, shouldRedraw: any) => void;
    redrawAllSyncedMaps: () => void;
    /**
     * @param {HTMLCanvasElement} onScreenCanvas
     */
    setFocucedImageLayer: (layer: any) => void;
    /**
     * @param {String} mode
     * can be "editing" or null
     */
    setMode: (newMode: any) => void;
}
declare namespace LeafletMap {
    export { Context as contextType };
    export namespace defaultProps {
        const layers: never[];
        const syncedMaps: never[];
    }
    export namespace propTypes {
        export const id: PropTypes.Validator<string>;
        const layers_1: PropTypes.Requireable<any[]>;
        export { layers_1 as layers };
        export const setProps: PropTypes.Requireable<(...args: any[]) => any>;
        export const mouseCoords: PropTypes.Requireable<PropTypes.InferProps<{
            position: PropTypes.Requireable<string>;
        }>>;
        export const scaleY: PropTypes.Requireable<PropTypes.InferProps<{
            scaleY: PropTypes.Requireable<number>;
            maxScaleY: PropTypes.Requireable<number>;
            minScaleY: PropTypes.Requireable<number>;
            position: PropTypes.Requireable<string>;
        }>>;
        const _switch: PropTypes.Requireable<PropTypes.InferProps<{
            value: PropTypes.Requireable<boolean>;
            disabled: PropTypes.Requireable<boolean>;
            position: PropTypes.Requireable<string>;
            label: PropTypes.Requireable<string>;
        }>>;
        export { _switch as switch };
        export const drawTools: PropTypes.Requireable<PropTypes.InferProps<{
            drawMarker: PropTypes.Requireable<boolean>;
            drawPolygon: PropTypes.Requireable<boolean>;
            drawPolyline: PropTypes.Requireable<boolean>;
            position: PropTypes.Requireable<string>;
        }>>;
        export const colorBar: PropTypes.Requireable<PropTypes.InferProps<{
            position: PropTypes.Requireable<string>;
        }>>;
        export const unitScale: PropTypes.Requireable<PropTypes.InferProps<{
            position: PropTypes.Requireable<string>;
        }>>;
        export const center: PropTypes.Requireable<any[]>;
        export const defaultBounds: PropTypes.Requireable<any[]>;
        export const zoom: PropTypes.Requireable<number>;
        export const minZoom: PropTypes.Requireable<number>;
        export const maxZoom: PropTypes.Requireable<number>;
        export const crs: PropTypes.Requireable<string>;
        const syncedMaps_1: PropTypes.Requireable<any[]>;
        export { syncedMaps_1 as syncedMaps };
        export const syncDrawings: PropTypes.Requireable<boolean>;
        export const updateMode: PropTypes.Requireable<string>;
        export const autoScaleMap: PropTypes.Requireable<boolean>;
        export const polyline_points: PropTypes.Requireable<any[]>;
        export const polygon_points: PropTypes.Requireable<any[]>;
        export const marker_point: PropTypes.Requireable<any[]>;
        export const click_position: PropTypes.Requireable<any[]>;
        export const clicked_shape: PropTypes.Requireable<object>;
    }
}
import React from "react";
import Context from "./utils/context";
import PropTypes from "prop-types";
