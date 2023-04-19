export declare type DatedTree = {
    dates: [string];
    tree: Node;
};
export declare type Data = DatedTree[];
export interface Node {
    node_label: string;
    node_type: "Group" | "Well";
    edge_label: string;
    children: Node[];
}
export interface DataInfo {
    name: string;
    label: string;
}
export declare type DataInfos = DataInfo[];
export interface UISettings {
    currentDateTime: string;
    currentFlowRate: string;
    currentNodeInfo: string;
}
