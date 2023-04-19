import React from "react";
import { Grid } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Button, Icon } from "@equinor/eds-core-react";
import { add, copy, delete_forever } from "@equinor/eds-icons";
Icon.add({ add, copy, delete_forever });
import { v4 as uuidv4 } from "uuid";
import { cloneDeep } from "lodash";
import { StoreActions, useStore } from "../ExpressionsStore";
import { ExpressionsTable } from "./components/ExpressionsTable";
import { getAvailableName, getDefaultExpression, } from "../../utils/VectorCalculatorHelperFunctions";
import "../../VectorCalculator.css";
export const ExpressionsTableComponent = (props) => {
    const store = useStore();
    const [selectedExpressions, setSelectedExpressions] = React.useState([]);
    const [disableDelete, setDisableDelete] = React.useState(false);
    const blinkingTimer = React.useRef(null);
    const [blinkingTableExpressions, setBlinkingTableExpressions] = React.useState([]);
    React.useEffect(() => {
        // Unmount timer
        return () => {
            blinkingTimer.current && clearTimeout(blinkingTimer.current);
        };
    }, []);
    React.useEffect(() => {
        // Disable delete when all expressions are non-deletable
        setDisableDelete(selectedExpressions.length <= 0
            ? false
            : selectedExpressions.every((expr) => !expr.isDeletable));
    }, [selectedExpressions]);
    const handleExpressionsSelect = (expressions) => {
        setSelectedExpressions(expressions);
    };
    const handleCloneClick = React.useCallback(() => {
        if (selectedExpressions.length <= 0) {
            return;
        }
        const newExpressions = [];
        for (const elm of selectedExpressions) {
            const cloneExpr = cloneDeep(elm);
            cloneExpr.name = getAvailableName(elm.name, store.state.expressions);
            cloneExpr.id = uuidv4();
            cloneExpr.isDeletable = true;
            newExpressions.push(cloneExpr);
        }
        store.dispatch({
            type: StoreActions.AddExpressions,
            payload: { expressions: newExpressions },
        });
    }, [store.state.expressions, selectedExpressions, getAvailableName]);
    const handleDeleteClick = React.useCallback(() => {
        const nonDeletableExpressions = selectedExpressions.filter((elm) => {
            return !elm.isDeletable;
        });
        // Handle blinking in table
        setBlinkingTableExpressions(nonDeletableExpressions);
        blinkingTimer.current = setTimeout(() => setBlinkingTableExpressions([]), 3000);
        const deletableExpressions = selectedExpressions.filter((elm) => {
            return elm.isDeletable;
        });
        const deletableExpressionIds = deletableExpressions.map((elm) => elm.id);
        store.dispatch({
            type: StoreActions.DeleteExpressions,
            payload: { ids: deletableExpressionIds },
        });
    }, [
        blinkingTimer,
        selectedExpressions,
        setBlinkingTableExpressions,
        setSelectedExpressions,
    ]);
    const handleNewClick = React.useCallback(() => {
        const newName = getAvailableName("New Expression", store.state.expressions);
        const newExpression = Object.assign(Object.assign({}, getDefaultExpression()), { name: newName });
        store.dispatch({
            type: StoreActions.AddExpressions,
            payload: { expressions: [newExpression] },
        });
    }, [store.state.expressions, getAvailableName]);
    return (React.createElement(Grid, { container: true, item: true, className: "ExpressionTableComponent", direction: "column", alignItems: "stretch", justifyContent: "space-between", xs: 6 },
        React.createElement(Grid, { item: true, className: "TableWrapperGridItem" },
            React.createElement(ExpressionsTable, { containerRef: props.containerRef, blinkingExpressions: blinkingTableExpressions, onExpressionsSelect: handleExpressionsSelect }),
            blinkingTableExpressions.length !== 0 && (React.createElement(Alert, { variant: "filled", severity: "error", className: "WarningAlert" }, blinkingTableExpressions.length > 1
                ? "Expressions not deletable!"
                : "Expression not deletable!"))),
        React.createElement(Grid, { className: "ActionButtonsGridItem", container: true, item: true, alignContent: "flex-end", spacing: 2 },
            React.createElement(Grid, { container: true, item: true, xs: 8, spacing: 2 },
                React.createElement(Grid, { item: true },
                    React.createElement(Button, { onClick: handleCloneClick, variant: "outlined", disabled: selectedExpressions.length <= 0 },
                        React.createElement(Icon, { key: "clone", name: "copy" }),
                        "Clone")),
                React.createElement(Grid, { item: true },
                    React.createElement(Button, { onClick: handleDeleteClick, color: "danger", disabled: disableDelete || selectedExpressions.length <= 0 },
                        React.createElement(Icon, { key: "delete", name: "delete_forever" }),
                        "Delete"))),
            React.createElement(Grid, { container: true, item: true, xs: 4, justifyContent: "flex-end" },
                React.createElement(Grid, { item: true },
                    React.createElement(Button, { onClick: handleNewClick },
                        React.createElement(Icon, { key: "new", name: "add" }),
                        "New"))))));
};
//# sourceMappingURL=ExpressionsTableComponent.js.map