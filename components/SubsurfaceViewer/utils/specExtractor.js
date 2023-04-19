/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEmpty } from "lodash";
import { ToggleTypeProps, MenuTypeProps, NumericTypeProps, SliderTypeProps, } from "../redux/types";
// return true if layer props are displayable as defined in ../redux/types.tsx
export const getPropVisibility = (layer) => {
    if (layer == undefined)
        return false;
    const prop_types = [
        ...MenuTypeProps,
        ...NumericTypeProps,
        ...SliderTypeProps,
        ...ToggleTypeProps,
    ];
    const visibility = prop_types.reduce((acc, current) => acc || current.id in layer, false);
    return visibility;
};
// returns layer properties
export const getLayerProps = (layers, layerId) => {
    if (!(layers === null || layers === void 0 ? void 0 : layers.length))
        return null;
    const layer_props = layers.find((l) => l.id === layerId);
    return isEmpty(layer_props) ? null : layer_props;
};
//# sourceMappingURL=specExtractor.js.map