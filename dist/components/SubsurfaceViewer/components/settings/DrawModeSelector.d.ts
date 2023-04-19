import React from "react";
interface Props {
    /**
     * It defines the mode that are available for a particular layer based on layer ID.
     */
    layerId: string;
    /**
     * Label for the component.
     */
    label: string;
    /**
     * Initial state of the component.
     */
    value: string;
}
declare const DrawModeSelector: React.FC<Props>;
export default DrawModeSelector;
