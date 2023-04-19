var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ScaleTrack, DualScaleTrack, GraphTrack, StackedTrack, } from "@equinor/videx-wellog";
import { graphLegendConfig, scaleLegendConfig } from "@equinor/videx-wellog";
import { stackLegendConfig } from "./stack/stack-legend";
import { getInterpolatedColor } from "./color-table";
// missed! import { createScale } from "@equinor/videx-wellog/dist/tracks/graph/interfaces";
import { createScale } from "./graph/factory";
import { checkMinMaxValue, checkMinMax, roundMinMax, roundLogMinMax, } from "./minmax";
import { updateLegendRows } from "./log-viewer";
import { deepCopy } from "./deepcopy";
export function indexOfElementByName(array, name) {
    if (array && name) {
        const nameUpper = name.toUpperCase();
        let i = 0;
        for (const element of array) {
            if (element.name && element.name.toUpperCase() == nameUpper) {
                return i;
            }
            i++;
        }
    }
    return -1;
}
function indexOfElementByNames(array, names) {
    if (array && names) {
        /* names should be already in upper case */
        let i = 0;
        for (const element of array) {
            if (element.name && names.indexOf(element.name.toUpperCase()) >= 0)
                return i;
            i++;
        }
    }
    return -1;
}
function elementByKeyName(meta, name) {
    name = name.toUpperCase();
    for (const key in meta) {
        if (key.toUpperCase() === name)
            // search case insensitive!
            return meta[key];
    }
    return null;
}
const __colors = [
    "red",
    "blue",
    "orange",
    "green",
    "red",
    "magenta",
    "gray",
    "brown",
];
let __iPlotColor = 0;
function generateColor() {
    return __colors[__iPlotColor++ % __colors.length];
}
/*
 * `LinePlot` - linear line graph
 * `LineStepPlot` - linear stepladder graph
 * `AreaPlot` - area graph
 * `DotPlot` - discrete points graph
 * `DifferentialPlot` - differential graph, for correlation of two data series.
 */
