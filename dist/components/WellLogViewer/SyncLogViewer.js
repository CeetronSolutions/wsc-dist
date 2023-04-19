import React, { Component } from "react";
import PropTypes from "prop-types";
import WellLogSpacer from "./components/WellLogSpacer";
import WellLogViewWithScroller from "./components/WellLogViewWithScroller";
import InfoPanel from "./components/InfoPanel";
import AxisSelector from "./components/AxisSelector";
import ZoomSlider from "./components/ZoomSlider";
import { getWellPicks } from "./components/WellLogView";
import { getAvailableAxes } from "./utils/tracks";
import { checkMinMax } from "./utils/minmax";
function isEqDomains(d1, d2) {
    const eps = Math.abs(d1[1] - d1[0] + (d2[1] - d2[0])) * 0.00001;
    return Math.abs(d1[0] - d2[0]) < eps && Math.abs(d1[1] - d2[1]) < eps;
}
import { onTrackMouseEvent } from "./utils/edit-track";
import { fillInfos } from "./utils/fill-info";
import { isEqualRanges } from "./components/WellLogView";
//import { boolean } from "mathjs";
export function isEqualArrays(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
d1, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
d2) {
    if (!d1)
        return !d2;
    if (!d2)
        return !d1;
    const n = d1.length;
    if (n !== d2.length)
        return false;
    for (let i = 0; i < n; i++) {
        if (d1[i] !== d2[i])
            return false;
    }
    return true;
}
export const argTypesSyncLogViewerProp = {
    id: {
        description: "The ID of this component, used to identify dash components in callbacks. The ID needs to be unique across all of the components in an app.",
    },
    welllogs: {
        description: "Array of JSON objects describing well log data.",
    },
    templates: {
        description: "Array of track template data.",
    },
    colorTables: {
        description: "Prop containing color table data.",
    },
    wellpicks: {
        description: "Well Picks data array",
    },
    patternsTable: {
        description: "Patterns table",
    },
    patterns: {
        description: "Horizon to pattern index map",
    },
    spacers: {
        description: "Set to true or spacer width or to array of widths if WellLogSpacers should be used",
    },
    wellDistances: {
        description: "Distanses between wells to show on the spacers",
    },
    horizontal: {
        description: "Orientation of the track plots on the screen.",
    },
    syncTrackPos: {
        description: "Synchronize first visible track", // defaultValue: false
    },
    syncContentDomain: {
        description: "Synchronize visible content domain (pan and zoom)", // defaultValue: false
    },
    syncContentSelection: {
        description: "Synchronize content selection", // defaultValue: false
    },
    syncTemplate: {
        description: "Synchronize templates in the views", // defaultValue: false
    },
    welllogOptions: {
        description: "Options for well log views:<br/>" +
            "maxContentZoom: The maximum zoom value (default 256)<br/>" +
            "maxVisibleTrackNum: The maximum number of visible tracks<br/>" +
            "checkDatafileSchema: Validate JSON datafile against schema<br/>" +
            "hideTrackTitle: Hide titles on the tracks<br/>" +
            "hideLegend: Hide legends on the tracks.",
    },
    readoutOptions: {
        description: "Options for readout panel.<br/>" +
            "allTracks: boolean — Show not only visible tracks,<br/>" +
            "grouping: string — How group values.",
        //defaultValue: {
        //    allTracks: false,
        //    grouping: "by_track",
        //},
    },
    domain: {
        description: "Initial visible interval of the log data.",
    },
    selection: {
        description: "Initial selected interval of the log data.",
    },
    viewTitles: {
        description: "Set to true for default titles or to array of individial welllog titles",
    },
    // callbacks...
};
class SyncLogViewer extends Component {
    constructor(props) {
        super(props);
        const _axes = this.props.welllogs.map((welllog) => getAvailableAxes(welllog, this.props.axisMnemos));
        const axes = _axes[0];
        let primaryAxis = axes === null || axes === void 0 ? void 0 : axes[0];
        if (this.props.templates[0] && axes) {
            this.props.templates[0].scale.primary = "tvd"; //!!!!!
            if (this.props.templates[0] &&
                this.props.templates[0].scale.primary) {
                if (axes.indexOf(this.props.templates[0].scale.primary) >= 0)
                    primaryAxis = this.props.templates[0].scale.primary;
            }
        }
        if (this.props.primaryAxis)
            primaryAxis = this.props.primaryAxis;
        this.state = {
            primaryAxis: primaryAxis,
            axes: axes,
            infos: [[], []],
            sliderValue: 4.0, // zoom
        };
        this.controllers = [null, null];
        this.spacers = [null, null];
        this.collapsedTrackIds = [];
        this.onChangePrimaryAxis = this.onChangePrimaryAxis.bind(this);
        this.callbacks = [];
        this.props.welllogs.map((_welllog, index) => {
            this.callbacks.push({
                onCreateControllerBind: this.onCreateController.bind(this, index),
                onInfoBind: this.onInfo.bind(this, index),
                onTrackScrollBind: this.onTrackScroll.bind(this, index),
                onTrackSelectionBind: this.onTrackSelection.bind(this, index),
                onContentRescaleBind: this.onContentRescale.bind(this, index),
                onContentSelectionBind: this.onContentSelection.bind(this, index),
                onTemplateChangedBind: this.onTemplateChanged.bind(this, index),
            });
        });
        this.onZoomSliderChange = this.onZoomSliderChange.bind(this);
        this.onInfoGroupClick = this.onInfoGroupClick.bind(this);
    }
    componentDidMount() {
        this.syncTrackScrollPos(0);
        this.syncContentScrollPos(0);
        this.syncContentSelection(0);
        this.setSliderValue();
    }
    shouldComponentUpdate(nextProps, nextState) {
        //?!
        const ret = !Object.is(this.props, nextProps) ||
            !Object.is(this.state, nextState);
        return ret;
    }
    componentDidUpdate(prevProps /*, prevState: State*/) {
        if (this.props.welllogs !== prevProps.welllogs ||
            this.props.templates !== prevProps.templates ||
            this.props.axisMnemos !== prevProps.axisMnemos ||
            this.props.primaryAxis !== prevProps.primaryAxis /*||
        this.props.colorTables !== prevProps.colorTables*/) {
            const _axes = this.props.welllogs.map((welllog) => getAvailableAxes(welllog, this.props.axisMnemos));
            const axes = _axes[0];
            let primaryAxis = axes[0];
            if (this.props.templates[0]) {
                this.props.templates[0].scale.primary = "tvd"; //!!!!!
                if (this.props.templates[0].scale.primary) {
                    if (axes.indexOf(this.props.templates[0].scale.primary) < 0) {
                        if (this.props.welllogs === prevProps.welllogs)
                            return; // nothing to update
                    }
                    else {
                        primaryAxis = this.props.templates[0].scale.primary;
                    }
                }
            }
            if (this.props.primaryAxis)
                primaryAxis = this.props.primaryAxis;
            this.setState({
                primaryAxis: primaryAxis,
                axes: axes,
                // will be changed by callback! infos: [],
            });
        }
        if (isEqualRanges(this.props.domain, prevProps.domain)) {
            this.setControllersZoom();
        }
        if (this.props.wellpicks !== prevProps.wellpicks ||
            !isEqualArrays(this.props.wellpickFlatting, prevProps.wellpickFlatting)) {
            this.syncContentScrollPos(0); // force to redraw
        }
        if (isEqualRanges(this.props.selection, prevProps.selection)) {
            this.setControllersSelection();
        }
        if (this.props.syncContentSelection !== prevProps.syncContentSelection) {
            this.syncContentSelection(0); // force to redraw selection
        }
        if (this.props.readoutOptions &&
            (!prevProps.readoutOptions ||
                this.props.readoutOptions.allTracks !==
                    prevProps.readoutOptions.allTracks ||
                this.props.readoutOptions.grouping !==
                    prevProps.readoutOptions.grouping)) {
            this.updateReadoutPanel();
        }
    }
    updateReadoutPanel() {
        for (const controller of this.controllers) {
            if (!controller)
                continue;
            controller.selectContent(controller.getContentSelection()); // force to update readout panel
        }
    }
    // callback function from WellLogView
    onInfo(iView, x, logController, iFrom, iTo) {
        const infos = fillInfos(x, logController, iFrom, iTo, this.collapsedTrackIds, this.props.readoutOptions);
        this.setState((state) => {
            const newState = { infos: [] };
            this.props.welllogs.map((_welllog, index) => newState.infos.push(iView == index ? infos : state.infos[index]));
            return newState;
        });
    }
    // callback function from WellLogView
    onCreateController(iView, controller) {
        this.controllers[iView] = controller;
        if (this.props.onCreateController)
            // set callback to component's caller
            this.props.onCreateController(iView, controller);
        this.setControllersZoom();
        this.syncTrackScrollPos(iView);
        this.syncContentScrollPos(iView);
        this.syncContentSelection(iView);
    }
    // callback function from WellLogView
    onTrackScroll(iView) {
        this.syncTrackScrollPos(iView);
    }
    // callback function from WellLogView
    onTrackSelection(iView) {
        this.syncTrackSelection(iView);
    }
    // callback function from WellLogView
    onContentRescale(iView) {
        this.syncTrackScrollPos(iView);
        this.syncContentScrollPos(iView);
        this.syncContentSelection(iView);
        this.setSliderValue();
        if (this.props.onContentRescale)
            this.props.onContentRescale(iView);
    }
    // callback function from WellLogView
    onContentSelection(iView) {
        this.syncContentSelection(iView);
        if (this.props.onContentSelection)
            this.props.onContentSelection(iView);
    }
    // callback function from WellLogView
    onTemplateChanged(iView) {
        this.syncTemplate(iView);
        if (this.props.onTemplateChanged) {
            if (this.props.onTemplateChanged)
                this.props.onTemplateChanged(iView);
        }
    }
    // callback function from Axis selector
    onChangePrimaryAxis(value) {
        this.setState({ primaryAxis: value });
    }
    // callback function from Zoom slider
    onZoomSliderChange(value) {
        const iView = 0; // master
        const controller = this.controllers[iView];
        if (!controller)
            return;
        controller.zoomContent(value);
        this.syncContentScrollPos(iView);
    }
    // callback function from Scroller
    onScrollerScroll(iView, x, y) {
        const controller = this.controllers[iView];
        if (!controller)
            return;
        const posMax = controller.getTrackScrollPosMax();
        let posTrack = (this.props.horizontal ? y : x) * posMax;
        posTrack = Math.round(posTrack);
        controller.scrollTrackTo(posTrack);
        const fContent = this.props.horizontal ? x : y; // fraction
        controller.scrollContentTo(fContent);
        const domain = controller.getContentDomain();
        for (const _controller of this.controllers) {
            if (!_controller || _controller == controller)
                continue;
            if (!(this.props.wellpickFlatting && this.props.wellpicks) &&
                this.props.syncContentDomain) {
                const _domain = _controller.getContentDomain();
                if (!isEqDomains(_domain, domain))
                    _controller.zoomContentTo(domain);
            }
            if (this.props.syncTrackPos)
                _controller.scrollTrackTo(posTrack);
        }
    }
    // set zoom value to slider
    setSliderValue() {
        this.setState((state) => {
            if (!this.controllers[0])
                return null;
            const zoom = this.controllers[0].getContentZoom();
            if (Math.abs(Math.log(state.sliderValue / zoom)) < 0.01)
                return null;
            return { sliderValue: zoom };
        });
    }
    syncTrackScrollPos(iView) {
        const controller = this.controllers[iView];
        if (!controller)
            return;
        const trackPos = controller.getTrackScrollPos();
        for (const _controller of this.controllers) {
            if (!_controller || _controller == controller)
                continue;
            if (this.props.syncTrackPos)
                _controller.scrollTrackTo(trackPos);
        }
    }
    syncTrackSelection(iView) {
        const controller = this.controllers[iView];
        if (!controller)
            return;
        const trackSelection = controller.getSelectedTrackIndices();
        for (const _controller of this.controllers) {
            if (!_controller || _controller == controller)
                continue;
            if (this.props.syncTemplate)
                _controller.setSelectedTrackIndices(trackSelection);
        }
    }
    getCommonContentBaseDomain() {
        const commonBaseDomain = [
            Number.POSITIVE_INFINITY,
            Number.NEGATIVE_INFINITY,
        ];
        for (const controller of this.controllers) {
            if (!controller)
                continue;
            checkMinMax(commonBaseDomain, controller.getContentBaseDomain());
        }
        return commonBaseDomain;
    }
    syncContentBaseDomain() {
        let updated = false;
        if (!(this.props.wellpickFlatting && this.props.wellpicks) &&
            this.props.syncContentDomain) {
            const commonBaseDomain = this.getCommonContentBaseDomain();
            for (const controller of this.controllers) {
                if (!controller)
                    continue;
                const baseDomain = controller.getContentBaseDomain();
                if (!isEqDomains(baseDomain, commonBaseDomain)) {
                    controller.setContentBaseDomain(commonBaseDomain);
                    updated = true;
                }
            }
        }
        return updated;
    }
    makeFlattingCoeffs() {
        const wellpickFlatting = this.props.wellpickFlatting;
        if (!wellpickFlatting)
            return { A: [], B: [], newBaseDomain: [] };
        const flattingA = [];
        const flattingB = [];
        const nView = this.controllers.length;
        const newBaseDomain = [];
        for (let i = 0; i < nView; i++) {
            newBaseDomain.push([
                Number.POSITIVE_INFINITY,
                Number.NEGATIVE_INFINITY,
            ]);
        }
        for (const controller of this.controllers) {
            const wellLogView = controller;
            const wps = wellLogView ? getWellPicks(wellLogView) : [];
            let wp1 = undefined;
            let wp2 = undefined;
            for (const wp of wps) {
                if (wellpickFlatting[0] === wp.horizon)
                    wp1 = wp.vPrimary;
                if (wellpickFlatting[1] === wp.horizon)
                    wp2 = wp.vPrimary;
            }
            const _flattingA = [];
            const _flattingB = [];
            let j = -1;
            for (const _controller of this.controllers) {
                j++;
                if (!_controller || !controller) {
                    _flattingA.push(0.0);
                    _flattingB.push(0.0);
                    continue;
                }
                const _wellLogView = _controller;
                const _wps = getWellPicks(_wellLogView);
                let _wp1 = undefined;
                let _wp2 = undefined;
                for (const _wp of _wps) {
                    if (wellpickFlatting[0] === _wp.horizon)
                        _wp1 = _wp.vPrimary;
                    if (wellpickFlatting[1] === _wp.horizon)
                        _wp2 = _wp.vPrimary;
                }
                if (Number.isFinite(wp1) &&
                    Number.isFinite(_wp1) &&
                    wp1 !== undefined &&
                    _wp1 !== undefined) {
                    let a;
                    if (Number.isFinite(wp2) &&
                        Number.isFinite(_wp2) &&
                        wp2 !== undefined &&
                        _wp2 !== undefined &&
                        wp2 - wp1)
                        a = (_wp2 - _wp1) / (wp2 - wp1);
                    else {
                        if (this.props.syncContentDomain) {
                            a = 1;
                        }
                        else {
                            const domain = controller.getContentDomain();
                            const _domain = _controller.getContentDomain();
                            if (_domain[1] - _domain[0] &&
                                domain[1] - domain[0])
                                a =
                                    (_domain[1] - _domain[0]) /
                                        (domain[1] - domain[0]);
                            else
                                a = 1;
                        }
                    }
                    const b = _wp1 - a * wp1;
                    _flattingA.push(a);
                    _flattingB.push(b);
                    const baseDomain = controller.getContentBaseDomain();
                    const baseDomainNew = [
                        a * baseDomain[0] + b,
                        a * baseDomain[1] + b,
                    ];
                    checkMinMax(newBaseDomain[j], baseDomainNew);
                }
                else {
                    // The first well pick undefined
                    _flattingA.push(controller === _controller ? 1.0 : 0.0);
                    _flattingB.push(0.0);
                }
            }
            flattingA.push(_flattingA);
            flattingB.push(_flattingB);
        }
        return { A: flattingA, B: flattingB, newBaseDomain: newBaseDomain };
    }
    syncContentScrollPos(iView) {
        const controller = this.controllers[iView];
        if (!controller)
            return;
        let updated = false;
        const wellpickFlatting = this.props.wellpickFlatting;
        const syncContentDomain = this.props.syncContentDomain;
        let coeff = null;
        if (this.props.wellpicks && wellpickFlatting) {
            coeff = this.makeFlattingCoeffs();
        }
        // synchronize base domains
        updated = this.syncContentBaseDomain();
        const domain = controller.getContentDomain();
        let j = -1;
        for (const _controller of this.controllers) {
            j++;
            if (!_controller || _controller == controller)
                continue;
            if (coeff) {
                // wellpick flatting
                const a = coeff.A[iView][j];
                const b = coeff.B[iView][j];
                const domainNew = [
                    a * domain[0] + b,
                    a * domain[1] + b,
                ];
                const _domain = _controller.getContentDomain();
                if (Number.isFinite(domainNew[0]) &&
                    Number.isFinite(domainNew[1])) {
                    if (!isEqDomains(_domain, domainNew)) {
                        _controller.zoomContentTo(domainNew);
                        updated = true;
                    }
                    // sync scroll bar: not work yet
                    const baseDomain = _controller.getContentBaseDomain();
                    //const newBaseDomain = coeff.newBaseDomain[j];
                    const newBaseDomain = [
                        domainNew[0],
                        domainNew[1],
                    ];
                    if (baseDomain[0] < newBaseDomain[0])
                        newBaseDomain[0] = baseDomain[0];
                    if (baseDomain[1] > newBaseDomain[1])
                        newBaseDomain[1] = baseDomain[1];
                    if (Number.isFinite(newBaseDomain[0]) &&
                        Number.isFinite(newBaseDomain[1]))
                        if (!isEqDomains(baseDomain, newBaseDomain)) {
                            //_controller.setContentBaseDomain(newBaseDomain);
                            //updated = true;
                        }
                }
            }
            else if (syncContentDomain) {
                const _domain = _controller.getContentDomain();
                if (!isEqDomains(_domain, domain)) {
                    _controller.zoomContentTo(domain);
                    updated = true;
                }
            }
        }
        if (updated) {
            for (let i = iView - 1; i <= iView; i++) {
                const spacer = this.spacers[i];
                if (!spacer)
                    continue;
                spacer.update();
            }
        }
    }
    syncContentSelection(iView) {
        const controller = this.controllers[iView];
        if (!controller)
            return;
        const selection = controller.getContentSelection();
        for (const _controller of this.controllers) {
            if (!_controller || _controller == controller)
                continue;
            if (this.props.syncContentSelection) {
                const _selection = _controller.getContentSelection();
                if (!isEqualRanges(_selection, selection))
                    _controller.selectContent(selection);
            }
        }
        for (const spacer of this.spacers) {
            if (!spacer)
                continue;
            spacer.forceUpdate();
        }
    }
    syncTemplate(iView) {
        const controller = this.controllers[iView];
        if (!controller)
            return;
        const template = controller.getTemplate();
        for (const _controller of this.controllers) {
            if (!_controller || _controller == controller)
                continue;
            if (this.props.syncTemplate)
                _controller.setTemplate(template);
        }
    }
    setControllersZoom() {
        for (const controller of this.controllers) {
            if (!controller)
                continue;
            if (this.props.domain)
                controller.zoomContentTo(this.props.domain);
        }
    }
    setControllersSelection() {
        if (!this.props.selection)
            return;
        for (const controller of this.controllers) {
            if (!controller)
                continue;
            controller.selectContent(this.props.selection);
        }
        for (const spacer of this.spacers) {
            if (!spacer)
                continue;
            spacer.forceUpdate();
        }
    }
    onInfoGroupClick(trackId) {
        const i = this.collapsedTrackIds.indexOf(trackId);
        if (i < 0)
            this.collapsedTrackIds.push(trackId);
        else
            delete this.collapsedTrackIds[i];
        this.updateReadoutPanel();
    }
    createView(index) {
        var _a, _b;
        const callbacks = this.callbacks[index];
        const wellLog = this.props.welllogs[index];
        const templates = this.props.templates;
        const template = templates[index] ? templates[index] : templates[0];
        const viewTitles = this.props.viewTitles;
        const viewTitle = viewTitles && (viewTitles === true ? true : viewTitles[index]);
        const options = Object.assign(Object.assign({}, this.props.welllogOptions), { maxVisibleTrackNum: ((_a = this.props.welllogOptions) === null || _a === void 0 ? void 0 : _a.maxVisibleTrackNum) ||
                (this.props.horizontal ? 2 : 3) });
        return (React.createElement(WellLogViewWithScroller, { key: index, welllog: wellLog, viewTitle: viewTitle, template: template, colorTables: this.props.colorTables, wellpick: (_b = this.props.wellpicks) === null || _b === void 0 ? void 0 : _b[index], patternsTable: this.props.patternsTable, patterns: this.props.patterns, horizontal: this.props.horizontal, axisTitles: this.props.axisTitles, axisMnemos: this.props.axisMnemos, primaryAxis: this.state.primaryAxis, options: options, onInfo: callbacks.onInfoBind, onCreateController: callbacks.onCreateControllerBind, onTrackMouseEvent: onTrackMouseEvent, onTrackScroll: callbacks.onTrackScrollBind, onTrackSelection: callbacks.onTrackSelectionBind, onContentRescale: callbacks.onContentRescaleBind, onContentSelection: callbacks.onContentSelectionBind, onTemplateChanged: callbacks.onTemplateChangedBind }));
    }
    createSpacer(index) {
        var _a;
        if (!this.props.spacers)
            return null;
        const prev = index - 1;
        let width = this.props.spacers === true
            ? 255 // default width
            : typeof this.props.spacers === "number"
                ? this.props.spacers // all widths are equal
                : this.props.spacers[prev]; // individual width
        if (width === undefined)
            width = 255; // set some default value
        if (!width)
            return null;
        return (React.createElement("div", { style: this.props.horizontal
                ? { height: width + "px" }
                : { width: width + "px" }, key: "s" + index },
            React.createElement(WellLogSpacer, { controllers: this.controllers
                    ? [this.controllers[prev], this.controllers[index]]
                    : [], distance: {
                    units: this.props.wellDistances
                        ? this.props.wellDistances.units
                        : "",
                    value: (_a = this.props.wellDistances) === null || _a === void 0 ? void 0 : _a.distances[prev],
                }, colorTables: this.props.colorTables, wellpicks: this.props.wellpicks
                    ? [
                        this.props.wellpicks[prev],
                        this.props.wellpicks[index],
                    ]
                    : [], patternsTable: this.props.patternsTable, patterns: this.props.patterns, options: this.props.spacerOptions, horizontal: this.props.horizontal, onCreateSpacer: (spacer) => {
                    this.spacers[index] = spacer;
                } })));
    }
    createRightPanel() {
        var _a;
        return (React.createElement("div", { key: "rightPanel", style: {
                flex: "0, 0",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                width: "255px",
                minWidth: "255px",
                maxWidth: "255px",
            } },
            React.createElement(AxisSelector, { header: "Primary scale", axes: this.state.axes, axisLabels: this.props.axisTitles, value: this.state.primaryAxis, onChange: this.onChangePrimaryAxis }),
            this.props.welllogs.map((_welllog, index) => (React.createElement(InfoPanel, { key: index, header: "Readout " + this.props.welllogs[index].header.well, onGroupClick: this.onInfoGroupClick, infos: this.state.infos[index] }))),
            React.createElement("div", { style: { paddingLeft: "10px", display: "flex" } },
                React.createElement("span", null, "Zoom:"),
                React.createElement("span", { style: {
                        flex: "1 1 100px",
                        padding: "0 20px 0 10px",
                    } },
                    React.createElement(ZoomSlider, { value: this.state.sliderValue, max: ((_a = this.props.welllogOptions) === null || _a === void 0 ? void 0 : _a.maxContentZoom) ||
                            256 /*default*/, onChange: this.onZoomSliderChange })))));
    }
    render() {
        return (React.createElement("div", { style: {
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "row",
            } },
            React.createElement("div", { style: {
                    height: "100%",
                    width: "255px" /*some small value to be grown by flex*/,
                    flex: "1 1",
                    display: "flex",
                    flexDirection: this.props.horizontal ? "column" : "row",
                } }, this.props.welllogs.map((_welllog, index) => [
                index ? this.createSpacer(index) : null,
                this.createView(index),
            ])),
            this.createRightPanel()));
    }
}
///
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
const InfoOptions_propTypes = PropTypes.shape({
    /**
     * Show not only visible tracks
     */
    allTracks: PropTypes.bool,
    /**
     * how group values. "" | "track"
     */
    grouping: PropTypes.string,
});
/*
 */
