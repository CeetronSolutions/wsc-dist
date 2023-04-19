import React, { Component } from "react";
import WellLogView from "./WellLogView";
import { argTypesWellLogViewProp } from "./WellLogView";
import { _propTypesWellLogView } from "./WellLogView";
import Scroller from "./Scroller";
export const argTypesWellLogViewScrollerProp = argTypesWellLogViewProp;
class WellLogViewWithScroller extends Component {
    constructor(props) {
        super(props);
        this.controller = null;
        this.scroller = null;
        this.onCreateController = this.onCreateController.bind(this);
        this.onScrollerScroll = this.onScrollerScroll.bind(this);
        this.onTrackScroll = this.onTrackScroll.bind(this);
        this.onTrackSelection = this.onTrackSelection.bind(this);
        this.onContentRescale = this.onContentRescale.bind(this);
        this.onContentSelection = this.onContentSelection.bind(this);
    }
    componentDidMount() {
        this.setScrollerPosAndZoom();
    }
    shouldComponentUpdate(nextProps) {
        return !Object.is(this.props, nextProps);
    }
    updateReadoutPanel() {
        const controller = this.controller;
        if (controller)
            controller.selectContent(controller.getContentSelection()); // force to update readout panel
    }
    // callback function from WellLogView
    onCreateController(controller) {
        this.controller = controller;
        if (this.props.onCreateController)
            // set callback to component's caller
            this.props.onCreateController(controller);
    }
    // callback function from WellLogView
    onTrackScroll() {
        this.setScrollerPosAndZoom();
        if (this.props.onTrackScroll)
            this.props.onTrackScroll();
    }
    // callback function from WellLogView
    onTrackSelection() {
        if (this.props.onTrackSelection)
            this.props.onTrackSelection();
    }
    // callback function from WellLogView
    onContentRescale() {
        this.setScrollerPosAndZoom();
        if (this.props.onContentRescale)
            this.props.onContentRescale();
    }
    // callback function from WellLogView
    onContentSelection() {
        if (this.props.onContentSelection)
            this.props.onContentSelection();
    }
    // callback function from Scroller
    onScrollerScroll(x, y) {
        const controller = this.controller;
        if (!controller)
            return;
        const fContent = this.props.horizontal ? x : y; // fraction
        controller.scrollContentTo(fContent);
        const posTrack = this.calcPosTrack(this.props.horizontal ? y : x);
        controller.scrollTrackTo(posTrack);
    }
    calcPosTrack(f) {
        const controller = this.controller;
        if (!controller)
            return 0;
        const posMax = controller.getTrackScrollPosMax();
        const posTrack = f * posMax;
        return Math.round(posTrack);
    }
    getContentPosFraction() {
        const controller = this.controller;
        if (!controller)
            return 0;
        const baseDomain = controller.getContentBaseDomain();
        const domain = controller.getContentDomain();
        const w = baseDomain[1] - baseDomain[0] - (domain[1] - domain[0]);
        return w ? (domain[0] - baseDomain[0]) / w : 0;
    }
    getTrackPosFraction() {
        const controller = this.controller;
        if (!controller)
            return 0;
        return controller.getTrackScrollPosMax()
            ? controller.getTrackScrollPos() / controller.getTrackScrollPosMax()
            : 0.0;
    }
    setScrollerPosAndZoom() {
        let x, y;
        let xZoom, yZoom;
        const scroller = this.scroller;
        if (!scroller)
            return;
        const controller = this.controller;
        if (!controller) {
            x = y = 0.0;
            xZoom = yZoom = 1.0;
        }
        else {
            const contentZoom = controller.getContentZoom();
            const trackZoom = controller.getTrackZoom();
            xZoom = this.props.horizontal ? contentZoom : trackZoom;
            yZoom = this.props.horizontal ? trackZoom : contentZoom;
            const fContent = this.getContentPosFraction();
            const fTrack = this.getTrackPosFraction();
            x = this.props.horizontal ? fContent : fTrack;
            y = this.props.horizontal ? fTrack : fContent;
        }
        scroller.zoom(xZoom, yZoom);
        let shouldUpdateScroller = 2;
        {
            // compare with current values from scroller
            const _x = scroller.getScrollX();
            const _y = scroller.getScrollY();
            const _posTrack = this.calcPosTrack(this.props.horizontal ? _y : _x);
            const posTrack = this.calcPosTrack(this.props.horizontal ? y : x);
            if (posTrack === _posTrack) {
                shouldUpdateScroller--;
                this.props.horizontal ? (y = _y) : (x = _x);
            }
            const _fContent = this.props.horizontal ? _x : _y;
            const fContent = this.props.horizontal ? x : y;
            if (Math.abs(fContent - _fContent) < 0.001) {
                shouldUpdateScroller--;
                this.props.horizontal ? (x = _x) : (y = _y);
            }
        }
        if (shouldUpdateScroller)
            scroller.scrollTo(x, y);
    }
    render() {
        return (React.createElement(Scroller, { ref: (el) => (this.scroller = el), onScroll: this.onScrollerScroll },
            React.createElement(WellLogView
            // copy all props
            , Object.assign({}, this.props, { 
                // redefine some callbacks
                onCreateController: this.onCreateController, onTrackScroll: this.onTrackScroll, onTrackSelection: this.onTrackSelection, onContentRescale: this.onContentRescale, onContentSelection: this.onContentSelection }))));
    }
}
WellLogViewWithScroller.propTypes = _propTypesWellLogView(); // WellLogView.propTypes;
export default WellLogViewWithScroller;
//# sourceMappingURL=WellLogViewWithScroller.js.map