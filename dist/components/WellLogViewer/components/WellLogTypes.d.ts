export declare type integer = number;
export declare type float = number;
export declare type datetime = string;
export declare type WellLogHeader = {
    name?: string;
    description?: string;
    externalIds?: Record<string, string>;
    well?: string;
    wellbore?: string;
    filed?: string;
    country?: string;
    date?: datetime;
    operator?: string;
    serviceCompany?: string;
    runNumber?: string;
    elevation?: float;
    source?: string;
    startIndex?: number;
    endIndex?: number;
    step?: number;
    dataUri?: string;
};
export declare type WellLogCurve = {
    name: string;
    description?: string | null;
    quantity?: string | null;
    unit?: string | null;
    valueType?: string | null;
    dimensions?: integer;
};
export declare type WellLogDataRow = (number | string | null)[];
export declare type WellLogMetadataDiscreteObjects = Record<string, []>;
export declare type WellLogMetadataDiscrete = {
    attributes: string[];
    objects: WellLogMetadataDiscreteObjects;
};
export declare type WellLog = {
    header: WellLogHeader;
    curves: WellLogCurve[];
    data: WellLogDataRow[];
    metadata_discrete?: Record<string, WellLogMetadataDiscrete>;
};
