export default VectorSelector;
declare function VectorSelector(props: any): JSX.Element;
declare namespace VectorSelector {
    namespace defaultProps {
        const maxNumSelectedNodes: number;
        const delimiter: string;
        const numMetaNodes: number;
        const showSuggestions: boolean;
        const selectedTags: never[];
        const placeholder: string;
        const numSecondsUntilSuggestionsAreShown: number;
        const lineBreakAfterTag: boolean;
        const customVectorDefinitions: {};
        const persisted_props: string[];
        const persistence_type: string;
    }
    namespace propTypes {
        export const id: PropTypes.Validator<string>;
        const maxNumSelectedNodes_1: PropTypes.Requireable<number>;
        export { maxNumSelectedNodes_1 as maxNumSelectedNodes };
        const delimiter_1: PropTypes.Requireable<string>;
        export { delimiter_1 as delimiter };
        const numMetaNodes_1: PropTypes.Requireable<number>;
        export { numMetaNodes_1 as numMetaNodes };
        export const data: PropTypes.Validator<any[]>;
        export const label: PropTypes.Requireable<string>;
        const showSuggestions_1: PropTypes.Requireable<boolean>;
        export { showSuggestions_1 as showSuggestions };
        export const setProps: PropTypes.Requireable<(...args: any[]) => any>;
        const selectedTags_1: PropTypes.Requireable<(string | null | undefined)[]>;
        export { selectedTags_1 as selectedTags };
        const placeholder_1: PropTypes.Requireable<string>;
        export { placeholder_1 as placeholder };
        const numSecondsUntilSuggestionsAreShown_1: PropTypes.Requireable<number>;
        export { numSecondsUntilSuggestionsAreShown_1 as numSecondsUntilSuggestionsAreShown };
        const lineBreakAfterTag_1: PropTypes.Requireable<boolean>;
        export { lineBreakAfterTag_1 as lineBreakAfterTag };
        export const caseInsensitiveMatching: PropTypes.Requireable<boolean>;
        export const useBetaFeatures: PropTypes.Requireable<boolean>;
        const customVectorDefinitions_1: PropTypes.Requireable<{
            [x: string]: PropTypes.InferProps<{
                type: PropTypes.Validator<string>;
                description: PropTypes.Validator<string>;
            }> | null | undefined;
        }>;
        export { customVectorDefinitions_1 as customVectorDefinitions };
        export const persistence: PropTypes.Requireable<string | number | boolean>;
        const persisted_props_1: PropTypes.Requireable<(string | null | undefined)[]>;
        export { persisted_props_1 as persisted_props };
        const persistence_type_1: PropTypes.Requireable<string>;
        export { persistence_type_1 as persistence_type };
    }
}
import PropTypes from "prop-types";
