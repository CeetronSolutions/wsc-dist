/**
 * Group tree visualization. Creates an _svg, and appends to the assigned element.
 * Draws the tree provided as tree_data

 * @constructor
 */
export default class GroupTree {
    /**
     * Initialize all trees in the group tree datastructure, once for the entire visualization.
     *
     */
    static initHierarchies(tree_data: any, height: any): any;
    /**
     *
     * @param dom_element_id
     * @param {group-tree-data} tree_data
     * @param defaultFlowrate
     */
    constructor(dom_element_id: any, tree_data: any, defaultFlowrate: any, defaultNodeInfo: any, currentDateTime: any, edge_options: any, node_options: any);
    _propertyToLabelMap: Map<any, any>;
    _currentFlowrate: any;
    _currentNodeInfo: any;
    _currentDateTime: any;
    _transitionTime: number;
    _path_scale: Map<any, any>;
    _width: number;
    _svg: d3.Selection<SVGGElement, any, null, undefined>;
    _textpaths: d3.Selection<SVGGElement, any, null, undefined>;
    _renderTree: d3.TreeLayout<any>;
    _data: any;
    _currentTree: {};
    /**
     * @returns {*} -The initialized hierarchical group tree data structure
     */
    get data(): any;
    /**
     * Set the flowrate and update display of all edges accordingly.
     *
     * @param flowrate - key identifying the flowrate of the incoming edge
     */
    set flowrate(arg: any);
    get flowrate(): any;
    set nodeinfo(arg: any);
    get nodeinfo(): any;
    getEdgeStrokeWidth(key: any, val: any): string;
    /**
     * Sets the state of the current tree, and updates the tree visualization accordingly.
     * The state is changed either due to a branch open/close, or that the tree is entirely changed
     * when moving back and fourth in time.
     *
     * @param root
     */
    update(newDateTime: any): void;
}
import * as d3 from "d3";
