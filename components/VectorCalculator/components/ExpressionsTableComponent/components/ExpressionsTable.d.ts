import React from "react";
import { ExpressionType } from "../../../utils/VectorCalculatorTypes";
import "../../../VectorCalculator.css";
interface ExpressionsTableProps {
    blinkingExpressions: ExpressionType[];
    containerRef: React.RefObject<HTMLDivElement | null>;
    onExpressionsSelect: (expressions: ExpressionType[]) => void;
}
export declare const ExpressionsTable: React.FC<ExpressionsTableProps>;
export {};
