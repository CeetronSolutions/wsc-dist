import React from "react";
import "./Plot/dynamic_tree.css";
import { DataInfos } from "../redux/types";
interface Props {
    id: string;
    edge_options: DataInfos;
    node_options: DataInfos;
    currentDateTimeChangedCallBack: (currentDateTime: string) => void;
}
declare const GroupTreeViewer: React.FC<Props>;
export default GroupTreeViewer;
