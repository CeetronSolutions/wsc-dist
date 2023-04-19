import React from "react";
import DeckGL from "@deck.gl/react/typed";
import { rgb } from "d3-color";
import { OrthographicView } from "@deck.gl/core/typed";
import AxesLayer from "./axesLayer";
export default {
    component: DeckGL,
    title: "SubsurfaceViewer / Axes",
};
const layerProps = {
    name: "axes",
    bounds: [-100, -100, 0, 100, 100, 100],
};
function getRgba(color) {
    const c = rgb(color);
    return [c.r, c.g, c.b, c.opacity * 255];
}
export const Baseline = (args) => {
    args.layers = [new AxesLayer(Object.assign({}, layerProps))];
    args.views = [new OrthographicView({})];
    return React.createElement(DeckGL, Object.assign({}, args));
};
function ColoredLabels(props) {
    const layers = [
        new AxesLayer(Object.assign(Object.assign({}, layerProps), { labelColor: getRgba(props.labelColor), axisColor: getRgba(props.axisColor) })),
    ];
    const views = [new OrthographicView({})];
    return React.createElement(DeckGL, { layers: layers, views: views });
}
export const DarkMode = (args) => {
    return React.createElement(ColoredLabels, Object.assign({}, args));
};
DarkMode.args = {
    labelColor: "white",
    axisColor: "white",
};
DarkMode.parameters = {
    backgrounds: { default: "dark" },
};
export const CustomLabel = (args) => {
    return React.createElement(CustomLabels, Object.assign({}, args));
};
function CustomLabels(props) {
    const layers = [
        new AxesLayer(Object.assign(Object.assign({}, layerProps), { labelColor: getRgba(props.labelColor), labelFontSize: props.labelFontSize, fontFamily: props.fontFamily })),
    ];
    const views = [new OrthographicView({})];
    return React.createElement(DeckGL, { layers: layers, views: views });
}
CustomLabel.args = {
    labelColor: "blue",
    labelFontSize: 10,
    fontFamily: "math",
};
//# sourceMappingURL=axesLayer.stories.js.map