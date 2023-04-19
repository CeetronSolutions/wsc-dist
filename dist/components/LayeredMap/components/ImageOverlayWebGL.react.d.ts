export default ImageOverlayWebGL;
declare class ImageOverlayWebGL extends React.Component<any, any, any> {
    constructor(props: any);
    constructor(props: any, context: any);
    original_data: {
        loaded: boolean;
    } | undefined;
}
declare namespace ImageOverlayWebGL {
    namespace propTypes {
        const url: PropTypes.Requireable<string>;
        const colormap: PropTypes.Requireable<string>;
        const bounds: PropTypes.Requireable<any[]>;
        const hillShading: PropTypes.Requireable<boolean>;
        const elevationScale: PropTypes.Requireable<number>;
        const lightDirection: PropTypes.Requireable<any[]>;
        const minvalue: PropTypes.Requireable<number>;
        const maxvalue: PropTypes.Requireable<number>;
        const unit: PropTypes.Requireable<string>;
    }
}
import React from "react";
import PropTypes from "prop-types";
