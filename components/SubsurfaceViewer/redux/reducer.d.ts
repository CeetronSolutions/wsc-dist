import { PayloadAction } from "@reduxjs/toolkit";
import { DrawMode } from "./types";
export declare const specSlice: import("@reduxjs/toolkit").Slice<Record<string, unknown>, {
    setSpec: (_: import("immer/dist/internal").WritableDraft<Record<string, unknown>>, action: PayloadAction<Record<string, unknown>>) => Record<string, unknown>;
    updateVisibleLayers: (state: import("immer/dist/internal").WritableDraft<Record<string, unknown>>, action: PayloadAction<[string, boolean]>) => void;
    updateDrawingMode: (state: import("immer/dist/internal").WritableDraft<Record<string, unknown>>, action: PayloadAction<[string, DrawMode]>) => void;
    updateLayerProp: (state: import("immer/dist/internal").WritableDraft<Record<string, unknown>>, action: PayloadAction<[string, string, boolean | string | number]>) => void;
}, "spec">;
export declare const rootReducer: import("redux").Reducer<import("redux").CombinedState<{
    spec: Record<string, unknown>;
}>, import("redux").AnyAction>;
