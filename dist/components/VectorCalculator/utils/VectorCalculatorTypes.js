import PropTypes from "prop-types";
export const VariableVectorMapTypePropTypes = {
    variableName: PropTypes.string.isRequired,
    vectorName: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};
export const ExpressionTypePropTypes = {
    name: PropTypes.string.isRequired,
    expression: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    variableVectorMap: PropTypes.arrayOf(PropTypes.shape(VariableVectorMapTypePropTypes).isRequired).isRequired,
    description: PropTypes.string,
    isValid: PropTypes.bool.isRequired,
    isDeletable: PropTypes.bool.isRequired,
};
export const ExternalParseDataPropTypes = {
    expression: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    variables: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    isValid: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
};
//# sourceMappingURL=VectorCalculatorTypes.js.map