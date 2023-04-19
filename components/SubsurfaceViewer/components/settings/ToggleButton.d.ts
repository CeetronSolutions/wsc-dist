import React, { ChangeEvent } from "react";
interface Props {
    /**
     * Label for the component.
     */
    label: string;
    /**
     * Initial state of the component.
     */
    checked: boolean;
    /**
     * Callback to update the state of the component.
     */
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
declare const ToggleButton: React.FC<Props>;
export default ToggleButton;
