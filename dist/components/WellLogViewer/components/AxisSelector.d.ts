import { Component, ReactNode } from "react";
interface Props {
    header: string;
    axes: string[];
    axisLabels: Record<string, string>;
    value: string;
    onChange: (value: string) => void;
}
declare class AxisSelector extends Component<Props> {
    createItem(label: string, value: string): ReactNode;
    render(): JSX.Element;
}
export default AxisSelector;
