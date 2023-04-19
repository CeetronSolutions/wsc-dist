import React, { FormEvent } from "react";
interface Props {
    /**
     * Label for the component.
     */
    label: string;
    /**
     * Initial state of the component.
     */
    value: number;
    /**
     * Min value.
     */
    min?: number;
    /**
     * Max value.
     */
    max?: number;
    /**
     * Stepping interval.
     */
    step?: number;
    /**
     * Callback to update the state of the component.
     */
    onChange: (e: FormEvent<HTMLDivElement>, value: number | number[]) => void;
}
declare const SliderInput: React.FC<Props>;
export default SliderInput;
