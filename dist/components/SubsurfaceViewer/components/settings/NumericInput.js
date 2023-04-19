import React from "react";
import { Label, Input } from "@equinor/eds-core-react";
const NumericInput = React.memo(({ label, value, min, max, step, onChange }) => {
    return (React.createElement("div", { style: {
            display: "flex",
            justifyContent: "space-between",
        } },
        React.createElement(Label, { label: label, id: `${label}-input-label`, style: {
                paddingTop: 5,
                paddingBottom: 5,
                fontSize: 15,
            } }),
        React.createElement(Input, { id: `${label}-input`, type: "number", value: value, onChange: onChange, min: min, max: max, step: step, style: {
                fontSize: 15,
                textAlign: "right",
                width: "3rem",
            } })));
});
NumericInput.defaultProps = {
    min: 0,
    step: 1,
};
NumericInput.displayName = "NumericInput";
export default NumericInput;
//# sourceMappingURL=NumericInput.js.map