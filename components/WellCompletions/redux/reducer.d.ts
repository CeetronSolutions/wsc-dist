import { PayloadAction } from "@reduxjs/toolkit";
import { Attributes, SortDirection, TimeAggregation, UISettings } from "./types";
export declare const idSlice: import("@reduxjs/toolkit").Slice<string, {
    updateId: (_: string, action: PayloadAction<string>) => string;
}, "id">;
export declare const attributeSlice: import("@reduxjs/toolkit").Slice<Attributes, {
    updateAttributeKeys: (state: import("immer/dist/internal").WritableDraft<Attributes>, action: PayloadAction<string[]>) => void;
}, "attribute">;
export declare const uiSlice: import("@reduxjs/toolkit").Slice<UISettings, {
    updateTimeIndexRange: (state: import("immer/dist/internal").WritableDraft<UISettings>, action: PayloadAction<[number, number]>) => void;
    updateWellsPerPage: (state: import("immer/dist/internal").WritableDraft<UISettings>, action: PayloadAction<number>) => void;
    updateCurrentPage: (state: import("immer/dist/internal").WritableDraft<UISettings>, action: PayloadAction<number>) => void;
    updateTimeAggregation: (state: import("immer/dist/internal").WritableDraft<UISettings>, action: PayloadAction<TimeAggregation>) => void;
    updateIsDrawerOpen: (state: import("immer/dist/internal").WritableDraft<UISettings>, action: PayloadAction<boolean>) => void;
    updateWellSearchText: (state: import("immer/dist/internal").WritableDraft<UISettings>, action: PayloadAction<string>) => void;
    updateFilteredZones: (state: import("immer/dist/internal").WritableDraft<UISettings>, action: PayloadAction<string[]>) => void;
    updateHideZeroCompletions: (state: import("immer/dist/internal").WritableDraft<UISettings>, action: PayloadAction<boolean>) => void;
    updateFilterByAttributes: (state: import("immer/dist/internal").WritableDraft<UISettings>, action: PayloadAction<string[]>) => void;
    updateSortKey: (state: import("immer/dist/internal").WritableDraft<UISettings>, action: PayloadAction<{
        sortKey: string;
        sortDirection: SortDirection;
    }>) => void;
    deleteSortKey: (state: import("immer/dist/internal").WritableDraft<UISettings>, action: PayloadAction<string>) => void;
}, "ui">;
export declare const rootReducer: import("redux").Reducer<import("redux").CombinedState<{
    id: string;
    attributes: Attributes;
    ui: UISettings;
}>, import("redux").AnyAction>;
