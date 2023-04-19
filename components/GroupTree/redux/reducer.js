import { combineReducers, createSlice } from "@reduxjs/toolkit";
export const idSlice = createSlice({
    name: "id",
    initialState: "",
    reducers: {
        updateId: (_, action) => action.payload,
    },
});
export const uiSlice = createSlice({
    name: "ui",
    initialState: {
        currentDateTime: "",
        currentFlowRate: "",
        currentNodeInfo: "",
    },
    reducers: {
        updateCurrentDateTime: (state, action) => {
            state.currentDateTime = action.payload;
        },
        updateCurrentFlowRate: (state, action) => {
            state.currentFlowRate = action.payload;
        },
        updateCurrentNodeInfo: (state, action) => {
            state.currentNodeInfo = action.payload;
        },
    },
});
export const rootReducer = combineReducers({
    id: idSlice.reducer,
    ui: uiSlice.reducer,
});
//# sourceMappingURL=reducer.js.map