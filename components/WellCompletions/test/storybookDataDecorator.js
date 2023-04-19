import React from "react";
import { DataContext } from "../components/DataLoader";
// @rmt: Changed require to import
import exampleData from "../../../../demo/example-data/well-completions.json";
export const exampleDataDecorator = (Story) => (
// @rmt: Added type
React.createElement(DataContext.Provider, { value: exampleData },
    React.createElement(Story, null)));
//# sourceMappingURL=storybookDataDecorator.js.map