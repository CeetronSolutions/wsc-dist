import React, { useCallback, useState } from "react";
import DataProvider from "./DataLoader";
import GroupTreeViewer from "./GroupTreeViewer";
const GroupTreeComponent = React.memo(({ id, data, edge_options, node_options }) => {
    const [index, setIndex] = useState([0, 0]);
    const currentDateTimeChangedCallBack = useCallback((currentDateTime) => {
        const current_tree_index = data.findIndex((e) => {
            return e.dates.includes(currentDateTime);
        });
        const date_index = data[current_tree_index].dates.indexOf(currentDateTime);
        setIndex([current_tree_index, date_index]);
    }, [data]);
    return (React.createElement(DataProvider, { id: id, data: data, edge_options: edge_options, node_options: node_options, initial_index: index },
        React.createElement(GroupTreeViewer, { id: id, edge_options: edge_options, node_options: node_options, currentDateTimeChangedCallBack: currentDateTimeChangedCallBack })));
});
GroupTreeComponent.displayName = "GroupTreeComponent";
export default GroupTreeComponent;
//# sourceMappingURL=GroupTreeComponent.js.map