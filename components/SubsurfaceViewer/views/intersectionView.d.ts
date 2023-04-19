import { View, OrthographicViewState } from "@deck.gl/core/typed";
import IntersectionViewport from "../viewports/intersectionViewport";
export declare type IntersectionViewState = OrthographicViewState;
declare type IntersectionViewProps = {
    /** Distance of near clipping plane. Default `0.1`. */
    near?: number;
    /** Distance of far clipping plane. Default `1000`. */
    far?: number;
    /** Whether to use top-left coordinates (`true`) or bottom-left coordinates (`false`). Default `true`. */
    flipY?: boolean;
};
export default class IntersectionView extends View<IntersectionViewState, IntersectionViewProps> {
    static displayName: string;
    constructor(props: IntersectionViewProps);
    get ViewportType(): typeof IntersectionViewport;
    get ControllerType(): never;
}
export {};
