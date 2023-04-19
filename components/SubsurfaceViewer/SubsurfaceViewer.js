import { Layer } from "@deck.gl/core/typed";
import Map from "./components/Map";
import { jsonToObject } from "./components/Map";
import React from "react";
import PropTypes from "prop-types";
const SubsurfaceViewer = ({ id, resources, layers, bounds, views, coords, scale, coordinateUnit, 
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
legend, 
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
toolbar, colorTables, editedData, setProps, checkDatafileSchema, onMouseEvent, selection, getTooltip, cameraPosition, getCameraPosition, triggerHome, triggerResetMultipleWells, children, }) => {
    // Contains layers data received from map layers by user interaction
    const [layerEditedData, setLayerEditedData] = React.useState(editedData);
    const [layerInstances, setLayerInstances] = React.useState([]);
    React.useEffect(() => {
        if ((layers === null || layers === void 0 ? void 0 : layers[0]) instanceof Layer) {
            setLayerInstances(layers);
            return;
        }
        // @rmt: Added broad type - should be improved?
        const enumerations = [];
        const layersJson = layers; // @rmt: Why unknown? It is defined as Record<string, unknown>[] | undefined above
        if (resources)
            enumerations.push({ resources: resources });
        if (editedData)
            enumerations.push({ editedData: editedData });
        else
            enumerations.push({ editedData: {} });
        const layersList = jsonToObject(layersJson, enumerations);
        setLayerInstances(layersList);
    }, [layers]);
    React.useEffect(() => {
        if (!editedData)
            return;
        setLayerEditedData(Object.assign(Object.assign({}, layerEditedData), editedData));
    }, [editedData]);
    // This callback is used as a mechanism to update the component from the layers or toolbar.
    // The changes done in a layer, for example, are bundled into a patch
    // and sent to the parent component via setProps. (See layers/utils/layerTools.ts)
    const setEditedData = React.useCallback((data) => {
        if (setProps == undefined)
            return;
        setProps({
            editedData: Object.assign(Object.assign({}, layerEditedData), data),
        });
    }, [setProps, layerEditedData]);
    return (React.createElement(Map, { id: id, layers: layerInstances, bounds: bounds, views: views, coords: coords, scale: scale, coordinateUnit: coordinateUnit, colorTables: colorTables, setEditedData: setEditedData, checkDatafileSchema: checkDatafileSchema, onMouseEvent: onMouseEvent, selection: selection, getTooltip: getTooltip, cameraPosition: cameraPosition, getCameraPosition: getCameraPosition, triggerHome: triggerHome, triggerResetMultipleWells: triggerResetMultipleWells }, children));
};
SubsurfaceViewer.defaultProps = {
    views: {
        layout: [1, 1],
        showLabel: false,
        viewports: [{ id: "main-view", show3D: false, layerIds: [] }],
    },
    checkDatafileSchema: false,
};
SubsurfaceViewer.propTypes = {
    /**
     * The ID of this component, used to identify dash components
     * in callbacks. The ID needs to be unique across all of the
     * components in an app.
     */
    id: PropTypes.string.isRequired,
    /**
     * Resource dictionary made available in the DeckGL specification as an enum.
     * The values can be accessed like this: `"@@#resources.resourceId"`, where
     * `resourceId` is the key in the `resources` dict. For more information,
     * see the DeckGL documentation on enums in the json spec:
     * https://deck.gl/docs/api-reference/json/conversion-reference#enumerations-and-using-the--prefix
     */
    resources: PropTypes.objectOf(PropTypes.any),
    /* List of JSON object containing layer specific data.
     * Each JSON object will consist of layer type with key as "@@type" and
     * layer specific data, if any.
     */
    layers: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any).isRequired),
    /**
     * Coordinate boundary for the view defined as [left, bottom, right, top].
     * It can be either an array or a callback returning [number, number, number, number].
     */
    bounds: PropTypes.any,
    /**
     * Views configuration for map. If not specified, all the layers will be
     * displayed in a single 2D viewport.
     * Example:
     *      views = {
     *          "layout": [1, 1],
     *          "showLabel": false,
     *          "viewports": [
     *              {
     *                  "id": "view_1",
     *                  "name"?: "View 1"
     *                  "show3D"?: false,
     *                  "layerIds": ["layer-ids"],
     *                  "isSync?": true,
     *              }
     *          ]
     *      }
     */
    // TODO - define proper type for views prop
    views: PropTypes.any,
    /**
     * Parameters for the InfoCard component
     */
    coords: PropTypes.shape({
        /**
         * Toggle component visibility.
         */
        visible: PropTypes.bool,
        /**
         * Enable or disable multi picking. Might have a performance penalty.
         * See https://deck.gl/docs/api-reference/core/deck#pickmultipleobjects
         */
        multiPicking: PropTypes.bool,
        /**
         * Number of objects to pick. The more objects picked, the more picking operations will be done.
         * See https://deck.gl/docs/api-reference/core/deck#pickmultipleobjects
         */
        pickDepth: PropTypes.number,
    }),
    /**
     * Parameters for the Distance Scale component
     */
    scale: PropTypes.shape({
        /**
         * Toggle component visibility.
         */
        visible: PropTypes.bool,
        /**
         * Increment value for the scale.
         */
        incrementValue: PropTypes.number,
        /**
         * Scale bar width in pixels per unit value.
         */
        widthPerUnit: PropTypes.number,
        /**
         * Scale bar css style can be used for positioning.
         */
        cssStyle: PropTypes.objectOf(PropTypes.any),
    }),
    /**
     * Parameters for the Distance Scale component
     * Unit for the scale ruler
     */
    coordinateUnit: PropTypes.string,
    /**
     * @obsolete Toolbar should be added as annotation. This prop has no function.
     */
    toolbar: PropTypes.shape({
        /**
         * Toggle toolbar visibility
         */
        visible: PropTypes.bool,
    }),
    /**
     * @obsolete Legends should be added as annotations. This prop has no function.
     */
    legend: PropTypes.shape({
        /**
         * Toggle component visibility.
         */
        visible: PropTypes.bool,
        /**
         * Legend css style can be used for positioning.
         */
        cssStyle: PropTypes.objectOf(PropTypes.any),
        /**
         * Orientation of color legend
         */
        horizontal: PropTypes.bool,
    }),
    /**
     * Prop containing color table data
     */
    colorTables: PropTypes.array,
    /**
     * Prop containing edited data from layers
     */
    editedData: PropTypes.objectOf(PropTypes.any),
    /**
     * For reacting to prop changes
     */
    setProps: PropTypes.func,
    /**
     * Validate JSON datafile against schema
     */
    checkDatafileSchema: PropTypes.bool,
    /**
     * For get mouse events
     */
    onMouseEvent: PropTypes.func,
};
export default SubsurfaceViewer;
//# sourceMappingURL=SubsurfaceViewer.js.map