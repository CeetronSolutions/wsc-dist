import React, { Component } from "react";
import ReactDOM from "react-dom";
import { isScaleTrack } from "../utils/tracks";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
function getPlotTitle(plot) {
    let title = "";
    const extOptions = plot.options;
    const legend = extOptions.legendInfo();
    if (legend) {
        if (legend.label)
            title = legend.label;
        const legend2 = legend;
        // DifferentialPlot - 2 names!
        if (legend2.serie1 && legend2.serie1.label)
            title = legend2.serie1.label;
        if (legend2.serie2 && legend2.serie2.label)
            title += " \u2013 " /*ndash*/ + legend2.serie2.label;
    }
    return title;
}
export class SimpleMenu extends Component {
    constructor(props) {
        super(props);
        this.state = { anchorEl: this.props.anchorEl };
        const wellLogView = this.props.wellLogView;
        this.addTrack = wellLogView.addTrack.bind(wellLogView, this.state.anchorEl, this.props.track);
        this.editTrack = wellLogView.editTrack.bind(wellLogView, this.state.anchorEl, this.props.track);
        this.removeTrack = wellLogView.removeTrack.bind(wellLogView, this.props.track);
        this.addPlot = wellLogView.addPlot.bind(wellLogView, this.state.anchorEl, this.props.track);
        this.editPlots = editPlots.bind(null, this.state.anchorEl, wellLogView, this.props.track);
        this.removePlots = removePlots.bind(null, this.state.anchorEl, wellLogView, this.props.track);
    }
    componentDidUpdate(prevProps) {
        if (this.props.anchorEl !== prevProps.anchorEl) {
            this.setState((_state, props) => {
                return { anchorEl: props.anchorEl };
            });
        }
    }
    closeMenu() {
        this.setState({ anchorEl: null });
    }
    handleContextMenu(ev) {
        ev.preventDefault();
        this.closeMenu();
    }
    handleCloseMenu( /*ev: React.MouseEvent<HTMLElement>*/) {
        this.closeMenu();
    }
    handleClickItem(action) {
        if (action)
            action();
        this.closeMenu();
    }
    createRemovePlotMenuItem(title, plot) {
        return (React.createElement(MenuItem, { key: plot.id, onClick: () => this.handleClickItem(this.props.wellLogView.removeTrackPlot.bind(this.props.wellLogView, this.props.track, plot)) },
            "\u00A0\u00A0\u00A0\u00A0",
            title));
    }
    menuRemovePlotItems() {
        const nodes = [];
        const welllog = this.props.wellLogView.props.welllog;
        if (welllog) {
            const track = this.props.track;
            const plots = track.plots;
            const curves = welllog.curves;
            for (const plot of plots) {
                const iCurve = plot.id;
                const title = getPlotTitle(plot) || curves[iCurve].name;
                nodes.push(this.createRemovePlotMenuItem(title, plot));
            }
        }
        return nodes;
    }
    createEditPlotMenuItem(title, plot) {
        return (React.createElement(MenuItem, { key: plot.id, onClick: () => this.handleClickItem(this.props.wellLogView.editPlot.bind(this.props.wellLogView, this.state.anchorEl, this.props.track, plot)) },
            "\u00A0\u00A0\u00A0\u00A0",
            title));
    }
    menuEditPlotItems() {
        const nodes = [];
        const welllog = this.props.wellLogView.props.welllog;
        if (welllog) {
            const track = this.props.track;
            const plots = track.plots;
            const curves = welllog.curves;
            for (const plot of plots) {
                const iCurve = plot.id;
                const title = getPlotTitle(plot) || curves[iCurve].name;
                nodes.push(this.createEditPlotMenuItem(title, plot));
            }
        }
        return nodes;
    }
    createMenuItem(title, action) {
        return (React.createElement(MenuItem, { key: title, onClick: () => this.handleClickItem(action) },
            "\u00A0\u00A0\u00A0\u00A0",
            title));
    }
    render() {
        if (this.props.type == "removePlots") {
            return (React.createElement("div", null,
                React.createElement(Menu, { id: "simple-menu", anchorEl: this.state.anchorEl, keepMounted: true, open: Boolean(this.state.anchorEl), onClose: this.handleCloseMenu.bind(this), onContextMenu: this.handleContextMenu.bind(this) }, this.menuRemovePlotItems())));
        }
        else if (this.props.type == "editPlots") {
            return (React.createElement("div", null,
                React.createElement(Menu, { id: "simple-menu", anchorEl: this.state.anchorEl, keepMounted: true, open: Boolean(this.state.anchorEl), onClose: this.handleCloseMenu.bind(this), onContextMenu: this.handleContextMenu.bind(this) }, this.menuEditPlotItems())));
        }
        if (this.props.type == "title") {
            return (React.createElement("div", null,
                React.createElement(Menu, { id: "simple-menu", anchorEl: this.state.anchorEl, open: Boolean(this.state.anchorEl), onClose: this.handleCloseMenu.bind(this), onContextMenu: this.handleContextMenu.bind(this) },
                    this.createMenuItem("Add track", this.addTrack),
                    this.createMenuItem("Edit track", this.editTrack),
                    this.createMenuItem("Remove track", this.removeTrack))));
        }
        // For this.props.type == "legends" or this.props.type == "container"
        const track = this.props.track;
        const plots = track.plots;
        return (React.createElement("div", null,
            React.createElement(Menu, { id: "simple-menu", anchorEl: this.state.anchorEl, keepMounted: true, open: Boolean(this.state.anchorEl), onClose: this.handleCloseMenu.bind(this), onContextMenu: this.handleContextMenu.bind(this) },
                track.options.plotFactory
                    ? [this.createMenuItem("Add plot", this.addPlot)]
                    : !isScaleTrack(track)
                        ? [this.createMenuItem("Edit track", this.editTrack)]
                        : [],
                plots && plots.length
                    ? [
                        this.createMenuItem("Edit plot", this.editPlots),
                        this.createMenuItem("Remove plot", this.removePlots),
                    ]
                    : [])));
    }
}
export function editPlots(parent, wellLogView, track) {
    const plots = track.plots;
    if (plots && plots.length <= 1) {
        if (plots.length === 1)
            wellLogView.editPlot(parent, track, plots[0]);
        return;
    }
    const el = document.createElement("div");
    el.style.width = "10px";
    el.style.height = "13px";
    if (parent)
        parent.appendChild(el);
    ReactDOM.render(React.createElement(SimpleMenu, { type: "editPlots", anchorEl: el, wellLogView: wellLogView, track: track }), el);
}
export function removePlots(parent, wellLogView, track) {
    const plots = track.plots;
    if (plots && plots.length <= 1) {
        if (plots.length === 1)
            wellLogView.removeTrackPlot(track, plots[0]);
        return;
    }
    const el = document.createElement("div");
    el.style.width = "10px";
    el.style.height = "13px";
    if (parent)
        parent.appendChild(el);
    ReactDOM.render(React.createElement(SimpleMenu, { type: "removePlots", anchorEl: el, wellLogView: wellLogView, track: track }), el);
}
//# sourceMappingURL=LocalMenus.js.map