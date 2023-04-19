export default HistoryMatch;
declare class HistoryMatch extends React.Component<any, any, any> {
    constructor(props: any);
    elementId: string;
}
declare namespace HistoryMatch {
    namespace defaultProps {
        const height: number;
    }
    namespace propTypes {
        export const id: PropTypes.Validator<string>;
        const height_1: PropTypes.Requireable<number>;
        export { height_1 as height };
        export const data: PropTypes.Requireable<object>;
    }
}
import React from "react";
import PropTypes from "prop-types";
