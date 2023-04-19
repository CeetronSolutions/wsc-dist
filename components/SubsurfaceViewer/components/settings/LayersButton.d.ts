import React from "react";
export interface LayersButtonProps {
    id: string;
    layers: Record<string, unknown>[];
}
declare const LayersButton: React.FC<LayersButtonProps>;
export default LayersButton;
