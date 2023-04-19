import { BitmapLayer, BitmapLayerProps } from "@deck.gl/layers/typed";
import { PickingInfo } from "@deck.gl/core/typed";
import { ValueDecoder } from "../utils/propertyMapTools";
import { LayerPickInfo } from "../../layers/utils/layerTools";
export interface Hillshading2DProps extends BitmapLayerProps {
    valueRange: [number, number];
    lightDirection: [number, number, number];
    ambientLightIntensity: number;
    diffuseLightIntensity: number;
    colorMapRange: [number, number];
    valueDecoder: ValueDecoder;
    rotDeg: number;
    setReportedBoundingBox?: any;
}
export default class Hillshading2DLayer extends BitmapLayer<Hillshading2DProps> {
    initializeState(): void;
    draw({ moduleParameters, uniforms }: any): void;
    getShaders(): any;
    getPickingInfo({ info }: {
        info: PickingInfo;
    }): LayerPickInfo;
}
