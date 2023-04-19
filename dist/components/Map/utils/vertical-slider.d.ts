export default class VerticalSlider extends Component {
    static validate(config: any): void;
    constructor(config?: {});
    parentElement: any;
    values: any;
    value: number;
    scale: d3.ScaleLinear<number, number, never>;
    position: {
        x: any;
        y: any;
    };
    appendClone(): any;
    setPosition({ x, y }: {
        x: any;
        y: any;
    }): void;
    _onDragSlider(h: any): void;
    _renderLine(): void;
    slider: any;
    _renderHandle(): void;
    handle: any;
    _renderLabel(): void;
    text: any;
    renderSlider(): void;
    renderContainer(): void;
    element: any;
    render(): void;
}
import Component from "./component";
import * as d3 from "d3";
