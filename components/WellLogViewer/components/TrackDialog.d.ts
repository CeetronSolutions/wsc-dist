import React, { Component, ReactNode } from "react";
import { TemplateTrack } from "./WellLogTemplateTypes";
import WellLogView from "./WellLogView";
interface Props {
    templateTrack?: TemplateTrack;
    onOK: (templateTrack: TemplateTrack) => void;
    wellLogView: WellLogView;
}
interface State extends TemplateTrack {
    stacked: string;
    stackedName: string;
    open: boolean;
}
export declare class TrackPropertiesDialog extends Component<Props, State> {
    bStacked: boolean | undefined;
    constructor(props: Props);
    onOK(): void;
    onChange(e: React.ChangeEvent<HTMLInputElement>): void;
    onChangeChecked(e: React.ChangeEvent<HTMLInputElement>): void;
    closeDialog(): void;
    createSelectControl(valueName: string, // use it as "a pointer to member" of an object
    label: string, nodes: ReactNode[], insertEmpty?: boolean): ReactNode;
    render(): JSX.Element;
}
export {};
