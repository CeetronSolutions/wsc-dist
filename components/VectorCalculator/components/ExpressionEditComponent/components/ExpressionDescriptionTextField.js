import React from "react";
import { MaxLengthTextField } from "./MaxLengthTextField";
import { StoreActions, useStore } from "../../ExpressionsStore";
import "../../../VectorCalculator.css";
export const ExpressionDescriptionTextField = (props) => {
    const store = useStore();
    const handleInputChange = (e) => {
        store.dispatch({
            type: StoreActions.SetDescription,
            payload: { description: e.target.value },
        });
    };
    return (React.createElement("div", { className: "TextFieldWrapper" },
        React.createElement(MaxLengthTextField, { id: "expression_description_input_field", maxLength: props.maxLength, label: "Description", placeholder: "Description (optional)", onChange: handleInputChange, value: store.state.editableDescription
                ? store.state.editableDescription
                : "", disabled: props.disabled })));
};
//# sourceMappingURL=ExpressionDescriptionTextField.js.map