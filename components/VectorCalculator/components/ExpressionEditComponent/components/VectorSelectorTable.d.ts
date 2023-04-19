import React from "react";
import { TreeDataNode } from "@webviz/core-components";
import "../../../VectorCalculator.css";
interface VectorSelectorTableProps {
    vectorData: TreeDataNode[];
    disabled?: boolean;
    onValidChanged: (isValid: boolean) => void;
}
export declare const VectorSelectorTable: React.FC<VectorSelectorTableProps>;
export {};
