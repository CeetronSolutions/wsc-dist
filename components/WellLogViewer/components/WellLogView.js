import React, { Component } from "react";
import { LogViewer } from "@equinor/videx-wellog";
import PropTypes from "prop-types";
import { InterpolatedScaleHandler, } from "@equinor/videx-wellog";
import "./styles.scss";
import { validateSchema } from "../../../inputSchema/validator";
import { select } from "d3";
import { getDiscreteColorAndName, getDiscreteMeta } from "../utils/tracks";
import { createTracks } from "../utils/tracks";
import { getScaleTrackNum } from "../utils/tracks";
import { getTrackTemplate } from "../utils/tracks";
import { isScaleTrack } from "../utils/tracks";
import { deepCopy } from "../utils/deepcopy";
import { addOrEditGraphTrack, addOrEditGraphTrackPlot, addOrEditStackedTrack, removeGraphTrackPlot, } from "../utils/tracks";
import { getPlotType } from "../utils/tracks";
import { getAvailableAxes } from "../utils/tracks";
import { removeOverlay, zoomContent, scrollContentTo, zoomContentTo, setContentBaseDomain, getContentBaseDomain, getContentDomain, getContentZoom, scrollTracksTo, isTrackSelected, selectTrack, getSelectedTrackIndices, setSelectedTrackIndices, } from "../utils/log-viewer";
const rubberBandSize = 9;
const rubberBandOffset = rubberBandSize / 2;
function showSelection(rbelm, pinelm, vCur, vPin, horizontal, logViewer /*LogController*/) {
    if (vCur === undefined) {
        rbelm.style.visibility = "hidden";
        pinelm.style.visibility = "hidden";
        return;
    }
    const v = logViewer.scale(vCur);
    if (!Number.isFinite(v)) {
        // logViewer could be empty
        rbelm.style.visibility = "hidden";
        pinelm.style.visibility = "hidden";
        return;
    }
    rbelm.style[horizontal ? "left" : "top"] = `${v - rubberBandOffset}px`;
    rbelm.style.visibility = "visible";
    if (vPin !== undefined && Number.isFinite(vPin)) {
        const pinelm1 = pinelm.firstElementChild;
        let min, max;
        if (vPin < vCur) {
            pinelm1.style[horizontal ? "left" : "top"] = `${rubberBandOffset}px`;
            pinelm1.style[horizontal ? "right" : "bottom"] = "";
            min = vPin;
            max = vCur;
        }
        else {
            pinelm1.style[horizontal ? "right" : "bottom"] = `${rubberBandOffset}px`;
            pinelm1.style[horizontal ? "left" : "top"] = "";
            min = vCur;
            max = vPin;
        }
        min = logViewer.scale(min);
        max = logViewer.scale(max);
        const x = min - rubberBandOffset;
        const w = max - min + rubberBandSize;
        pinelm.style[horizontal ? "left" : "top"] = `${x}px`;
        pinelm.style[horizontal ? "width" : "height"] = `${w}px`;
    }
    else {
        pinelm.style.visibility = "hidden";
    }
}
function addRubberbandOverlay(instance, parent) {
    const horizontal = parent.props.horizontal;
    const rbelm = instance.overlay.create("rubber-band", {
        onMouseMove: (event) => {
            if (parent.selPersistent)
                return;
            const v = horizontal ? event.x : event.y;
            parent.selCurrent = instance.scale.invert(v);
            const rbelm = event.target;
            const pinelm = instance.overlay.elements["pinned"];
            if (rbelm && pinelm) {
                showSelection(rbelm, pinelm, parent.selCurrent, parent.selPinned, horizontal, instance);
            }
        },
        onMouseExit: (event) => {
            if (event.target) {
                // do not hide! event.target.style.visibility = "hidden";
                /* does not exist ?
                if (instance.options.rubberbandExit) {
                    instance.options.rubberbandExit({
                        source: instance,
                    });
                }
                */
            }
        },
    });
    const rb = select(rbelm)
        .classed("rubber-band", true) // for CSS customization
        .style(horizontal ? "width" : "height", `${rubberBandSize}px`)
        .style(horizontal ? "height" : "width", `${100}%`)
        .style("visibility", "hidden");
    rb.append("div")
        .style(horizontal ? "width" : "height", "1px")
        .style(horizontal ? "height" : "width", `${100}%`)
        .style(horizontal ? "left" : "top", `${rubberBandOffset}px`)
        .style("position", "relative");
}
function addReadoutOverlay(instance, parent) {
    const horizontal = parent.props.horizontal;
    const elm = instance.overlay.create("depth", {
        onClick: (event) => {
            const { caller, x, y } = event;
            const value = caller.scale.invert(horizontal ? x : y);
            const elem = event.target;
            if (elem) {
                const axisTitle = !parent.props.axisTitles || !parent.props.primaryAxis
                    ? undefined
                    : parent.props.axisTitles[parent.props.primaryAxis];
                elem.textContent = Number.isFinite(value)
                    ? `Pinned ${axisTitle ? axisTitle : ""}: ${value.toFixed(1)}`
                    : "-";
                elem.style.visibility = "visible";
            }
        },
        onMouseMove: (event) => {
            if (parent.selPersistent)
                return;
            const { caller, x, y } = event;
            const value = caller.scale.invert(parent.props.horizontal ? x : y);
            const elem = event.target;
            if (elem) {
                const axisTitles = parent.props.axisTitles;
                const axisTitle = !axisTitles
                    ? undefined
                    : parent.props.primaryAxis
                        ? axisTitles[parent.props.primaryAxis]
                        : axisTitles[0];
                elem.textContent = Number.isFinite(value)
                    ? `${axisTitle ? axisTitle : ""}: ${value.toFixed(1)}`
                    : "-";
                elem.style.visibility = "visible";
            }
            parent.setInfo(value);
            parent.onContentSelection();
        },
        onMouseExit: (event) => {
            const elem = event.target;
            if (elem)
                elem.style.visibility = "hidden";
        },
        onRescale: (event) => {
            const elem = event.target;
            if (elem && event.transform) {
                // event.transform.k could be not valid after add/edit plot
                // so use getContentZoom(instance) to be consistent
                // console.log("zoom=", getContentZoom(instance), event.transform.k)
                parent.onContentRescale();
                const k = event.transform.k;
                if (Number.isFinite(k)) {
                    elem.style.visibility = "visible";
                    elem.textContent = `Zoom: x${k.toFixed(1)}`;
                }
                else {
                    // empty logview
                    elem.style.visibility = "hidden";
                }
            }
        },
    });
    elm.className = "depth"; // for CSS customization
    elm.style.visibility = "hidden";
    elm.style.position = "absolute";
}
function addPinnedValueOverlay(instance, parent) {
    const horizontal = parent.props.horizontal;
    const pinelm = instance.overlay.create("pinned", {
        onClick: (event) => {
            const v = horizontal ? event.x : event.y;
            const pinelm = event.target;
            if (pinelm) {
                if (pinelm.style.visibility == "visible") {
                    if (!parent.selPersistent) {
                        parent.selPersistent = true;
                    }
                    else {
                        parent.selPersistent = false;
                        parent.selCurrent = instance.scale.invert(v);
                        pinelm.style.visibility = "hidden";
                        parent.selPinned = undefined;
                        parent.onContentSelection();
                    }
                }
                else {
                    parent.selPinned = instance.scale.invert(v);
                    if (parent.selCurrent === undefined)
                        parent.selCurrent = parent.selPinned;
                    const rbelm = instance.overlay.elements["rubber-band"];
                    if (rbelm && pinelm) {
                        showSelection(rbelm, pinelm, parent.selCurrent, parent.selPinned, horizontal, instance);
                    }
                }
            }
        },
    });
    const pin = select(pinelm)
        .classed("pinned", true) // for CSS customization
        .style(horizontal ? "width" : "height", `${rubberBandSize}px`)
        .style(horizontal ? "height" : "width", `${100}%`)
        .style(horizontal ? "top" : "left", `${0}px`)
        .style("position", "absolute")
        .style("visibility", "hidden");
    pin.append("div")
        .style(horizontal ? "width" : "height", "1px")
        .style(horizontal ? "height" : "width", `${100}%`)
        .style(horizontal ? "left" : "top", `${rubberBandOffset}px`)
        .style("position", "absolute");
}
const wpSize = 3; //9;
const wpOffset = wpSize / 2;
function showWellPick(elm, vCur, horizontal, logViewer /*LogController*/) {
    if (vCur === undefined) {
        elm.style.visibility = "hidden";
        return;
    }
    const v = logViewer.scale(vCur);
    if (!Number.isFinite(v)) {
        // logViewer could be empty
        elm.style.visibility = "hidden";
        return;
    }
    elm.style[horizontal ? "left" : "top"] = `${v - wpOffset}px`;
    elm.style.visibility = "visible";
}
function fillWellPicks(elm, vCur, vCur2, horizontal, logViewer /*LogController*/) {
    if (vCur === undefined) {
        elm.style.visibility = "hidden";
        return;
    }
    const v = logViewer.scale(vCur);
    if (!Number.isFinite(v)) {
        // logViewer could be empty
        elm.style.visibility = "hidden";
        return;
    }
    if (vCur2 === undefined) {
        elm.style.visibility = "hidden";
        return;
    }
    const v2 = logViewer.scale(vCur2);
    if (!Number.isFinite(v2)) {
        // logViewer could be empty
        elm.style.visibility = "hidden";
        return;
    }
    elm.style[horizontal ? "left" : "top"] = `${v}px`; // /*- offset*/
    elm.style[horizontal ? "width" : "height"] = `${v2 - v}px`;
    elm.style.visibility = "visible";
    const elm1 = elm.querySelector("div.wellpick-pattern");
    if (elm1) {
        const backgroundPosition = "background-position-" + (horizontal ? "x" : "y");
        elm1.style[backgroundPosition] = `${-v}px`;
    }
}
function _getLogIndexByNames(curves, names) {
    for (const name of names) {
        const n = name.toLowerCase();
        const index = curves.findIndex((item) => item.name.toLowerCase() === n);
        if (index >= 0)
            return index;
    }
    return -1;
}
export function getWellPicks(wellLogView) {
    const wps = [];
    const wellpick = wellLogView.props.wellpick;
    if (!wellpick)
        return wps;
    if (!wellpick.wellpick) {
        console.error("No WellLog object in WellLogView prop.wellpick given");
        return wps;
    }
    const curves = wellpick.wellpick.curves;
    const mnemo = wellpick.md ? wellpick.md : "MD";
    const md = _getLogIndexByNames(curves, [mnemo]);
    if (md < 0) {
        console.error("Depth log '" + mnemo + "' is not found for wellpicks");
        return wps;
    }
    const primaryAxis = wellLogView.props.primaryAxis;
    const scaleInterpolator = wellLogView.scaleInterpolator;
    for (const c in curves) {
        const curve = curves[c];
        if (curve.name !== wellpick.name)
            continue;
        const data = wellpick.wellpick.data;
        for (const d of data) {
            if (d[md] === null)
                continue; // no MD!
            const horizon = d[c];
            if (horizon === null)
                continue;
            const vMD = d[md];
            const vPrimary = primaryAxis === "md" ? vMD : scaleInterpolator === null || scaleInterpolator === void 0 ? void 0 : scaleInterpolator.forward(vMD);
            const vSecondary = primaryAxis === "md" ? scaleInterpolator === null || scaleInterpolator === void 0 ? void 0 : scaleInterpolator.reverse(vMD) : vMD;
            const colorTable = wellpick.colorTables.find((colorTable) => colorTable.name == wellpick.color);
            const meta = getDiscreteMeta(wellpick.wellpick, wellpick.name);
            const { color } = getDiscreteColorAndName(d[c], colorTable, meta);
            const wp = { vMD, vPrimary, vSecondary, horizon, color };
            wps.push(wp);
        }
        break;
    }
    return wps;
}
function posWellPickTitles(instance, parent) {
    if (parent.logController && parent.props.wellpick) {
        const element = instance.overlay.elm.node();
        if (element) {
            const horizontal = parent.props.horizontal;
            let i = 0;
            for (const track of parent.logController.tracks) {
                if (!isScaleTrack(track))
                    continue;
                const elm = track.elm;
                const style = "wp-title-" + i;
                for (const _td of element.querySelectorAll("td." + style)) {
                    const td = _td;
                    td.style.position = "absolute";
                    if (horizontal) {
                        td.style.top = elm.offsetTop + "px";
                    }
                    else {
                        td.style.left = elm.offsetLeft + "px";
                        if (elm.offsetWidth < 38) {
                            td.style.width = "";
                            td.style.top = "-11px";
                            td.classList.add("vertical-text");
                        }
                        else {
                            td.style.width = elm.offsetWidth + "px";
                            td.style.top = "";
                            td.classList.remove("vertical-text");
                        }
                    }
                }
                i++;
            }
        }
    }
}
function addWellPickOverlay(instance, parent) {
    var _a, _b;
    const wellpick = parent.props.wellpick;
    if (!wellpick)
        return;
    const wps = getWellPicks(parent);
    if (!wps.length)
        return;
    //const primaryAxis = parent.props.primaryAxis;
    const horizontal = parent.props.horizontal;
    const wellpickColorFill = (_a = parent.props.options) === null || _a === void 0 ? void 0 : _a.wellpickColorFill;
    const patternsTable = parent.props.patternsTable;
    const patterns = parent.props.patterns;
    const wellpickPatternFill = patternsTable && patterns && ((_b = parent.props.options) === null || _b === void 0 ? void 0 : _b.wellpickPatternFill);
    const patternSize = patternsTable === null || patternsTable === void 0 ? void 0 : patternsTable.patternSize;
    const patternImages = patternsTable === null || patternsTable === void 0 ? void 0 : patternsTable.patternImages;
    for (const wp of wps) {
        const horizon = wp.horizon;
        const vPrimary = wp.vPrimary;
        const vSecondary = wp.vSecondary;
        const color = wp.color;
        const txtPrimary = !Number.isFinite(vPrimary)
            ? ""
            : vPrimary === null || vPrimary === void 0 ? void 0 : vPrimary.toFixed(0);
        const txtSecondary = !Number.isFinite(vSecondary)
            ? ""
            : /*(primaryAxis === "md" ? "TVD:" : "MD:") +*/ vSecondary === null || vSecondary === void 0 ? void 0 : vSecondary.toFixed(0);
        const elmName = "wp" + horizon;
        instance.overlay.remove(elmName); // clear old if exists
        const pinelm = instance.overlay.create(elmName, {});
        const rgba = "rgba(" + color[0] + "," + color[1] + "," + color[2] + ",0.8)";
        const styleText = "style='background-color:rgba(" +
            color[0] +
            "," +
            color[1] +
            "," +
            color[2] +
            ",0.16)'";
        const pin = select(pinelm)
            .classed("wellpick", true) // for CSS customization
            .style(horizontal ? "width" : "height", `${wpSize}px`)
            .style(horizontal ? "height" : "width", `${100}%`)
            .style(horizontal ? "top" : "left", `${0}px`)
            .style("position", "absolute")
            .style("background-color", rgba)
            .style("visibility", "false");
        pin.append("div")
            .html(horizontal
            ? "<table height=100%'>" +
                "<tr><td class='wp-title-0'>" +
                "<span " +
                styleText +
                ">" +
                txtPrimary +
                "</span>" +
                "</td></tr>" +
                "<tr><td class='wp-title-1'>" +
                "<span " +
                styleText +
                ">" +
                txtSecondary +
                "</span>" +
                "</td></tr>" +
                "<tr><td height=100%>" +
                "<span " +
                styleText +
                ">" +
                horizon +
                "</span>" +
                "</td></tr>" +
                "</table>"
            : "<table width=100% style='position:relative; top:-1.5em;'><tr>" +
                "<td class='wp-title-0'>" +
                "<span " +
                styleText +
                ">" +
                txtPrimary +
                "</span>" +
                "</td>" +
                "<td class='wp-title-1'>" +
                "<span " +
                styleText +
                ">" +
                txtSecondary +
                "</span>" +
                "</td>" +
                "<td align=center>" +
                "<span " +
                styleText +
                ">" +
                horizon +
                "</span>" +
                "</td>" +
                "</tr></table>")
            .style("position", "absolute")
            .style(horizontal ? "width" : "height", "1px")
            .style(horizontal ? "height" : "width", `${100}%`)
            .style("background-color", rgba);
        {
            // Filling
            const elmName = "wpFill" + horizon;
            instance.overlay.remove(elmName); // clear old if exists
            if (wellpickPatternFill || wellpickColorFill) {
                const pinelm = instance.overlay.create(elmName, {});
                const pin = select(pinelm)
                    .style("position", "absolute")
                    .style(horizontal ? "width" : "height", `${wpSize}px`)
                    .style(horizontal ? "height" : "width", `${100}%`)
                    .style(horizontal ? "top" : "left", `${0}px`)
                    .style("visibility", "false");
                if (wellpickColorFill) {
                    pin.append("div")
                        .classed("wellpick-fill", true) // for CSS customization
                        .style("width", "100%")
                        .style("height", "100%")
                        .style("background-color", rgba);
                }
                if (wellpickPatternFill) {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    const pattern = patterns.find((value) => value[0] === horizon);
                    if (pattern !== undefined) {
                        const imageIndex = pattern[1];
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        const patternImage = patternImages[imageIndex];
                        pin.append("div")
                            .classed("wellpick-pattern", true) // for CSS customization
                            .style("position", "absolute")
                            .style("left", "0px")
                            .style("top", "0px")
                            .style("width", "100%")
                            .style("height", "100%")
                            .style("background-size", patternSize + "px " + patternSize + "px")
                            .style("background-image", "url('" + patternImage + "')");
                    }
                }
            }
        }
    }
}
function initOverlays(instance, parent) {
    instance.overlay.elm.style("overflow", "hidden"); // to clip content selection
    addReadoutOverlay(instance, parent);
    addRubberbandOverlay(instance, parent);
    addPinnedValueOverlay(instance, parent);
    addWellPickOverlay(instance, parent);
}
function createInterpolator(from, to) {
    // 'from' array could be non monotonous (TVD) so we could not use binary search!
    // Calculate linear interpolation factor between the nodes
    const mul = new Float32Array(from.length);
    const n = from.length;
    for (let i = 0; i < n; i++) {
        if (!i)
            mul[i] = 0;
        else {
            const d = from[i] - from[i - 1];
            mul[i] = d ? (to[i] - to[i - 1]) / d : 1.0;
        }
    }
    return (x, expand) => {
        for (let i = 0; i < n; i++) {
            if (x < from[i]) {
                if (!i)
                    return expand ? to[0] : Number.NaN;
                return (x - from[i]) * mul[i] + to[i];
            }
        }
        return expand ? to[n ? n - 1 : 0] : Number.NaN;
    };
}
function createScaleInterpolator(primaries, secondaries) {
    const primary2secondary = createInterpolator(primaries, secondaries);
    const secondary2primary = createInterpolator(secondaries, primaries);
    const forward = (v) => {
        // SecondaryAxis => PrimaryAxis
        return secondary2primary(v, false);
    };
    const reverse = (v) => {
        // PrimaryAxis => SecondaryAxis
        return primary2secondary(v, false);
    };
    return {
        forward,
        reverse,
        forwardInterpolatedDomain: (domain) => domain.map((v) => secondary2primary(v, true)),
        reverseInterpolatedDomain: (domain) => domain.map((v) => primary2secondary(v, true)),
    };
}
function setTracksToController(logController, axes, welllog, // JSON Log Format
template, // JSON
colorTables // JSON
) {
    const { tracks, minmaxPrimaryAxis, primaries, secondaries } = createTracks(welllog, axes, template.tracks, template.styles, colorTables);
    logController.reset();
    const scaleInterpolator = createScaleInterpolator(primaries, secondaries);
    logController.scaleHandler = new InterpolatedScaleHandler(scaleInterpolator);
    logController.domain = minmaxPrimaryAxis;
    logController.setTracks(tracks);
    return scaleInterpolator;
}
function addTrackMouseEventListner(type, area, element, track, func) {
    element.addEventListener(type, (ev) => {
        const plot = null; ///!!
        func({
            track: track,
            plot: plot,
            element: element,
            ev: ev,
            type: type,
            area: area,
        });
        ev.preventDefault();
    });
}
const types = [
    "contextmenu",
    "click",
    "dblclick",
];
const areas = [
    "title",
    "legend",
    "container",
];
function addTrackMouseEventHandlers(elm, track, func) {
    for (const area of areas) {
        const elements = elm.getElementsByClassName("track-" + area);
        for (const element of elements)
            for (const type of types)
                addTrackMouseEventListner(type, area, element, track, func);
    }
}
import ReactDOM from "react-dom";
import { PlotPropertiesDialog } from "./PlotDialog";
import { TrackPropertiesDialog } from "./TrackDialog";
function addPlot(parent, wellLogView, track) {
    const el = document.createElement("div");
    el.style.width = "10px";
    el.style.height = "13px";
    parent.appendChild(el);
    ReactDOM.render(React.createElement(PlotPropertiesDialog, { wellLogView: wellLogView, track: track, onOK: wellLogView.addTrackPlot.bind(wellLogView, track) }), el);
}
function fillPlotTemplate(templateTrack, plot) {
    const options = plot.options;
    const optionsDifferential = plot.options; // DifferentialPlot - 2 series!
    const options1 = optionsDifferential.serie1;
    const options2 = optionsDifferential.serie2;
    const legend = options.legendInfo();
    const legendDifferential = legend; // DifferentialPlot - 2 series!
    const legend1 = legendDifferential.serie1;
    const legend2 = legendDifferential.serie2;
    const scale = (templateTrack === null || templateTrack === void 0 ? void 0 : templateTrack.scale) !== options.scale ? options.scale : undefined;
    return {
        style: undefined,
        type: getPlotType(plot),
        scale: scale == "log" || scale == "linear" ? scale : undefined,
        name: (legend1 && legend1.label ? legend1.label : legend.label) || "",
        name2: legend2 && legend2.label ? legend2.label : "",
        color: (options1 ? options1.color : options.color) || "",
        color2: options2 ? options2.color : "",
        inverseColor: options.inverseColor || "",
        fill: (options1 ? options1.fill : options.fill) || "",
        fill2: options2 ? options2.fill : "",
        colorTable: options.colorTable ? options.colorTable.name : "",
        inverseColorTable: options.inverseColorTable
            ? options.inverseColorTable.name
            : "",
        colorScale: options.colorScale,
        inverseColorScale: options.inverseColorScale,
    };
}
function editPlot(parent, wellLogView, track, templatePlot, onOK) {
    const el = document.createElement("div");
    el.style.width = "10px";
    el.style.height = "13px";
    parent.appendChild(el);
    ReactDOM.render(React.createElement(PlotPropertiesDialog, { templatePlot: templatePlot, wellLogView: wellLogView, track: track, onOK: onOK }), el);
}
export function addTrack(parent, wellLogView, onOK) {
    const el = document.createElement("div");
    el.style.width = "10px";
    el.style.height = "13px";
    parent.appendChild(el);
    ReactDOM.render(React.createElement(TrackPropertiesDialog, { wellLogView: wellLogView, onOK: onOK }), el);
}
export function editTrack(parent, wellLogView, templateTrack, onOK) {
    const el = document.createElement("div");
    el.style.width = "10px";
    el.style.height = "13px";
    parent.appendChild(el);
    ReactDOM.render(React.createElement(TrackPropertiesDialog, { templateTrack: templateTrack, wellLogView: wellLogView, onOK: onOK }), el);
}
export const argTypesWellLogViewProp = {
    horizontal: {
        description: "Orientation of the track plots on the screen.", // defaultValue: false
    },
    welllog: {
        description: "JSON object describing well log data.",
    },
    template: {
        description: "Prop containing track template data.",
    },
    colorTables: {
        description: "Prop containing color table data for discrete well logs.",
    },
    wellpick: {
        description: "Well Picks data",
    },
    patternsTable: {
        description: "Patterns table",
    },
    patterns: {
        description: "Horizon to pattern index map",
    },
    domain: {
        description: "Initial visible range",
    },
    selection: {
        description: "Initial selected range",
    },
    primaryAxis: {
        description: "Primary axis id", //?? defaultValue: "md"
    },
    axisMnemos: {
        description: "Log mnemonics for axes",
    },
    axisTitles: {
        description: "Names for axes",
    },
    viewTitle: {
        description: "The view title. Set desired string or react element or true for default value from welllog file",
    },
    options: {
        description: "Additional options:<br/>" +
            "maxContentZoom: The maximum zoom value (default 256)<br/>" +
            "maxVisibleTrackNum: The maximum number of visible tracks<br/>" +
            "checkDatafileSchema: Validate JSON datafile against schema<br/>" +
            "hideTrackTitle: Hide titles on the tracks<br/>" +
            "hideLegend: Hide legends on the tracks.",
    },
    // callbacks...
};
export function shouldUpdateWellLogView(props, nextProps) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    // Props could contain some unknown object key:value so we should ignore they
    // so compare only known key:values
    if (props.horizontal !== nextProps.horizontal)
        return true;
    if (((_a = props.options) === null || _a === void 0 ? void 0 : _a.hideTrackTitle) !== ((_b = nextProps.options) === null || _b === void 0 ? void 0 : _b.hideTrackTitle))
        return true;
    if (((_c = props.options) === null || _c === void 0 ? void 0 : _c.hideTrackLegend) !== ((_d = nextProps.options) === null || _d === void 0 ? void 0 : _d.hideTrackLegend))
        return true;
    if (props.welllog !== nextProps.welllog)
        return true;
    if (props.template !== nextProps.template)
        return true;
    if (props.colorTables !== nextProps.colorTables)
        return true;
    if (props.wellpick !== nextProps.wellpick)
        return true;
    if (props.primaryAxis !== nextProps.primaryAxis)
        return true;
    if (props.axisTitles !== nextProps.axisTitles)
        return true;
    if (props.axisMnemos !== nextProps.axisMnemos)
        return true;
    if (((_e = props.options) === null || _e === void 0 ? void 0 : _e.maxVisibleTrackNum) !==
        ((_f = nextProps.options) === null || _f === void 0 ? void 0 : _f.maxVisibleTrackNum))
        return true;
    if (((_g = props.options) === null || _g === void 0 ? void 0 : _g.maxContentZoom) !== ((_h = nextProps.options) === null || _h === void 0 ? void 0 : _h.maxContentZoom))
        return true;
    if (!isEqualRanges(props.domain, nextProps.domain))
        return true;
    if (!isEqualRanges(props.selection, nextProps.selection))
        return true;
    if (((_j = props.options) === null || _j === void 0 ? void 0 : _j.checkDatafileSchema) !==
        ((_k = nextProps.options) === null || _k === void 0 ? void 0 : _k.checkDatafileSchema))
        return true;
    if (((_l = props.options) === null || _l === void 0 ? void 0 : _l.wellpickColorFill) !==
        ((_m = nextProps.options) === null || _m === void 0 ? void 0 : _m.wellpickColorFill))
        return true;
    if (((_o = props.options) === null || _o === void 0 ? void 0 : _o.wellpickPatternFill) !==
        ((_p = nextProps.options) === null || _p === void 0 ? void 0 : _p.wellpickPatternFill))
        return true;
    if (props.viewTitle !== nextProps.viewTitle)
        return true;
    // callbacks
    // ignore all?
    return false;
}
export function isEqualRanges(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
d1, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
d2) {
    if (!d1)
        return !d2;
    if (!d2)
        return !d1;
    return d1[0] === d2[0] && d1[1] === d2[1];
}
class WellLogView extends Component {
    constructor(props) {
        super(props);
        this.container = undefined;
        this.logController = undefined;
        this.selCurrent = undefined;
        this.selPinned = undefined;
        this.selPersistent = undefined;
        this.resizeObserver = new ResizeObserver((entries) => {
            const entry = entries[0];
            if (entry && entry.target) {
                //const Width = (entry.target as HTMLElement).offsetWidth;
                //const Height = (entry.target as HTMLElement).offsetHeight;
                if (this.logController)
                    posWellPickTitles(this.logController, this);
            }
        });
        this.template = {
            name: "",
            scale: {
                primary: "",
            },
            tracks: [],
            styles: [],
        };
        this.scaleInterpolator = undefined;
        this.state = {
            infos: [],
            scrollTrackPos: 0,
        };
        this.onTrackMouseEvent = this.onTrackMouseEvent.bind(this);
        // set callback to component's caller
        if (this.props.onCreateController)
            this.props.onCreateController(this);
        this.setControllerZoom();
    }
    componentDidMount() {
        this.createLogViewer();
        this.template = deepCopy(this.props.template); // save external template content to current
        this.setTracks(true);
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (shouldUpdateWellLogView(this.props, nextProps))
            return true;
        if (this.state.scrollTrackPos !== nextState.scrollTrackPos)
            return true;
        if (this.state.errorText !== nextState.errorText)
            return true;
        return false;
    }
    componentDidUpdate(prevProps, prevState) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        // Typical usage (don't forget to compare props):
        if (this.props.onCreateController !== prevProps.onCreateController) {
            // update callback to component's caller
            if (this.props.onCreateController)
                this.props.onCreateController(this);
        }
        let selectedTrackIndices = []; // Indices to restore
        let selection = undefined; // content selection to restore
        let shouldSetTracks = false;
        let checkSchema = false;
        if (this.props.horizontal !== prevProps.horizontal ||
            ((_a = this.props.options) === null || _a === void 0 ? void 0 : _a.hideTrackTitle) !==
                ((_b = prevProps.options) === null || _b === void 0 ? void 0 : _b.hideTrackTitle) ||
            ((_c = this.props.options) === null || _c === void 0 ? void 0 : _c.hideTrackLegend) !==
                ((_d = prevProps.options) === null || _d === void 0 ? void 0 : _d.hideTrackLegend) ||
            ((_e = this.props.options) === null || _e === void 0 ? void 0 : _e.maxContentZoom) !==
                ((_f = prevProps.options) === null || _f === void 0 ? void 0 : _f.maxContentZoom)) {
            selection = this.getContentSelection();
            selectedTrackIndices = this.getSelectedTrackIndices();
            this.createLogViewer();
            shouldSetTracks = true;
        }
        if (this.props.welllog !== prevProps.welllog ||
            ((_g = this.props.options) === null || _g === void 0 ? void 0 : _g.checkDatafileSchema) !==
                ((_h = prevProps.options) === null || _h === void 0 ? void 0 : _h.checkDatafileSchema)) {
            shouldSetTracks = true;
            checkSchema = true;
        }
        else if (this.props.template !== prevProps.template) {
            this.template = deepCopy(this.props.template); // save external template content to current
            shouldSetTracks = true;
            checkSchema = true;
        }
        else if (this.props.primaryAxis !== prevProps.primaryAxis) {
            this.selectContent([undefined, undefined]);
            selectedTrackIndices = this.getSelectedTrackIndices();
            shouldSetTracks = true;
        }
        else if (this.props.colorTables !== prevProps.colorTables) {
            selection = this.getContentSelection();
            selectedTrackIndices = this.getSelectedTrackIndices();
            shouldSetTracks = true; // force to repaint
        }
        else if (this.props.axisTitles !== prevProps.axisTitles ||
            this.props.axisMnemos !== prevProps.axisMnemos) {
            selection = this.getContentSelection();
            selectedTrackIndices = this.getSelectedTrackIndices();
            shouldSetTracks = true; //??
        }
        else if (this.props.wellpick !== prevProps.wellpick ||
            ((_j = this.props.options) === null || _j === void 0 ? void 0 : _j.wellpickPatternFill) !==
                ((_k = prevProps.options) === null || _k === void 0 ? void 0 : _k.wellpickPatternFill) ||
            ((_l = this.props.options) === null || _l === void 0 ? void 0 : _l.wellpickColorFill) !==
                ((_m = prevProps.options) === null || _m === void 0 ? void 0 : _m.wellpickColorFill)) {
            if (this.logController) {
                addWellPickOverlay(this.logController, this);
                this.showSelection();
            }
        }
        if (shouldSetTracks) {
            this.setTracks(checkSchema); // use this.template
            setSelectedTrackIndices(this.logController, selectedTrackIndices);
            if (selection)
                this.selectContent(selection);
        }
        else if (this.state.scrollTrackPos !== prevState.scrollTrackPos ||
            ((_o = this.props.options) === null || _o === void 0 ? void 0 : _o.maxVisibleTrackNum) !==
                ((_p = prevProps.options) === null || _p === void 0 ? void 0 : _p.maxVisibleTrackNum)) {
            this.onTrackScroll();
            this.onTrackSelection();
            this.setInfo();
        }
        if (this.props.domain &&
            (!prevProps.domain ||
                this.props.domain[0] !== prevProps.domain[0] ||
                this.props.domain[1] !== prevProps.domain[1])) {
            this.setControllerZoom();
        }
        if (this.props.selection &&
            (!prevProps.selection ||
                this.props.selection[0] !== prevProps.selection[0] ||
                this.props.selection[1] !== prevProps.selection[1])) {
            this.setControllerSelection();
        }
    }
    createLogViewer() {
        var _a, _b, _c;
        this.selPersistent = undefined;
        if (this.logController) {
            // remove old LogViewer
            this.logController.reset(); // clear UI
            this.logController.onUnmount(); //?
            removeOverlay(this.logController); // we should remove it because LogViewer do not delete it
            this.logController = undefined;
        }
        if (this.container) {
            // create new LogViewer
            this.logController = new LogViewer({
                horizontal: this.props.horizontal,
                showTitles: !((_a = this.props.options) === null || _a === void 0 ? void 0 : _a.hideTrackTitle),
                showLegend: !((_b = this.props.options) === null || _b === void 0 ? void 0 : _b.hideTrackLegend),
                maxZoom: (_c = this.props.options) === null || _c === void 0 ? void 0 : _c.maxContentZoom,
                onTrackEnter: (elm, track) => addTrackMouseEventHandlers(elm, track, this.onTrackMouseEvent),
            });
            this.logController.init(this.container);
            if (this.container)
                this.resizeObserver.observe(this.container);
            //if (this.container) this.resizeObserver.unobserve(this.container);
            initOverlays(this.logController, this);
        }
        this.setInfo();
    }
    getAxesInfo() {
        // get Object keys available in the welllog
        const axes = getAvailableAxes(this.props.welllog, this.props.axisMnemos);
        const primaryAxisIndex = axes.findIndex((value) => value === this.props.primaryAxis);
        return {
            primaryAxis: this.props.primaryAxis || "",
            secondaryAxis: this.props.template &&
                this.props.template.scale &&
                this.props.template.scale.allowSecondary &&
                axes.length > 1 // get next in available axes
                ? axes[primaryAxisIndex + 1] || axes[0]
                : "",
            titles: this.props.axisTitles,
            mnemos: this.props.axisMnemos,
        };
    }
    setTracks(checkSchema) {
        var _a;
        this.selCurrent = this.selPinned = undefined; // clear old selection (primary scale could be changed)
        if (checkSchema) {
            //check against the json schema
            try {
                validateSchema(this.template, "WellLogTemplate");
                if ((_a = this.props.options) === null || _a === void 0 ? void 0 : _a.checkDatafileSchema) {
                    validateSchema(this.props.welllog, "WellLog");
                }
            }
            catch (e) {
                this.setState({ errorText: String(e) });
            }
        }
        if (this.logController) {
            const axes = this.getAxesInfo();
            this.scaleInterpolator = setTracksToController(this.logController, axes, this.props.welllog, this.template, this.props.colorTables);
            addWellPickOverlay(this.logController, this);
        }
        this.onTrackScroll();
        this.onTrackSelection();
        this.setInfo(); // Clear old track information
    }
    findTrackById(trackId) {
        var _a;
        return (_a = this.logController) === null || _a === void 0 ? void 0 : _a.tracks.find(function (track) {
            return track.id === trackId;
        });
    }
    setControllerZoom() {
        if (this.props.domain)
            this.zoomContentTo(this.props.domain);
    }
    setControllerSelection() {
        if (this.props.selection)
            this.selectContent(this.props.selection);
    }
    /**
      Display current state of track scrolling
      */
    onTrackScroll() {
        const iFrom = this.getTrackScrollPos();
        const iTo = iFrom + this._maxVisibleTrackNum();
        if (this.logController)
            scrollTracksTo(this.logController, iFrom, iTo);
        if (this.props.onTrackScroll)
            this.props.onTrackScroll();
    }
    onTrackSelection() {
        if (this.props.onTrackSelection)
            this.props.onTrackSelection();
    }
    setInfo(x = Number.NaN) {
        if (!this.props.onInfo)
            return; // no callback is given
        if (!this.logController)
            return; // not initialized yet
        if (isNaN(x) && this.selCurrent !== undefined)
            x = this.selCurrent;
        const iFrom = this.getTrackScrollPos();
        const iTo = iFrom + this._maxVisibleTrackNum();
        this.props.onInfo(x, this.logController, iFrom, iTo);
    }
    onContentRescale() {
        this.showSelection();
        if (this.props.onContentRescale)
            this.props.onContentRescale();
    }
    onContentSelection() {
        this.showSelection();
        if (this.props.onContentSelection)
            this.props.onContentSelection();
    }
    onTrackMouseEvent(ev) {
        if (this.props.onTrackMouseEvent)
            this.props.onTrackMouseEvent(this, ev);
    }
    onTemplateChanged() {
        this.setInfo();
        this.template = this._generateTemplate(); // save current template
        if (this.props.onTemplateChanged)
            this.props.onTemplateChanged();
    }
    // content
    zoomContentTo(domain) {
        if (this.logController)
            return zoomContentTo(this.logController, domain);
        return false;
    }
    scrollContentTo(f) {
        if (this.logController)
            return scrollContentTo(this.logController, f);
        return false;
    }
    zoomContent(zoom) {
        if (this.logController)
            return zoomContent(this.logController, zoom);
        return false;
    }
    showSelection() {
        if (!this.logController)
            return;
        const elements = this.logController.overlay.elements;
        const rbelm = elements["rubber-band"];
        const pinelm = elements["pinned"];
        if (rbelm && pinelm) {
            rbelm.style.visibility =
                this.selCurrent === undefined ? "hidden" : "visible";
            pinelm.style.visibility =
                this.selPinned === undefined ? "hidden" : "visible";
            showSelection(rbelm, pinelm, this.selCurrent, this.selPinned, this.props.horizontal, this.logController);
        }
        const wellpick = this.props.wellpick;
        if (wellpick) {
            const wps = getWellPicks(this);
            if (!wps.length)
                return;
            let i = 0;
            for (const wp of wps) {
                const horizon = wp.horizon;
                const vPrimary = wp.vPrimary;
                const elmName = "wp" + horizon;
                const pinelm = elements[elmName];
                if (!pinelm)
                    continue;
                showWellPick(pinelm, vPrimary, this.props.horizontal, this.logController);
                if (this.props.patterns) {
                    const elmName1 = "wpFill" + horizon;
                    const pinelm1 = elements[elmName1];
                    if (pinelm1) {
                        const wp2 = wps[i + 1];
                        const vPrimary2 = wp2 === null || wp2 === void 0 ? void 0 : wp2.vPrimary;
                        fillWellPicks(pinelm1, vPrimary, vPrimary2, this.props.horizontal, this.logController);
                    }
                }
                i++;
            }
            posWellPickTitles(this.logController, this);
        }
    }
    selectContent(selection) {
        const selPinned = selection[1];
        if (this.selCurrent === selection[0] && this.selPinned === selPinned)
            return;
        this.selCurrent = selection[0];
        this.selPinned = selPinned;
        this.selPersistent = this.selPinned !== undefined;
        this.showSelection();
        this.setInfo(); // reflect new value in this.selCurrent
    }
    setContentBaseDomain(domain) {
        if (this.logController)
            setContentBaseDomain(this.logController, domain);
    }
    getContentBaseDomain() {
        if (this.logController)
            return getContentBaseDomain(this.logController);
        return [0.0, 0.0];
    }
    getContentDomain() {
        if (this.logController)
            return getContentDomain(this.logController);
        return [0.0, 0.0];
    }
    getContentZoom() {
        if (this.logController)
            return getContentZoom(this.logController);
        return 1.0;
    }
    getContentSelection() {
        if (!this.logController)
            return [undefined, undefined];
        return [this.selCurrent, this.selPinned];
    }
    // tracks
    _graphTrackMax() {
        // for scrollbar
        if (!this.logController)
            return 0;
        const nScaleTracks = getScaleTrackNum(this.logController.tracks);
        return this.logController.tracks.length - nScaleTracks;
    }
    _newTrackScrollPos(pos) {
        let newPos = pos;
        const posMax = this.getTrackScrollPosMax();
        if (newPos > posMax)
            newPos = posMax;
        if (newPos < 0)
            newPos = 0;
        return newPos;
    }
    _maxVisibleTrackNum() {
        var _a, _b;
        return ((_a = this.props.options) === null || _a === void 0 ? void 0 : _a.maxVisibleTrackNum)
            ? (_b = this.props.options) === null || _b === void 0 ? void 0 : _b.maxVisibleTrackNum
            : this.props.horizontal
                ? 3
                : 5 /*some default value*/;
    }
    scrollTrackBy(delta) {
        this.setState((state) => ({
            scrollTrackPos: this._newTrackScrollPos(state.scrollTrackPos + delta),
        }));
    }
    scrollTrackTo(pos) {
        this.setState((state) => {
            const newPos = this._newTrackScrollPos(pos);
            if (state.scrollTrackPos === newPos)
                return null;
            return { scrollTrackPos: newPos };
        });
    }
    getTrackScrollPos() {
        return this.state.scrollTrackPos;
    }
    getTrackScrollPosMax() {
        // for scrollbar
        const nGraphTracks = this._graphTrackMax();
        let posMax = nGraphTracks - this._maxVisibleTrackNum();
        if (posMax < 0)
            posMax = 0;
        return posMax;
    }
    getTrackZoom() {
        return this._graphTrackMax() / this._maxVisibleTrackNum();
    }
    getSelectedTrackIndices() {
        return getSelectedTrackIndices(this.logController);
    }
    setSelectedTrackIndices(selection) {
        const changed = setSelectedTrackIndices(this.logController, selection);
        if (changed)
            this.onTrackSelection();
        return changed;
    }
    getTemplate() {
        return this.template;
    }
    setTemplate(template) {
        const tNew = JSON.stringify(template);
        const t = JSON.stringify(this.template);
        if (t !== tNew) {
            this.template = JSON.parse(tNew); // save external template content to current
            this.setTracks(true);
            /* not sure */ this.onTemplateChanged();
        }
    }
    _generateTemplate() {
        var _a;
        const template = this.template;
        const tracks = [];
        if (this.logController) {
            for (const track of this.logController.tracks) {
                if (isScaleTrack(track))
                    continue;
                const templateTrack = getTrackTemplate(track);
                tracks.push(deepCopy(templateTrack));
            }
        }
        const axes = getAvailableAxes(this.props.welllog, this.props.axisMnemos);
        return {
            name: template.name,
            scale: {
                primary: this.props.primaryAxis || "" /* no scale track */,
                allowSecondary: ((_a = template.scale) === null || _a === void 0 ? void 0 : _a.allowSecondary) && axes.length > 1,
            },
            tracks: tracks,
            styles: template.styles,
        };
    }
    // editting
    _addTrack(trackCurrent, templateTrack) {
        templateTrack.required = true; // user's tracks could be empty
        const bAfter = true;
        let trackNew;
        if (templateTrack.plots &&
            templateTrack.plots[0] &&
            templateTrack.plots[0].type === "stacked") {
            trackNew = addOrEditStackedTrack(this, null, templateTrack, trackCurrent, bAfter);
        }
        else {
            trackNew = addOrEditGraphTrack(this, null, templateTrack, trackCurrent, bAfter);
        }
        if (trackNew) {
            this.onTemplateChanged();
            if (bAfter)
                // force new track to be visible when added after the current
                this.scrollTrackBy(+1);
            else {
                this.onTrackScroll();
                this.setInfo();
            }
            this.selectTrack(trackNew, true);
        }
    }
    _editTrack(track, templateTrack) {
        if (templateTrack.plots && templateTrack.plots[0].type === "stacked") {
            addOrEditStackedTrack(this, track, templateTrack, track, false);
        }
        else {
            addOrEditGraphTrack(this, track, templateTrack, track, false);
        }
        this.onTemplateChanged();
    }
    removeTrack(track) {
        if (this.logController) {
            this.logController.removeTrack(track);
            this.onTrackScroll();
            this.onTrackSelection();
            this.onTemplateChanged();
        }
    }
    isTrackSelected(track) {
        return (!!this.logController && isTrackSelected(this.logController, track));
    }
    selectTrack(track, selected) {
        let changed = false;
        if (this.logController)
            for (const _track of this.logController.tracks) {
                // single selection: remove selection from another tracks
                if (selectTrack(this.logController, _track, selected && track === _track))
                    changed = true;
            }
        if (changed)
            this.onTrackSelection();
        return changed;
    }
    addTrackPlot(track, templatePlot) {
        addOrEditGraphTrackPlot(this, track, null, templatePlot);
        this.onTemplateChanged();
    }
    _editTrackPlot(track, plot, _templatePlot) {
        const templatePlot = Object.assign({}, _templatePlot);
        /* We have special option for track scale!
        const templateTrack = getTrackTemplate(track);
        if (templatePlot.scale === templateTrack.scale)
            templatePlot.scale = undefined;
        */
        addOrEditGraphTrackPlot(this, track, plot, templatePlot);
        this.onTemplateChanged();
    }
    removeTrackPlot(track, plot) {
        removeGraphTrackPlot(this, track, plot);
        const templateTrack = getTrackTemplate(track);
        templateTrack.required = true; // user's tracks could be empty
        this.onTemplateChanged();
    }
    // Dialog functions
    addTrack(parent, trackCurrent) {
        if (parent) {
            addTrack(parent, this, this._addTrack.bind(this, trackCurrent));
        }
    }
    editTrack(parent, track) {
        if (parent) {
            const templateTrack = getTrackTemplate(track);
            editTrack(parent, this, templateTrack, this._editTrack.bind(this, track));
        }
    }
    addPlot(parent, track) {
        if (parent) {
            addPlot(parent, this, track);
        }
    }
    editPlot(parent, track, plot) {
        if (parent) {
            const templateTrack = getTrackTemplate(track);
            const templatePlot = fillPlotTemplate(templateTrack, plot);
            editPlot(parent, this, track, templatePlot, this._editTrackPlot.bind(this, track, plot));
        }
    }
    render() {
        var _a;
        const horizontal = this.props.horizontal;
        const viewTitle = this.props.viewTitle;
        return (React.createElement("div", { className: "welllogview", style: {
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: horizontal ? "row" : "column",
            } },
            viewTitle && (React.createElement("div", { style: {
                    flex: "0, 0",
                    writingMode: horizontal ? "vertical-lr" : undefined,
                    transform: horizontal
                        ? "rotate(180deg)"
                        : undefined,
                }, className: "title" }, typeof viewTitle === "object" /*react element*/
                ? viewTitle
                : viewTitle === true
                    ? (_a = this.props.welllog) === null || _a === void 0 ? void 0 : _a.header.well
                    : viewTitle)),
            React.createElement("div", { style: {
                    width: "100%",
                    height: "100%",
                    flex: "1, 1",
                    display: "flex",
                    flexDirection: "column",
                } },
                React.createElement("div", { style: { flex: "1, 1" }, ref: (el) => (this.container = el) }),
                this.state.errorText && (React.createElement("div", { style: { flex: "0, 0" }, className: "error" }, this.state.errorText)))));
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
     * Validate JSON datafile against schema4
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
WellLogView.propTypes = _propTypesWellLogView();
export function _propTypesWellLogView() {
    return {
        /**
         * The ID of this component, used to identify dash components
         * in callbacks. The ID needs to be unique across all of the
         * components in an app.
         */
        id: PropTypes.string,
        /**
         * An object from JSON file describing well log data
         */
        welllog: PropTypes.object,
        /**
         * Prop containing track template data
         */
        template: PropTypes.object.isRequired,
        /**
         * Prop containing color table data for discrete well logs
         */
        colorTables: PropTypes.array.isRequired,
        /**
         * Well picks data
         */
        wellpick: PropTypes.object,
        /**
         * Patterns table
         */
        patternsTable: PropTypes.object,
        /**
         * Horizon to pattern index map
         */
        patterns: PropTypes.array,
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
         * Set to true for default title or to some string or JSX.Element
         */
        viewTitle: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.string,
            PropTypes.object /* react element */,
        ]),
        /**
         * Initial visible interval of the log data
         */
        domain: PropTypes.arrayOf(PropTypes.number),
        /**
         * Initial selected interval of the log data
         */
        selection: PropTypes.arrayOf(PropTypes.number),
        /**
         * Additional options
         */
        options: WellLogViewOptions_propTypes,
    };
}
export default WellLogView;
//# sourceMappingURL=WellLogView.js.map