const defPlotType = "line";
class PlotData {
    constructor() {
        this.minmax = [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY];
        this.minmaxPrimaryAxis = [
            Number.POSITIVE_INFINITY,
            Number.NEGATIVE_INFINITY,
        ];
        this.data = [];
    }
}
function preparePlotData(data, iCurve, iPrimaryAxis) {
    const plot = new PlotData();
    let i = 0;
    for (const row of data) {
        let value = row[iCurve];
        if (typeof value == "number")
            checkMinMaxValue(plot.minmax, value);
        const primary = iPrimaryAxis >= 0 ? row[iPrimaryAxis] : i++;
        if (primary == null)
            // videx library do not like such data
            value = null; // force a gap in the graph
        checkMinMaxValue(plot.minmaxPrimaryAxis, primary);
        plot.data.push([primary, value]);
    }
    return plot;
}
function shortDescription(description) {
    // sometimes description contains the track number
    //"0  Depth",
    //"1  BVW:CPI:rC:0001:v1",
    //"02 DRAW DOWN PRESSURE",
    if ("0" <= description[0] && description[0] <= "9") {
        if (description[1] == " ")
            return description.substring(2);
        else if ("0" <= description[1] && description[2] <= "9")
            if (description[2] == " ")
                return description.substring(3);
    }
    return description;
}
function makeTrackHeader(welllog, templateTrack) {
    if (templateTrack.title)
        return templateTrack.title;
    const templatePlots = templateTrack.plots;
    if (templatePlots && templatePlots[0]) {
        const curves = welllog.curves;
        // get the first curve name
        const templatePlot = templatePlots[0];
        const iCurve = indexOfElementByName(curves, templatePlot.name);
        if (iCurve < 0)
            // something went wrong
            return templatePlot.name;
        const curve = curves[iCurve];
        return curve.description
            ? shortDescription(curve.description)
            : curve.name;
    }
    return "";
}
class TracksInfo {
    constructor() {
        this.tracks = [];
        this.minmaxPrimaryAxis = [
            Number.POSITIVE_INFINITY,
            Number.NEGATIVE_INFINITY,
        ];
        this.minmaxSecondaryAxis = [
            Number.POSITIVE_INFINITY,
            Number.NEGATIVE_INFINITY,
        ];
        this.primaries = new Float32Array(0);
        this.secondaries = new Float32Array(0);
    }
}
export function getAvailableAxes(welllog, axisMnemos) {
    const result = [];
    if (welllog) {
        const curves = welllog.curves;
        for (const key in axisMnemos) {
            const i = indexOfElementByNames(curves, axisMnemos[key]);
            if (i >= 0)
                result.push(key);
        }
    }
    return result;
}
import { LinePlot, AreaPlot, DotPlot, DifferentialPlot, LineStepPlot, } from "@equinor/videx-wellog";
import GradientFillPlot from "../utils/gradientfill-plot";
export function getPlotType(plot) {
    if (plot instanceof GradientFillPlot)
        return "gradientfill";
    if (plot instanceof LinePlot)
        return "line";
    if (plot instanceof AreaPlot)
        return "area";
    if (plot instanceof DotPlot)
        return "dot";
    if (plot instanceof DifferentialPlot)
        return "differential";
    if (plot instanceof LineStepPlot)
        return "linestep";
    return "";
}
function isValidPlotType(plotType) {
    return ([
        "line",
        "linestep",
        "dot",
        "area",
        "differential",
        "gradientfill",
        "stacked",
    ].indexOf(plotType) >= 0);
}
function getTemplatePlotProps(templatePlot, templateStyles) {
    const iStyle = templatePlot.style && templateStyles
        ? indexOfElementByName(templateStyles, templatePlot.style)
        : -1;
    const options = iStyle >= 0 && templateStyles
        ? Object.assign(Object.assign({}, templateStyles[iStyle]), templatePlot) : Object.assign({}, templatePlot);
    if (!options.type)
        options.type = defPlotType;
    if (!isValidPlotType(options.type)) {
        console.error("unknown plot type '" +
            options.type +
            "': use default type '" +
            defPlotType +
            "'");
        options.type = defPlotType;
    }
    if (options.type !== "stacked") {
        if (!options.color)
            options.color = generateColor();
    }
    if (options.type === "area") {
        if (!options.fill) {
            //options.fill = generateColor();
            options.fillOpacity = 0.0;
        }
    }
    else if (options.type === "gradientfill") {
        if (!options.colorTable) {
            //options.fill = generateColor();
            options.fillOpacity = 0.0;
        }
    }
    else if (options.type === "differential") {
        // "differential" plot
        if (!options.fill)
            options.fill = generateColor();
        if (!options.color2)
            options.color2 = generateColor();
        if (!options.fill2)
            options.fill2 = generateColor();
    }
    return options;
}
class __dataAccessor {
    constructor(iData) {
        this.iData = iData;
    }
    dataAccessor(d) {
        return d[this.iData];
    }
}
function makeDataAccessor(iData) {
    const _dataAccessor = new __dataAccessor(iData);
    return _dataAccessor.dataAccessor.bind(_dataAccessor);
}
class __dataAccessor2 {
    constructor(iData, iData2) {
        this.iData = iData;
        this.iData2 = iData2;
    }
    dataAccessor(d) {
        return [d[this.iData], d[this.iData2]];
    }
}
function makeDataAccessor2(iData, iData2) {
    const _dataAccessor = new __dataAccessor2(iData, iData2);
    return _dataAccessor.dataAccessor.bind(_dataAccessor);
}
const defColorTable = {
    name: "not found",
    discrete: false,
    colors: [
        [0.0, 1.0, 0.0, 0.0],
        [0.5, 0.5, 0.0, 0.0],
        [1.0, 1.0, 0.0, 0.0],
    ],
};
function getColorTable(id, colorTables) {
    if (id && typeof id !== "string") {
        console.log("colorTable id='" + id + "' is not string");
        return defColorTable;
    }
    if (id && colorTables) {
        for (let i = 0; i < colorTables.length; i++) {
            if (colorTables[i].name == id)
                return colorTables[i];
        }
        console.error("colorTable id='" + id + "' is not found in getColorTable()");
        return defColorTable;
    }
    if (id && !colorTables)
        console.log("colorTables is not given in getColorTable()");
    return undefined; //defColorTable;
}
function getPlotOptions(templatePlotProps, trackScale, // track scale
minmax, curve, iPlot, curve2, //"differential" plot
iPlot2, //"differential" plot
colorTables //"gradientfill" plot
) {
    const scale = templatePlotProps.scale || trackScale || "linear"; //"linear" or "log"
    const domain = (scale === "log" ||
        (templatePlotProps.type === "gradientfill" &&
            templatePlotProps.colorScale === "log")
        ? roundLogMinMax
        : roundMinMax)(minmax);
    const options = {
        dataAccessor: curve2
            ? makeDataAccessor2(iPlot, iPlot2)
            : makeDataAccessor(iPlot),
        scale: scale,
        domain: templatePlotProps.domain || domain,
        color: templatePlotProps.color,
        inverseColor: templatePlotProps.inverseColor,
        fill: templatePlotProps.fill,
        fillOpacity: templatePlotProps.fillOpacity
            ? templatePlotProps.fillOpacity
            : 0.25,
        useMinAsBase: true,
        //GradientFillPlotOptions
        colorTable: getColorTable(templatePlotProps.colorTable, colorTables),
        inverseColorTable: getColorTable(templatePlotProps.inverseColorTable, colorTables),
        colorScale: templatePlotProps.colorScale,
        inverseColorScale: templatePlotProps.inverseColorScale,
        legendInfo: () => ({
            label: curve.name,
            unit: curve.unit ? curve.unit : "",
            // DifferentialPlotLegendInfo,
            serie1: {
                show: true,
                label: curve.name,
                unit: curve.unit ? curve.unit : "",
            },
            serie2: {
                show: true,
                label: curve2 ? curve2.name : "",
                unit: curve2 && curve2.unit ? curve2.unit : "",
            },
        }),
    };
    options.serie1 = {
        scale: scale,
        domain: domain,
        color: templatePlotProps.color,
        fill: templatePlotProps.fill,
    };
    options.serie2 = {
        // ? =scale2, =domain2 ?
        scale: scale,
        domain: domain,
        color: templatePlotProps.color2,
        fill: templatePlotProps.fill2,
    };
    return options;
}
function getPlotConfig(id, templatePlotProps, trackScale, // track scale
minmax, curve, iPlot, curve2, iPlot2, colorTables) {
    return {
        id: id,
        type: templatePlotProps.type,
        options: getPlotOptions(templatePlotProps, trackScale, minmax, curve, iPlot, curve2, iPlot2, colorTables),
    };
}
/**
 * Update Graph-Track Scale according to the first plot
 */
