import React from "react";
import { Label, Slider } from "@equinor/eds-core-react";
const SliderInput = React.memo(({ label, value, min, max, step, onChange }) => {
    return (React.createElement("div", { style: {
            display: "flex",
            justifyContent: "space-between",
        } },
        React.createElement(Label, { id: `${label}-slider-label`, label: label, style: {
                paddingTop: 5,
                fontSize: 15,
            } }),
        React.createElement(Slider, { ariaLabelledby: `${label}-slider-label`, id: `${label}-slider`, value: value * 100, min: min, max: max, step: step, minMaxDots: false, minMaxValues: false, onChange: onChange, style: {
                paddingTop: 5,
                paddingRight: 10,
                paddingBottom: 25,
                width: "3rem",
            } })));
});
SliderInput.displayName = "SliderInput";
export default SliderInput;
//# sourceMappingURL=SliderInput.js.map