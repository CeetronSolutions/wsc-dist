export default GroupTree;
declare function GroupTree(props: any): JSX.Element;
declare namespace GroupTree {
    namespace propTypes {
        const id: PropTypes.Validator<string>;
        const data: PropTypes.Requireable<(object | null | undefined)[]>;
        const edge_options: PropTypes.Requireable<(object | null | undefined)[]>;
        const node_options: PropTypes.Requireable<(object | null | undefined)[]>;
    }
}
import PropTypes from "prop-types";
