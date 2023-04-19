import React from "react";
import { DataInfos } from "../../redux/types";
interface Props {
    edge_options: DataInfos;
    node_options: DataInfos;
}
declare const SettingsBar: React.FC<Props>;
export default SettingsBar;
