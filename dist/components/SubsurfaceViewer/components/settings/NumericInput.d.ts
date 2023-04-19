import React, { ChangeEvent } from "react";
interface Props {
    /**
     * Label for the component.
     */
    label: string;
    /**
     * Initial state of the component.
     */
    value: number;
    min?: number;
    max?: number;
    step?: number;
    /**
     * Callback to update the state of the component.
     */
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
declare const NumericInput: React.FC<Props>;
export default NumericInput;
