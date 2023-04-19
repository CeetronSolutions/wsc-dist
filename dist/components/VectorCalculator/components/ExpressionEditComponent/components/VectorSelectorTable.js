import React from "react";
import { Table, TableContainer, TableRow, TableBody, TableCell, } from "@material-ui/core";
import cloneDeep from "lodash/cloneDeep";
import VectorSelector from "../../../../VectorSelector";
import { StoreActions, useStore } from "../../ExpressionsStore";
import { areVariableVectorMapsEqual, createVariableVectorMapFromVariables, isVariableVectorMapValid, } from "../../../utils/VectorCalculatorHelperFunctions";
import "../../../VectorCalculator.css";
export const VectorSelectorTable = (props) => {
    const store = useStore();
    const [isValid, setIsValid] = React.useState(isVariableVectorMapValid(store.state.editableVariableVectorMap, ":", props.vectorData));
    const [variableVectorMap, setVariableVectorMap] = React.useState(store.state.editableVariableVectorMap);
    const [cachedVariableVectorMap, setCachedVariableVectorMap] = React.useState(store.state.editableVariableVectorMap);
    const disabled = props.disabled || false;
    const createUpdatedCachedVariableVectorMap = React.useCallback((newMap) => {
        const newCachedVariableVectorMap = cloneDeep(cachedVariableVectorMap);
        newMap.forEach((elm) => {
            // Find reference to cached object
            const cachedElm = newCachedVariableVectorMap.find((cachedElm) => cachedElm.variableName === elm.variableName);
            if (!cachedElm) {
                // Add to cache
                newCachedVariableVectorMap.push(elm);
            }
            else {
                // Update existing cache
                cachedElm.vectorName = elm.vectorName;
            }
        });
        return newCachedVariableVectorMap;
    }, [cachedVariableVectorMap]);
    React.useEffect(() => {
        props.onValidChanged(isValid);
    }, [isValid]);
    React.useEffect(() => {
        const newVariableVectorMap = cloneDeep(store.state.editableVariableVectorMap);
        setVariableVectorMap(newVariableVectorMap);
        setIsValid(isVariableVectorMapValid(newVariableVectorMap, ":", props.vectorData));
    }, [store.state.editableVariableVectorMap]);
    React.useEffect(() => {
        setCachedVariableVectorMap(store.state.activeExpression.variableVectorMap);
    }, [store.state.activeExpression.variableVectorMap]);
    React.useEffect(() => {
        // Create map from expression parse data
        if (!store.state.parseData.isValid) {
            return;
        }
        const newVariableVectorMap = createVariableVectorMapFromVariables(store.state.parseData.variables, cachedVariableVectorMap);
        if (!areVariableVectorMapsEqual(newVariableVectorMap, store.state.editableVariableVectorMap)) {
            store.dispatch({
                type: StoreActions.SetVariableVectorMap,
                payload: {
                    variableVectorMap: newVariableVectorMap,
                },
            });
        }
    }, [store.state.parseData]);
    const updateVariableVectorMap = React.useCallback((vectorSelectorProps, index) => {
        const newVariableVectorMap = cloneDeep(variableVectorMap);
        if (vectorSelectorProps.selectedTags.length < 1) {
            newVariableVectorMap[index].vectorName = [];
        }
        else {
            newVariableVectorMap[index].vectorName[0] =
                vectorSelectorProps.selectedTags[0];
        }
        setCachedVariableVectorMap(createUpdatedCachedVariableVectorMap(newVariableVectorMap));
        store.dispatch({
            type: StoreActions.SetVariableVectorMap,
            payload: {
                variableVectorMap: newVariableVectorMap,
            },
        });
    }, [
        variableVectorMap,
        createUpdatedCachedVariableVectorMap,
        setCachedVariableVectorMap,
        setIsValid,
    ]);
    return (React.createElement(TableContainer, { className: "VectorSelectorTableContainer" },
        disabled && React.createElement("div", { className: "DisableOverlay" }),
        React.createElement(Table, null,
            React.createElement(TableBody, null, variableVectorMap.map((row, index) => {
                return (React.createElement(TableRow, { tabIndex: -1, key: "row_" + row.variableName },
                    React.createElement(TableCell, { className: "VectorSelectorTableVariableColumn", align: "left", key: row.variableName }, row.variableName),
                    React.createElement(TableCell, { className: "VectorSelectorTableVectorSelectorColumn", key: `cell_${row.variableName}` },
                        React.createElement(VectorSelector, { id: "vector_selector_" +
                                row.variableName, key: "vector_selector_" +
                                row.variableName, delimiter: ":", label: "", selectedTags: row.vectorName, setProps: (props) => updateVariableVectorMap(props, index), numMetaNodes: 0, maxNumSelectedNodes: 1, numSecondsUntilSuggestionsAreShown: 0, placeholder: "Add new vector...", data: props.vectorData, caseInsensitiveMatching: true }))));
            })))));
};
//# sourceMappingURL=VectorSelectorTable.js.map