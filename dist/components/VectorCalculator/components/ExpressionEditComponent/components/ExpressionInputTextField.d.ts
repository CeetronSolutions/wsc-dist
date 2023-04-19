import React from "react";
import { ExpressionStatus } from "../../ExpressionsStore";
import "../../../VectorCalculator.css";
interface ExpressionInputTextFieldProps {
    externalParsing: boolean;
    disabled?: boolean;
    onStatusChanged: (status: ExpressionStatus) => void;
}
export declare const ExpressionInputTextField: React.FC<ExpressionInputTextFieldProps>;
export {};
