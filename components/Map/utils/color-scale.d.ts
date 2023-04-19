/**
 * Component for displaying a colour bar for various values
 * (e.g. a depth colour bar on a map)
 */
export default class ColorScale {
    constructor(config?: {});
    scale: any;
    COLORBAR_WIDTH: number;
    NUMBER_COLORBARS: number;
    validate(config: any): void;
    position: {
        x: any;
        y: any;
    } | undefined;
    parentElement: any;
    labelMin: any;
    labelMax: any;
    render(): void;
    renderContainer(): void;
    element: any;
    renderScale(): void;
    _renderColorBar(): void;
    _renderMinLabel(): void;
    _renderMaxLabel(): void;
}
