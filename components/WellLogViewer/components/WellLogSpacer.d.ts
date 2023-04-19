import { Component, ReactNode } from "react";
import "./styles.scss";
import { WellLogController, WellPickProps } from "./WellLogView";
import { ColorTable } from "./ColorTableTypes";
import { PatternsTable } from "../utils/pattern";
export interface WellLogSpacerOptions {
    /**
     * Fill with color between well picks
     */
    wellpickColorFill?: boolean;
    /**
     * Fill with pattern between well picks
     */
    wellpickPatternFill?: boolean;
}
interface Props {
    width?: number;
    controllers: (WellLogController | null)[];
    /**
     * Prop containing color table data.
     */
    colorTables: ColorTable[];
    /**
     * Well Picks data
     */
    wellpicks?: WellPickProps[];
    /**
     * Patterns table
     */
    patternsTable?: PatternsTable;
    /**
     * Horizon to pattern index map
     */
    patterns?: [string, number][];
    /**
     * Distanse between wells to show on the spacer
     */
    distance?: {
        units: string;
        value: number | undefined;
    };
    /**
     * Orientation of the track plots on the screen.
     */
    horizontal?: boolean;
    /**
     * Additional options
     */
    options?: WellLogSpacerOptions;
    onCreateSpacer?: (spacer: WellLogSpacer) => void;
}
declare class WellLogSpacer extends Component<Props> {
    container: HTMLElement | undefined;
    uid: number;
    defs: ReactNode;
    constructor(props: Props);
    update(): void;
    componentDidUpdate(prevProps: Props): void;
    shouldComponentUpdate(nextProps: Props): boolean;
    render(): JSX.Element;
}
export default WellLogSpacer;
