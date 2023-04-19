var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from "react";
import { TextField } from "@equinor/eds-core-react";
export const MaxLengthTextField = (props) => {
    const { maxLength, onChange } = props, other = __rest(props, ["maxLength", "onChange"]);
    const [variant, setVariant] = React.useState("default");
    const [helperText, setHelperText] = React.useState("");
    const errorTimer = React.useRef(null);
    React.useEffect(() => {
        // Unmount timer
        return () => {
            errorTimer.current && clearTimeout(errorTimer.current);
        };
    }, []);
    React.useEffect(() => {
        errorTimer.current && clearTimeout(errorTimer.current);
        if (!props.value) {
            setHelperText(`0 / ${maxLength}`);
            setVariant("default");
            return;
        }
        if (props.value.length > maxLength) {
            setHelperText(`Exceeded maximum ${maxLength} characters!`);
            setVariant("error");
        }
        else {
            setHelperText(`${props.value ? props.value.length : 0} / ${maxLength}`);
            setVariant("default");
        }
    }, [props.value]);
    const handleOnChange = (e) => {
        if (e.target.value.length >= maxLength) {
            e.target.value = e.target.value.slice(0, maxLength);
            setHelperText(`Maximum ${maxLength} characters!`);
            setVariant("error");
            errorTimer.current && clearTimeout(errorTimer.current);
            errorTimer.current = setTimeout(() => {
                setVariant("default");
                setHelperText(`${e.target.value ? e.target.value.length : 0} / ${maxLength}`);
            }, 3000);
        }
        else {
            setHelperText(`${e.target.value ? e.target.value.length : 0} / ${maxLength}`);
            setVariant("default");
        }
        onChange && onChange(e);
    };
    return (React.createElement(TextField, Object.assign({}, other, { onChange: handleOnChange, value: props.value, variant: variant, helperText: helperText })));
};
//# sourceMappingURL=MaxLengthTextField.js.map