function updateGraphTrackScale(track) {
    const track_options = track.options;
    const templateTrack = track_options.__template;
    if (templateTrack) {
        if (templateTrack.plots.length) {
            const plotTemplate = templateTrack.plots[0];
            track.options.scale = plotTemplate.scale;
            track.options.domain = plotTemplate.domain;
            if (!track.options.label)
                track.options.label = plotTemplate.name;
        }
        if (track_options.__template.scale) {
            track.options.scale = track_options.__template.scale;
        }
        if (!track.options.scale)
            track.options.scale = "linear";
    }
    if (track.plots.length) {
        const plot = track.plots[0];
        track.options.domain = plot.options.domain;
    }
    if (!track.options.domain) {
        // could be on reguired track with missed data
        console.log("Empty track.options.domain!");
        track.options.domain =
            track.options.scale === "log" ? [1, 100] : [0, 100];
    }
    if (track.options.scale === "log" && track.options.domain) {
        if (track.options.domain[0] < 0) {
            // could not show negative data!
            console.error("wrong data range for logarithm scale " + track.options.domain);
        }
    }
    if (!track.options.scale)
        throw Error("Invalid track.options.scale!");
    track.trackScale = createScale(track.options.scale, track.options.domain);
}
/**
 * Update Stacked-Track Scale according to the first plot
 */
