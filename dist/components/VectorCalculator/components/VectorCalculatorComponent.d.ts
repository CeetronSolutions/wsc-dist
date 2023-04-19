import React from "react";
import { ExpressionType, ExternalParseData } from "../utils/VectorCalculatorTypes";
import { TreeDataNode } from "@webviz/core-components";
import "../VectorCalculator.css";
interface ParentProps {
    expressions?: ExpressionType[];
    externalParseExpression?: ExpressionType;
}
interface VectorCalculatorProps {
    id: string;
    vectors: TreeDataNode[];
    expressions: ExpressionType[];
    isDashControlled: boolean;
    maxExpressionDescriptionLength: number;
    externalParseData?: ExternalParseData;
    setProps: (props: ParentProps) => void;
}
export declare const VectorCalculatorComponent: React.FC<VectorCalculatorProps>;
export {};
