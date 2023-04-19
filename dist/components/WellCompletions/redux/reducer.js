import { combineReducers, createSlice } from "@reduxjs/toolkit";
export const idSlice = createSlice({
    name: "id",
    initialState: "",
    reducers: {
        updateId: (_, action) => action.payload,
    },
});
export const attributeSlice = createSlice({
    name: "attribute",
    initialState: {
        attributeKeys: [],
    },
    reducers: {
        updateAttributeKeys: (state, action) => {
            state.attributeKeys = action.payload;
        },
    },
});
export const uiSlice = createSlice({
    name: "ui",
    initialState: {
        timeIndexRange: [0, 0],
        wellsPerPage: 25,
        currentPage: 1,
        timeAggregation: "None",
        sortBy: {},
        isDrawerOpen: false,
        wellSearchText: "",
        filteredZones: [],
        hideZeroCompletions: false,
        filterByAttributes: [],
    },
    reducers: {
        updateTimeIndexRange: (state, action) => {
            state.timeIndexRange = action.payload;
        },
        updateWellsPerPage: (state, action) => {
            state.wellsPerPage = action.payload;
        },
        updateCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        updateTimeAggregation: (state, action) => {
            state.timeAggregation = action.payload;
        },
        updateIsDrawerOpen: (state, action) => {
            state.isDrawerOpen = action.payload;
        },
        updateWellSearchText: (state, action) => {
            state.wellSearchText = action.payload;
        },
        updateFilteredZones: (state, action) => {
            state.filteredZones = action.payload;
        },
        updateHideZeroCompletions: (state, action) => {
            state.hideZeroCompletions = action.payload;
        },
        updateFilterByAttributes: (state, action) => {
            state.filterByAttributes = action.payload;
        },
        updateSortKey: (state, action) => {
            const newSortBy = Object.assign(Object.assign({}, state.sortBy), { [action.payload.sortKey]: action.payload.sortDirection });
            state.sortBy = newSortBy;
        },
        deleteSortKey: (state, action) => {
            const newSortBy = Object.keys(state.sortBy).reduce((acc, current) => {
                if (current !== action.payload) {
                    acc[current] = state.sortBy[current];
                }
                return acc;
            }, {});
            state.sortBy = newSortBy;
        },
    },
});
export const rootReducer = combineReducers({
    id: idSlice.reducer,
    attributes: attributeSlice.reducer,
    ui: uiSlice.reducer,
});
//# sourceMappingURL=reducer.js.map