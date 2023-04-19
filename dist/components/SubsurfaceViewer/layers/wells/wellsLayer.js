import { CompositeLayer, OrbitViewport, } from "@deck.gl/core/typed";
import { isDrawingEnabled } from "../utils/layerTools";
import { PathLayer, TextLayer } from "@deck.gl/layers/typed";
import { PathStyleExtension } from "@deck.gl/extensions/typed";
import { subtract, distance, dot } from "mathjs";
import { rgbValues, getColors, } from "@emerson-eps/color-tables/";
import { createPropertyData, } from "../utils/layerTools";
import { splineRefine, invertPath, GetBoundingBox } from "./utils/spline";
import { interpolateNumberArray } from "d3";
import { getLayersById } from "../../layers/utils/layerTools";
import UnfoldedGeoJsonLayer from "../intersection/unfoldedGeoJsonLayer";
import GL from "@luma.gl/constants";
function onDataLoad(data, context) {
    const bbox = GetBoundingBox(data);
    if (typeof context.layer.props.setReportedBoundingBox !== "undefined") {
        context.layer.props.setReportedBoundingBox(bbox);
    }
}
const defaultProps = {
    "@@type": "WellsLayer",
    name: "Wells",
    id: "wells-layer",
    autoHighlight: true,
    opacity: 1,
    lineWidthScale: 1,
    pointRadiusScale: 1,
    lineStyle: { dash: false },
    outline: true,
    logRadius: 10,
    logCurves: true,
    refine: false,
    visible: true,
    wellNameVisible: false,
    wellNameAtTop: false,
    wellNameSize: 14,
    wellNameColor: [0, 0, 0, 255],
    selectedWell: "@@#editedData.selectedWells",
    depthTest: true,
    ZIncreasingDownwards: true,
};
function multiply(pair, factor) {
    return [pair[0] * factor, pair[1] * factor];
}
const LINE = "line";
const POINT = "point";
const DEFAULT_POINT_SIZE = 8;
const DEFAULT_LINE_WIDTH = 5;
const DEFAULT_DASH = [5, 5];
function getDashFactor(accessor, width_accessor, offset = 0) {
    return (object, objectInfo) => {
        let width = DEFAULT_LINE_WIDTH;
        if (typeof width_accessor == "function") {
            width = width_accessor(object);
        }
        else if (width_accessor) {
            width = width_accessor;
        }
        const factor = width / (width + offset);
        let dash = [0, 0];
        if (typeof accessor == "function") {
            dash = accessor(object, objectInfo);
        }
        else if (accessor)
            dash = accessor;
        else if (accessor)
            dash = DEFAULT_DASH;
        if (dash.length == 2) {
            return multiply(dash, factor);
        }
        else {
            return multiply(DEFAULT_DASH, factor);
        }
    };
}
function getColor(accessor) {
    if (accessor) {
        return accessor;
    }
    return (object, objectInfo) => {
        var _a;
        if (typeof accessor === "function") {
            const color = accessor(object, objectInfo);
            if (color) {
                return color;
            }
        }
        return (_a = object.properties) === null || _a === void 0 ? void 0 : _a["color"];
    };
}
export function getSize(type, accessor, offset = 0) {
    if (typeof accessor == "function") {
        return (object) => {
            return (accessor(object) + offset);
        };
    }
    if (accessor == 0)
        return 0;
    if (accessor > 0)
        return accessor + offset;
    if (type == LINE)
        return DEFAULT_LINE_WIDTH + offset;
    if (type == POINT)
        return DEFAULT_POINT_SIZE + offset;
    return 0;
}
export default class WellsLayer extends CompositeLayer {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    onClick(info) {
        var _a;
        // Make selection only when drawing is disabled
        if (isDrawingEnabled(this.context.layerManager)) {
            return false;
        }
        else {
            this.context.userData.setEditedData({
                selectedWell: (_a = info.object.properties) === null || _a === void 0 ? void 0 : _a["name"],
            });
            return false; // do not return true to allow DeckGL props.onClick to be called
        }
    }
    setSelection(well, _selection) {
        if (this.internalState) {
            this.setState({
                well: well,
                selection: _selection,
            });
        }
    }
    setMultiSelection(wells) {
        if (this.internalState) {
            this.setState({
                selectedMultiWells: wells,
            });
        }
    }
    shouldUpdateState({ changeFlags }) {
        return (changeFlags.viewportChanged ||
            changeFlags.propsOrDataChanged ||
            typeof changeFlags.updateTriggersChanged === "object");
    }
    getLegendData(value) {
        return getLegendData(value, "", this.props.logName, this.props.logColor);
    }
    setLegend(value) {
        this.setState({
            legend: this.getLegendData(value),
        });
    }
    getLogLayer() {
        var _a, _b;
        const sub_layers = (_a = this.internalState) === null || _a === void 0 ? void 0 : _a.subLayers;
        const log_layer = getLayersById(sub_layers, "wells-layer-log_curve");
        return (_b = log_layer) === null || _b === void 0 ? void 0 : _b[0];
    }
    getSelectionLayer() {
        var _a, _b;
        const sub_layers = (_a = this.internalState) === null || _a === void 0 ? void 0 : _a.subLayers;
        const log_layer = getLayersById(sub_layers, "wells-layer-selection");
        return (_b = log_layer) === null || _b === void 0 ? void 0 : _b[0];
    }
    getLogCurveData() {
        const log_layer = this.getLogLayer();
        return log_layer === null || log_layer === void 0 ? void 0 : log_layer.props.data;
    }
    setupLegend() {
        const data = this.getLogCurveData();
        if (data)
            this.setLegend(data);
    }
    renderLayers() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        if (!this.props.data.features) {
            return [];
        }
        let data = this.props.data;
        if (!this.props.ZIncreasingDownwards) {
            data = invertPath(data);
        }
        const refine = this.props.refine;
        data = refine
            ? splineRefine(data) // smooth well paths.
            : data;
        const is3d = this.context.viewport.constructor === OrbitViewport;
        const positionFormat = "XYZ";
        const isDashed = !!((_a = this.props.lineStyle) === null || _a === void 0 ? void 0 : _a.dash);
        const extensions = [
            new PathStyleExtension({
                dash: isDashed,
                highPrecisionDash: isDashed,
            }),
        ];
        const parameters = {
            [GL.DEPTH_TEST]: this.props.depthTest,
            [GL.POLYGON_OFFSET_FILL]: true,
        };
        const outline = new UnfoldedGeoJsonLayer(this.getSubLayerProps({
            id: "outline",
            data,
            pickable: false,
            stroked: false,
            positionFormat,
            pointRadiusUnits: "pixels",
            lineWidthUnits: "pixels",
            visible: this.props.outline,
            pointRadiusScale: this.props.pointRadiusScale,
            lineWidthScale: this.props.lineWidthScale,
            getLineWidth: getSize(LINE, (_b = this.props.lineStyle) === null || _b === void 0 ? void 0 : _b.width),
            getPointRadius: getSize(POINT, (_c = this.props.wellHeadStyle) === null || _c === void 0 ? void 0 : _c.size),
            extensions: extensions,
            getDashArray: getDashFactor((_d = this.props.lineStyle) === null || _d === void 0 ? void 0 : _d.dash),
            lineBillboard: true,
            pointBillboard: true,
            parameters,
        }));
        const colors = new UnfoldedGeoJsonLayer(this.getSubLayerProps({
            id: "colors",
            data,
            pickable: true,
            stroked: false,
            positionFormat,
            pointRadiusUnits: "pixels",
            lineWidthUnits: "pixels",
            pointRadiusScale: this.props.pointRadiusScale,
            lineWidthScale: this.props.lineWidthScale,
            getLineWidth: getSize(LINE, (_e = this.props.lineStyle) === null || _e === void 0 ? void 0 : _e.width, -1),
            getPointRadius: getSize(POINT, (_f = this.props.wellHeadStyle) === null || _f === void 0 ? void 0 : _f.size, -1),
            getFillColor: getColor((_g = this.props.wellHeadStyle) === null || _g === void 0 ? void 0 : _g.color),
            getLineColor: getColor((_h = this.props.lineStyle) === null || _h === void 0 ? void 0 : _h.color),
            extensions: extensions,
            getDashArray: getDashFactor((_j = this.props.lineStyle) === null || _j === void 0 ? void 0 : _j.dash, getSize(LINE, (_k = this.props.lineStyle) === null || _k === void 0 ? void 0 : _k.width), -1),
            lineBillboard: true,
            pointBillboard: true,
            parameters,
        }));
        // Highlight the selected well.
        const highlight = new UnfoldedGeoJsonLayer(this.getSubLayerProps({
            id: "highlight",
            data: getWellObjectByName(data.features, this.props.selectedWell),
            pickable: false,
            stroked: false,
            positionFormat,
            pointRadiusUnits: "pixels",
            lineWidthUnits: "pixels",
            pointRadiusScale: this.props.pointRadiusScale,
            lineWidthScale: this.props.lineWidthScale,
            getLineWidth: getSize(LINE, (_l = this.props.lineStyle) === null || _l === void 0 ? void 0 : _l.width, 2),
            getPointRadius: getSize(POINT, (_m = this.props.wellHeadStyle) === null || _m === void 0 ? void 0 : _m.size, 2),
            getFillColor: getColor((_o = this.props.wellHeadStyle) === null || _o === void 0 ? void 0 : _o.color),
            getLineColor: getColor((_p = this.props.lineStyle) === null || _p === void 0 ? void 0 : _p.color),
            parameters,
        }));
        // Highlight the multi selected wells.
        const highlightMultiWells = new UnfoldedGeoJsonLayer(this.getSubLayerProps({
            id: "highlight2",
            data: getWellObjectsByName(data.features, this.state["selectedMultiWells"]),
            pickable: false,
            stroked: false,
            positionFormat,
            pointRadiusUnits: "pixels",
            lineWidthUnits: "pixels",
            pointRadiusScale: this.props.pointRadiusScale,
            lineWidthScale: this.props.lineWidthScale,
            getLineWidth: getSize(LINE, (_q = this.props.lineStyle) === null || _q === void 0 ? void 0 : _q.width, -1),
            getPointRadius: getSize(POINT, (_r = this.props.wellHeadStyle) === null || _r === void 0 ? void 0 : _r.size, 2),
            getFillColor: [255, 140, 0],
            getLineColor: [255, 140, 0],
            parameters,
        }));
        const log_layer = new PathLayer(this.getSubLayerProps({
            id: "log_curve",
            data: this.props.logData,
            positionFormat,
            pickable: true,
            widthScale: 10,
            widthMinPixels: 1,
            miterLimit: 100,
            visible: this.props.logCurves,
            getPath: (d) => {
                var _a;
                return getLogPath(data.features, d, this.props.logrunName, (_a = this.props.lineStyle) === null || _a === void 0 ? void 0 : _a.color);
            },
            getColor: (d) => getLogColor(d, this.props.logrunName, this.props.logName, this.props.logColor, this.context.userData
                .colorTables, this.props.colorMappingFunction, this.props.isLog),
            getWidth: (d) => this.props.logRadius ||
                getLogWidth(d, this.props.logrunName, this.props.logName),
            updateTriggers: {
                getColor: [
                    this.props.logrunName,
                    this.props.logName,
                    this.props.logColor,
                    this.context.userData
                        .colorTables,
                    this.props.isLog,
                ],
                getWidth: [
                    this.props.logrunName,
                    this.props.logName,
                    this.props.logRadius,
                ],
                getPath: [positionFormat],
            },
            onDataLoad: (value) => {
                this.setLegend(value);
            },
            parameters,
        }));
        const selection_layer = new PathLayer(this.getSubLayerProps({
            id: "selection",
            data: this.props.logData,
            positionFormat,
            pickable: false,
            widthScale: 10,
            widthMinPixels: 1,
            miterLimit: 100,
            visible: this.props.logCurves,
            getPath: (d) => {
                var _a;
                return getLogPath1(data.features, d, this.state["well"], this.state["selection"], this.props.logrunName, (_a = this.props.lineStyle) === null || _a === void 0 ? void 0 : _a.color);
            },
            getColor: (d) => getLogColor1(data.features, d, this.state["well"], this.state["selection"], this.props.logrunName),
            getWidth: (d) => this.props.logRadius * 1.5 ||
                getLogWidth(d, this.props.logrunName, this.props.logName),
            updateTriggers: {
                getColor: [
                    this.props.logrunName,
                    this.state["well"],
                    this.state["selection"],
                ],
                getWidth: [
                    this.props.logrunName,
                    this.props.logName,
                    this.props.logRadius,
                ],
                getPath: [
                    positionFormat,
                    this.props.logrunName,
                    this.state["well"],
                    this.state["selection"],
                ],
            },
            onDataLoad: (value) => {
                this.setLegend(value);
            },
            parameters,
        }));
        // well name
        const names = new TextLayer(this.getSubLayerProps({
            id: "names",
            data: data.features,
            visible: this.props.wellNameVisible,
            getPosition: (d) => {
                var _a;
                return getAnnotationPosition(d, this.props.wellNameAtTop, is3d, (_a = this.props.lineStyle) === null || _a === void 0 ? void 0 : _a.color);
            },
            getText: (d) => { var _a; return (_a = d.properties) === null || _a === void 0 ? void 0 : _a["name"]; },
            getColor: this.props.wellNameColor,
            getAnchor: "start",
            getAlignmentBaseline: "bottom",
            getSize: this.props.wellNameSize,
            parameters,
        }));
        return [
            outline,
            log_layer,
            colors,
            highlight,
            highlightMultiWells,
            selection_layer,
            names,
        ];
    }
    getPickingInfo({ info }) {
        var _a, _b;
        if (!info.object)
            return Object.assign(Object.assign({}, info), { properties: [], logName: "" });
        const coordinate = (info.coordinate || [0, 0, 0]);
        let md_property = getMdProperty(coordinate, info.object, (_a = this.props.lineStyle) === null || _a === void 0 ? void 0 : _a.color, info.featureType);
        if (!md_property) {
            md_property = getLogProperty(coordinate, this.props.data.features, info.object, this.props.logrunName, "MD");
        }
        let tvd_property = getTvdProperty(coordinate, info.object, (_b = this.props.lineStyle) === null || _b === void 0 ? void 0 : _b.color, info.featureType);
        if (!tvd_property) {
            tvd_property = getLogProperty(coordinate, this.props.data.features, info.object, this.props.logrunName, "TVD");
        }
        const log_property = getLogProperty(coordinate, this.props.data.features, info.object, this.props.logrunName, this.props.logName);
        // Patch for inverting tvd readout to fix issue #830,
        // should make proper fix when handling z increase direction - issue #842
        const inverted_tvd_property = tvd_property && Object.assign(Object.assign({}, tvd_property), { value: (tvd_property === null || tvd_property === void 0 ? void 0 : tvd_property.value) * -1 });
        const layer_properties = [];
        if (md_property)
            layer_properties.push(md_property);
        if (inverted_tvd_property)
            layer_properties.push(inverted_tvd_property);
        if (log_property)
            layer_properties.push(log_property);
        return Object.assign(Object.assign({}, info), { properties: layer_properties, logName: (log_property === null || log_property === void 0 ? void 0 : log_property.name) || "" });
    }
}
WellsLayer.layerName = "WellsLayer";
WellsLayer.defaultProps = Object.assign(Object.assign({}, defaultProps), { onDataLoad: (data, context) => onDataLoad(data, context) });
//================= Local help functions. ==================
function getColumn(data, col) {
    // @rmt: Missing type
    const column = [];
    for (let i = 0; i < data.length; i++) {
        column.push(data[i][col]);
    }
    return column;
}
function getLogMd(d, logrun_name) {
    if (!isSelectedLogRun(d, logrun_name))
        return [];
    const names_md = ["DEPTH", "DEPT", "MD", "TDEP", "MD_RKB"]; // aliases for MD
    const log_id = getLogIndexByNames(d, names_md);
    return log_id >= 0 ? getColumn(d.data, log_id) : [];
}
export function getLogValues(d, logrun_name, log_name) {
    if (!isSelectedLogRun(d, logrun_name))
        return [];
    const log_id = getLogIndexByName(d, log_name);
    return log_id >= 0 ? getColumn(d.data, log_id) : [];
}
export function getLogInfo(d, logrun_name, log_name) {
    if (!isSelectedLogRun(d, logrun_name))
        return undefined;
    const log_id = getLogIndexByName(d, log_name);
    return d.curves[log_id];
}
function getDiscreteLogMetadata(d, log_name) {
    return d === null || d === void 0 ? void 0 : d.metadata_discrete[log_name];
}
function isSelectedLogRun(d, logrun_name) {
    return d.header.name.toLowerCase() === logrun_name.toLowerCase();
}
// return position for well name and icon
function getAnnotationPosition(well_data, name_at_top, view_is_3d, color_accessor) {
    if (name_at_top) {
        let top;
        // Read top position from Point geometry, if not present, read it from LineString geometry
        const well_head = getWellHeadPosition(well_data);
        if (well_data)
            top = well_head;
        else {
            const trajectory = getTrajectory(well_data, color_accessor);
            top = trajectory === null || trajectory === void 0 ? void 0 : trajectory.at(0);
        }
        // using z=0 for orthographic view to keep label above other other layers
        if (top)
            return view_is_3d ? top : [top[0], top[1], 0];
    }
    else {
        let bot;
        // if trajectory is not present, return top position from Point geometry
        const trajectory = getTrajectory(well_data, color_accessor);
        if (trajectory)
            bot = trajectory === null || trajectory === void 0 ? void 0 : trajectory.at(-1);
        else
            bot = getWellHeadPosition(well_data);
        // using z=0 for orthographic view to keep label above other other layers
        if (bot)
            return view_is_3d ? bot : [bot[0], bot[1], 0];
    }
    return null;
}
function getWellObjectByName(wells_data, name) {
    return wells_data === null || wells_data === void 0 ? void 0 : wells_data.find((item) => { var _a, _b; return ((_b = (_a = item.properties) === null || _a === void 0 ? void 0 : _a["name"]) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === (name === null || name === void 0 ? void 0 : name.toLowerCase()); });
}
function getWellObjectsByName(wells_data, name) {
    const res = [];
    for (let i = 0; i < (name === null || name === void 0 ? void 0 : name.length); i++) {
        wells_data === null || wells_data === void 0 ? void 0 : wells_data.find((item) => {
            var _a, _b, _c;
            if (((_b = (_a = item.properties) === null || _a === void 0 ? void 0 : _a["name"]) === null || _b === void 0 ? void 0 : _b.toLowerCase()) ===
                ((_c = name[i]) === null || _c === void 0 ? void 0 : _c.toLowerCase())) {
                res.push(item);
            }
        });
    }
    return res;
}
function getPointGeometry(well_object) {
    var _a;
    return (_a = well_object.geometry) === null || _a === void 0 ? void 0 : _a.geometries.find((item) => item.type == "Point");
}
function getLineStringGeometry(well_object) {
    var _a;
    return (_a = well_object.geometry) === null || _a === void 0 ? void 0 : _a.geometries.find((item) => item.type == "LineString");
}
// Return well head position from Point Geometry
function getWellHeadPosition(well_object) {
    var _a;
    return (_a = getPointGeometry(well_object)) === null || _a === void 0 ? void 0 : _a.coordinates;
}
// return trajectory visibility based on alpha of trajectory color
function isTrajectoryVisible(well_object, color_accessor) {
    var _a, _b;
    let alpha;
    const accessor = getColor(color_accessor);
    if (typeof accessor === "function") {
        alpha = (_a = accessor(well_object)) === null || _a === void 0 ? void 0 : _a[3];
    }
    else {
        alpha = (_b = accessor) === null || _b === void 0 ? void 0 : _b[3];
    }
    return alpha !== 0;
}
// Return Trajectory data from LineString Geometry if it's visible (checking trajectory visiblity based on line color)
function getTrajectory(well_object, color_accessor) {
    var _a;
    if (isTrajectoryVisible(well_object, color_accessor))
        return (_a = getLineStringGeometry(well_object)) === null || _a === void 0 ? void 0 : _a.coordinates;
    else
        return undefined;
}
function getWellMds(well_object) {
    var _a;
    return (_a = well_object.properties) === null || _a === void 0 ? void 0 : _a["md"][0];
}
function getNeighboringMdIndices(mds, md) {
    const idx = mds.findIndex((x) => x >= md);
    return idx === 0 ? [idx, idx + 1] : [idx - 1, idx];
}
function getPositionByMD(well_xyz, well_mds, md) {
    const [l_idx, h_idx] = getNeighboringMdIndices(well_mds, md);
    const md_low = well_mds[l_idx];
    const md_normalized = (md - md_low) / (well_mds[h_idx] - md_low);
    return interpolateNumberArray(well_xyz[l_idx], well_xyz[h_idx])(md_normalized);
}
function getLogPath(wells_data, d, logrun_name, trajectory_line_color) {
    const well_object = getWellObjectByName(wells_data, d.header.well);
    if (!well_object)
        return [];
    const well_xyz = getTrajectory(well_object, trajectory_line_color);
    const well_mds = getWellMds(well_object);
    if (well_xyz == undefined ||
        well_mds == undefined ||
        well_xyz.length == 0 ||
        well_mds.length == 0)
        return [];
    const log_xyz = [];
    const log_mds = getLogMd(d, logrun_name);
    log_mds.forEach((md) => {
        const xyz = getPositionByMD(well_xyz, well_mds, md);
        log_xyz.push(xyz);
    });
    return log_xyz;
}
function getLogIndexByName(d, log_name) {
    const name = log_name.toLowerCase();
    return d.curves.findIndex((item) => item.name.toLowerCase() === name);
}
function getLogIndexByNames(d, names) {
    for (const name of names) {
        const index = getLogIndexByName(d, name);
        if (index >= 0)
            return index;
    }
    return -1;
}
function getLogColor(d, logrun_name, log_name, logColor, colorTables, 
// eslint-disable-next-line
colorMappingFunction, isLog) {
    var _a;
    const log_data = getLogValues(d, logrun_name, log_name);
    const log_info = getLogInfo(d, logrun_name, log_name);
    if (log_data.length == 0 || log_info == undefined)
        return [];
    const log_color = [];
    if (log_info.description == "continuous") {
        const min = Math.min(...log_data);
        const max = Math.max(...log_data);
        const max_delta = max - min;
        log_data.forEach((value) => {
            const rgb = colorMappingFunction
                ? colorMappingFunction((value - min) / max_delta)
                : rgbValues((value - min) / max_delta, logColor, colorTables);
            rgbValues(value - min / max_delta, logColor, colorTables, isLog);
            if (rgb) {
                if (Array.isArray(rgb)) {
                    log_color.push([rgb[0], rgb[1], rgb[2]]);
                }
                else {
                    log_color.push([rgb === null || rgb === void 0 ? void 0 : rgb.r, rgb === null || rgb === void 0 ? void 0 : rgb.g, rgb === null || rgb === void 0 ? void 0 : rgb.b]);
                }
            }
            else {
                log_color.push([0, 0, 0, 0]); // push transparent for null/undefined log values
            }
        });
    }
    else {
        // well log data set for ex : H1: Array(2)0: (4) [255, 26, 202, 255] 1: 13
        const log_attributes = (_a = getDiscreteLogMetadata(d, log_name)) === null || _a === void 0 ? void 0 : _a.objects;
        const logLength = Object.keys(log_attributes).length;
        // eslint-disable-next-line
        const attributesObject = {};
        const categorial = true;
        Object.keys(log_attributes).forEach((key) => {
            // get the point from log_attributes
            const point = log_attributes[key][1];
            const categorialMin = 0;
            const categorialMax = logLength - 1;
            let rgb;
            if (colorMappingFunction) {
                rgb = colorMappingFunction(point, categorial, categorialMin, categorialMax);
            }
            else {
                // if colormap function is not defined
                const arrayOfColors = getColors(logColor, colorTables, point);
                if (!arrayOfColors.length)
                    console.error("Empty or missed '" + logColor + "' color table");
                rgb = arrayOfColors;
            }
            if (rgb) {
                if (Array.isArray(rgb)) {
                    if (rgb.length === 3) {
                        attributesObject[key] = [
                            [rgb[0], rgb[1], rgb[2]],
                            point,
                        ];
                    }
                    else {
                        attributesObject[key] = [
                            [rgb[1], rgb[2], rgb[3]],
                            point,
                        ];
                    }
                }
                else {
                    attributesObject[key] = [[rgb.r, rgb.g, rgb.b], point];
                }
            }
        });
        log_data.forEach((log_value) => {
            var _a;
            const dl_attrs = (_a = Object.entries(attributesObject).find(([, value]) => value[1] == log_value)) === null || _a === void 0 ? void 0 : _a[1];
            dl_attrs
                ? log_color.push(dl_attrs[0])
                : log_color.push([0, 0, 0, 0]); // use transparent for undefined/null log values
        });
    }
    return log_color;
}
function getLogPath1(wells_data, d, selectedWell, selection, logrun_name, trajectory_line_color) {
    if (!selection || selectedWell !== d.header.well)
        return [];
    const well_object = getWellObjectByName(wells_data, d.header.well);
    if (!well_object)
        return [];
    const well_xyz = getTrajectory(well_object, trajectory_line_color);
    const well_mds = getWellMds(well_object);
    if (well_xyz == undefined ||
        well_mds == undefined ||
        well_xyz.length == 0 ||
        well_mds.length == 0)
        return [];
    const log_mds = getLogMd(d, logrun_name);
    if (!log_mds)
        return [];
    const log_xyz = [];
    let md0 = selection[0];
    if (md0 !== undefined) {
        let md1 = selection[1];
        if (md1 == md0)
            md1 = undefined;
        const mdFirst = well_mds[0];
        const mdLast = well_mds[well_mds.length - 1];
        if (md1 !== undefined) {
            if (md0 > md1) {
                const tmp = md0;
                md0 = md1;
                md1 = tmp;
            }
        }
        const delta = 2;
        if (md0 - delta > mdFirst) {
            let xyz = getPositionByMD(well_xyz, well_mds, md0 - delta);
            log_xyz.push(xyz);
            xyz = getPositionByMD(well_xyz, well_mds, md0);
            log_xyz.push(xyz);
        }
        if (md1 !== undefined) {
            const _md1 = md1;
            let index = 0;
            well_mds.forEach((md) => {
                if (md0 <= md && md <= _md1) {
                    const xyz = well_xyz[index];
                    log_xyz.push(xyz);
                }
                index++;
            });
            if (_md1 + delta < mdLast) {
                let xyz = getPositionByMD(well_xyz, well_mds, _md1);
                log_xyz.push(xyz);
                xyz = getPositionByMD(well_xyz, well_mds, _md1 + delta);
                log_xyz.push(xyz);
            }
        }
    }
    return log_xyz;
}
function getLogColor1(wells_data, d, selectedWell, selection, logrun_name) {
    if (!selection || selectedWell !== d.header.well)
        return [];
    const well_object = getWellObjectByName(wells_data, d.header.well);
    if (!well_object)
        return [];
    const well_mds = getWellMds(well_object);
    const log_mds = getLogMd(d, logrun_name);
    if (!log_mds || log_mds.length === 0)
        return [];
    const log_color = [];
    let md0 = selection[0];
    if (md0 !== undefined) {
        const mdFirst = well_mds[0];
        const mdLast = well_mds[well_mds.length - 1];
        let md1 = selection[1];
        if (md1 == md0)
            md1 = undefined;
        let swap = false;
        if (md1 !== undefined) {
            if (md0 > md1) {
                const tmp = md0;
                md0 = md1;
                md1 = tmp;
                swap = true;
            }
        }
        const delta = 2;
        if (md0 - delta > mdFirst)
            log_color.push(swap ? [0, 255, 0, 128] : [255, 0, 0, 128]);
        if (md1 !== undefined) {
            const _md1 = md1;
            log_color.push([128, 128, 128, 128]);
            well_mds.forEach((md) => {
                if (md0 <= md && md <= _md1) {
                    log_color.push([128, 128, 128, 128]);
                }
            });
            if (_md1 + delta < mdLast)
                log_color.push(swap ? [255, 0, 0, 128] : [0, 255, 0, 128]);
        }
    }
    return log_color;
}
function getLogWidth(d, logrun_name, log_name) {
    return getLogValues(d, logrun_name, log_name);
}
function squared_distance(a, b) {
    const dx = a[0] - b[0];
    const dy = a[1] - b[1];
    return dx * dx + dy * dy;
}
// Return distance between line segment vw and point p
function distToSegmentSquared(v, w, p) {
    const l2 = squared_distance(v, w);
    if (l2 == 0)
        return squared_distance(p, v);
    let t = ((p[0] - v[0]) * (w[0] - v[0]) + (p[1] - v[1]) * (w[1] - v[1])) / l2;
    t = Math.max(0, Math.min(1, t));
    return squared_distance(p, [
        v[0] + t * (w[0] - v[0]),
        v[1] + t * (w[1] - v[1]),
    ]);
}
// Interpolates point closest to the coords on trajectory
function interpolateDataOnTrajectory(coord, data, trajectory) {
    // if number of data points in less than 1 or
    // length of data and trajectory are different we cannot interpolate.
    if (data.length <= 1 || data.length != trajectory.length)
        return -1;
    // Identify closest well path leg to coord.
    const segment_index = getSegmentIndex(coord, trajectory);
    const index0 = segment_index;
    const index1 = index0 + 1;
    // Get the nearest data.
    const data0 = data[index0];
    const data1 = data[index1];
    // Get the nearest survey points.
    const survey0 = trajectory[index0];
    const survey1 = trajectory[index1];
    const dv = distance(survey0, survey1);
    if (dv === 0) {
        return -1;
    }
    // Calculate the scalar projection onto segment.
    const v0 = subtract(coord, survey0);
    const v1 = subtract(survey1, survey0);
    // scalar_projection in interval [0,1]
    const scalar_projection = dot(v0, v1) / (dv * dv);
    // Interpolate data.
    return data0 * (1.0 - scalar_projection) + data1 * scalar_projection;
}
function getMd(coord, feature, accessor) {
    var _a, _b;
    if (!((_b = (_a = feature.properties) === null || _a === void 0 ? void 0 : _a["md"]) === null || _b === void 0 ? void 0 : _b[0]) || !feature.geometry)
        return null;
    const measured_depths = feature.properties["md"][0];
    const trajectory3D = getTrajectory(feature, accessor);
    if (trajectory3D == undefined)
        return null;
    let trajectory;
    // In 2D view coord is of type Position2D and in 3D view it's Position3D,
    // so use apropriate trajectory for interpolation
    if (coord.length == 2) {
        const trajectory2D = trajectory3D.map((v) => {
            return v.slice(0, 2);
        });
        trajectory = trajectory2D;
    }
    else {
        trajectory = trajectory3D;
    }
    return interpolateDataOnTrajectory(coord, measured_depths, trajectory);
}
function getMdProperty(coord, feature, accessor, featureType) {
    var _a, _b;
    if (featureType === "points") {
        return null;
    }
    const md = getMd(coord, feature, accessor);
    if (md != null) {
        const prop_name = "MD " + ((_a = feature.properties) === null || _a === void 0 ? void 0 : _a["name"]);
        return createPropertyData(prop_name, md, (_b = feature.properties) === null || _b === void 0 ? void 0 : _b["color"]);
    }
    return null;
}
function getTvd(coord, feature, accessor) {
    var _a;
    const trajectory3D = getTrajectory(feature, accessor);
    // if trajectory is not found or if it has a data single point then get tvd from well head
    if (trajectory3D == undefined || (trajectory3D === null || trajectory3D === void 0 ? void 0 : trajectory3D.length) <= 1) {
        const wellhead_xyz = getWellHeadPosition(feature);
        return (_a = wellhead_xyz === null || wellhead_xyz === void 0 ? void 0 : wellhead_xyz[2]) !== null && _a !== void 0 ? _a : null;
    }
    let trajectory;
    // For 2D view coord is Position2D and for 3D view it's Position3D
    if (coord.length == 2) {
        const trajectory2D = trajectory3D === null || trajectory3D === void 0 ? void 0 : trajectory3D.map((v) => {
            return v.slice(0, 2);
        });
        trajectory = trajectory2D;
    }
    else {
        trajectory = trajectory3D;
    }
    const tvds = trajectory3D.map((v) => {
        return v[2];
    });
    return interpolateDataOnTrajectory(coord, tvds, trajectory);
}
function getTvdProperty(coord, feature, accessor, featureType) {
    var _a, _b;
    if (featureType === "points") {
        return null;
    }
    const tvd = getTvd(coord, feature, accessor);
    if (tvd != null) {
        const prop_name = "TVD " + ((_a = feature.properties) === null || _a === void 0 ? void 0 : _a["name"]);
        return createPropertyData(prop_name, tvd, (_b = feature.properties) === null || _b === void 0 ? void 0 : _b["color"]);
    }
    return null;
}
// Identify closest path leg to coord.
function getSegmentIndex(coord, path) {
    let min_d = Number.MAX_VALUE;
    let segment_index = 0;
    for (let i = 0; i < (path === null || path === void 0 ? void 0 : path.length) - 1; i++) {
        const d = distToSegmentSquared(path[i], path[i + 1], coord);
        if (d > min_d)
            continue;
        segment_index = i;
        min_d = d;
    }
    return segment_index;
}
// Returns segment index of discrete logs
function getLogSegmentIndex(coord, wells_data, log_data, logrun_name) {
    const trajectory = getLogPath(wells_data, log_data, logrun_name);
    return getSegmentIndex(coord, trajectory);
}
function getLogProperty(coord, wells_data, log_data, logrun_name, log_name) {
    var _a, _b, _c;
    if (!log_data.data)
        return null;
    const segment_index = getLogSegmentIndex(coord, wells_data, log_data, logrun_name);
    let log_value = getLogValues(log_data, logrun_name, log_name)[segment_index];
    let dl_attrs = undefined;
    const dl_metadata = (_a = getDiscreteLogMetadata(log_data, log_name)) === null || _a === void 0 ? void 0 : _a.objects;
    if (dl_metadata) {
        dl_attrs = Object.entries(dl_metadata).find(([, value]) => value[1] == log_value);
    }
    const log = (_b = getLogInfo(log_data, logrun_name, log_name)) === null || _b === void 0 ? void 0 : _b.name;
    const prop_name = log + " " + log_data.header.well;
    log_value = dl_attrs ? dl_attrs[0] + " (" + log_value + ")" : log_value;
    if (log_value) {
        const well_object = getWellObjectByName(wells_data, log_data.header.well);
        return createPropertyData(prop_name, log_value, (_c = well_object === null || well_object === void 0 ? void 0 : well_object.properties) === null || _c === void 0 ? void 0 : _c["color"]);
    }
    else
        return null;
}
// Return data required to build welllayer legend
function getLegendData(logs, wellName, logName, logColor) {
    if (!logs)
        return null;
    const log = wellName
        ? logs.find((log) => log.header.well == wellName)
        : logs[0];
    const logInfo = !log
        ? undefined
        : getLogInfo(log, log.header.name, logName);
    const title = "Wells / " + logName;
    if (log && (logInfo === null || logInfo === void 0 ? void 0 : logInfo.description) == "discrete") {
        const meta = log["metadata_discrete"];
        const metadataDiscrete = meta[logName].objects;
        return {
            title: title,
            colorName: logColor,
            discrete: true,
            metadata: metadataDiscrete,
        };
    }
    else {
        const minArray = [];
        const maxArray = [];
        logs.forEach(function (log) {
            const logValues = getLogValues(log, log.header.name, logName);
            minArray.push(Math.min(...logValues));
            maxArray.push(Math.max(...logValues));
        });
        return {
            title: title,
            colorName: logColor,
            discrete: false,
            valueRange: [Math.min(...minArray), Math.max(...maxArray)],
        };
    }
}
//# sourceMappingURL=wellsLayer.js.map