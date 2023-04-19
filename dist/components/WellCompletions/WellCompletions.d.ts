export default WellCompletions;
declare function WellCompletions(props: any): JSX.Element;
declare namespace WellCompletions {
    namespace propTypes {
        const id: PropTypes.Validator<string>;
        const data: PropTypes.Requireable<object>;
    }
}
import PropTypes from "prop-types";
