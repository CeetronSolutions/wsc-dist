import React from "react";
import { TreeDataNode } from "@webviz/core-components";
import "../../../VectorCalculator.css";
interface ExpressionNameTextFieldProps {
    vectors: TreeDataNode[];
    disabled?: boolean;
    onValidChanged: (isValid: boolean) => void;
}
export declare const ExpressionNameTextField: React.FC<ExpressionNameTextFieldProps>;
export {};
