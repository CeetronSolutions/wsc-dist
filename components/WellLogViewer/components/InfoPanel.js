import React, { Component } from "react";
function createSeparator() {
    return (React.createElement("tr", { key: "separator" },
        React.createElement("td", { colSpan: 4 },
            " ",
            React.createElement("hr", null))));
}
const styleGroupRow = {
    backgroundColor: "#ededed",
    cursor: "pointer",
};
function formatValue(value) {
    if (!Number.isFinite(value))
        return "";
    if (Number.isInteger(value))
        return value.toFixed(0);
    let v = value.toPrecision(4);
    if (v.indexOf(".") >= 0) {
        // cut trailing zeroes
        for (;;) {
            let l = v.length;
            if (!l--)
                break;
            if (v[l] !== "0")
                break;
            v = v.substring(0, l);
        }
    }
    return v;
}
class InfoPanel extends Component {
    constructor(props) {
        super(props);
        this.createRow = this.createRow.bind(this);
    }
    onRowClick(trackId /*,
    ev: React.MouseEvent<HTMLTableRowElement>*/) {
        if (!this.props.onGroupClick)
            return;
        this.props.onGroupClick(trackId);
    }
    createRow(info) {
        if (info.type === "separator")
            // special case
            return createSeparator();
        if (info.groupStart !== undefined) {
            return (React.createElement("tr", { style: styleGroupRow, key: "_group_" + info.trackId + "." + info.name, onClick: this.onRowClick.bind(this, info.trackId) },
                React.createElement("td", { style: { color: info.color, fontSize: "small" } }, info.collapsed
                    ? "\u25BA"
                    : "\u25BC" /*right/down-pointing triangle*/),
                React.createElement("td", { colSpan: 3, style: { fontSize: "small", fontWeight: "bold" } }, info.name)));
        }
        let name = info.name ? info.name : "?";
        if (name.length > 15)
            // compress too long names
            name = name.substring(0, 13) + "…";
        // print long names and values with a smaller font size
        const nameStyle = name.length > 10 ? { fontSize: "x-small" } : {};
        let value = formatValue(info.value);
        if (info.discrete)
            value = info.discrete + (value ? "\xA0(" + value + ")" : "");
        const valueStyle = {
            width: "90px",
            paddingLeft: "1.5em",
            textAlign: "right",
        };
        if (value.length > 10)
            valueStyle.fontSize = "x-small";
        return (React.createElement("tr", { key: info.trackId +
                "." +
                info.name /*Set unique key prop just for react pleasure*/ },
            React.createElement("td", { style: { color: info.color, fontSize: "small" } }, "\u2B24" /*big circle*/),
            React.createElement("td", { style: nameStyle }, name),
            React.createElement("td", { style: valueStyle }, value),
            React.createElement("td", { style: { paddingLeft: "0.5em" } }, info.units)));
    }
    render() {
        var _a;
        return (React.createElement("div", { style: { overflowY: "auto", overflowX: "hidden" } },
            React.createElement("fieldset", null,
                React.createElement("legend", null, this.props.header),
                React.createElement("table", { style: {
                        borderSpacing: "0px",
                        width: "100%",
                    } },
                    React.createElement("tbody", null, (_a = this.props.infos) === null || _a === void 0 ? void 0 : _a.map(this.createRow.bind(this)))))));
    }
}
export default InfoPanel;
//# sourceMappingURL=InfoPanel.js.map