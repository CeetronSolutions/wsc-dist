import { NativeSelect } from "@equinor/eds-core-react";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateDrawingMode } from "../../redux/actions";
import { DrawModes } from "../../redux/types";
const DrawModeSelector = React.memo(({ layerId, label, value }) => {
    // Redux
    const dispatch = useDispatch();
    // handlers
    const handleSelectedItemChange = useCallback((event) => {
        const selection = DrawModes.find((mode) => mode.displayName === event.target.value);
        dispatch(updateDrawingMode([layerId, selection === null || selection === void 0 ? void 0 : selection.id]));
    }, [dispatch]);
    const cur_selection = DrawModes.find((mode) => mode.id === value);
    return (React.createElement(NativeSelect, { id: `${layerId}-mode-selector`, label: label, value: cur_selection === null || cur_selection === void 0 ? void 0 : cur_selection.displayName, onChange: handleSelectedItemChange }, DrawModes.map((mode) => (React.createElement("option", { key: mode.id }, mode.displayName)))));
});
DrawModeSelector.displayName = "DrawModeSelector";
export default DrawModeSelector;
//# sourceMappingURL=DrawModeSelector.js.map