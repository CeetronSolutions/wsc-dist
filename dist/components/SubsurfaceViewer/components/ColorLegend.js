import React from "react";
import { DiscreteColorLegend, ContinuousLegend, } from "@emerson-eps/color-tables";
const ColorLegend = ({ horizontal, layer, colorTables, reverseRange, }) => {
    var _a;
    const [legendData, setLegendData] = React.useState();
    React.useEffect(() => {
        var _a, _b, _c;
        const legend_data = (_b = (_a = layer.getLegendData) === null || _a === void 0 ? void 0 : _a.call(layer)) !== null && _b !== void 0 ? _b : (_c = layer.state) === null || _c === void 0 ? void 0 : _c["legend"];
        setLegendData(legend_data);
    }, [layer.props, (_a = layer.state) === null || _a === void 0 ? void 0 : _a["legend"]]);
    if (!legendData || !layer.props.visible)
        return null;
    return (React.createElement("div", { style: { marginTop: 30 } },
        legendData.discrete && (React.createElement(DiscreteColorLegend, { discreteData: legendData.metadata, dataObjectName: legendData.title, colorName: legendData.colorName, horizontal: horizontal, colorTables: colorTables })),
        !legendData.discrete && (React.createElement(ContinuousLegend, { min: legendData.valueRange[0], max: legendData.valueRange[1], dataObjectName: legendData.title, colorName: legendData.colorName, horizontal: horizontal, id: layer.props.id, colorTables: colorTables, colorMapFunction: legendData.colorMapFunction, reverseRange: reverseRange }))));
};
export default ColorLegend;
//# sourceMappingURL=ColorLegend.js.map