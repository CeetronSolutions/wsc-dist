export default Switch;
declare class Switch extends React.Component<any, any, any> {
    constructor(props: any);
    componentWillUmount(): void;
    createNewSwitch: () => void;
    removeSwitch: () => void;
    handleChange: (event: any) => void;
}
declare namespace Switch {
    namespace propTypes {
        const map: PropTypes.Validator<object>;
        const disabled: PropTypes.Requireable<boolean>;
        const value: PropTypes.Requireable<boolean>;
        const setProps: PropTypes.Requireable<(...args: any[]) => any>;
        const position: PropTypes.Requireable<string>;
        const label: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        const position_1: string;
        export { position_1 as position };
    }
}
import React from "react";
import PropTypes from "prop-types";
