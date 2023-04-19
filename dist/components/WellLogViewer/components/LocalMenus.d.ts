import React, { Component, ReactNode } from "react";
import { Track } from "@equinor/videx-wellog";
import { Plot } from "@equinor/videx-wellog";
import WellLogView from "./WellLogView";
export interface SimpleMenuProps {
    anchorEl: HTMLElement;
    wellLogView: WellLogView;
    track: Track;
    type: string;
    plotName?: string;
}
export interface SimpleMenuState {
    anchorEl: HTMLElement | null;
}
export declare class SimpleMenu extends Component<SimpleMenuProps, SimpleMenuState> {
    addTrack: () => void;
    editTrack: () => void;
    removeTrack: () => void;
    addPlot: () => void;
    editPlots: () => void;
    removePlots: () => void;
    constructor(props: SimpleMenuProps);
    componentDidUpdate(prevProps: SimpleMenuProps): void;
    closeMenu(): void;
    handleContextMenu(ev: React.MouseEvent<HTMLElement>): void;
    handleCloseMenu(): void;
    handleClickItem(action?: () => void): void;
    createRemovePlotMenuItem(title: string, plot: Plot): ReactNode;
    menuRemovePlotItems(): ReactNode[];
    createEditPlotMenuItem(title: string, plot: Plot): ReactNode;
    menuEditPlotItems(): ReactNode[];
    createMenuItem(title: string, action?: () => void): ReactNode;
    render(): JSX.Element;
}
export declare function editPlots(parent: HTMLElement | null, wellLogView: WellLogView, track: Track): void;
export declare function removePlots(parent: HTMLElement | null, wellLogView: WellLogView, track: Track): void;
