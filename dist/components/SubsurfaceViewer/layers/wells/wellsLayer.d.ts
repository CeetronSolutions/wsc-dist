import { Layer, LayersList, CompositeLayer, UpdateParameters, PickingInfo } from "@deck.gl/core/typed";
import { ExtendedLayerProps } from "../utils/layerTools";
import { Color } from "@deck.gl/core/typed";
import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from "geojson";
import { LayerPickInfo } from "../utils/layerTools";
import { ContinuousLegendDataType, DiscreteLegendDataType } from "../../components/ColorLegend";
declare type StyleAccessorFunction = (object: Feature, objectInfo?: Record<string, unknown>) => StyleData;
declare type NumberPair = [number, number];
declare type DashAccessor = boolean | NumberPair | StyleAccessorFunction | undefined;
declare type ColorAccessor = Color | StyleAccessorFunction | undefined;
declare type SizeAccessor = number | StyleAccessorFunction | undefined;
declare type StyleData = NumberPair | Color | number;
declare type LineStyleAccessor = {
    color?: ColorAccessor;
    dash?: DashAccessor;
    width?: SizeAccessor;
};
declare type WellHeadStyleAccessor = {
    color?: ColorAccessor;
    size?: SizeAccessor;
};
export interface WellsLayerProps<D> extends ExtendedLayerProps<D> {
    pointRadiusScale: number;
    lineWidthScale: number;
    outline: boolean;
    selectedWell: string;
    logData: string | LogCurveDataType[];
    logName: string;
    logColor: string;
    logrunName: string;
    logRadius: number;
    logCurves: boolean;
    refine: boolean;
    wellHeadStyle: WellHeadStyleAccessor;
    colorMappingFunction: (x: number) => [number, number, number];
    lineStyle: LineStyleAccessor;
    wellNameVisible: boolean;
    wellNameAtTop: boolean;
    wellNameSize: number;
    wellNameColor: Color;
    isLog: boolean;
    depthTest: boolean;
    /**  If true means that input z values are interpreted as depths.
     * For example depth of z = 1000 corresponds to -1000 on the z axis. Default true.
     */
    ZIncreasingDownwards: boolean;
}
export interface LogCurveDataType {
    header: {
        name: string;
        well: string;
    };
    curves: {
        name: string;
        description: string;
    }[];
    data: number[][];
    metadata_discrete: Record<string, {
        attributes: unknown;
        objects: Record<string, [Color, number]>;
    }>;
}
export interface WellsPickInfo extends LayerPickInfo {
    featureType?: string;
    logName: string;
}
export declare function getSize(type: string, accessor: SizeAccessor, offset?: number): number | ((object: Feature) => number);
export default class WellsLayer extends CompositeLayer<WellsLayerProps<FeatureCollection<Geometry, GeoJsonProperties>>> {
    onClick(info: WellsPickInfo): boolean;
    setSelection(well: string | undefined, _selection?: [number | undefined, number | undefined]): void;
    setMultiSelection(wells: string[] | undefined): void;
    shouldUpdateState({ changeFlags }: UpdateParameters<this>): boolean;
    getLegendData(value: LogCurveDataType[]): ContinuousLegendDataType | DiscreteLegendDataType | null;
    setLegend(value: LogCurveDataType[]): void;
    getLogLayer(): Layer;
    getSelectionLayer(): Layer;
    getLogCurveData(): LogCurveDataType[] | undefined;
    setupLegend(): void;
    renderLayers(): LayersList;
    getPickingInfo({ info }: {
        info: PickingInfo;
    }): WellsPickInfo;
}
export declare function getLogValues(d: LogCurveDataType, logrun_name: string, log_name: string): number[];
export declare function getLogInfo(d: LogCurveDataType, logrun_name: string, log_name: string): {
    name: string;
    description: string;
} | undefined;
export {};
