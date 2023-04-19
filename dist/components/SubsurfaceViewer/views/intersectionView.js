import { View } from "@deck.gl/core/typed";
import IntersectionViewport from "../viewports/intersectionViewport";
export default class IntersectionView extends View {
    constructor(props) {
        super(Object.assign(Object.assign({}, props), { controller: false, viewState: {
                target: [275, 0, -500],
            } }));
    }
    get ViewportType() {
        return IntersectionViewport;
    }
    get ControllerType() {
        throw new Error("Method not implemented.");
    }
}
IntersectionView.displayName = "IntersectionView";
//# sourceMappingURL=intersectionView.js.map