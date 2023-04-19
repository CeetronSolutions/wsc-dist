import React from "react";
import { cloneDeep } from "lodash";
import { areVariableVectorMapsEqual } from "../../utils/VectorCalculatorHelperFunctions";
export var ExpressionStatus;
(function (ExpressionStatus) {
    ExpressionStatus[ExpressionStatus["Valid"] = 1] = "Valid";
    ExpressionStatus[ExpressionStatus["Invalid"] = 2] = "Invalid";
    ExpressionStatus[ExpressionStatus["Evaluating"] = 3] = "Evaluating";
})(ExpressionStatus || (ExpressionStatus = {}));
export var StoreActions;
(function (StoreActions) {
    StoreActions["AddExpressions"] = "ADD_EXPRESSIONS";
    StoreActions["DeleteExpressions"] = "DELETE_EXPRESSIONS";
    StoreActions["SetActiveExpression"] = "SET_ACTIVE_EXPRESSION";
    StoreActions["SaveEditableExpression"] = "SAVE_EDITABLE_EXPRESSION";
    StoreActions["ResetEditableExpression"] = "RESET_EDITABLE_EXPRESSION";
    StoreActions["SetExpressionTypeValid"] = "SET_EXPRESSION_TYPE_VALID";
    StoreActions["SetExpression"] = "SET_EXPRESSION";
    StoreActions["SetName"] = "SET_NAME";
    StoreActions["SetDescription"] = "SET_DESCRIPTION";
    StoreActions["SetVariableVectorMap"] = "SET_VARIABLE_VECTOR_MAP";
    StoreActions["SetParsingData"] = "SET_PARSING_DATA";
})(StoreActions || (StoreActions = {}));
const initialEditableExpression = {
    name: "",
    expression: "",
    id: "",
    variableVectorMap: [],
    isValid: false,
    isDeletable: true,
};
export const createExpressionTypeFromEditableData = (state) => {
    return Object.assign(Object.assign({}, state.activeExpression), { name: state.editableName, expression: state.editableExpression, description: state.editableDescription, variableVectorMap: state.editableVariableVectorMap });
};
export const isExpressionEdited = (state) => {
    const areEqual = state.activeExpression.name === state.editableName &&
        state.activeExpression.expression === state.editableExpression &&
        state.activeExpression.description === state.editableDescription &&
        areVariableVectorMapsEqual(state.activeExpression.variableVectorMap, state.editableVariableVectorMap);
    return !areEqual;
};
const initializeStore = (initializerArg) => {
    return {
        expressions: initializerArg.initialExpressions,
        activeExpression: initialEditableExpression,
        editableExpression: initialEditableExpression.expression,
        editableName: initialEditableExpression.name,
        editableDescription: initialEditableExpression.description,
        editableVariableVectorMap: initialEditableExpression.variableVectorMap,
        editableExpressionTypeValid: false,
        parseData: { isValid: false, parsingMessage: "", variables: [] },
    };
};
const StoreReducer = (state, action) => {
    switch (action.type) {
        case StoreActions.AddExpressions: {
            const newExpressions = cloneDeep(state.expressions);
            newExpressions.push(...action.payload.expressions);
            return Object.assign(Object.assign({}, state), { expressions: newExpressions });
        }
        case StoreActions.DeleteExpressions: {
            const deletableExpressions = state.expressions.filter((elm) => {
                return action.payload.ids.includes(elm.id) && elm.isDeletable;
            });
            const newExpressions = state.expressions.filter((elm) => {
                return !deletableExpressions.includes(elm);
            });
            // If active expression is deleted
            if (action.payload.ids.includes(state.activeExpression.id)) {
                return Object.assign(Object.assign({}, state), { expressions: newExpressions, activeExpression: initialEditableExpression, editableExpression: initialEditableExpression.expression, editableName: initialEditableExpression.name, editableDescription: initialEditableExpression.description, editableVariableVectorMap: initialEditableExpression.variableVectorMap, editableExpressionTypeValid: false, parseData: {
                        isValid: false,
                        parsingMessage: "",
                        variables: [],
                    } });
            }
            return Object.assign(Object.assign({}, state), { expressions: newExpressions });
        }
        case StoreActions.SetActiveExpression: {
            if (!state.expressions.includes(action.payload.expression)) {
                return state;
            }
            return Object.assign(Object.assign({}, state), { activeExpression: action.payload.expression, editableName: action.payload.expression.name, editableExpression: action.payload.expression.expression, editableDescription: action.payload.expression.description, editableVariableVectorMap: action.payload.expression.variableVectorMap });
        }
        case StoreActions.SaveEditableExpression: {
            // Create expression with editable data
            const newActiveExpression = Object.assign(Object.assign({}, state.activeExpression), { name: state.editableName, expression: state.editableExpression, description: state.editableDescription, variableVectorMap: state.editableVariableVectorMap, isValid: true });
            const newExpressions = state.expressions.map((elm) => {
                if (elm.id === newActiveExpression.id) {
                    return newActiveExpression;
                }
                return elm;
            });
            return Object.assign(Object.assign({}, state), { expressions: newExpressions, activeExpression: newActiveExpression });
        }
        case StoreActions.ResetEditableExpression: {
            return Object.assign(Object.assign({}, state), { editableName: state.activeExpression.name, editableExpression: state.activeExpression.expression, editableDescription: state.activeExpression.description, editableVariableVectorMap: state.activeExpression.variableVectorMap });
        }
        case StoreActions.SetExpressionTypeValid: {
            return Object.assign(Object.assign({}, state), { editableExpressionTypeValid: action.payload.isValid });
        }
        case StoreActions.SetDescription: {
            return Object.assign(Object.assign({}, state), { editableDescription: action.payload.description });
        }
        case StoreActions.SetName: {
            return Object.assign(Object.assign({}, state), { editableName: action.payload.name });
        }
        case StoreActions.SetExpression: {
            return Object.assign(Object.assign({}, state), { editableExpression: action.payload.expression });
        }
        case StoreActions.SetVariableVectorMap: {
            return Object.assign(Object.assign({}, state), { editableVariableVectorMap: action.payload.variableVectorMap });
        }
        case StoreActions.SetParsingData: {
            return Object.assign(Object.assign({}, state), { parseData: action.payload.data });
        }
    }
};
const StoreContext = React.createContext(undefined);
export const StoreProvider = (props) => {
    const [state, dispatch] = React.useReducer(StoreReducer, props, initializeStore);
    return (React.createElement(StoreContext.Provider, { value: { state, dispatch } }, props.children));
};
export const useStore = () => React.useContext(StoreContext);
//# sourceMappingURL=ExpressionsStore.js.map