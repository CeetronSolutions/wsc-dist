import React from "react";
import { TextField, Icon } from "@equinor/eds-core-react";
import { error_filled, warning_filled, thumbs_up } from "@equinor/eds-icons";
Icon.add({ error_filled, thumbs_up, warning_filled });
import { StoreActions, useStore } from "../../ExpressionsStore";
import { isNameOccupiedByVectors, doesNameExistInExpressionList, isValidExpressionNameString, expressionNameValidationMessage, } from "../../../utils/VectorCalculatorHelperFunctions";
import "../../../VectorCalculator.css";
export const ExpressionNameTextField = (props) => {
    const store = useStore();
    const [isValid, setIsValid] = React.useState(false);
    const [textFieldStyleDataState, setTextFieldStyleDataState] = React.useState({
        variant: "success",
        icon: [],
        helperText: "",
    });
    const getTextFieldStyleData = React.useCallback((name) => {
        const initialName = store.state.activeExpression.name;
        if (!isValidExpressionNameString(name)) {
            return {
                variant: "error",
                icon: React.createElement(Icon, { key: "error", name: "error_filled" }),
                helperText: expressionNameValidationMessage(name),
            };
        }
        if (isNameOccupiedByVectors(name, props.vectors)) {
            return {
                variant: "warning",
                icon: React.createElement(Icon, { key: "warning", name: "warning_filled" }),
                helperText: "Name occupied by existing vector!",
            };
        }
        if (doesNameExistInExpressionList(name, store.state.expressions) &&
            name !== initialName) {
            return {
                variant: "warning",
                icon: React.createElement(Icon, { key: "warning", name: "warning_filled" }),
                helperText: "Name of existing expression!",
            };
        }
        return {
            variant: "success",
            icon: React.createElement(Icon, { key: "thumbs", name: "thumbs_up" }),
            helperText: "",
        };
    }, [
        expressionNameValidationMessage,
        isValidExpressionNameString,
        isNameOccupiedByVectors,
        doesNameExistInExpressionList,
        props.vectors,
        store.state.expressions,
        store.state.activeExpression.name,
    ]);
    const isValidName = React.useCallback((name) => {
        const initialName = store.state.activeExpression.name;
        if (!isValidExpressionNameString(name)) {
            return false;
        }
        if (isNameOccupiedByVectors(name, props.vectors)) {
            return false;
        }
        if (name === initialName) {
            return true;
        }
        if (doesNameExistInExpressionList(name, store.state.expressions)) {
            return false;
        }
        return true;
    }, [
        isValidExpressionNameString,
        doesNameExistInExpressionList,
        isNameOccupiedByVectors,
        props.vectors,
        store.state.activeExpression.name,
        store.state.expressions,
    ]);
    React.useEffect(() => {
        if (props.disabled) {
            setTextFieldStyleDataState({
                variant: "default",
                icon: [],
                helperText: "",
            });
        }
        else {
            setTextFieldStyleDataState(getTextFieldStyleData(store.state.editableName));
        }
    }, [props.disabled]);
    React.useEffect(() => {
        props.onValidChanged(isValid);
    }, [isValid]);
    React.useEffect(() => {
        setIsValid(isValidName(store.state.editableName));
        setTextFieldStyleDataState(getTextFieldStyleData(store.state.editableName));
    }, [store.state.editableName, getTextFieldStyleData]);
    const handleInputChange = React.useCallback((e) => {
        store.dispatch({
            type: StoreActions.SetName,
            payload: { name: e.target.value },
        });
    }, [isValidName]);
    return (React.createElement("div", { className: "TextFieldWrapper" },
        React.createElement(TextField, { id: "expression_name_input_field", label: "Name", placeholder: "New name", onChange: handleInputChange, value: store.state.editableName, variant: textFieldStyleDataState.variant, inputIcon: textFieldStyleDataState.icon, helperText: textFieldStyleDataState.helperText, disabled: props.disabled })));
};
//# sourceMappingURL=ExpressionNameTextField.js.map