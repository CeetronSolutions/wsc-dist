export default class Legend {
    constructor(config?: {});
    parentElement: any;
    width: any;
    height: any;
    position: any;
    data: any[];
    validate(config: any): void;
    loadData(data: any): void;
    render(): void;
    renderContainer(): void;
    container: any;
    renderLegend(): void;
    _renderColourBoxes(): void;
    _renderLegendLabels(): void;
}
