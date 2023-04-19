export default CompositeMapLayer;
declare class CompositeMapLayer extends React.Component<any, any, any> {
    constructor(props: any);
    constructor(props: any, context: any);
    renderTooltip(item: any): JSX.Element | null;
    renderItem(item: any, index: any): JSX.Element | null;
}
declare namespace CompositeMapLayer {
    namespace propTypes {
        const layer: PropTypes.Requireable<object>;
        const hillShading: PropTypes.Requireable<boolean>;
        const lineCoords: PropTypes.Requireable<(...args: any[]) => any>;
        const lightDirection: PropTypes.Requireable<any[]>;
        const polygonCoords: PropTypes.Requireable<(...args: any[]) => any>;
    }
}
import React from "react";
import PropTypes from "prop-types";
