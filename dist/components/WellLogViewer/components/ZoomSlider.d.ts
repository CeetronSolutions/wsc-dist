import React, { Component } from "react";
interface Props {
    onChange: (value: number) => void;
    value: number;
    max?: number;
    step?: number;
}
interface State {
    level: number;
}
declare class ZoomSlider extends Component<Props, State> {
    constructor(props: Props, state: State);
    componentDidUpdate(prevProps: Props): void;
    onChange(_event: React.ChangeEvent<Record<string, unknown>>, level: number | number[]): void;
    render(): JSX.Element;
}
export default ZoomSlider;
