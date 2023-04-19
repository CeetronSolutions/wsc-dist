export default Morris;
declare class Morris extends React.Component<any, any, any> {
    constructor(props: any);
    elementId: string;
}
declare namespace Morris {
    namespace defaultProps {
        const height: number;
    }
    namespace propTypes {
        export const id: PropTypes.Validator<string>;
        export const parameter: PropTypes.Requireable<string>;
        export const output: PropTypes.Requireable<(object | null | undefined)[]>;
        export const parameters: PropTypes.Requireable<(object | null | undefined)[]>;
        const height_1: PropTypes.Requireable<number>;
        export { height_1 as height };
    }
}
import React from "react";
import PropTypes from "prop-types";
