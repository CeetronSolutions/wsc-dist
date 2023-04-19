export default VerticalZoom;
declare class VerticalZoom extends React.Component<any, any, any> {
    constructor(props: any);
    updateVerticalZoom(scaleY: any): void;
    onSliderValueChange(event: any, sliderValue: any): void;
    createNewMapControl(): void;
    removeMapControl(): void;
}
declare namespace VerticalZoom {
    namespace propTypes {
        const map: PropTypes.Validator<object>;
        const scaleY: PropTypes.Requireable<number>;
        const position: PropTypes.Requireable<string>;
        const minScaleY: PropTypes.Requireable<number>;
        const maxScaleY: PropTypes.Requireable<number>;
    }
    namespace defaultProps {
        const position_1: string;
        export { position_1 as position };
        const minScaleY_1: number;
        export { minScaleY_1 as minScaleY };
        const maxScaleY_1: number;
        export { maxScaleY_1 as maxScaleY };
    }
}
import React from "react";
import PropTypes from "prop-types";
