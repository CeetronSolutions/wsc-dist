import React from "react";
import { Label, Switch } from "@equinor/eds-core-react";
const ToggleButton = React.memo(({ label, checked, onChange }) => {
    return (React.createElement("div", { style: {
            display: "flex",
            justifyContent: "space-between",
        } },
        React.createElement(Label, { label: label, id: `${label}-switch-label`, style: {
                paddingTop: 15,
                fontSize: 15,
            } }),
        React.createElement(Switch, { id: `${label}-switch`, "aria-label": label, label: "", onChange: onChange, checked: checked, style: {
                paddingRight: 10,
                width: "3rem",
            } })));
});
ToggleButton.displayName = "ToggleButton";
export default ToggleButton;
//# sourceMappingURL=ToggleButton.js.map