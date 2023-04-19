import React from "react";
import { TextFieldProps } from "@equinor/eds-core-react";
declare type MaxLengthTextFieldProps = TextFieldProps & {
    maxLength: number;
};
export declare const MaxLengthTextField: React.FC<MaxLengthTextFieldProps>;
export {};