function updateStackedTrackScale(track) {
    const track_options = track.options;
    const templateTrack = track_options.__template;
    if (templateTrack) {
        if (templateTrack.plots.length) {
            const plotTemplate = templateTrack.plots[0];
            //track.options.scale = plotTemplate.scale;
            //track.options.domain = plotTemplate.domain;
            if (!track.options.label)
                track.options.label = plotTemplate.name;
        }
        //if (track_options.__template.scale) {
        //track.options.scale = track_options.__template.scale;
        //}
        //if (!track.options.scale) track.options.scale = "linear";
    }
    //if (track.plots.length) {
    //    const plot = track.plots[0];
    //    track.options.domain = plot.options.domain;
    //}
    //if (!track.options.domain) {
    //    // could be on reguired track with missed data
    //    console.log("Empty track.options.domain!");
    //    track.options.domain =
    //        track.options.scale === "log" ? [1, 100] : [0, 100];
    //}
    //if (!track.options.scale) throw Error("Invalid track.options.scale!");
    //track.trackScale = createScale(track.options.scale, track.options.domain);
    track.xscale;
}
function addGraphTrackPlot(wellLogView, track, templatePlot) {
    const templateTrack = getTrackTemplate(track);
    const minmaxPrimaryAxis = [
        Number.POSITIVE_INFINITY,
        Number.NEGATIVE_INFINITY,
    ];
    const axes = wellLogView.getAxesInfo();
    const plotFactory = track.options.plotFactory;
    const welllog = wellLogView.props.welllog;
    if (plotFactory && welllog) {
        const data = welllog.data;
        const curves = welllog.curves;
        const iPrimaryAxis = !axes.mnemos
            ? -1
            : indexOfElementByNames(curves, axes.mnemos[axes.primaryAxis]);
        const iCurve = indexOfElementByName(curves, templatePlot.name);
        if (iCurve < 0)
            console.log("iCurve < 0");
        const curve = curves[iCurve];
        const dimensions = curve.dimensions === undefined ? 1 : curve.dimensions;
        if (dimensions !== 1)
            console.log("curve.dimensions !== 1");
        if (curve.valueType === "string")
            console.log('curve.valueType === "string"');
        const plotData = preparePlotData(data, iCurve, iPrimaryAxis);
        checkMinMax(minmaxPrimaryAxis, plotData.minmaxPrimaryAxis);
        const minmax = [
            plotData.minmax[0],
            plotData.minmax[1],
        ];
        const plotDatas = track.options.data;
        const plots = track.plots;
        const colorTables = wellLogView.props.colorTables;
        let iCurve2 = -1;
        let curve2 = undefined;
        let plotData2 = undefined;
        if (templatePlot.type === "differential") {
            iCurve2 = templatePlot.name2
                ? indexOfElementByName(curves, templatePlot.name2)
                : -1;
            curve2 = iCurve2 >= 0 ? curves[iCurve2] : undefined;
            plotData2 = preparePlotData(data, iCurve2, iPrimaryAxis);
            if (!curve2)
                console.error("templatePlot.name2 '" + templatePlot.name2 + "' not found");
            checkMinMax(minmaxPrimaryAxis, plotData2.minmaxPrimaryAxis);
            checkMinMax(minmax, plotData2.minmax);
        }
        // Make full props
        const templatePlotProps = getTemplatePlotProps(templatePlot, 
        /*templateStyles*/ []);
        const p = getPlotConfig(iCurve, templatePlotProps, templateTrack.scale, minmax, curve, plotDatas.length, curve2, plotDatas.length + 1, colorTables);
        plotDatas.push(plotData.data);
        if (plotData2) {
            plotDatas.push(plotData2.data);
        }
        // GraphTrack
        const createPlot = plotFactory[p.type];
        if (!createPlot)
            throw Error(`No factory function for creating '${p.type}'-plot!`);
        const plot = createPlot(p, track.trackScale);
        if (plot) {
            plots.push(plot);
            templateTrack.plots.push(templatePlot);
            updateGraphTrackScale(track);
            track.prepareData();
        }
    }
    return minmaxPrimaryAxis;
}
function editGraphTrackPlot(wellLogView, track, plot, templatePlot) {
    const templateTrack = getTrackTemplate(track);
    const minmaxPrimaryAxis = [
        Number.POSITIVE_INFINITY,
        Number.NEGATIVE_INFINITY,
    ];
    const axes = wellLogView.getAxesInfo();
    const plotFactory = track.options.plotFactory;
    const welllog = wellLogView.props.welllog;
    if (plotFactory && welllog) {
        const data = welllog.data;
        const curves = welllog.curves;
        const iPrimaryAxis = !axes.mnemos
            ? -1
            : indexOfElementByNames(curves, axes.mnemos[axes.primaryAxis]);
        const iCurve = indexOfElementByName(curves, templatePlot.name);
        if (iCurve < 0)
            console.log("iCurve < 0");
        const curve = curves[iCurve];
        const dimensions = curve.dimensions === undefined ? 1 : curve.dimensions;
        if (dimensions !== 1)
            console.log("curve.dimensions !== 1");
        if (curve.valueType === "string")
            console.log('curve.valueType === "string"');
        const plotData = preparePlotData(data, iCurve, iPrimaryAxis);
        checkMinMax(minmaxPrimaryAxis, plotData.minmaxPrimaryAxis);
        const minmax = [
            plotData.minmax[0],
            plotData.minmax[1],
        ];
        const plotDatas = track.options.data;
        const plots = track.plots;
        const colorTables = wellLogView.props.colorTables;
        let iCurve2 = -1;
        let curve2 = undefined;
        let plotData2 = undefined;
        if (templatePlot.type === "differential") {
            iCurve2 = templatePlot.name2
                ? indexOfElementByName(curves, templatePlot.name2)
                : -1;
            curve2 = iCurve2 >= 0 ? curves[iCurve2] : undefined;
            if (!curve2)
                console.error("templatePlot.name2 '" + templatePlot.name2 + "' not found");
            plotData2 = preparePlotData(data, iCurve2, iPrimaryAxis);
            checkMinMax(minmaxPrimaryAxis, plotData2.minmaxPrimaryAxis);
            checkMinMax(minmax, plotData2.minmax);
        }
        // Make full props
        const templatePlotProps = getTemplatePlotProps(templatePlot, 
        /*templateStyles*/ []);
        const p = getPlotConfig(iCurve, templatePlotProps, templateTrack.scale, minmax, curve, plotDatas.length, curve2, plotDatas.length + 1, colorTables);
        plotDatas.push(plotData.data);
        if (plotData2) {
            plotDatas.push(plotData2.data);
        }
        // GraphTrack
        const createPlot = plotFactory[p.type];
        if (!createPlot)
            throw Error(`No factory function for creating '${p.type}'-plot!`);
        const iPlot = plots.indexOf(plot);
        if (iPlot < 0) {
            console.error("Error!", "Edited plot not found!");
        }
        else {
            const plotNew = createPlot(p, track.trackScale);
            if (plotNew) {
                plots[iPlot] = plotNew; // replace plot
                templateTrack.plots[iPlot] = templatePlot;
                updateGraphTrackScale(track);
                track.prepareData();
            }
        }
    }
    return minmaxPrimaryAxis;
}
export function addOrEditGraphTrackPlot(wellLogView, track, plot, templatePlot) {
    const minmaxPrimaryAxis = plot
        ? editGraphTrackPlot(wellLogView, track, plot, templatePlot)
        : addGraphTrackPlot(wellLogView, track, templatePlot);
    if (wellLogView.logController) {
        {
            const baseDomain = wellLogView.logController.scaleHandler.baseDomain();
            // update base domain to take into account new plot data range
            if (baseDomain[0] > minmaxPrimaryAxis[0])
                baseDomain[0] = minmaxPrimaryAxis[0];
            if (baseDomain[1] < minmaxPrimaryAxis[1])
                baseDomain[1] = minmaxPrimaryAxis[1];
            wellLogView.logController.rescale();
        }
        updateLegendRows(wellLogView.logController);
        wellLogView.logController.updateTracks();
    }
}
function _removeGraphTrackPlot(track, _plot) {
    const template = getTrackTemplate(track);
    const plots = track.plots;
    let index = 0;
    for (const plot of plots) {
        if (plot === _plot) {
            plots.splice(index, 1);
            template.plots.splice(index, 1);
            break;
        }
        index++;
    }
    return index;
}
export function removeGraphTrackPlot(wellLogView, track, plot) {
    _removeGraphTrackPlot(track, plot);
    updateGraphTrackScale(track);
    if (wellLogView.logController) {
        updateLegendRows(wellLogView.logController);
        wellLogView.logController.updateTracks();
    }
    track.prepareData();
}
function newDualScaleTrack(mode, title, abbr, units) {
    return new DualScaleTrack(undefined, {
        mode: mode,
        maxWidth: 50,
        width: 2,
        label: title,
        abbr: abbr ? abbr : title,
        units: units ? units : "",
        legendConfig: scaleLegendConfig,
    });
}
function newScaleTrack(title, abbr, units) {
    return new ScaleTrack(undefined, {
        maxWidth: 50,
        width: 2,
        label: title,
        abbr: abbr ? abbr : title,
        units: units ? units : "",
        legendConfig: scaleLegendConfig,
    });
}
let iStringToNum = 0;
const mapStringToNum = new Map();
export function getDiscreteColorAndName(value, colorTable, meta) {
    let color;
    let name;
    if (value == null)
        value = Number.NaN;
    if (meta) {
        // use discrete metadata from WellLog JSON file
        const { objects, iColor, iCode } = meta;
        let object = undefined;
        if (typeof value == "string") {
            // value is key
            name = value;
            object = objects[value];
        }
        else {
            // usual discrete log
            name = value.toString();
            for (const t in objects) {
                const obj = objects[t];
                if (value === obj[iCode]) {
                    // value is code
                    name = t;
                    object = obj;
                    break;
                }
            }
        }
        /*if(object)*/ {
            if (colorTable) {
                // get color from the table
                color = getInterpolatedColor(colorTable, !object
                    ? Number.NaN
                    : // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        parseFloat(object[iCode].toString()) // parseInt for discrete log
                );
            }
            else {
                // get color from the meta (obsolete?)
                color = object ? object[iColor] : [255, 25, 25];
            }
        }
    }
    else {
        name = value.toString();
        if (colorTable) {
            // get color from the table
            if (typeof value == "string") {
                let v;
                if (mapStringToNum.has(value)) {
                    v = mapStringToNum.get(value);
                }
                else {
                    mapStringToNum.set(value, iStringToNum);
                    v = iStringToNum;
                    iStringToNum++;
                }
                color = getInterpolatedColor(colorTable, v);
            }
            else {
                color = getInterpolatedColor(colorTable, parseInt(value.toString()));
            }
        }
        else {
            // get default color
            color = [224, 224, 224];
        }
    }
    return { color, name };
}
function createAreaData(from, to, value, colorTable, meta) {
    const { color, name } = getDiscreteColorAndName(value, colorTable, meta);
    return {
        from: from,
        to: to,
        name: name,
        color: {
            r: color[0],
            g: color[1],
            b: color[2],
            //, a: color[3]!==undefined? color[3]: 1.0
        },
    };
}
function createStackData(data, colorTable, meta) {
    return __awaiter(this, void 0, void 0, function* () {
        const arr = new Array();
        let prev = null;
        let area = null;
        for (const p of data) {
            let boundary = p[0];
            if (boundary === null) {
                // do the same work as at the end of data
                if (area) {
                    // store the area
                    arr.push(area);
                    area = null;
                }
                continue;
            }
            if (prev) {
                /* move area boundary to the middle of the last interval
                const d = boundary - prev[0];
                boundary = prev[0] + d * 0.5;
                */
                // move area boundary to the beginnig of the last interval
                boundary = prev[0];
                if (boundary === null)
                    continue;
            }
            // extend current area
            if (area)
                area.to = boundary; // null is already processed
            const value = p[1]; // current value
            if (prev) {
                if (value !== prev[1]) {
                    // new value encountered
                    if (area) {
                        // store the area
                        arr.push(area);
                        area = null; // wait for a new non-null value
                    }
                }
            }
            if (!area && value !== null && value !== undefined && p[0] !== null) {
                // new value is not null
                // create new interval colored and labeled for the value
                area = createAreaData(boundary, p[0], value, colorTable, meta);
            }
            prev = p;
        }
        if (area)
            // store the area
            arr.push(area);
        return arr;
    });
}
function newStackedTrack(options) {
    return new StackedTrack(undefined, options);
}
export function getDiscreteMeta(welllog, name) {
    const meta = welllog.metadata_discrete;
    if (meta) {
        // File has metadata for discrete log
        //const table=meta[name.toUpperCase()]; // search case insensitive!
        const table = elementByKeyName(meta, name);
        if (table) {
            // there is a metadata for given log name
            const attributes = table.attributes; // ["color", "code"]
            if (attributes) {
                const iCode = attributes.indexOf("code");
                const iColor = attributes.indexOf("color");
                if (iColor >= 0 && iCode >= 0)
                    // all values are OK
                    return {
                        iCode: iCode,
                        iColor: iColor,
                        objects: table.objects, // [attr1,attr2]                ,
                    };
            }
        }
    }
    return null; // something went wrong
}
import { createPlotType } from "@equinor/videx-wellog";
import { defaultPlotFactory } from "@equinor/videx-wellog";
const plotFactory = Object.assign(Object.assign({}, defaultPlotFactory), { gradientfill: createPlotType(GradientFillPlot) });
const defaultOptions = {
    plotFactory: plotFactory,
    legendConfig: graphLegendConfig,
};
export function getTrackTemplate(track) {
    const options = track.options;
    if (options.__template)
        return options.__template;
    else {
        console.error("No __template given in track!");
        const options = track.options;
        return {
            title: options.label ? options.label : "",
            scale: options.scale === "log" ? "log" : "linear",
            //domain: options.domain,
            plots: [],
        };
    }
}
export function newGraphTrack(
/* should contains
title: string,
data: [number, number][][],
plots: PlotConfig[]
*/
options) {
    return new GraphTrack(undefined, Object.assign(Object.assign({}, defaultOptions), options));
}
export function isScaleTrack(track) {
    if (track instanceof ScaleTrack)
        return true;
    if (track instanceof DualScaleTrack)
        return true;
    return false;
}
export function getScaleTrackNum(tracks) {
    let n = 0;
    for (const track of tracks) {
        if (isScaleTrack(track))
            n++;
    }
    return n;
}
function addScaleTracks(info, axes, curves, data, iPrimaryAxis) {
    const titlePrimaryAxis = axes.titles
        ? axes.titles[axes.primaryAxis]
        : axes.primaryAxis;
    const curvePrimaryAxis = curves[iPrimaryAxis];
    const iSecondaryAxis = !axes.mnemos
        ? -1
        : indexOfElementByNames(curves, axes.mnemos[axes.secondaryAxis]);
    if (iSecondaryAxis >= 0) {
        info.tracks.push(newDualScaleTrack(0, titlePrimaryAxis, curvePrimaryAxis.name, curvePrimaryAxis.unit));
        const titleSecondaryAxis = axes.titles
            ? axes.titles[axes.secondaryAxis]
            : axes.secondaryAxis;
        const curveSecondaryAxis = curves[iSecondaryAxis];
        info.tracks.push(newDualScaleTrack(1, titleSecondaryAxis, curveSecondaryAxis.name, curveSecondaryAxis.unit));
        info.primaries = new Float32Array(data.length); // 32 bits should be enough
        info.secondaries = new Float32Array(data.length);
        {
            let count = 0;
            for (const row of data) {
                const secondary = row[iSecondaryAxis];
                checkMinMaxValue(info.minmaxSecondaryAxis, secondary);
                if (secondary !== null) {
                    const primary = row[iPrimaryAxis];
                    if (primary !== null) {
                        info.secondaries[count] = secondary;
                        info.primaries[count] = primary;
                        count++;
                    }
                }
            }
            if (count < info.primaries.length) {
                // resize arrays to actual size used
                info.primaries = info.primaries.subarray(0, count);
                info.secondaries = info.secondaries.subarray(0, count);
            }
        }
    }
    else {
        info.tracks.push(newScaleTrack(titlePrimaryAxis, curvePrimaryAxis.name, curvePrimaryAxis.unit));
    }
}
function addGraphTrack(info, welllog, curves, data, iPrimaryAxis, templateTrack, templateStyles, colorTables) {
    const plotDatas = [];
    const plots = [];
    if (templateTrack.plots)
        for (const templatePlot of templateTrack.plots) {
            // see also addGraphTrackPlot(wellLogView, track, templatePlot);
            const iCurve = indexOfElementByName(curves, templatePlot.name);
            if (iCurve < 0)
                continue; // curve not found
            const curve = curves[iCurve];
            const dimensions = curve.dimensions === undefined ? 1 : curve.dimensions;
            if (dimensions !== 1)
                continue;
            if (curve.valueType === "string")
                continue;
            const plotData = preparePlotData(data, iCurve, iPrimaryAxis);
            checkMinMax(info.minmaxPrimaryAxis, plotData.minmaxPrimaryAxis);
            const minmax = [
                plotData.minmax[0],
                plotData.minmax[1],
            ];
            let iCurve2 = -1;
            let curve2 = undefined;
            let plotData2 = undefined;
            if (templatePlot.type === "differential") {
                iCurve2 = templatePlot.name2
                    ? indexOfElementByName(curves, templatePlot.name2)
                    : -1;
                curve2 = iCurve2 >= 0 ? curves[iCurve2] : undefined;
                plotData2 = preparePlotData(data, iCurve2, iPrimaryAxis);
                checkMinMax(info.minmaxPrimaryAxis, plotData2.minmaxPrimaryAxis);
                checkMinMax(minmax, plotData2.minmax);
            }
            // make full props
            const templatePlotProps = getTemplatePlotProps(templatePlot, templateStyles);
            const p = getPlotConfig(iCurve, templatePlotProps, templateTrack.scale, minmax, curve, plotDatas.length, curve2, plotDatas.length + 1, colorTables);
            plotDatas.push(plotData.data);
            if (plotData2) {
                plotDatas.push(plotData2.data);
            }
            plots.push(p);
        }
    if (plots.length || templateTrack.required) {
        const label = makeTrackHeader(welllog, templateTrack);
        const options = {
            data: plotDatas,
            plots: plots,
        };
        setGraphTrackOptionFromTemplate(options, templateTrack);
        options.label = label;
        const track = newGraphTrack(options);
        updateGraphTrackScale(track);
        info.tracks.push(track);
    }
}
function addStackedTrack(info, welllog, curves, data, iPrimaryAxis, templateTrack, templateStyles, colorTables) {
    const templatePlot = templateTrack.plots[0];
    const name = templatePlot.name;
    const iCurve = indexOfElementByName(curves, name);
    if (iCurve < 0)
        return; // curve not found
    const curve = curves[iCurve];
    const dimensions = curve.dimensions === undefined ? 1 : curve.dimensions;
    if (dimensions !== 1)
        return;
    const plotData = preparePlotData(data, iCurve, iPrimaryAxis);
    checkMinMax(info.minmaxPrimaryAxis, plotData.minmaxPrimaryAxis);
    // make full props
    const templatePlotProps = getTemplatePlotProps(templatePlot, templateStyles);
    const templateTrackFullPlot = deepCopy(templateTrack);
    const label = makeTrackHeader(welllog, templateTrack);
    templateTrackFullPlot.title = label;
    templateTrackFullPlot.plots[0].type = templatePlotProps.type;
    // curve.valueType === "integer", "string"
    const logColor = templatePlotProps.colorTable;
    let colorTable = undefined;
    if (logColor) {
        if (colorTables) {
            colorTable = colorTables.find((colorTable) => colorTable.name == logColor);
            if (!colorTable)
                console.error("Missed '" + logColor + "' color table");
        }
        else {
            console.error("No color tables file given for '" + logColor + "' color table");
        }
    }
    else {
        console.error("No color table given in template plot props");
    }
    const meta = getDiscreteMeta(welllog, name);
    if (!meta && curve.valueType == "integer")
        console.log("Discrete meta information for '" +
            name +
            "' not found. Use default");
    const showLines = true;
    const options = {
        abbr: name,
        legendConfig: stackLegendConfig,
        data: createStackData.bind(null, plotData.data, colorTable, meta),
        showLabels: true,
        showLines: showLines,
    };
    setStackedTrackOptionFromTemplate(options, templateTrackFullPlot);
    const track = newStackedTrack(options);
    updateStackedTrackScale(track);
    info.tracks.push(track);
}
function isStackedTemplateTrack(templateTrack, templateStyles) {
    if (!templateTrack.plots)
        return false;
    const templatePlot = templateTrack.plots[0];
    if (!templatePlot)
        return false;
    const templatePlotProps = getTemplatePlotProps(templatePlot, templateStyles);
    return templatePlotProps.type === "stacked";
}
export function createTracks(welllog, axes, templateTracks, // Part of JSON
templateStyles, // Part of JSON
colorTables // JSON
) {
    const info = new TracksInfo();
    if (welllog) {
        const data = welllog.data;
        const curves = welllog.curves;
        const iPrimaryAxis = !axes.mnemos
            ? -1
            : indexOfElementByNames(curves, axes.mnemos[axes.primaryAxis]);
        if (iPrimaryAxis >= 0)
            // scale tracks are needed
            addScaleTracks(info, axes, curves, data, iPrimaryAxis);
        if (templateTracks) {
            for (const templateTrack of templateTracks) {
                if (isStackedTemplateTrack(templateTrack, templateStyles)) {
                    addStackedTrack(info, welllog, curves, data, iPrimaryAxis, templateTrack, templateStyles, colorTables);
                }
                else {
                    addGraphTrack(info, welllog, curves, data, iPrimaryAxis, templateTrack, templateStyles, colorTables);
                }
            }
        }
    }
    return info;
}
function addTrack(wellLogView, trackNew, trackCurrent, bAfter) {
    if (wellLogView.logController) {
        let order = 0;
        for (const track of wellLogView.logController.tracks) {
            track.order = order++;
            if (trackCurrent == track) {
                if (bAfter) {
                    // add after
                    trackNew.order = order++;
                }
                else {
                    // insert before current
                    trackNew.order = track.order;
                    track.order = order++;
                }
            }
        }
        wellLogView.logController.addTrack(trackNew);
    }
}
function setGraphTrackOptionFromTemplate(options, templateTrack) {
    options.label = templateTrack.title;
    {
        if (templateTrack.scale)
            options.scale = templateTrack.scale;
        else
            delete options.scale;
    }
    //if (force || templateTrack.domain) options.domain = templateTrack.domain;
    options.__template = JSON.parse(JSON.stringify(templateTrack));
}
function setStackedTrackOptionFromTemplate(options, templateTrack) {
    options.label = templateTrack.title;
    options.__template = deepCopy(templateTrack);
}
export function addOrEditGraphTrack(wellLogView, track, templateTrack, trackCurrent, bAfter) {
    if (track) {
        // edit existing track
        setGraphTrackOptionFromTemplate(track.options, templateTrack);
        updateGraphTrackScale(track);
    }
    else {
        const options = {
            plots: [],
            data: [],
        };
        setGraphTrackOptionFromTemplate(options, templateTrack);
        track = newGraphTrack(options);
        addTrack(wellLogView, track, trackCurrent, bAfter);
    }
    if (wellLogView.logController)
        wellLogView.logController.updateTracks();
    return track;
}
export function addOrEditStackedTrack(wellLogView, track, templateTrack, trackCurrent, bAfter) {
    const welllog = wellLogView.props.welllog;
    const templatePlot = templateTrack.plots[0];
    if (!welllog || !templatePlot)
        return null;
    const name = templatePlot.name;
    const colorTable = wellLogView.props.colorTables[0];
    const meta = getDiscreteMeta(welllog, name);
    const data = welllog.data;
    const curves = welllog.curves;
    const iCurve = indexOfElementByName(curves, templatePlot.name);
    const axes = wellLogView.getAxesInfo();
    const iPrimaryAxis = indexOfElementByNames(curves, axes.mnemos[axes.primaryAxis]);
    const plotData = preparePlotData(data, iCurve, iPrimaryAxis);
    if (track) {
        // edit existing track
        track.options.abbr = name; // name of the only plot
        track.options.data = createStackData.bind(null, plotData.data, colorTable, meta);
        track.data = track.options.data;
        setStackedTrackOptionFromTemplate(track.options, templateTrack);
        updateStackedTrackScale(track);
        if (wellLogView.logController)
            wellLogView.logController.refresh();
    }
    else {
        const showLines = true;
        const options = {
            abbr: name,
            data: createStackData.bind(null, plotData.data, colorTable, meta),
            legendConfig: stackLegendConfig,
            showLabels: true,
            showLines: showLines,
        };
        setStackedTrackOptionFromTemplate(options, templateTrack);
        track = newStackedTrack(options);
        addTrack(wellLogView, track, trackCurrent, bAfter);
    }
    if (wellLogView.logController)
        wellLogView.logController.updateTracks();
    return track;
}
export function hasDifferentialPlot(track) {
    for (const plot of track.plots) {
        const type = getPlotType(plot);
        if (type === "differential")
            return true;
    }
    return false;
}
//# sourceMappingURL=tracks.js.map