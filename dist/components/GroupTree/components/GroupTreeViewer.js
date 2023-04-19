import { createStyles, makeStyles } from "@material-ui/core";
import { cloneDeep } from "lodash";
import React, { useContext, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { DataContext } from "./DataLoader";
import "./Plot/dynamic_tree.css";
import GroupTree from "./Plot/group_tree";
import SettingsBar from "./Settings/SettingsBar";
const useStyles = makeStyles(() => createStyles({
    root: {
        position: "relative",
        display: "flex",
        flex: 1,
        flexDirection: "column",
        height: "90%",
    },
}));
const GroupTreeViewer = ({ id, edge_options, node_options, currentDateTimeChangedCallBack, }) => {
    const classes = useStyles();
    const divRef = useRef(null);
    const data = useContext(DataContext);
    const renderer = useRef();
    const currentDateTime = useSelector((state) => state.ui.currentDateTime);
    const currentFlowRate = useSelector((state) => state.ui.currentFlowRate);
    const currentNodeInfo = useSelector((state) => state.ui.currentNodeInfo);
    useEffect(() => {
        renderer.current = new GroupTree(id, cloneDeep(data), currentFlowRate, currentNodeInfo, currentDateTime, edge_options, node_options);
    }, [data]);
    useEffect(() => {
        if (!renderer.current)
            return;
        renderer.current.update(currentDateTime);
        if (typeof currentDateTimeChangedCallBack !== "undefined") {
            currentDateTimeChangedCallBack(currentDateTime);
        }
    }, [currentDateTime]);
    useEffect(() => {
        if (!renderer.current)
            return;
        renderer.current.flowrate = currentFlowRate;
    }, [currentFlowRate]);
    useEffect(() => {
        if (!renderer.current)
            return;
        renderer.current.nodeinfo = currentNodeInfo;
    }, [currentNodeInfo]);
    return (React.createElement("div", { className: classes.root },
        React.createElement(SettingsBar, { edge_options: edge_options, node_options: node_options }),
        React.createElement("div", { id: id, ref: divRef })));
};
GroupTreeViewer.displayName = "GroupTreeViewer";
export default GroupTreeViewer;
//# sourceMappingURL=GroupTreeViewer.js.map