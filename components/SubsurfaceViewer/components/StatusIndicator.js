import React from "react";
import { CircularProgress } from "@equinor/eds-core-react";
function getLoadProgress(layers) {
    const loaded = layers === null || layers === void 0 ? void 0 : layers.filter((layer) => { var _a; return (_a = layer) === null || _a === void 0 ? void 0 : _a.isLoaded; });
    const count = loaded === null || loaded === void 0 ? void 0 : loaded.length;
    const progress = count / (layers === null || layers === void 0 ? void 0 : layers.length);
    return progress * 100;
}
const StatusIndicator = ({ layers, isLoaded, }) => {
    if (isLoaded) {
        return React.createElement("div", null);
    }
    const progress = getLoadProgress(layers);
    return (React.createElement("div", null,
        React.createElement(CircularProgress, { size: 48, value: progress, variant: "determinate" }),
        React.createElement("br", null),
        "Loading assets..."));
};
export default StatusIndicator;
//# sourceMappingURL=StatusIndicator.js.map