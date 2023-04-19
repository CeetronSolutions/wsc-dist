import * as d3 from "d3";
export const getLayout = (width, height, padding = { bottom: 0, top: 0, left: 0, right: 0 }) => {
    const xRange = [padding.left, width - padding.right];
    const yRange = [height - padding.bottom, padding.top];
    const xExtent = Math.abs(xRange[0] - xRange[1]);
    const yExtent = Math.abs(yRange[0] - yRange[1]);
    const topLeft = [padding.left, padding.top];
    const bottomRight = [
        width - padding.right,
        height - padding.bottom,
    ];
    return {
        width: width,
        height: height,
        xRange: xRange,
        yRange: yRange,
        xExtent: xExtent,
        yExtent: yExtent,
        topLeft: topLeft,
        bottomRight: bottomRight,
    };
};
export const updateOrCreate = (selection, element, elementClass) => {
    if (selection.select(element + "." + elementClass).empty())
        return selection.append(element).attr("class", elementClass);
    return selection.select(element + "." + elementClass);
};
export const getSvg = (div, id = "default") => {
    const boundingRect = div.getBoundingClientRect();
    return d3
        .select(div)
        .call(updateOrCreate, "svg", "svg-context-" + id)
        .select("svg.svg-context-" + id)
        .style("position", "relative")
        .attr("width", boundingRect.width)
        .attr("height", boundingRect.height)
        .attr("id", "svg-context-" + id);
};
//# sourceMappingURL=plotUtil.js.map