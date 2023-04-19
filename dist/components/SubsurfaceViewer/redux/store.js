import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducer";
export const createStore = (initialState) => configureStore({
    reducer: rootReducer,
    preloadedState: { spec: initialState },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});
//# sourceMappingURL=store.js.map