export default MousePosition;
declare function MousePosition(props: any): null;
declare namespace MousePosition {
    namespace defaultProps {
        const position: string;
    }
    namespace propTypes {
        const position_1: PropTypes.Requireable<string>;
        export { position_1 as position };
        export const setProps: PropTypes.Requireable<any>;
        export const map: PropTypes.Validator<object>;
        export const minvalue: PropTypes.Requireable<number>;
        export const maxvalue: PropTypes.Requireable<number>;
    }
}
import PropTypes from "prop-types";
