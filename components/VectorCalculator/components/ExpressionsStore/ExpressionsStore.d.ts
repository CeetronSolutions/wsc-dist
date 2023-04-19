import React from "react";
import { ExpressionParsingData, ExpressionType, VariableVectorMapType } from "../../utils/VectorCalculatorTypes";
declare type ActionMap<M extends {
    [index: string]: {
        [key: string]: boolean | number | string | string[] | ExpressionParsingData | ExpressionType | ExpressionType[] | VariableVectorMapType[];
    } | undefined;
}> = {
    [Key in keyof M]: M[Key] extends undefined ? {
        type: Key;
    } : {
        type: Key;
        payload: M[Key];
    };
};
export declare enum ExpressionStatus {
    Valid = 1,
    Invalid = 2,
    Evaluating = 3
}
export declare enum StoreActions {
    AddExpressions = "ADD_EXPRESSIONS",
    DeleteExpressions = "DELETE_EXPRESSIONS",
    SetActiveExpression = "SET_ACTIVE_EXPRESSION",
    SaveEditableExpression = "SAVE_EDITABLE_EXPRESSION",
    ResetEditableExpression = "RESET_EDITABLE_EXPRESSION",
    SetExpressionTypeValid = "SET_EXPRESSION_TYPE_VALID",
    SetExpression = "SET_EXPRESSION",
    SetName = "SET_NAME",
    SetDescription = "SET_DESCRIPTION",
    SetVariableVectorMap = "SET_VARIABLE_VECTOR_MAP",
    SetParsingData = "SET_PARSING_DATA"
}
declare type StoreState = {
    expressions: ExpressionType[];
    activeExpression: ExpressionType;
    editableExpression: string;
    editableName: string;
    editableDescription?: string;
    editableVariableVectorMap: VariableVectorMapType[];
    editableExpressionTypeValid: boolean;
    parseData: ExpressionParsingData;
};
declare type Payload = {
    [StoreActions.AddExpressions]: {
        expressions: ExpressionType[];
    };
    [StoreActions.DeleteExpressions]: {
        ids: string[];
    };
    [StoreActions.SetActiveExpression]: {
        expression: ExpressionType;
    };
    [StoreActions.SaveEditableExpression]: undefined;
    [StoreActions.ResetEditableExpression]: undefined;
    [StoreActions.SetExpressionTypeValid]: {
        isValid: boolean;
    };
    [StoreActions.SetName]: {
        name: string;
    };
    [StoreActions.SetExpression]: {
        expression: string;
    };
    [StoreActions.SetDescription]: {
        description?: string;
    };
    [StoreActions.SetVariableVectorMap]: {
        variableVectorMap: VariableVectorMapType[];
    };
    [StoreActions.SetParsingData]: {
        data: ExpressionParsingData;
    };
};
export declare type Actions = ActionMap<Payload>[keyof ActionMap<Payload>];
export declare const createExpressionTypeFromEditableData: (state: StoreState) => ExpressionType;
export declare const isExpressionEdited: (state: StoreState) => boolean;
declare type Context = {
    state: StoreState;
    dispatch: React.Dispatch<Actions>;
};
interface StoreProviderProps {
    initialExpressions: ExpressionType[];
}
export declare const StoreProvider: React.FC<StoreProviderProps>;
export declare const useStore: () => Context;
export {};
