import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducer";
/*
// #if process.env.NODE_RUNNING_STORYBOOK === "true"
import { enhancer } from "addon-redux";
// #endif
*/
const createEnhancer = () => {
    const enhancers = [];
    /*
    // #if process.env.NODE_RUNNING_STORYBOOK === "true"
    enhancers.push(enhancer);
    // #endif
    */
    return enhancers;
};
export const createReduxStore = (preloadedState) => configureStore({
    reducer: rootReducer,
    preloadedState,
    enhancers: createEnhancer(),
});
//# sourceMappingURL=store.js.map