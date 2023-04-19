/**
 * Copyright (c) 2021- Equinor ASA
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import { SmartNodeSelectorPropsType, TreeDataNode, SmartNodeSelectorComponent } from "@webviz/core-components";
import { KeyEventType } from "@webviz/core-components/dist/components/SmartNodeSelector/components/SmartNodeSelectorComponent";
import VectorSelection from "../utils/VectorSelection";
declare type VectorDefinitionsType = {
    [key: string]: {
        type: string;
        description: string;
    };
};
declare type VectorSelectorPropsType = SmartNodeSelectorPropsType & {
    customVectorDefinitions?: VectorDefinitionsType;
};
/**
 * SmartNodeSelector is a component that allows to create tags by selecting data from a tree structure.
 * The tree structure can also provide meta data that is displayed as color or icon.
 */
export default class VectorSelectorComponent extends SmartNodeSelectorComponent {
    props: VectorSelectorPropsType;
    protected vectorDefinitions: VectorDefinitionsType;
    constructor(props: VectorSelectorPropsType);
    componentDidUpdate(prevProps: VectorSelectorPropsType): void;
    createNewNodeSelection(nodePath?: string[]): VectorSelection;
    modifyTreeData(treeData: TreeDataNode[], numMetaNodes: number, vectorDefinitions: VectorDefinitionsType): TreeDataNode[];
    handleArrowLeftKeyEvent(e: React.KeyboardEvent<HTMLInputElement>, eventType: KeyEventType): void;
    handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void;
}
export {};
