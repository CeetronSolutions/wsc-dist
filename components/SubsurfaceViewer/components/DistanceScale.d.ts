import React from "react";
export interface ScaleProps {
    zoom?: number;
    incrementValue?: number | null;
    widthPerUnit?: number | null;
    style?: Record<string, unknown>;
    scaleUnit?: string;
}
declare const DistanceScale: React.FC<ScaleProps>;
export default DistanceScale;
