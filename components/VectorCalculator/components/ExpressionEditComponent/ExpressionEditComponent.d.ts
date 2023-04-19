import React from "react";
import { TreeDataNode } from "@webviz/core-components";
import "../../VectorCalculator.css";
interface ExpressionEditComponentProps {
    vectors: TreeDataNode[];
    externalParsing: boolean;
    maxExpressionDescriptionLength: number;
}
export declare const ExpressionEditComponent: React.FC<ExpressionEditComponentProps>;
export {};
