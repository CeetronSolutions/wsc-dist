import PropTypes from "prop-types";
export declare type VariableVectorMapType = {
    variableName: string;
    vectorName: string[];
};
export declare const VariableVectorMapTypePropTypes: {
    variableName: PropTypes.Validator<string>;
    vectorName: PropTypes.Validator<string[]>;
};
export declare type ExpressionType = {
    name: string;
    expression: string;
    id: string;
    variableVectorMap: VariableVectorMapType[];
    description?: string;
    isValid: boolean;
    isDeletable: boolean;
};
export declare const ExpressionTypePropTypes: {
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
};
export declare type ExternalParseData = {
    expression: string;
    id: string;
    variables: string[];
    isValid: boolean;
    message: string;
};
export declare const ExternalParseDataPropTypes: {
    expression: PropTypes.Validator<string>;
    id: PropTypes.Validator<string>;
    variables: PropTypes.Validator<string[]>;
    isValid: PropTypes.Validator<boolean>;
    message: PropTypes.Validator<string>;
};
export declare type ExpressionParsingData = {
    isValid: boolean;
    parsingMessage: string;
    variables: string[];
};
