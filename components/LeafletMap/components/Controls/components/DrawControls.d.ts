export default DrawControls;
/**  Leaflet-draw:edit event does not return marker type.
 *    Helper function to find marker type.
 *    https://stackoverflow.com/questions/18014907/leaflet-draw-retrieve-layer-type-on-drawedited-event
 **/
declare class DrawControls extends React.Component<any, any, any> {
    constructor(props: any);
    syncDrawingsRef: React.RefObject<any>;
    removeLayers(layerType: any, featureGroup: any): void;
    createDrawControl: () => void;
    addToolbar: (map: any) => void;
    addCircleMarker: (map: any) => void;
}
declare namespace DrawControls {
    export { Context as contextType };
    export namespace defaultProps {
        const drawMarker: boolean;
        const drawPolygon: boolean;
        const drawPolyline: boolean;
        const drawCircle: boolean;
        const drawRectanlge: boolean;
        const position: string;
    }
    export namespace propTypes {
        export const map: PropTypes.Validator<object>;
        const position_1: PropTypes.Requireable<string>;
        export { position_1 as position };
        const drawMarker_1: PropTypes.Requireable<boolean>;
        export { drawMarker_1 as drawMarker };
        const drawCircle_1: PropTypes.Requireable<boolean>;
        export { drawCircle_1 as drawCircle };
        export const drawRectangle: PropTypes.Requireable<boolean>;
        const drawPolygon_1: PropTypes.Requireable<boolean>;
        export { drawPolygon_1 as drawPolygon };
        const drawPolyline_1: PropTypes.Requireable<boolean>;
        export { drawPolyline_1 as drawPolyline };
        export const markerCoords: PropTypes.Requireable<(...args: any[]) => any>;
        export const lineCoords: PropTypes.Requireable<(...args: any[]) => any>;
        export const polygonCoords: PropTypes.Requireable<(...args: any[]) => any>;
        export const syncDrawings: PropTypes.Requireable<boolean>;
    }
}
import React from "react";
import Context from "../../../utils/context";
import PropTypes from "prop-types";
