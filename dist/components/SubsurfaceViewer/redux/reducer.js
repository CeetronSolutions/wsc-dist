/* eslint-disable @typescript-eslint/no-explicit-any */
import { combineReducers, createSlice } from "@reduxjs/toolkit";
export const specSlice = createSlice({
    name: "spec",
    initialState: {},
    reducers: {
        setSpec: (_, action) => action.payload,
        updateVisibleLayers: (state, action) => {
            const layer = state["layers"].find((layer) => layer.id === action.payload[0]);
            if (layer)
                layer.visible = action.payload[1];
        },
        updateDrawingMode: (state, action) => {
            const layer = state["layers"].find((layer) => layer.id === action.payload[0]);
            if (layer && layer["@@type"] === "DrawingLayer")
                layer.mode = action.payload[1];
        },
        updateLayerProp: (state, action) => {
            const layer = state["layers"].find((layer) => layer.id === action.payload[0]);
            if (layer)
                layer[action.payload[1]] = action.payload[2];
        },
    },
});
export const rootReducer = combineReducers({
    spec: specSlice.reducer,
});
//# sourceMappingURL=reducer.js.map