export default class Map extends Component {
    static validate(config: any): void;
    constructor(config?: {});
    layer: number;
    parentElement: any;
    coords: any;
    values: any;
    valMin: any;
    valMax: any;
    xMin: any;
    yMax: any;
    colorScale: any;
    mapTransform: {
        x: number;
        y: number;
        k: number;
        angle: number;
    };
    setTransform(transform: any): void;
    getMapTransform(): string;
    setLayer(layer: any): void;
    color(i: any): any;
    renderCells(): void;
    map: any;
    mapWidth: any;
    mapHeight: any;
    renderContainer(): void;
    element: any;
    render(): void;
}
import Component from "./component";
