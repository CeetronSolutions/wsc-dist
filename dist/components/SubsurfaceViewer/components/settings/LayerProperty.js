import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateLayerProp } from "../../redux/actions";
import DrawModeSelector from "./DrawModeSelector";
import NumericInput from "./NumericInput";
import ToggleButton from "./ToggleButton";
import SliderInput from "./SliderInput";
import { SliderTypeProps, ToggleTypeProps, MenuTypeProps, NumericTypeProps, } from "../../redux/types";
const LayerProperty = React.memo(({ layer }) => {
    // Redux
    const dispatch = useDispatch();
    // handlers
    const updateProp = useCallback((layer_id, prop_name, state) => dispatch(updateLayerProp([layer_id, prop_name, state])), [dispatch]);
    const isControlDisplayable = (propId, dependentOnProp) => {
        if (!layer)
            return false;
        return dependentOnProp
            ? dependentOnProp in layer && propId in layer
            : propId in layer;
    };
    return (layer && (React.createElement(React.Fragment, null,
        // first render all boolean properties
        ToggleTypeProps.map((prop) => isControlDisplayable(prop.id, prop.dependentOnProp) && (React.createElement(ToggleButton, { label: prop.displayName, checked: layer[prop.id], onChange: (e) => {
                updateProp(layer["id"], prop.id, e.target.checked);
            }, key: `prop-toggle-${layer["id"]}-${prop.id}` }))),
        // then render all numeric properties
        NumericTypeProps.map((prop) => isControlDisplayable(prop.id, prop.dependentOnProp) && (React.createElement(NumericInput, { label: prop.displayName, value: layer[prop.id], step: prop.step, onChange: (e) => {
                updateProp(layer["id"], prop.id, Number(e.target.value));
            }, key: `prop-numeric-input-${layer["id"]}-${prop.id}` }))),
        // then render all slider properties
        SliderTypeProps.map((prop) => isControlDisplayable(prop.id, prop.dependentOnProp) && (React.createElement(SliderInput, { label: prop.displayName, min: prop.min, max: prop.max, step: prop.step, value: layer[prop.id], onChange: (_, value) => {
                updateProp(layer["id"], prop.id, value / 100);
            }, key: `prop-slider-${layer["id"]}-${prop.id}` }))),
        // lastly render all menu type properties
        MenuTypeProps.map((prop) => isControlDisplayable(prop.id, prop.dependentOnProp) && (React.createElement(DrawModeSelector, { layerId: layer["id"], label: prop.displayName, value: layer[prop.id], key: `prop-menu-${layer["id"]}-${prop.id}` }))))));
});
LayerProperty.displayName = "LayerProperty";
export default LayerProperty;
//# sourceMappingURL=LayerProperty.js.map