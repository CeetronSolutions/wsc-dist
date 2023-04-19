import { Component, ReactNode } from "react";
import { Info } from "./InfoTypes";
interface Props {
    header: string;
    infos: Info[];
    onGroupClick?: (trackId: string | number) => void;
}
declare class InfoPanel extends Component<Props> {
    constructor(props: Props);
    onRowClick(trackId: string | number): void;
    createRow(info: Info): ReactNode;
    render(): JSX.Element;
}
export default InfoPanel;
