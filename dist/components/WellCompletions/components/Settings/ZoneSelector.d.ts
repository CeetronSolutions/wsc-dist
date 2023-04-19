import React from "react";
import { TreeNodeProps } from "react-dropdown-tree-select";
import "react-dropdown-tree-select/dist/styles.css";
import { Zone } from "../../redux/types";
export declare const findSelectedZones: (stratigraphy: Zone[], selectedNodes: TreeNodeProps[]) => string[];
/**
 * A react component for selecting zones to display in the completions plot
 */
declare const ZoneSelector: React.FC;
export default ZoneSelector;
