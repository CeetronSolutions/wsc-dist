/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (C) 2020 - Equinor ASA. */
import L from "leaflet";
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { withLeaflet, MapControl } from "react-leaflet";
class ValueInfoBox extends MapControl {
    constructor(props) {
        super(props);
        const { map } = this.props.leaflet;
        this.leafletElement.addTo(map);
    }
    createLeafletElement(props) {
        const MapInfo = L.Control.extend({
            onAdd: () => {
                this.panelDiv = L.DomUtil.create("div", "leaflet-custom-control");
                return this.panelDiv;
            },
        });
        return new MapInfo({ position: props.position });
    }
    componentDidMount() {
        // Overriding default MapControl implementation. We need to do the
        // addTo(map) call in the constructor in order for the portal
        // DOM node to be available for the render function.
    }
    render() {
        const x_element = this.props.x ? (React.createElement("div", null,
            "x = ",
            Math.floor(this.props.x),
            " m")) : ("");
        const y_element = this.props.y ? (React.createElement("div", null,
            "y = ",
            Math.floor(this.props.y),
            " m")) : ("");
        const z_element = this.props.z ? React.createElement("div", null,
            "z = ",
            this.props.z) : "";
        return ReactDOM.createPortal(React.createElement("div", { className: "leaflet-valueinfobox" },
            x_element,
            y_element,
            z_element), this.panelDiv);
    }
}
ValueInfoBox.propTypes = {
    /* x coordinate to show */
    x: PropTypes.number,
    /* y coordinate to show */
    y: PropTypes.number,
    /* z string to show (number + unit) */
    z: PropTypes.string,
};
export default withLeaflet(ValueInfoBox);
//# sourceMappingURL=ValueInfoBox.react.js.map