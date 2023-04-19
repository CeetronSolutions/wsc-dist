import { PayloadAction } from "@reduxjs/toolkit";
import { UISettings } from "./types";
export declare const idSlice: import("@reduxjs/toolkit").Slice<string, {
    updateId: (_: string, action: PayloadAction<string>) => string;
}, "id">;
export declare const uiSlice: import("@reduxjs/toolkit").Slice<UISettings, {
    updateCurrentDateTime: (state: import("immer/dist/internal").WritableDraft<UISettings>, action: PayloadAction<string>) => void;
    updateCurrentFlowRate: (state: import("immer/dist/internal").WritableDraft<UISettings>, action: PayloadAction<string>) => void;
    updateCurrentNodeInfo: (state: import("immer/dist/internal").WritableDraft<UISettings>, action: PayloadAction<string>) => void;
}, "ui">;
export declare const rootReducer: import("redux").Reducer<import("redux").CombinedState<{
    id: string;
    ui: UISettings;
}>, import("redux").AnyAction>;
