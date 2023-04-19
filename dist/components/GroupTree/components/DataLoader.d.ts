import React from "react";
import { Data, DataInfos } from "../redux/types";
interface Props {
    id: string;
    data: Data;
    edge_options: DataInfos;
    node_options: DataInfos;
    initial_index: [number, number];
}
export declare const DataContext: React.Context<Data>;
declare const DataProvider: React.FC<Props>;
export default DataProvider;
