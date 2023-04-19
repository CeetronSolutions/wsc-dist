import React, { Component } from "react";
function getScrollbarSizes() {
    // Creating invisible container
    const outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.overflow = "scroll"; // forcing scrollbar to appear
    //!!! commented to avoid error TS2339: Property 'msOverflowStyle' does not exist on type 'CSSStyleDeclaration'.
    //!!! outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
    document.body.appendChild(outer);
    const vertical = outer.offsetWidth - outer.clientWidth;
    const horizontal = outer.offsetHeight - outer.clientHeight;
    // Removing temporary elements from the DOM
    document.body.removeChild(outer);
    return { vertical, horizontal };
}
class Scroller extends Component {
    constructor(props) {
        super(props);
        this.scroller = null;
        this.scrollable = null;
        this.content = null;
        this.resizeObserver = new ResizeObserver((entries) => {
            const entry = entries[0];
            if (entry && entry.target) {
                const Width = entry.target.offsetWidth;
                const Height = entry.target.offsetHeight;
                if (this.content) {
                    const { vertical, horizontal } = getScrollbarSizes();
                    this.content.style.width = Width - vertical + "px";
                    this.content.style.height = Height - horizontal + "px";
                }
            }
        });
        this.onScroll = this.onScroll.bind(this);
    }
    componentDidMount() {
        if (this.scroller)
            this.resizeObserver.observe(this.scroller);
    }
    componentWillUnmount() {
        if (this.scroller)
            this.resizeObserver.unobserve(this.scroller);
    }
    /* current position access functions */
    getScrollX() {
        const elOuter = this.scroller;
        if (!elOuter)
            return 0;
        const scrollWidth = elOuter.scrollWidth - elOuter.clientWidth;
        return scrollWidth ? elOuter.scrollLeft / scrollWidth : 0;
    }
    getScrollY() {
        const elOuter = this.scroller;
        if (!elOuter)
            return 0;
        const scrollHeight = elOuter.scrollHeight - elOuter.clientHeight;
        return scrollHeight ? elOuter.scrollTop / scrollHeight : 0;
    }
    getScrollPos(vertical) {
        return vertical ? this.getScrollY() : this.getScrollX();
    }
    /**
     * callback from HTML element
     */
    onScroll() {
        const elOuter = this.scroller;
        if (!elOuter)
            return;
        // notify parent
        if (this.props.onScroll)
            this.props.onScroll(this.getScrollX(), this.getScrollY());
    }
    /* functions to externally set zoom and scroll position */
    /**
     * @param x value to set the horizontal beginning of visible part of content (fraction)
     * @param y value to set the vertical beginning of visible part of content (fraction)
     * @returns true if visible part is changed
     */
    scrollTo(x, y) {
        if (x < 0.0)
            x = 0.0;
        else if (x > 1.0)
            x = 1.0;
        if (y < 0.0)
            y = 0.0;
        else if (y > 1.0)
            y = 1.0;
        const elOuter = this.scroller;
        if (!elOuter)
            return false;
        const scrollLeft = Math.round(x * (elOuter.scrollWidth - elOuter.clientWidth));
        const scrollTop = Math.round(y * (elOuter.scrollHeight - elOuter.clientHeight));
        if (elOuter.scrollLeft !== scrollLeft ||
            elOuter.scrollTop !== scrollTop) {
            elOuter.scrollTo(scrollLeft, scrollTop);
            return true;
        }
        return false;
    }
    /**
     * @param xZoom set X zoom factor of visible part of content
     * @param yZoom set Y zoom factor of visible part of content
     * @returns true if visible part is changed
     */
    zoom(xZoom, yZoom) {
        const elOuter = this.scroller;
        if (!elOuter)
            return false;
        const elInner = this.scrollable;
        if (!elInner)
            return false;
        const widthInner = Math.round(elOuter.clientWidth * xZoom) + "px";
        const heightInner = Math.round(elOuter.clientHeight * yZoom) + "px";
        if (elInner.style.width !== widthInner ||
            elInner.style.height !== heightInner) {
            elInner.style.width = widthInner;
            elInner.style.height = heightInner;
            return true;
        }
        return false;
    }
    render() {
        return (React.createElement("div", { ref: (el) => (this.scroller = el), style: { overflow: "scroll", width: "100%", height: "100%" }, onScroll: this.onScroll },
            React.createElement("div", { ref: (el) => (this.scrollable = el) },
                React.createElement("div", { ref: (el) => (this.content = el), style: { position: "absolute" } }, this.props.children))));
    }
}
export default Scroller;
//# sourceMappingURL=Scroller.js.map