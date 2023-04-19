export function VectorCalculator(props: any): JSX.Element;
export namespace VectorCalculator {
    namespace defaultProps {
        const isDashControlled: boolean;
        const maxExpressionDescriptionLength: number;
    }
    namespace propTypes {
        export const id: PropTypes.Validator<string>;
        export const vectors: PropTypes.Validator<any[]>;
        export const expressions: PropTypes.Validator<PropTypes.InferProps<{
            name: PropTypes.Validator<string>;
            expression: PropTypes.Validator<string>;
            id: PropTypes.Validator<string>;
            variableVectorMap: PropTypes.Validator<PropTypes.InferProps<{
                variableName: PropTypes.Validator<string>;
                vectorName: PropTypes.Validator<string[]>;
            }>[]>;
            description: PropTypes.Requireable<string>;
            isValid: PropTypes.Validator<boolean>;
            isDeletable: PropTypes.Validator<boolean>;
        }>[]>;
        const isDashControlled_1: PropTypes.Requireable<boolean>;
        export { isDashControlled_1 as isDashControlled };
        const maxExpressionDescriptionLength_1: PropTypes.Requireable<number>;
        export { maxExpressionDescriptionLength_1 as maxExpressionDescriptionLength };
        export const externalParseData: PropTypes.Requireable<PropTypes.InferProps<{
            expression: PropTypes.Validator<string>;
            id: PropTypes.Validator<string>;
            variables: PropTypes.Validator<string[]>;
            isValid: PropTypes.Validator<boolean>;
            message: PropTypes.Validator<string>;
        }>>;
        export const setProps: PropTypes.Requireable<(...args: any[]) => any>;
    }
}
import PropTypes from "prop-types";
