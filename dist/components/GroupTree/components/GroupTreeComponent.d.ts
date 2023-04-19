import React from "react";
import { Data, DataInfos } from "../redux/types";
interface Props {
    /**
     * The ID of this component, used to identify dash components
     * in callbacks. The ID needs to be unique across all of the
     * components in an app.
     */
    id: string;
    /**
     * Array of JSON objects describing group tree data.
     */
    data: Data;
    /**
     * Arrays of options. Used in drop down selectors.
     */
    edge_options: DataInfos;
    node_options: DataInfos;
}
declare const GroupTreeComponent: React.FC<Props>;
export default GroupTreeComponent;
