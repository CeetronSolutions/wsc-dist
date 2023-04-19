import React from "react";
import { TableRowProps } from "@material-ui/core";
import "../../../VectorCalculator.css";
interface BlinkingTableRowProps extends TableRowProps {
    blinking: boolean;
}
export declare const BlinkingTableRow: React.FC<BlinkingTableRowProps>;
export {};
