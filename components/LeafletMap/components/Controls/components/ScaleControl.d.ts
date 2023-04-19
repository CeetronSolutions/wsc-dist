export default ScaleControl;
declare function ScaleControl(props: any): null;
declare namespace ScaleControl {
    namespace propTypes {
        const map: PropTypes.Validator<object>;
        const position: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        const position_1: string;
        export { position_1 as position };
    }
}
import PropTypes from "prop-types";
