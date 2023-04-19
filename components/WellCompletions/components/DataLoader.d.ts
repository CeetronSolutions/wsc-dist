import React from "react";
import { Data } from "../redux/types";
interface Props {
    id: string;
    data: Data;
}
export declare const DataContext: React.Context<Data>;
/**
 * A data loading layer to ready the input data and redux store
 */
declare const DataProvider: React.FC<Props>;
export default DataProvider;
