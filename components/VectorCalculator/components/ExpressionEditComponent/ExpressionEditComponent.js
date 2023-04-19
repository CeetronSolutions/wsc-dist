import React from "react";
import { Button, Icon } from "@equinor/eds-core-react";
import { clear, save, sync } from "@equinor/eds-icons";
Icon.add({ clear, save, sync });
import { Grid } from "@material-ui/core";
import { VectorSelectorTable } from "./components/VectorSelectorTable";
import { ExpressionDescriptionTextField } from "./components/ExpressionDescriptionTextField";
import { ExpressionNameTextField } from "./components/ExpressionNameTextField";
import { ExpressionInputTextField } from "./components/ExpressionInputTextField";
import { isExpressionEdited, StoreActions, useStore, ExpressionStatus, } from "../ExpressionsStore";
import "../../VectorCalculator.css";
export const ExpressionEditComponent = (props) => {
    const store = useStore();
    const [disabled, setDisabled] = React.useState(store.state.activeExpression.id === "");
    const [expressionDataEdited, setExpressionDataEdited] = React.useState(false);
    const [expressionStatus, setExpressionStatus] = React.useState(ExpressionStatus.Evaluating);
    const [nameValid, setNameValid] = React.useState(false);
    const [variableVectorMapValid, setVariableVectorMapValid] = React.useState(false);
    React.useEffect(() => {
        if (disabled !== (store.state.activeExpression.id === "")) {
            setDisabled(store.state.activeExpression.id === "");
        }
        setExpressionDataEdited(isExpressionEdited(store.state));
    }, [
        store.state.activeExpression,
        store.state.editableExpression,
        store.state.editableName,
        store.state.editableDescription,
        store.state.editableVariableVectorMap,
    ]);
    const handleSaveClick = React.useCallback(() => {
        if (!store.state.editableExpressionTypeValid) {
            return;
        }
        store.dispatch({
            type: StoreActions.SaveEditableExpression,
        });
    }, [store.state.editableExpressionTypeValid]);
    const handleCancelClick = React.useCallback(() => {
        store.dispatch({
            type: StoreActions.ResetEditableExpression,
        });
    }, [store]);
    React.useEffect(() => {
        store.dispatch({
            type: StoreActions.SetExpressionTypeValid,
            payload: {
                isValid: nameValid &&
                    variableVectorMapValid &&
                    expressionStatus === ExpressionStatus.Valid,
            },
        });
    }, [nameValid, expressionStatus, variableVectorMapValid]);
    const handleNameValidChange = (isValid) => {
        setNameValid(isValid);
    };
    const handleExpressionStatusChanged = (status) => {
        setExpressionStatus(status);
    };
    const handleVariableVectorMapValidChanged = (isValid) => {
        setVariableVectorMapValid(isValid);
    };
    return (React.createElement(Grid, { className: "ExpressionEditComponent", container: true, item: true, direction: "column", alignItems: "stretch", xs: 6 },
        React.createElement(Grid, { item: true, className: "ExpressionNameTextFieldGridItem" },
            React.createElement(ExpressionNameTextField, { vectors: props.vectors, disabled: disabled, onValidChanged: handleNameValidChange })),
        React.createElement(Grid, { item: true, className: "ExpressionInputTextFieldGridItem" },
            React.createElement(ExpressionInputTextField, { externalParsing: props.externalParsing, disabled: disabled, onStatusChanged: handleExpressionStatusChanged })),
        React.createElement(Grid, { item: true, className: "ExpressionDescriptionTextFieldGridItem" },
            React.createElement(ExpressionDescriptionTextField, { disabled: disabled, maxLength: props.maxExpressionDescriptionLength })),
        React.createElement(Grid, { item: true, className: "TableWrapperGridItem VectorSelectorTableGridItem" },
            React.createElement(VectorSelectorTable, { vectorData: props.vectors, disabled: disabled ||
                    expressionStatus === ExpressionStatus.Evaluating, onValidChanged: handleVariableVectorMapValidChanged })),
        React.createElement(Grid, { className: "ActionButtonsGridItem", container: true, item: true, spacing: 2, justify: "flex-end", alignContent: "flex-end" },
            React.createElement(Grid, { item: true },
                React.createElement(Button, { onClick: handleCancelClick, disabled: disabled || !expressionDataEdited, variant: "outlined" },
                    React.createElement(Icon, { key: "cancel", name: "clear" }),
                    "Cancel")),
            React.createElement(Grid, { item: true },
                React.createElement(Button, { onClick: handleSaveClick, disabled: disabled ||
                        !store.state.editableExpressionTypeValid ||
                        !expressionDataEdited },
                    React.createElement(Icon, { key: "save", name: "save" }),
                    "Save")))));
};
//# sourceMappingURL=ExpressionEditComponent.js.map