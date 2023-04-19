import { EnhancedStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducer";
export declare type MapState = ReturnType<typeof rootReducer>;
export declare const createStore: (initialState: Record<string, unknown>) => EnhancedStore;
