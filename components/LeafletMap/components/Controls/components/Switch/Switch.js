/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright (C) 2020 - Equinor ASA. */
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
// Leaflet imports
import L from "leaflet";
import "./L.SwitchControl.js";
// Material UI components
import MaterialSwitch from "@material-ui/core/Switch";
class Switch extends React.Component {
    constructor(props) {
        super(props);
        this.createNewSwitch = () => {
            const switchCtrl = L.switchControl(this.props.position);
            switchCtrl.addTo(this.props.map);
            this.setState({
                switchCtrl,
            });
        };
        this.removeSwitch = () => {
            if (!this.state.switchCtrl) {
                return;
            }
            this.state.switchCtrl.remove();
            this.setState({ switchCtrl: null });
        };
        this.handleChange = (event) => {
            if (this.props.setProps) {
                const curProps = Object.assign({}, this.props);
                delete curProps.map;
                delete curProps.setProps;
                this.props.setProps({
                    switch: Object.assign(Object.assign({}, curProps), { value: event.target.checked }),
                });
            }
        };
        this.state = {
            switchCtrl: null,
        };
    }
    componentDidMount() {
        this.createNewSwitch();
    }
    componentWillUmount() {
        this.removeSwitch();
    }
    render() {
        if (!this.state.switchCtrl || !this.state.switchCtrl.panelDiv) {
            return null;
        }
        return ReactDOM.createPortal(React.createElement("div", { style: { paddingLeft: "10px", paddingRight: "10px" } },
            React.createElement(MaterialSwitch, { disabled: this.props.disabled, onChange: this.handleChange, checked: this.props.value }),
            this.props.label), this.state.switchCtrl.panelDiv);
    }
}
Switch.propTypes = {
    map: PropTypes.object.isRequired,
    disabled: PropTypes.bool,
    value: PropTypes.bool,
    setProps: PropTypes.func,
    position: PropTypes.string,
    label: PropTypes.string,
};
Switch.defaultProps = {
    position: "bottomleft",
};
export default Switch;
//# sourceMappingURL=Switch.js.map