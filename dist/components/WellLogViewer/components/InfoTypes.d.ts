export interface Info {
    name?: string;
    units?: string;
    color: string;
    value: number;
    discrete?: string;
    type: string;
    trackId: number | string;
    groupStart?: string;
    collapsed?: boolean;
}
export interface InfoOptions {
    allTracks?: boolean;
    grouping?: string;
}
