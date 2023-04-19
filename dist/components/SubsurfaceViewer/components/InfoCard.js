import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import { Button, Icon } from "@equinor/eds-core-react";
import { arrow_drop_up, arrow_drop_down } from "@equinor/eds-icons";
import { rgb } from "d3-color";
Icon.add({ arrow_drop_up, arrow_drop_down });
const roundToSignificant = function (num) {
    // Returns two significant figures (non-zero) for numbers with an absolute value less
    // than 1, and two decimal places for numbers with an absolute value greater
    // than 1.
    return parseFloat(num.toExponential(Math.max(1, 2 + Math.log10(Math.abs(num)))));
};
const useStyles = makeStyles({
    table: {
        "& > *": {
            backgroundColor: "#ffffffcc",
            color: "#000000ff",
            border: "2px solid #ccc",
            padding: "0px",
            borderRadius: "5px",
            position: "absolute",
            bottom: 0,
            left: 0,
            marginLeft: "3px",
            marginBottom: "3px",
        },
    },
    icon_style: {
        border: "none",
        padding: 0,
        width: "20px",
    },
    table_row: {
        "& > *": {
            padding: 0,
        },
    },
});
function Row(props) {
    var _a, _b;
    const { layer_data } = props;
    const [open, setOpen] = React.useState(true);
    const classes = useStyles();
    if (((_a = layer_data.properties) === null || _a === void 0 ? void 0 : _a.length) == 0)
        return null;
    return (React.createElement(React.Fragment, null,
        React.createElement(TableRow, { className: classes.table_row },
            React.createElement(TableCell, { className: classes.icon_style },
                React.createElement(Button, { style: { padding: 0 }, variant: "ghost", onClick: () => setOpen(!open) }, open ? (React.createElement(Icon, { color: "currentColor", name: "arrow_drop_up" })) : (React.createElement(Icon, { color: "currentColor", name: "arrow_drop_down" })))),
            React.createElement(TableCell, null,
                " ",
                layer_data.layerName,
                " ")),
        React.createElement(TableRow, { className: classes.table_row },
            React.createElement(TableCell, { style: { paddingBottom: 0, paddingTop: 0 }, colSpan: 2 },
                React.createElement(Collapse, { in: open, timeout: "auto", unmountOnExit: true },
                    React.createElement(Table, { size: "small", "aria-label": "properties" },
                        React.createElement(TableBody, null, (_b = layer_data.properties) === null || _b === void 0 ? void 0 : _b.map((propertyRow) => (React.createElement(TableRow, { key: propertyRow.name, className: classes.table_row },
                            React.createElement(TableCell, { style: {
                                    border: "none",
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                } },
                                propertyRow.color && (React.createElement("span", { style: {
                                        color: rgb(...propertyRow.color).toString(),
                                    } }, "\u2B24")),
                                propertyRow.name),
                            React.createElement(TableCell, { style: {
                                    border: "none",
                                    textAlign: "right",
                                } }, typeof propertyRow.value ==
                                "number"
                                ? roundToSignificant(propertyRow.value)
                                : propertyRow.value)))))))))));
}
const InfoCard = (props) => {
    const [infoCardData, setInfoCardData] = React.useState(null);
    React.useEffect(() => {
        if (props.pickInfos.length === 0) {
            setInfoCardData(null);
            return;
        }
        const topObject = props.pickInfos[0];
        if (topObject.coordinate === undefined ||
            topObject.coordinate.length < 2) {
            return;
        }
        const xy_properties = [];
        xy_properties.push({
            name: "x",
            value: Number(topObject.coordinate[0]).toFixed(2).toString() + " m",
        });
        xy_properties.push({
            name: "y",
            value: Number(topObject.coordinate[1]).toFixed(2).toString() + " m",
        });
        const info_card_data = [];
        info_card_data.push({
            layerName: "Position",
            properties: xy_properties,
        });
        props.pickInfos.forEach((info) => {
            var _a, _b;
            const layer_properties = info.properties;
            const layer_name = (_b = (_a = info.layer) === null || _a === void 0 ? void 0 : _a.props) === null || _b === void 0 ? void 0 : _b.name;
            // pick info can have 2 types of properties that can be displayed on the info card
            // 1. defined as propertyValue, used for general layer info (now using for positional data)
            // 2. Another defined as array of property object described by type PropertyDataType
            // collecting card data for 1st type
            const zValue = info.propertyValue;
            if (typeof zValue !== "undefined") {
                const property = xy_properties.find((item) => item.name === layer_name);
                if (property) {
                    property.value = zValue;
                }
                else {
                    xy_properties.push({
                        name: layer_name,
                        value: zValue,
                    });
                }
            }
            // collecting card data for 2nd type
            const layer = info_card_data.find((item) => item.layerName === layer_name);
            if (layer) {
                layer_properties === null || layer_properties === void 0 ? void 0 : layer_properties.forEach((layer_prop) => {
                    var _a, _b;
                    const property = (_a = layer.properties) === null || _a === void 0 ? void 0 : _a.find((item) => item.name === layer_prop.name);
                    if (property) {
                        property.value = layer_prop.value;
                    }
                    else {
                        (_b = layer.properties) === null || _b === void 0 ? void 0 : _b.push(layer_prop);
                    }
                });
            }
            else {
                info_card_data.push({
                    layerName: layer_name || "unknown-layer",
                    properties: layer_properties,
                });
            }
        });
        setInfoCardData(info_card_data);
    }, [props.pickInfos]);
    const classes = useStyles();
    return (infoCardData && (React.createElement(TableContainer, null,
        React.createElement(Table, { "aria-label": "info-card", className: classes.table },
            React.createElement(TableBody, null, infoCardData.map((card_data) => card_data.properties && (React.createElement(Row, { key: card_data.layerName, layer_data: card_data }))))))));
};
export default InfoCard;
//# sourceMappingURL=InfoCard.js.map