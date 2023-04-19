export default class Compass extends Component {
    static validate({ parentElement }: {
        parentElement: any;
    }): void;
    static calculateAngleFromCoord(x: any, y: any): number;
    constructor(config?: {});
    parentElement: any;
    position: any;
    initialRotation: any;
    dragStartAngle: number;
    dragAngle: number;
    rotationAngle: number;
    setPosition({ x, y }: {
        x: any;
        y: any;
    }): void;
    setRotation(rotation: any): void;
    _dragStarted(): void;
    _dragged(): void;
    _createElement(): void;
    element: any;
    _dragEnded(): void;
    initDragEvents(): void;
    applyTransform(): void;
    renderContainer(): void;
    renderShape(): void;
    renderLetters(): void;
    render(): void;
}
import Component from "./component";
