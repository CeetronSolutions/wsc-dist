export default CompositeMapLayers;
declare class CompositeMapLayers extends Component<any, any, any> {
    constructor(props: any);
    layerControl: any;
    layers: {};
    baseLayersById: {};
    updateLayer: (curLayer: any, newLayer: any) => void;
    removeAllLayers: () => void;
    addItemToLayer(item: any, layerGroup: any, swapXY?: boolean): any;
    updateUponBaseMapChange: () => void;
    removeLayerFromState: (id: any) => void;
    createMultipleLayers(): void;
    createLayerGroup: (layer: any) => void;
    addDrawLayerToMap: () => void;
    setFocusedImageLayer: (layer: any) => void;
    reSyncDrawLayer: () => void;
    getActiveBaseLayer(): any;
}
declare namespace CompositeMapLayers {
    export { Context as contextType };
    export namespace propTypes {
        const map: PropTypes.Validator<object>;
        const updateMode: PropTypes.Requireable<string>;
        const setProps: PropTypes.Requireable<(...args: any[]) => any>;
        const syncedMaps: PropTypes.Requireable<any[]>;
        const syncDrawings: PropTypes.Requireable<boolean>;
        const layers: PropTypes.Requireable<any[]>;
        const lineCoords: PropTypes.Requireable<(...args: any[]) => any>;
        const polygonCoords: PropTypes.Requireable<(...args: any[]) => any>;
    }
}
import { Component } from "react";
import Context from "../utils/context";
import PropTypes from "prop-types";
