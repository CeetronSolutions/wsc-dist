/**
 * Copyright (c) 2021- Equinor ASA
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { TreeNodeSelection, TreeData } from "@webviz/core-components";
export default class VectorSelection extends TreeNodeSelection {
    private myTreeData;
    constructor(argumentObject: {
        focussedLevel: number;
        nodePath: Array<string>;
        selected: boolean;
        delimiter: string;
        numMetaNodes: number;
        treeData: TreeData;
        caseInsensitiveMatching: boolean;
        allowOrOperator: boolean;
    });
    setNodeName(data: string, index?: number): void;
    incrementFocussedLevel(): boolean;
    decrementFocussedLevel(): void;
    setFocussedLevel(index: number, includeMetaData?: boolean): void;
    containsOrIsContainedBy(other: VectorSelection): boolean;
    containsWildcardIncludingType(): boolean;
    containsWildcard(): boolean;
    getCompleteNodePathAsString(): string;
    exactlyMatchedNodePaths(): Array<string>;
    clone(): VectorSelection;
}
