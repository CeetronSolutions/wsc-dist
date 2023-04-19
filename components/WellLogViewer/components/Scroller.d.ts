import { Component, ReactNode } from "react";
interface Props {
    /**
     * callback with new scroll positions
     */
    onScroll?: (x: number, y: number) => void;
    children?: ReactNode;
}
declare class Scroller extends Component<Props> {
    scroller: HTMLDivElement | null;
    scrollable: HTMLDivElement | null;
    content: HTMLDivElement | null;
    resizeObserver: ResizeObserver;
    constructor(props: Props);
    componentDidMount(): void;
    componentWillUnmount(): void;
    getScrollX(): number;
    getScrollY(): number;
    getScrollPos(vertical: boolean | undefined): number;
    /**
     * callback from HTML element
     */
    onScroll(): void;
    /**
     * @param x value to set the horizontal beginning of visible part of content (fraction)
     * @param y value to set the vertical beginning of visible part of content (fraction)
     * @returns true if visible part is changed
     */
    scrollTo(x: number, y: number): boolean;
    /**
     * @param xZoom set X zoom factor of visible part of content
     * @param yZoom set Y zoom factor of visible part of content
     * @returns true if visible part is changed
     */
    zoom(xZoom: number, yZoom: number): boolean;
    render(): JSX.Element;
}
export default Scroller;
