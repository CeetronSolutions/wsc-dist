import React from "react";
import Grid from "@material-ui/core/Grid";
import { ExpressionsTableComponent } from "./ExpressionsTableComponent";
import { ExpressionEditComponent } from "./ExpressionEditComponent";
import { createExpressionTypeFromEditableData, StoreActions, useStore, } from "./ExpressionsStore";
import "../VectorCalculator.css";
export const VectorCalculatorComponent = (props) => {
    const store = useStore();
    const vectorCalculatorRef = React.useRef(null);
    React.useEffect(() => {
        /// Ensure external parsing for active expression
        if (!props.externalParseData ||
            !props.isDashControlled ||
            props.externalParseData.id !== store.state.activeExpression.id) {
            return;
        }
        store.dispatch({
            type: StoreActions.SetParsingData,
            payload: {
                data: {
                    isValid: props.externalParseData.isValid,
                    parsingMessage: props.externalParseData.message,
                    variables: props.externalParseData.variables,
                },
            },
        });
    }, [props.externalParseData]);
    React.useEffect(() => {
        // Only send valid expressions
        const outputExpressions = store.state.expressions.filter((expression) => expression.isValid);
        if (outputExpressions !== props.expressions) {
            props.setProps({ expressions: outputExpressions });
        }
    }, [store.state.expressions, props.setProps]);
    React.useEffect(() => {
        if (props.isDashControlled) {
            // Build ExpressionType for external parsing
            const externalParsingExpression = createExpressionTypeFromEditableData(store.state);
            props.setProps({
                externalParseExpression: externalParsingExpression,
            });
        }
    }, [store.state.editableExpression]);
    return (React.createElement("div", { ref: vectorCalculatorRef, className: "VectorCalculator" },
        React.createElement(Grid, { container: true, spacing: 3, alignItems: "stretch", justifyContent: "space-between" },
            React.createElement(ExpressionsTableComponent, { containerRef: vectorCalculatorRef }),
            React.createElement(ExpressionEditComponent, { vectors: props.vectors, externalParsing: props.isDashControlled, maxExpressionDescriptionLength: props.maxExpressionDescriptionLength }))));
};
//# sourceMappingURL=VectorCalculatorComponent.js.map