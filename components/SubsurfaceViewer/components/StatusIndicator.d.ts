import React from "react";
import { LayersList } from "@deck.gl/core/typed";
interface StatusIndicatorProps {
    layers: LayersList;
    isLoaded: boolean;
}
declare const StatusIndicator: React.FC<StatusIndicatorProps>;
export default StatusIndicator;
