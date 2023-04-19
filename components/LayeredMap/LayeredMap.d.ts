export default LayeredMap;
declare class LayeredMap extends React.Component<any, any, any> {
    constructor(props: any);
    mapRef: React.RefObject<any>;
    handleHillshadingChange(): void;
    calculateBounds(): number[][];
    resetView(): void;
    updateCircleMarkerPosition(x: any, y: any): void;
    setEvents(): void;
}
declare namespace LayeredMap {
    namespace defaultProps {
        const height: number;
        const sync_ids: never[];
        const hillShading: boolean;
        const lightDirection: number[];
        const scaleY: number;
        const showScaleY: boolean;
        const draw_toolbar_marker: boolean;
        const draw_toolbar_polygon: boolean;
        const draw_toolbar_polyline: boolean;
        const uirevision: string;
    }
    namespace propTypes {
        export const id: PropTypes.Validator<string>;
        const sync_ids_1: PropTypes.Requireable<any[]>;
        export { sync_ids_1 as sync_ids };
        const scaleY_1: PropTypes.Requireable<number>;
        export { scaleY_1 as scaleY };
        const showScaleY_1: PropTypes.Requireable<boolean>;
        export { showScaleY_1 as showScaleY };
        const height_1: PropTypes.Requireable<string | number>;
        export { height_1 as height };
        const draw_toolbar_polyline_1: PropTypes.Requireable<boolean>;
        export { draw_toolbar_polyline_1 as draw_toolbar_polyline };
        const draw_toolbar_polygon_1: PropTypes.Requireable<boolean>;
        export { draw_toolbar_polygon_1 as draw_toolbar_polygon };
        const draw_toolbar_marker_1: PropTypes.Requireable<boolean>;
        export { draw_toolbar_marker_1 as draw_toolbar_marker };
        export const polyline_points: PropTypes.Requireable<any[]>;
        export const polygon_points: PropTypes.Requireable<any[]>;
        export const marker_point: PropTypes.Requireable<any[]>;
        const lightDirection_1: PropTypes.Requireable<any[]>;
        export { lightDirection_1 as lightDirection };
        export const setProps: PropTypes.Requireable<(...args: any[]) => any>;
        export const layers: PropTypes.Requireable<any[]>;
        const hillShading_1: PropTypes.Requireable<boolean>;
        export { hillShading_1 as hillShading };
        const uirevision_1: PropTypes.Requireable<string>;
        export { uirevision_1 as uirevision };
    }
}
import React from "react";
import PropTypes from "prop-types";
