import { createStyles, Divider, Drawer, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React, { useContext, useMemo } from "react";
import { useSelector } from "react-redux";
import ReactResizeDetector from "react-resize-detector";
import { usePlotData } from "../hooks/usePlotData";
import { DataContext } from "./DataLoader";
import WellCompletionsPlot from "./Plot/WellCompletionsPlot";
import HideZeroCompletionsSwitch from "./Settings/HideZeroCompletionsSwitch";
import SettingsBar from "./Settings/SettingsBar";
import WellAttributesSelector from "./Settings/WellAttributesSelector";
import WellFilter from "./Settings/WellFilter";
import WellPagination from "./Settings/WellPagination";
import ZoneSelector from "./Settings/ZoneSelector";
const drawerWidth = 270;
const useStyles = makeStyles((theme) => createStyles({
    root: {
        position: "relative",
        display: "flex",
        flex: 1,
        flexDirection: "column",
        width: "100%",
        height: "90%",
    },
    main: {
        position: "relative",
        display: "flex",
        flex: 1,
        flexDirection: "row",
        height: "100%",
    },
    drawer: {
        zIndex: 0,
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerShift: {
        width: 0,
        flexShrink: 0,
        display: "none",
    },
    drawerPaper: {
        position: "relative",
    },
    drawerHeader: Object.assign(Object.assign({ display: "flex", alignItems: "center", padding: theme.spacing(0, 1) }, theme.mixins.toolbar), { justifyContent: "flex-start" }),
    content: {
        width: "100%",
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    contentShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
}));
const WellCompletionsViewer = () => {
    const classes = useStyles();
    // Use input data directly
    const data = useContext(DataContext);
    // Create plot data with the selected time step(s)
    const plotData = usePlotData();
    // Redux
    const isDrawerOpen = useSelector((state) => state.ui.isDrawerOpen);
    const wellsPerPage = useSelector((state) => state.ui.wellsPerPage);
    const currentPage = useSelector((state) => state.ui.currentPage);
    // Memo
    const dataInCurrentPage = useMemo(() => {
        return Object.assign(Object.assign({}, plotData), { wells: plotData.wells.slice((currentPage - 1) * wellsPerPage, currentPage * wellsPerPage) });
    }, [plotData, currentPage, wellsPerPage]);
    const [minWidth, minHeight] = useMemo(() => [
        dataInCurrentPage.wells.length * 20,
        dataInCurrentPage.stratigraphy.length * 20,
    ], [dataInCurrentPage]);
    //If no data is available
    if (!data)
        return React.createElement("div", null);
    // Render
    return (React.createElement("div", { className: classes.root },
        React.createElement(ReactResizeDetector, { handleWidth: true, handleHeight: true }, ({ width }) => (React.createElement(React.Fragment, null,
            React.createElement(SettingsBar, null),
            React.createElement("div", { className: classes.main, style: {
                    width: `${width}px`,
                } },
                React.createElement("div", { className: clsx(classes.content, {
                        [classes.contentShift]: isDrawerOpen,
                    }) },
                    React.createElement(WellPagination, null),
                    React.createElement("div", { style: {
                            minWidth: `${minWidth}px`,
                            minHeight: `${minHeight}px`,
                            height: "100%",
                        } },
                        React.createElement(WellCompletionsPlot, { timeSteps: data.timeSteps, plotData: dataInCurrentPage }))),
                React.createElement(Drawer, { className: clsx(classes.drawer, {
                        [classes.drawerShift]: !isDrawerOpen,
                    }), classes: {
                        paper: classes.drawerPaper,
                    }, variant: "persistent", anchor: "right", open: isDrawerOpen },
                    React.createElement(Divider, null),
                    React.createElement(ZoneSelector, null),
                    React.createElement(WellFilter, null),
                    React.createElement(HideZeroCompletionsSwitch, null),
                    React.createElement(WellAttributesSelector, null))))))));
};
WellCompletionsViewer.displayName = "WellCompletionsViewer";
export default WellCompletionsViewer;
//# sourceMappingURL=WellCompletionsViewer.js.map