import React from "react";
import DeckGL from "@deck.gl/react/typed";
import { ComponentStory, ComponentMeta } from "@storybook/react";
declare const _default: ComponentMeta<React.ForwardRefExoticComponent<Omit<import("@deck.gl/core/typed").DeckProps, "canvas" | "parent" | "gl" | "width" | "height" | "_customRender"> & {
    Deck?: typeof import("@deck.gl/core/typed").Deck | undefined;
    width?: string | number | undefined;
    height?: string | number | undefined;
    children?: React.ReactNode;
    ContextProvider?: React.Provider<import("@deck.gl/react/typed").DeckGLContextValue> | undefined;
} & React.RefAttributes<import("@deck.gl/react/typed").DeckGLRef>>>;
export default _default;
export declare const Baseline: ComponentStory<typeof DeckGL>;
declare function ColoredLabels(props: {
    labelColor: string;
    axisColor: string;
}): JSX.Element;
export declare const DarkMode: ComponentStory<typeof ColoredLabels>;
export declare const CustomLabel: ComponentStory<typeof CustomLabels>;
declare function CustomLabels(props: {
    labelColor: string;
    labelFontSize: number;
    fontFamily: string;
}): JSX.Element;
