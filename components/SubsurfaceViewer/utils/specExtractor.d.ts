import { LayerProps } from "@deck.gl/core/typed";
export declare const getPropVisibility: (layer: Record<string, unknown>) => boolean;
export declare const getLayerProps: (layers: LayerProps<unknown>[], layerId: string) => Record<string, unknown> | null;
