import { Component, ReactNode } from "react";
import { Track } from "@equinor/videx-wellog";
import { TemplatePlot } from "./WellLogTemplateTypes";
import { WellLog } from "./WellLogTypes";
import WellLogView from "./WellLogView";
export declare function _createItems(items: Record<string, string>): ReactNode[];
export declare function createScaleItems(): ReactNode[];
export declare function dataNames(welllog: WellLog | undefined, track: Track | null, discrete?: boolean): string[];
export declare function createDataItems(welllog: WellLog | undefined, track: Track | null, discrete?: boolean): ReactNode[];
interface Props {
    templatePlot?: TemplatePlot;
    onOK: (templatePlot: TemplatePlot) => void;
    wellLogView: WellLogView;
    track: Track;
}
interface State extends TemplatePlot {
    open: boolean;
}
export declare class PlotPropertiesDialog extends Component<Props, State> {
    constructor(props: Props);
    componentDidUpdate(_prevProps: Props, prevState: State): void;
    onOK(): void;
    closeDialog(): void;
    dataNames(skipUsed: boolean): string[];
    createDataItems(skipUsed: boolean): ReactNode[];
    createSelectControl(valueName: string, // use it as "a pointer to member" of an object
    label: string, nodes: ReactNode[], insertEmpty?: string | boolean): ReactNode;
    render(): JSX.Element;
}
export {};
