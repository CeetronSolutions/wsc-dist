import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import SubsurfaceViewer from "./SubsurfaceViewer";
declare const _default: ComponentMeta<React.FC<import("./SubsurfaceViewer").SubsurfaceViewerProps>>;
export default _default;
export declare const TooltipApi: ComponentStory<React.FC<import("./SubsurfaceViewer").SubsurfaceViewerProps>>;
export declare const TooltipStyle: ComponentStory<React.FC<import("./SubsurfaceViewer").SubsurfaceViewerProps>>;
export declare const customizedCameraPosition: ComponentStory<React.FC<import("./SubsurfaceViewer").SubsurfaceViewerProps>>;
export declare const MultiViewAnnotation: ComponentStory<React.FC<import("./SubsurfaceViewer").SubsurfaceViewerProps>>;
export declare const ViewObjectInitializedAsEmpty: ComponentStory<React.FC<import("./SubsurfaceViewer").SubsurfaceViewerProps>>;
export declare const DepthTest: ComponentStory<typeof SubsurfaceViewer>;
declare const MouseEventStory: (args: {
    show3d: boolean;
}) => JSX.Element;
export declare const MouseEvent: ComponentStory<typeof MouseEventStory>;
