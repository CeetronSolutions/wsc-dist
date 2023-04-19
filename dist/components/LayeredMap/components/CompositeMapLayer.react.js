/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (C) 2020 - Equinor ASA. */
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import ImageOverlayWebGL from "./ImageOverlayWebGL.react";
import Colormap from "./Colormap.react";
import { Circle, LayerGroup, Polygon, Polyline, Tooltip } from "react-leaflet";
const yx = ([x, y]) => {
    return [y, x];
};
const DEFAULT_ELEVATION_SCALE = 0.03;
class CompositeMapLayer extends Component {
    renderTooltip(item) {
        if ("tooltip" in item) {
            return React.createElement(Tooltip, { sticky: true }, item.tooltip);
        }
        return null;
    }
    renderItem(item, index) {
        if (item.type === "polyline") {
            const positions = item.positions.map((xy) => yx(xy));
            return (React.createElement(Polyline, { onClick: () => this.props.lineCoords(positions), color: item.color, positions: positions, key: index }, this.renderTooltip(item)));
        }
        if (item.type === "polygon") {
            const positions = item.positions.map((xy) => yx(xy));
            return (React.createElement(Polygon, { onClick: () => this.props.polygonCoords(positions), color: item.color, positions: positions, key: index }, this.renderTooltip(item)));
        }
        if (item.type === "circle") {
            return (React.createElement(Circle, { color: item.color, center: yx(item.center), radius: item.radius, key: index }, this.renderTooltip(item)));
        }
        if (item.type === "image") {
            return (React.createElement(React.Fragment, null,
                React.createElement(ImageOverlayWebGL, { url: item.url, colormap: item.colormap, bounds: item.bounds.map((xy) => yx(xy)), hillShading: this.props.hillShading && item.allowHillshading, elevationScale: item.elevationScale || DEFAULT_ELEVATION_SCALE, lightDirection: this.props.lightDirection, minvalue: item.minvalue, maxvalue: item.maxvalue, unit: item.unit, key: index }),
                "colormap" in item && (React.createElement(Colormap, { colormap: item.colormap, unit: item.unit, minvalue: item.minvalue, maxvalue: item.maxvalue, position: "bottomleft", key: "colormap" + index }))));
        }
        return null;
    }
    render() {
        return (React.createElement(LayerGroup, null, this.props.layer.data.map((item, index) => {
            return (React.createElement(Fragment, { key: index }, this.renderItem(item, index)));
        })));
    }
}
CompositeMapLayer.propTypes = {
    /* Data for one single layer. See parent component LayeredMap for documentation.
     */
    layer: PropTypes.object,
    /* Add hillshading to an image layer*/
    hillShading: PropTypes.bool,
    /* Coordinates for selected polyline*/
    lineCoords: PropTypes.func,
    /* Vector specifiyng the light direction*/
    lightDirection: PropTypes.array,
    /* Coordinates for selected polygon*/
    polygonCoords: PropTypes.func,
};
export default CompositeMapLayer;
//# sourceMappingURL=CompositeMapLayer.react.js.map