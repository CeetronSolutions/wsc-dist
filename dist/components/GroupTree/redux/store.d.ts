import { EnhancedStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducer";
export declare type GroupTreeState = ReturnType<typeof rootReducer>;
export declare const createReduxStore: (preloadedState: Partial<GroupTreeState>) => EnhancedStore;