SyncLogViewer.propTypes = {
    /**
     * The ID of this component, used to identify dash components
     * in callbacks. The ID needs to be unique across all of the
     * components in an app.
     */
    id: PropTypes.string.isRequired,
    /**
     * Array of JSON objects describing well log data
     */
    welllogs: PropTypes.array.isRequired,
    /**
     * Prop containing track template data
     */
    templates: PropTypes.array.isRequired,
    /**
     * Prop containing color table data
     */
    colorTables: PropTypes.array.isRequired,
    /**
     * Well Picks data array
     */
    wellpicks: PropTypes.array,
    /**
     * Patterns table
     */
    patternsTable: PropTypes.object,
    /**
     * Horizon to pattern index map
     */
    patterns: PropTypes.array,
    /**
     * Horizon names for wellpick flatting (pan and zoom)
     */
    wellpickFlatting: PropTypes.arrayOf(PropTypes.string),
    /**
     * Set to true or to array of spaser widths if WellLogSpacers should be used
     */
    spacers: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.arrayOf(PropTypes.number),
    ]),
    /**
     * Distanses between wells to show on the spacers
     */
    wellDistances: PropTypes.object,
    /**
     * Orientation of the track plots on the screen. Default is false
     */
    horizontal: PropTypes.bool,
    /**
     * Primary axis id: " md", "tvd", "time"...
     */
    primaryAxis: PropTypes.string,
    /**
     * Log mnemonics for axes
     */
    axisTitles: PropTypes.object,
    /**
     * Names for axes
     */
    axisMnemos: PropTypes.object,
    /**
     * The maximum zoom value
     */
    maxContentZoom: PropTypes.number,
    /**
     * Initial visible interval of the log data
     */
    domain: PropTypes.arrayOf(PropTypes.number),
    /**
     * Initial selected interval of the log data
     */
    selection: PropTypes.arrayOf(PropTypes.number),
    /**
     * Set to true for default titles or to array of individial welllog titles
     */
    viewTitles: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.string,
            PropTypes.object,
        ])) /* bool, string or react element */,
    ]),
    /**
     * WellLogView additional options
     */
    welllogOptions: WellLogViewOptions_propTypes /*PropTypes.object,*/,
    /**
     * Options for readout panel
     */
    readoutOptions: InfoOptions_propTypes /*PropTypes.object,*/,
    /**
     * Synchronize the first visible track number in views
     */
    syncTrackPos: PropTypes.bool,
    /**
     * Synchronize the visible area in views
     */
    syncContentDomain: PropTypes.bool,
    /**
     * Synchronize the selection (current mouse hover) in views
     */
    syncContentSelection: PropTypes.bool,
    /**
     * Synchronize templates in views
     */
    syncTemplate: PropTypes.bool,
};
export default SyncLogViewer;
//# sourceMappingURL=SyncLogViewer.js.map