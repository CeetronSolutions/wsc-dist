/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import PropTypes from "prop-types";
import SubsurfaceViewer from "../SubsurfaceViewer";
import welllogsJson from "../../../demo/example-data/volve_logs.json";
const welllogs = welllogsJson;
import templateJson from "../../../demo/example-data/welllog_template_2.json";
const template = templateJson;
import InfoPanel from "./components/InfoPanel";
import WellLogViewWithScroller from "./components/WellLogViewWithScroller";
import { axisTitles, axisMnemos } from "./utils/axes";
import { fillInfos } from "./utils/fill-info";
import { getDiscreteMeta, indexOfElementByName } from "./utils/tracks";
import { deepCopy } from "./utils/deepcopy";
import { isEqualRanges } from "./components/WellLogView";
import wellPicks from "../../../demo/example-data/wellpicks.json";
import colorTables from "../../../demo/example-data/wellpick_colors.json";
function getTemplatePlotColorTable(template, templatePlot) {
    let colorTable = templatePlot.colorTable;
    if (!colorTable && templatePlot.style) {
        const templateStyles = template.styles;
        if (templateStyles) {
            const iStyle = indexOfElementByName(templateStyles, templatePlot.style);
            if (iStyle >= 0) {
                const style = templateStyles[iStyle];
                colorTable = style.colorTable;
            }
        }
    }
    return colorTable;
}
function findWellsLayer(event) {
    const info = event.infos.find((info) => { var _a; return ((_a = info.layer) === null || _a === void 0 ? void 0 : _a.id) === "wells-layer"; });
    return info === null || info === void 0 ? void 0 : info.layer;
}
function findWellLogIndex(welllogs, wellName) {
    return welllogs.findIndex((welllog) => welllog.header.well === wellName);
}
function findLog(template, logName) {
    return template.tracks.findIndex((track) => { var _a; return ((_a = track.plots[0]) === null || _a === void 0 ? void 0 : _a.name) === logName; });
}
function detectType(welllog, logName) {
    if (welllog) {
        const meta = getDiscreteMeta(welllog, logName); // non-standard extention of WellLog JSON file
        if (meta)
            return "stacked";
    }
    return "line";
}
function addTemplateTrack(template, welllog, logName) {
    // add missed TemplateTrack for the given logName
    const type = detectType(welllog, logName);
    const templateNew = deepCopy(template);
    const templateTrack = {
        title: logName,
        required: true,
        plots: [{ name: logName, type: type, color: "red" }],
    };
    templateNew.tracks.push(templateTrack);
    return templateNew;
}
const wellpick = {
    wellpick: wellPicks[0],
    name: "HORIZON",
    colorTables: colorTables,
    color: "Stratigraphy",
};
export class MapAndWellLogViewer extends React.Component {
    constructor(props, state) {
        super(props, state);
        this.state = {
            wellIndex: undefined,
            infos: [],
            editedData: props.editedData,
            layers: props.layers,
        };
        this.onInfo = this.onInfo.bind(this);
        this.onCreateController = this.onCreateController.bind(this);
        this.onContentSelection = this.onContentSelection.bind(this);
        this.onTrackScroll = this.onTrackScroll.bind(this);
        this.onMouseEvent = this.onMouseEvent.bind(this);
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.editedData !== prevProps.editedData) {
            this.setState({ editedData: this.props.editedData });
            0;
        }
        if (!isEqualRanges(this.state.selection, prevState.selection)) {
            const controller = this.state.controller;
            if (controller && this.state.selection) {
                controller.selectContent([
                    this.state.selection[0],
                    this.state.selection[1],
                ]);
            }
        }
    }
    onInfo(x, logController, iFrom, iTo) {
        const infos = fillInfos(x, logController, iFrom, iTo, [] //this.collapsedTrackIds,
        //this.props.readoutOptions
        );
        this.setState({ infos: infos });
    }
    onCreateController(controller) {
        this.setState({ controller: controller });
    }
    onContentSelection() {
        const controller = this.state.controller;
        if (!controller)
            return;
        const selection = controller.getContentSelection();
        // synchronize selection only from the current well
        /*if (?? === this.state.wellName)*/ {
            this.setState({
                selection: selection,
                selPersistent: selection[1] !== undefined,
            });
        }
    }
    onTrackScroll() {
        var _a;
        const controller = this.state.controller;
        if (!controller)
            return;
        const iTrack = controller.getTrackScrollPos();
        if (iTrack >= 0) {
            const template = controller.getTemplate();
            const track = template.tracks[iTrack];
            if (track) {
                const templatePlot = track.plots[0];
                if (templatePlot) {
                    const wells_layer = (_a = this.props.layers) === null || _a === void 0 ? void 0 : _a.find((item) => item["@@type"] === "WellsLayer");
                    if (wells_layer &&
                        wells_layer["logName"] !== templatePlot.name) {
                        wells_layer["logName"] = templatePlot.name;
                        const colorTable = getTemplatePlotColorTable(template, templatePlot);
                        if (colorTable)
                            wells_layer["logColor"] = colorTable;
                        //(wells_layer.context as DeckGLLayerContext).userData.colorTables=colorTables;
                        const layers = deepCopy(this.props.layers);
                        this.setState({
                            layers: layers,
                        });
                        // Force to rerender ColorLegend after
                        setTimeout(() => {
                            const layers = deepCopy(this.props.layers);
                            this.setState({
                                layers: layers,
                            });
                        }, 200);
                    }
                }
            }
        }
    }
    onMouseEvent(event) {
        var _a;
        if (event.wellname !== undefined) {
            if (event.type == "click") {
                const iWell = findWellLogIndex(welllogs, event.wellname);
                this.setState((state) => {
                    //if (state.wellIndex === iWell) return null;
                    let selection = undefined;
                    let selPersistent = undefined;
                    if (state.wellIndex !== iWell ||
                        !state.selection ||
                        state.selPersistent) {
                        selection = [event.md, undefined];
                        selPersistent = false;
                    }
                    else {
                        if (state.selection[1] !== undefined) {
                            // have something pinned
                            selection = [event.md, state.selection[1]];
                            selPersistent = true;
                        }
                        else {
                            // no pinned yet
                            selection = [event.md, state.selection[0]]; // copy current to pinned
                            selPersistent = false;
                        }
                    }
                    return {
                        wellIndex: iWell,
                        wellName: event.wellname,
                        wellColor: event.wellcolor,
                        selection: selection,
                        selPersistent: selPersistent,
                    };
                });
                const controller = this.state.controller;
                if (controller) {
                    const wellsLayer = findWellsLayer(event);
                    if (wellsLayer) {
                        const template = controller.getTemplate();
                        const logName = (_a = wellsLayer.props) === null || _a === void 0 ? void 0 : _a.logName;
                        let iTrack = findLog(template, logName);
                        if (iTrack < 0) {
                            //const welllog = info.object is Feature or WellLog;
                            const welllog = welllogs[iWell];
                            const templateNew = addTemplateTrack(template, welllog, logName);
                            controller.setTemplate(templateNew);
                            iTrack = findLog(template, logName);
                        }
                        controller.scrollTrackTo(iTrack);
                    }
                }
            }
            if (event.wellname === this.state.wellName) {
                // synchronize selection only from the current well
                if (event.md !== undefined) {
                    this.setState((state) => {
                        var _a, _b;
                        if (state.selPersistent)
                            return null;
                        if (event.md === ((_a = state.selection) === null || _a === void 0 ? void 0 : _a[0]))
                            return null;
                        return {
                            selection: [event.md, (_b = state.selection) === null || _b === void 0 ? void 0 : _b[1]],
                        };
                    });
                    //if (wellsLayer)
                    //    wellsLayer.setSelection(event.wellname, [event.md, undefined]);
                }
            }
        }
    }
    render() {
        const wellName = this.state.wellName;
        const wellColor = this.state.wellColor;
        const wellIndex = this.state.wellIndex;
        const viewTitle = (React.createElement("div", { style: { fontSize: "16px" } },
            wellColor && (React.createElement("span", { style: {
                    color: wellColor
                        ? "rgb(" +
                            wellColor[0] +
                            "," +
                            wellColor[1] +
                            "," +
                            wellColor[2] +
                            ")"
                        : undefined,
                    fontSize: "small",
                } }, "\u2B24 " /*big circle*/)),
            wellName || "Select a well by clicking on the map",
            wellIndex === -1 && (React.createElement("div", { className: "welllogview-error" }, "No well logs found for the well"))));
        return (React.createElement("div", { style: { height: "100%", width: "100%", display: "flex" } },
            React.createElement("div", { style: {
                    height: "100%",
                    width: "70%",
                    position: "relative",
                } },
                React.createElement("div", null,
                    React.createElement(SubsurfaceViewer, Object.assign({}, this.props, { layers: this.state.layers, editedData: this.state.editedData, onMouseEvent: this.onMouseEvent, selection: {
                            well: wellName,
                            selection: this.state.selection,
                        } })))),
            React.createElement("div", { style: {
                    height: "85%",
                    width: "30%",
                    display: "flex",
                    flexDirection: "column",
                } },
                React.createElement("div", { style: {
                        flex: "1 1",
                        height: "90%",
                        minWidth: "25px",
                        width: "100%",
                    } },
                    React.createElement(WellLogViewWithScroller, { welllog: wellIndex !== undefined
                            ? welllogs[wellIndex]
                            : undefined, template: template, colorTables: this.props.colorTables, 
                        // @aspentech: This issue needs to get sorted out, there seems to be a compatibility issue with the JSON file and the prop type
                        // @ts-ignore
                        wellpick: wellpick, primaryAxis: "md", axisTitles: axisTitles, axisMnemos: axisMnemos, viewTitle: viewTitle, options: {
                            checkDatafileSchema: this.props.checkDatafileSchema,
                            maxVisibleTrackNum: 1,
                        }, onInfo: this.onInfo, onCreateController: this.onCreateController, onContentSelection: this.onContentSelection, onTrackScroll: this.onTrackScroll })),
                React.createElement("div", { style: {
                        flex: "0 0",
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        width: "100%",
                    } },
                    React.createElement(InfoPanel, { header: "Readout", infos: this.state.infos })))));
    }
}
const WellLogViewOptions_propTypes = PropTypes.shape({
    /**
     * The maximum zoom value
     */
    maxContentZoom: PropTypes.number,
    /**
     * The maximum number of visible tracks
     */
    maxVisibleTrackNum: PropTypes.number,
    /**
     * Validate JSON datafile against schema
     */
    checkDatafileSchema: PropTypes.bool,
    /**
     * Hide titles of the track. Default is false
     */
    hideTrackTitle: PropTypes.bool,
    /**
     * Hide legends of the track. Default is false
     */
    hideTrackLegend: PropTypes.bool,
});
MapAndWellLogViewer.propTypes = Object.assign(Object.assign({}, SubsurfaceViewer.propTypes), { 
    /**
     * WellLogView additional options
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    welllogOptions: WellLogViewOptions_propTypes /*PropTypes.object,*/ });
//# sourceMappingURL=MapAndWellLogViewer.js.map