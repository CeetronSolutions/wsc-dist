import React from "react";
import { Provider } from "react-redux";
import { createReduxStore } from "../redux/store";
import { testState } from "./testReduxState";
// A super-simple mock of a redux store
const testStore = createReduxStore(testState);
export const withReduxDecorator = (Story) => (React.createElement(Provider, { store: testStore },
    React.createElement(Story, null)));
//# sourceMappingURL=storybookReduxAddon.js.map