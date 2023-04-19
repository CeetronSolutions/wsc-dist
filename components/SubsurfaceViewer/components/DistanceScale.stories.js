import React from "react";
import DistanceScale from "./DistanceScale";
export default {
    component: DistanceScale,
    title: "SubsurfaceViewer / Components / DistanceScale",
};
const darkModeStyle = {
    color: "white",
};
const Template = (args) => (React.createElement(DistanceScale, Object.assign({}, args)));
export const Baseline = Template.bind({});
export const DarkMode = Template.bind({});
DarkMode.args = {
    style: darkModeStyle,
};
DarkMode.parameters = {
    backgrounds: { default: "dark" },
};
//# sourceMappingURL=DistanceScale.stories.js.map