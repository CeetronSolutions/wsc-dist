import { EnhancedStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducer";
export declare type WellCompletionsState = ReturnType<typeof rootReducer>;
export declare const createReduxStore: (preloadedState: Partial<WellCompletionsState>) => EnhancedStore;
