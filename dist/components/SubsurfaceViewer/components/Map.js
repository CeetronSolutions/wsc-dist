import { JSONConfiguration, JSONConverter } from "@deck.gl/json/typed";
import DeckGL from "@deck.gl/react/typed";
import React, { useEffect, useState, useCallback, useRef } from "react";
import JSON_CONVERTER_CONFIG from "../utils/configuration";
import InfoCard from "./InfoCard";
import DistanceScale from "./DistanceScale";
import StatusIndicator from "./StatusIndicator";
import fitBounds from "../utils/fit-bounds";
import { validateColorTables, validateLayers, } from "../../../inputSchema/schemaValidationUtil";
import { getLayersByType } from "../layers/utils/layerTools";
import { getWellLayerByTypeAndSelectedWells } from "../layers/utils/layerTools";
import { WellsLayer, AxesLayer, NorthArrow3DLayer } from "../layers";
import { isEmpty, isEqual } from "lodash";
import { cloneDeep } from "lodash";
import { colorTables } from "@emerson-eps/color-tables";
import { getModelMatrixScale } from "../layers/utils/layerTools";
import { OrbitController, OrthographicController } from "@deck.gl/core/typed";
function addBoundingBoxes(b1, b2) {
    const boundsInitial = [0, 0, 0, 1, 1, 1];
    if (typeof b1 === "undefined" || typeof b2 === "undefined") {
        return boundsInitial;
    }
    if (isEqual(b1, boundsInitial)) {
        return b2;
    }
    const xmin = Math.min(b1[0], b2[0]);
    const ymin = Math.min(b1[1], b2[1]);
    const zmin = Math.min(b1[2], b2[2]);
    const xmax = Math.max(b1[3], b2[3]);
    const ymax = Math.max(b1[4], b2[4]);
    const zmax = Math.max(b1[5], b2[5]);
    return [xmin, ymin, zmin, xmax, ymax, zmax];
}
function boundingBoxCenter(box) {
    const xmin = box[0];
    const ymin = box[1];
    const zmin = box[2];
    const xmax = box[3];
    const ymax = box[4];
    const zmax = box[5];
    return [
        xmin + 0.5 * (xmax - xmin),
        ymin + 0.5 * (ymax - ymin),
        zmin + 0.5 * (zmax - zmin),
    ];
}
export function useHoverInfo() {
    const [hoverInfo, setHoverInfo] = React.useState([]);
    const callback = React.useCallback((pickEvent) => {
        setHoverInfo(pickEvent.infos);
    }, []);
    return [hoverInfo, callback];
}
function defaultTooltip(info) {
    var _a, _b, _c, _d, _e;
    if ((_a = info) === null || _a === void 0 ? void 0 : _a.logName) {
        return (_b = info) === null || _b === void 0 ? void 0 : _b.logName;
    }
    else if (((_c = info.layer) === null || _c === void 0 ? void 0 : _c.id) === "drawing-layer") {
        return (_d = info.propertyValue) === null || _d === void 0 ? void 0 : _d.toFixed(2);
    }
    const feat = info.object;
    return (_e = feat === null || feat === void 0 ? void 0 : feat.properties) === null || _e === void 0 ? void 0 : _e["name"];
}
function adjustCameraTarget(viewStates, scale, newScale) {
    const vs = cloneDeep(viewStates);
    for (const key in vs) {
        if (typeof vs[key].target !== "undefined") {
            const t = vs[key].target;
            const z = newScale * (t[2] / scale);
            vs[key].target = [t[0], t[1], z];
        }
    }
    return vs;
}
const Map = ({ id, layers, bounds, views, coords, scale, coordinateUnit, colorTables, setEditedData, checkDatafileSchema, onMouseEvent, selection, children, getTooltip = defaultTooltip, cameraPosition, getCameraPosition, triggerHome, triggerResetMultipleWells, }) => {
    var _a, _b, _c, _d, _e, _f;
    const isCameraPositionDefined = typeof cameraPosition !== "undefined" &&
        Object.keys(cameraPosition).length !== 0;
    const deckRef = useRef(null);
    const bboxInitial = [0, 0, 0, 1, 1, 1];
    const boundsInitial = bounds !== null && bounds !== void 0 ? bounds : [0, 0, 1, 1];
    // state for views prop of DeckGL component
    const [viewsProps, setViewsProps] = useState([]);
    const [alteredLayers, setAlteredLayers] = useState([]);
    const initialViewState = getViewState(boundsInitial, (_a = views === null || views === void 0 ? void 0 : views.viewports) === null || _a === void 0 ? void 0 : _a[0].target, (_b = views === null || views === void 0 ? void 0 : views.viewports) === null || _b === void 0 ? void 0 : _b[0].zoom, (_c = deckRef.current) === null || _c === void 0 ? void 0 : _c.deck);
    // Local help function.
    function calcDefaultViewStates(input) {
        var _a, _b, _c, _d;
        // If "bounds" or "cameraPosition" is not defined "viewState" will be
        // calculated based on the union of the reported bounding boxes from each layer.
        const union_of_reported_bboxes = addBoundingBoxes(reportedBoundingBoxAcc, reportedBoundingBox);
        setReportedBoundingBoxAcc(union_of_reported_bboxes);
        const axesLayer = layers === null || layers === void 0 ? void 0 : layers.find((e) => {
            return (e === null || e === void 0 ? void 0 : e.constructor) === AxesLayer;
        });
        // target: camera will look at either center of axes if it exists or center of data ("union_of_reported_bboxes")
        let target = boundingBoxCenter(((_a = axesLayer === null || axesLayer === void 0 ? void 0 : axesLayer.props.bounds) !== null && _a !== void 0 ? _a : union_of_reported_bboxes));
        const isBoundsDefined = typeof bounds !== "undefined";
        if (isBoundsDefined) {
            // if bounds are defined we only use z value of target and x,y set to middle of bounds.
            const z = target[2];
            const bounds_ = typeof boundsInitial == "function"
                ? boundsInitial()
                : boundsInitial;
            const x = bounds_[0] + 0.5 * (bounds_[2] - bounds_[0]); // right - left
            const y = bounds_[1] + 0.5 * (bounds_[3] - bounds_[1]); // top - bottom
            target = [x, y, z];
        }
        const is3D = (_d = (_c = (_b = views === null || views === void 0 ? void 0 : views.viewports) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.show3D) !== null && _d !== void 0 ? _d : false;
        if (!is3D) {
            target.pop(); // In 2D "target" should only contain x and y.
        }
        let tempViewStates = {};
        const updatedViewProps = input ? input : viewsProps;
        tempViewStates = Object.fromEntries(updatedViewProps.map((item, index) => {
            var _a, _b, _c, _d;
            return [
                item.id,
                isBoundsDefined
                    ? getViewState(boundsInitial, target, (_a = views === null || views === void 0 ? void 0 : views.viewports) === null || _a === void 0 ? void 0 : _a[index].zoom, (_b = deckRef.current) === null || _b === void 0 ? void 0 : _b.deck)
                    : getViewState3D(is3D, union_of_reported_bboxes, (_c = views === null || views === void 0 ? void 0 : views.viewports) === null || _c === void 0 ? void 0 : _c[index].zoom, (_d = deckRef.current) === null || _d === void 0 ? void 0 : _d.deck),
            ];
        }));
        setDidUserChangeCamera(false);
        setViewStates(tempViewStates);
    }
    // set initial view state based on supplied bounds and zoom in viewState
    const [viewStates, setViewStates] = useState({
        "main-view_2D": cameraPosition !== null && cameraPosition !== void 0 ? cameraPosition : {},
    });
    const [firstViewStateId, setFirstViewStatesId] = useState("main-view_2D");
    useEffect(() => {
        let tempViewStates = {};
        if (isCameraPositionDefined) {
            tempViewStates = Object.fromEntries(viewsProps.map((item) => [item.id, cameraPosition]));
        }
        else {
            tempViewStates = Object.fromEntries(viewsProps.map((item, index) => {
                var _a, _b, _c;
                const viewState = viewStates[item.id];
                return [
                    item.id,
                    typeof viewState !== "undefined"
                        ? viewState
                        : getViewState(boundsInitial, (_a = views === null || views === void 0 ? void 0 : views.viewports) === null || _a === void 0 ? void 0 : _a[index].target, (_b = views === null || views === void 0 ? void 0 : views.viewports) === null || _b === void 0 ? void 0 : _b[index].zoom, (_c = deckRef.current) === null || _c === void 0 ? void 0 : _c.deck),
                ];
            }));
        }
        if (viewsProps[0] !== undefined) {
            setFirstViewStatesId(viewsProps[0].id);
        }
        setViewStates(tempViewStates);
    }, [viewsProps]);
    // calculate view state on deckgl context load (based on viewport size)
    const onLoad = useCallback(() => {
        let tempViewStates = {};
        if (isCameraPositionDefined) {
            tempViewStates = Object.fromEntries(viewsProps.map((item) => [item.id, cameraPosition]));
        }
        else {
            tempViewStates = Object.fromEntries(viewsProps.map((item, index) => {
                var _a, _b, _c;
                return [
                    item.id,
                    getViewState(boundsInitial, (_a = views === null || views === void 0 ? void 0 : views.viewports) === null || _a === void 0 ? void 0 : _a[index].target, (_b = views === null || views === void 0 ? void 0 : views.viewports) === null || _b === void 0 ? void 0 : _b[index].zoom, (_c = deckRef.current) === null || _c === void 0 ? void 0 : _c.deck),
                ];
            }));
            if (viewsProps[0] !== undefined) {
                setFirstViewStatesId(viewsProps[0].id);
            }
            setViewStates(tempViewStates);
        }
    }, [bounds, cameraPosition]);
    const [deckGLViews, setDeckGLViews] = useState([]);
    useEffect(() => {
        setDeckGLViews(jsonToObject(viewsProps));
    }, [viewsProps]);
    const [reportedBoundingBox, setReportedBoundingBox] = useState(bboxInitial);
    const [reportedBoundingBoxAcc, setReportedBoundingBoxAcc] = useState(bboxInitial);
    useEffect(() => {
        if (typeof triggerHome !== "undefined") {
            calcDefaultViewStates();
        }
    }, [triggerHome]);
    useEffect(() => {
        // If "bounds" or "cameraPosition" is not defined "viewState" will be
        // calculated based on the union of the reported bounding boxes from each layer.
        if (!didUserChangeCamera && !isCameraPositionDefined) {
            calcDefaultViewStates();
        }
    }, [reportedBoundingBox]);
    // react on bounds prop change
    useEffect(() => {
        let tempViewStates = {};
        if (!isCameraPositionDefined) {
            tempViewStates = Object.fromEntries(viewsProps.map((item, index) => {
                var _a, _b, _c;
                return [
                    item.id,
                    getViewState(boundsInitial, (_a = views === null || views === void 0 ? void 0 : views.viewports) === null || _a === void 0 ? void 0 : _a[index].target, (_b = views === null || views === void 0 ? void 0 : views.viewports) === null || _b === void 0 ? void 0 : _b[index].zoom, (_c = deckRef.current) === null || _c === void 0 ? void 0 : _c.deck),
                ];
            }));
            if (viewsProps[0] !== undefined) {
                setFirstViewStatesId(viewsProps[0].id);
            }
            setViewStates(tempViewStates);
        }
    }, [bounds]);
    // react on cameraPosition prop change
    useEffect(() => {
        let tempViewStates = {};
        if (isCameraPositionDefined) {
            tempViewStates = Object.fromEntries(viewsProps.map((item) => [item.id, cameraPosition]));
            setViewStates(tempViewStates);
            if (viewsProps[0] !== undefined) {
                setFirstViewStatesId(viewsProps[0].id);
            }
        }
        if (cameraPosition === null) {
            tempViewStates = Object.fromEntries(viewsProps.map((item) => [item.id, initialViewState]));
            setViewStates(tempViewStates);
        }
    }, [cameraPosition]);
    // Used for scaling in z direction using arrow keys.
    const [scaleZ, setScaleZ] = useState(1);
    const [scaleZUp, setScaleZUp] = useState(1);
    const [scaleZDown, setScaleZDown] = useState(1);
    const scaleUpFunction = () => {
        setScaleZUp(Math.random());
    };
    const scaleDownFunction = () => {
        setScaleZDown(Math.random());
    };
    useEffect(() => {
        const newScaleZ = scaleZ * 1.05;
        setScaleZ(newScaleZ);
        // Make camera target follow the scaling.
        const vs = adjustCameraTarget(viewStates, scaleZ, newScaleZ);
        setViewStates(vs);
    }, [scaleZUp]);
    useEffect(() => {
        const newScaleZ = scaleZ * 0.95;
        setScaleZ(newScaleZ);
        // Make camera target follow the scaling.
        const vs = adjustCameraTarget(viewStates, scaleZ, newScaleZ);
        setViewStates(vs);
    }, [scaleZDown]);
    useEffect(() => {
        const viewProps = getViews(views, scaleUpFunction, scaleDownFunction);
        setViewsProps(viewProps);
        if (!bounds) {
            calcDefaultViewStates(viewProps);
        }
    }, [views]);
    useEffect(() => {
        if (layers == undefined)
            return;
        const m = getModelMatrixScale(scaleZ);
        const layers_copy = layers.map((item) => {
            if ((item === null || item === void 0 ? void 0 : item.constructor.name) === NorthArrow3DLayer.name)
                return item;
            const layer = item;
            // Set "modelLayer" matrix to reflect correct z scaling.
            const scaledLayer = layer.clone({ modelMatrix: m });
            // Inject "setReportedBoundingBox" function into layer for it to report
            // back its respective bounding box.
            const boundedLayer = scaledLayer.clone({
                setReportedBoundingBox: setReportedBoundingBox,
            });
            return boundedLayer !== null && boundedLayer !== void 0 ? boundedLayer : scaledLayer;
        });
        setAlteredLayers(layers_copy);
    }, [scaleZ, layers /*dispatch*/]);
    const [deckGLLayers, setDeckGLLayers] = useState([]);
    useEffect(() => {
        setDeckGLLayers(alteredLayers);
    }, [alteredLayers]);
    useEffect(() => {
        var _a, _b, _c;
        const layers = (_b = (_a = deckRef.current) === null || _a === void 0 ? void 0 : _a.deck) === null || _b === void 0 ? void 0 : _b.props.layers;
        if (layers) {
            const wellslayer = (_c = getLayersByType(layers, WellsLayer.name)) === null || _c === void 0 ? void 0 : _c[0];
            wellslayer === null || wellslayer === void 0 ? void 0 : wellslayer.setSelection(selection === null || selection === void 0 ? void 0 : selection.well, selection === null || selection === void 0 ? void 0 : selection.selection);
        }
    }, [selection]);
    // multiple well layers
    const [multipleWells, setMultipleWells] = useState([]);
    const [selectedWell, setSelectedWell] = useState("");
    const [shiftHeld, setShiftHeld] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function downHandler({ key }) {
        if (key === "Shift") {
            setShiftHeld(true);
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function upHandler({ key }) {
        if (key === "Shift") {
            setShiftHeld(false);
        }
    }
    useEffect(() => {
        window.addEventListener("keydown", downHandler);
        window.addEventListener("keyup", upHandler);
        return () => {
            window.removeEventListener("keydown", downHandler);
            window.removeEventListener("keyup", upHandler);
        };
    }, []);
    useEffect(() => {
        var _a, _b, _c;
        const layers = (_b = (_a = deckRef.current) === null || _a === void 0 ? void 0 : _a.deck) === null || _b === void 0 ? void 0 : _b.props.layers;
        if (layers) {
            const wellslayer = (_c = getWellLayerByTypeAndSelectedWells(layers, "WellsLayer", selectedWell)) === null || _c === void 0 ? void 0 : _c[0];
            wellslayer === null || wellslayer === void 0 ? void 0 : wellslayer.setMultiSelection(multipleWells);
        }
    }, [multipleWells]);
    useEffect(() => {
        if (typeof triggerResetMultipleWells !== "undefined") {
            setMultipleWells([]);
        }
    }, [triggerResetMultipleWells]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [hoverInfo, setHoverInfo] = useState([]);
    const onHover = useCallback((pickInfo, event) => {
        const infos = getPickingInfos(pickInfo, event);
        setHoverInfo(infos); //  for InfoCard pickInfos
        callOnMouseEvent === null || callOnMouseEvent === void 0 ? void 0 : callOnMouseEvent("hover", infos, event);
    }, [coords, onMouseEvent]);
    const onClick = useCallback((pickInfo, event) => {
        const infos = getPickingInfos(pickInfo, event);
        callOnMouseEvent === null || callOnMouseEvent === void 0 ? void 0 : callOnMouseEvent("click", infos, event);
    }, [coords, onMouseEvent]);
    const getPickingInfos = (pickInfo, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    event) => {
        var _a;
        if ((coords === null || coords === void 0 ? void 0 : coords.multiPicking) && ((_a = pickInfo.layer) === null || _a === void 0 ? void 0 : _a.context.deck)) {
            const pickInfos = pickInfo.layer.context.deck.pickMultipleObjects({
                x: event.offsetCenter.x,
                y: event.offsetCenter.y,
                depth: coords.pickDepth ? coords.pickDepth : undefined,
            });
            pickInfos.forEach((item) => {
                var _a, _b;
                if (item.properties) {
                    let unit = (_b = (_a = item.sourceLayer) === null || _a === void 0 ? void 0 : _a.props.data) === null || _b === void 0 ? void 0 : _b.unit;
                    if (unit == undefined)
                        unit = " ";
                    item.properties.forEach((element) => {
                        if (element.name.includes("MD") ||
                            element.name.includes("TVD")) {
                            element.value =
                                Number(element.value).toFixed(2).toString() +
                                    " " +
                                    unit;
                        }
                    });
                }
            });
            return pickInfos;
        }
        return [pickInfo];
    };
    /**
     * call onMouseEvent callback
     */
    const callOnMouseEvent = useCallback((type, infos, event) => {
        if (!onMouseEvent)
            return;
        const ev = handleMouseEvent(type, infos, event);
        onMouseEvent(ev);
    }, [onMouseEvent]);
    const [isLoaded, setIsLoaded] = useState(false);
    const onAfterRender = useCallback(() => {
        if (deckGLLayers) {
            const state = deckGLLayers.every((layer) => layer.isLoaded);
            setIsLoaded(state);
        }
    }, [deckGLLayers]);
    // validate layers data
    const [errorText, setErrorText] = useState();
    useEffect(() => {
        var _a, _b;
        const layers = (_b = (_a = deckRef.current) === null || _a === void 0 ? void 0 : _a.deck) === null || _b === void 0 ? void 0 : _b.props.layers;
        // this ensures to validate the schemas only once
        if (checkDatafileSchema && layers && isLoaded) {
            try {
                validateLayers(layers);
                colorTables && validateColorTables(colorTables);
            }
            catch (e) {
                setErrorText(String(e));
            }
        }
        else
            setErrorText(undefined);
    }, [checkDatafileSchema, (_e = (_d = deckRef.current) === null || _d === void 0 ? void 0 : _d.deck) === null || _e === void 0 ? void 0 : _e.props.layers, isLoaded]);
    const layerFilter = useCallback((args) => {
        // display all the layers if views are not specified correctly
        if (!views || !views.viewports || !views.layout)
            return true;
        const cur_view = views.viewports.find(({ id }) => args.viewport.id && id === args.viewport.id);
        if ((cur_view === null || cur_view === void 0 ? void 0 : cur_view.layerIds) && cur_view.layerIds.length > 0) {
            const layer_ids = cur_view.layerIds;
            return layer_ids.some((layer_id) => {
                const t = layer_id === args.layer.id;
                return t;
            });
        }
        else {
            return true;
        }
    }, [views]);
    const [didUserChangeCamera, setDidUserChangeCamera] = useState(false);
    const onViewStateChange = useCallback(({ viewId, viewState }) => {
        const isSyncIds = viewsProps
            .filter((item) => item.isSync)
            .map((item) => item.id);
        if (isSyncIds.includes(viewId)) {
            let tempViewStates = {};
            tempViewStates = Object.fromEntries(viewsProps
                .filter((item) => item.isSync)
                .map((item) => [item.id, viewState]));
            setViewStates((currentViewStates) => (Object.assign(Object.assign({}, currentViewStates), tempViewStates)));
        }
        else {
            setViewStates((currentViewStates) => (Object.assign(Object.assign({}, currentViewStates), { [viewId]: viewState })));
        }
        if (getCameraPosition) {
            getCameraPosition(viewState);
        }
        setFirstViewStatesId(viewsProps[0].id);
        setDidUserChangeCamera(true);
    }, [viewStates]);
    if (!deckGLViews || isEmpty(deckGLViews) || isEmpty(deckGLLayers))
        return null;
    return (React.createElement("div", { onContextMenu: (event) => event.preventDefault() },
        React.createElement(DeckGL, { id: id, viewState: viewStates, views: deckGLViews, layerFilter: layerFilter, layers: deckGLLayers, 
            // @ts-expect-error this prop doesn't exists directly on DeckGL, but on Deck.Context
            userData: {
                setEditedData: (updated_prop) => {
                    setSelectedWell(updated_prop["selectedWell"]);
                    if (Object.keys(updated_prop).includes("selectedWell")) {
                        if (shiftHeld) {
                            if (multipleWells.includes(updated_prop["selectedWell"])) {
                                const temp = multipleWells.filter((item) => item !==
                                    updated_prop["selectedWell"]);
                                setMultipleWells(temp);
                            }
                            else {
                                const temp = multipleWells.concat(updated_prop["selectedWell"]);
                                setMultipleWells(temp);
                            }
                        }
                        else {
                            setMultipleWells([]);
                        }
                    }
                    setEditedData === null || setEditedData === void 0 ? void 0 : setEditedData(updated_prop);
                },
                colorTables: colorTables,
            }, getCursor: ({ isDragging }) => isDragging ? "grabbing" : "default", getTooltip: getTooltip, ref: deckRef, onViewStateChange: onViewStateChange, onHover: onHover, onClick: onClick, onLoad: onLoad, onAfterRender: onAfterRender }, children),
        (scale === null || scale === void 0 ? void 0 : scale.visible) ? (React.createElement(DistanceScale, Object.assign({}, scale, { zoom: viewStates[firstViewStateId] === undefined
                ? -5
                : viewStates[firstViewStateId].zoom, scaleUnit: coordinateUnit, style: (_f = scale.cssStyle) !== null && _f !== void 0 ? _f : {} }))) : null,
        React.createElement(StatusIndicator, { layers: deckGLLayers, isLoaded: isLoaded }),
        (coords === null || coords === void 0 ? void 0 : coords.visible) ? React.createElement(InfoCard, { pickInfos: hoverInfo }) : null,
        errorText && (React.createElement("pre", { style: {
                flex: "0, 0",
                color: "rgb(255, 64, 64)",
                backgroundColor: "rgb(255, 255, 192)",
            } }, errorText))));
};
Map.defaultProps = {
    coords: {
        visible: true,
        multiPicking: true,
        pickDepth: 10,
    },
    scale: {
        visible: true,
        incrementValue: 100,
        widthPerUnit: 100,
        cssStyle: { top: 10, left: 10 },
    },
    toolbar: {
        visible: false,
    },
    coordinateUnit: "m",
    views: {
        layout: [1, 1],
        showLabel: false,
        viewports: [{ id: "main-view", show3D: false, layerIds: [] }],
    },
    colorTables: colorTables,
    checkDatafileSchema: false,
};
export default Map;
// ------------- Helper functions ---------- //
// Add the resources as an enum in the Json Configuration and then convert the spec to actual objects.
// See https://deck.gl/docs/api-reference/json/overview for more details.
export function jsonToObject(data, enums = undefined) {
    if (!data)
        return [];
    const configuration = new JSONConfiguration(JSON_CONVERTER_CONFIG);
    enums === null || enums === void 0 ? void 0 : enums.forEach((enumeration) => {
        if (enumeration) {
            configuration.merge({
                enumerations: Object.assign({}, enumeration),
            });
        }
    });
    const jsonConverter = new JSONConverter({ configuration });
    // remove empty data/layer object
    const filtered_data = data.filter((value) => Object.keys(value).length !== 0);
    return jsonConverter.convert(filtered_data);
}
// return viewstate with computed bounds to fit the data in viewport
function getViewState(bounds_accessor, target, zoom, deck) {
    let bounds = [0, 0, 1, 1];
    if (typeof bounds_accessor == "function") {
        bounds = bounds_accessor();
    }
    else {
        bounds = bounds_accessor;
    }
    let width = bounds[2] - bounds[0]; // right - left
    let height = bounds[3] - bounds[1]; // top - bottom
    if (deck) {
        width = deck.width;
        height = deck.height;
    }
    const fitted_bound = fitBounds({ width, height, bounds });
    const view_state = {
        target: target !== null && target !== void 0 ? target : [fitted_bound.x, fitted_bound.y, 0],
        zoom: zoom !== null && zoom !== void 0 ? zoom : fitted_bound.zoom,
        rotationX: 90,
        rotationOrbit: 0,
    };
    return view_state;
}
///////////////////////////////////////////////////////////////////////////////////////////
// return viewstate with computed bounds to fit the data in viewport
function getViewState3D(is3D, bounds, zoom, deck) {
    const xMin = bounds[0];
    const yMin = bounds[1];
    const zMin = bounds[2];
    const xMax = bounds[3];
    const yMax = bounds[4];
    const zMax = bounds[5];
    let width = xMax - xMin;
    let height = yMax - yMin;
    if (deck) {
        width = deck.width;
        height = deck.height;
    }
    const target = [
        xMin + (xMax - xMin) / 2,
        yMin + (yMax - yMin) / 2,
        is3D ? zMin + (zMax - zMin) / 2 : 0,
    ];
    const bounds2D = [xMin, yMin, xMax, yMax];
    const fitted_bound = fitBounds({
        width,
        height,
        bounds: bounds2D,
    });
    const view_state = {
        target,
        zoom: zoom !== null && zoom !== void 0 ? zoom : fitted_bound.zoom * 1.2,
        rotationX: 45,
        rotationOrbit: 0,
    };
    return view_state;
}
// construct views object for DeckGL component
function getViews(views, scaleUpFunction, scaleDownFunction) {
    // Use modified controller to handle key events.
    class ZScaleOrbitController extends OrbitController {
        handleEvent(event) {
            if (event.type === "keydown" && event.key === "ArrowUp") {
                scaleUpFunction();
                return true;
            }
            else if (event.type === "keydown" && event.key === "ArrowDown") {
                scaleDownFunction();
                return true;
            }
            return super.handleEvent(event);
        }
    }
    // @rmt: Added missing type as broad type
    // This is incorrectly implemented.
    // The function returns ViewportType[] but it is not compatible with the actual return value.
    const deckgl_views = [];
    // if props for multiple viewport are not proper, return 2d view
    if (!views || !views.viewports || !views.layout) {
        deckgl_views.push({
            "@@type": "OrthographicView",
            id: "main",
            controller: { doubleClickZoom: false },
            x: "0%",
            y: "0%",
            width: "100%",
            height: "100%",
            flipY: false,
            far: 99999,
            near: -99999,
            isSync: false,
        });
    }
    else {
        let yPos = 0;
        const [nY, nX] = views.layout;
        for (let y = 1; y <= nY; y++) {
            let xPos = 0;
            for (let x = 1; x <= nX; x++) {
                if (views.viewports == undefined ||
                    deckgl_views.length >= views.viewports.length)
                    return deckgl_views;
                const cur_viewport = views.viewports[deckgl_views.length];
                const view_type = cur_viewport.show3D
                    ? "OrbitView"
                    : cur_viewport.id === "intersection_view"
                        ? "IntersectionView"
                        : "OrthographicView";
                const far = 9999;
                const near = cur_viewport.show3D ? 0.1 : -9999;
                deckgl_views.push({
                    "@@type": view_type,
                    id: cur_viewport.id,
                    controller: {
                        type: cur_viewport.show3D
                            ? ZScaleOrbitController
                            : OrthographicController,
                        doubleClickZoom: false,
                    },
                    x: xPos + "%",
                    y: yPos + "%",
                    // Using 99.5% of viewport to avoid flickering of deckgl canvas
                    width: 99.5 / nX + "%",
                    height: 99.5 / nY + "%",
                    flipY: false,
                    far,
                    near,
                    minZoom: cur_viewport.show3D ? -12 : -15,
                    maxZoom: cur_viewport.show3D ? +12 : +15,
                    isSync: views.viewports[deckgl_views.length].isSync,
                });
                xPos = xPos + 99.5 / nX;
            }
            yPos = yPos + 99.5 / nY;
        }
    }
    return deckgl_views;
}
function handleMouseEvent(type, infos, event) {
    var _a;
    const ev = {
        type: type,
        infos: infos,
    };
    if (ev.type === "click") {
        if (event["rightButton"])
            ev.type = "contextmenu";
    }
    for (const info of infos) {
        if (info.coordinate) {
            ev.x = info.coordinate[0];
            ev.y = info.coordinate[1];
        }
        if (info.layer && info.layer.id === "wells-layer") {
            // info.object is Feature or WellLog;
            {
                // try to use Object info (see DeckGL getToolTip callback)
                const feat = info.object;
                const properties = feat === null || feat === void 0 ? void 0 : feat.properties;
                if (properties) {
                    ev.wellname = properties["name"];
                    ev.wellcolor = properties["color"];
                }
            }
            if (!ev.wellname)
                if (info.object) {
                    ev.wellname = (_a = info.object.header) === null || _a === void 0 ? void 0 : _a["well"]; // object is WellLog
                }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (info.properties) {
                for (const property of info.properties) {
                    if (!ev.wellcolor)
                        ev.wellcolor = property.color;
                    let propname = property.name;
                    if (propname) {
                        const sep = propname.indexOf(" ");
                        if (sep >= 0) {
                            if (!ev.wellname) {
                                ev.wellname = propname.substring(sep + 1);
                            }
                            propname = propname.substring(0, sep);
                        }
                    }
                    const names_md = [
                        "DEPTH",
                        "DEPT",
                        "MD" /*Measured Depth*/,
                        "TDEP" /*"Tool DEPth"*/,
                        "MD_RKB" /*Rotary Relly Bushing*/,
                    ]; // aliases for MD
                    const names_tvd = [
                        "TVD" /*True Vertical Depth*/,
                        "TVDSS" /*SubSea*/,
                        "DVER" /*"VERtical Depth"*/,
                        "TVD_MSL" /*below Mean Sea Level*/,
                    ]; // aliases for MD
                    if (names_md.find((name) => name == propname))
                        ev.md = parseFloat(property.value);
                    else if (names_tvd.find((name) => name == propname))
                        ev.tvd = parseFloat(property.value);
                    if (ev.md !== undefined &&
                        ev.tvd !== undefined &&
                        ev.wellname !== undefined)
                        break;
                }
            }
            break;
        }
    }
    return ev;
}
//# sourceMappingURL=Map.js.map