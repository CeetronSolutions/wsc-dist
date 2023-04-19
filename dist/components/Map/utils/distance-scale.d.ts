export default class DistanceScale {
    constructor(config?: {});
    validate(config: any): void;
    parentElement: any;
    position: {
        x: any;
        y: any;
    } | undefined;
    k: any;
    origMeter2Px: any;
    render(): void;
    setK(k: any): void;
    renderContainer(): void;
    element: any;
    renderScale(): void;
}
