import { TreeData, SmartNodeSelectorComponent, } from "@webviz/core-components";
import { KeyEventType, Direction, } from "@webviz/core-components/dist/components/SmartNodeSelector/components/SmartNodeSelectorComponent";
import VectorSelection from "../utils/VectorSelection";
import aquifer from "./images/aquifer.svg";
import block from "./images/block.svg";
import field from "./images/field.svg";
import group from "./images/group.svg";
import misc from "./images/misc.svg";
import network from "./images/network.svg";
import others from "./images/others.svg";
import region from "./images/region.svg";
import region_region from "./images/region-region.svg";
import segment from "./images/segment.svg";
import well from "./images/well.svg";
import well_completion from "./images/well-completion.svg";
import calculated from "./images/calculated.svg";
// @rmt: Changed require to import
import vectorDefinitions from "../../../assets/VectorDefinitions.json";
/**
 * SmartNodeSelector is a component that allows to create tags by selecting data from a tree structure.
 * The tree structure can also provide meta data that is displayed as color or icon.
 */
export default class VectorSelectorComponent extends SmartNodeSelectorComponent {
    constructor(props) {
        super(props);
        this.props = props;
        this.vectorDefinitions = vectorDefinitions;
        if (props.customVectorDefinitions) {
            Object.keys(props.customVectorDefinitions).forEach((vectorName) => {
                this.vectorDefinitions[vectorName] = props.customVectorDefinitions[vectorName];
            });
        }
        let error = undefined;
        try {
            this.treeData = new TreeData({
                treeData: this.modifyTreeData(props.data, props.numMetaNodes, this.vectorDefinitions),
                delimiter: props.delimiter,
                allowOrOperator: props.useBetaFeatures || false,
            });
        }
        catch (e) {
            this.treeData = null;
            error = e;
        }
        const nodeSelections = [];
        if (props.selectedTags !== undefined) {
            for (const tag of props.selectedTags) {
                const nodePath = tag.split(this.props.delimiter);
                nodePath.splice(props.numMetaNodes, 0, "*");
                nodeSelections.push(this.createNewNodeSelection(nodePath));
            }
        }
        if (nodeSelections.length < props.maxNumSelectedNodes ||
            props.maxNumSelectedNodes === -1) {
            nodeSelections.push(this.createNewNodeSelection());
        }
        this.state = {
            nodeSelections,
            currentTagIndex: 0,
            suggestionsVisible: false,
            showAllSuggestions: false,
            hasError: error !== undefined,
            error: error || "",
            currentTagShaking: false,
        };
    }
    componentDidUpdate(prevProps) {
        if (this.updateFromWithin) {
            this.updateFromWithin = false;
            return;
        }
        if (this.props.customVectorDefinitions &&
            JSON.stringify(this.props.customVectorDefinitions) !==
                JSON.stringify(prevProps.customVectorDefinitions)) {
            this.vectorDefinitions = vectorDefinitions;
            Object.keys(this.props.customVectorDefinitions).forEach((vectorName) => {
                this.vectorDefinitions[vectorName] = this.props
                    .customVectorDefinitions[vectorName];
            });
        }
        if ((this.props.data &&
            JSON.stringify(this.props.data) !==
                JSON.stringify(prevProps.data)) ||
            (this.props.delimiter &&
                this.props.delimiter !== prevProps.delimiter) ||
            (this.props.numMetaNodes &&
                this.props.numMetaNodes !== prevProps.numMetaNodes)) {
            let error;
            try {
                this.treeData = new TreeData({
                    treeData: this.modifyTreeData(this.props.data, this.props.numMetaNodes, this.vectorDefinitions),
                    delimiter: this.props.delimiter,
                    allowOrOperator: this.props.useBetaFeatures || false,
                });
            }
            catch (e) {
                this.treeData = null;
                error = e;
            }
            const nodeSelections = [];
            for (const node of this.state.nodeSelections) {
                nodeSelections.push(this.createNewNodeSelection(node.getNodePath()));
            }
            this.setState({
                nodeSelections: nodeSelections,
                currentTagIndex: this.state.currentTagIndex,
                suggestionsVisible: this.state.suggestionsVisible,
                hasError: error !== undefined,
                error: error || "",
            }, () => {
                this.updateSelectedTagsAndNodes();
            });
        }
        const selectedTags = this.state.nodeSelections
            .filter((nodeSelection) => nodeSelection.isValid())
            .map((nodeSelection) => nodeSelection.getCompleteNodePathAsString());
        if (this.props.selectedTags &&
            JSON.stringify(this.props.selectedTags) !==
                JSON.stringify(selectedTags) &&
            JSON.stringify(prevProps.selectedTags) !==
                JSON.stringify(this.props.selectedTags)) {
            const nodeSelections = [];
            if (this.props.selectedTags !== undefined) {
                for (const tag of this.props.selectedTags) {
                    const nodePath = tag.split(this.props.delimiter);
                    nodePath.splice(this.props.numMetaNodes, 0, "*");
                    nodeSelections.push(this.createNewNodeSelection(nodePath));
                }
            }
            if (nodeSelections.length < this.props.maxNumSelectedNodes ||
                this.props.maxNumSelectedNodes === -1) {
                nodeSelections.push(this.createNewNodeSelection());
            }
            this.numValidSelections = this.countValidSelections();
            this.updateState({ nodeSelections: nodeSelections });
        }
    }
    createNewNodeSelection(nodePath = [""]) {
        return new VectorSelection({
            focussedLevel: nodePath.length - 1,
            nodePath: nodePath,
            selected: false,
            delimiter: this.props.delimiter,
            numMetaNodes: this.props.numMetaNodes + 1,
            treeData: this.treeData,
            caseInsensitiveMatching: this.props.caseInsensitiveMatching || false,
            allowOrOperator: this.props.useBetaFeatures || false,
        });
    }
    modifyTreeData(treeData, numMetaNodes, vectorDefinitions) {
        const typeIcons = {
            aquifer: aquifer,
            block: block,
            calculated: calculated,
            field: field,
            group: group,
            misc: misc,
            network: network,
            others: others,
            region: region,
            "region-region": region_region,
            segment: segment,
            well: well,
            "well-completion": well_completion,
        };
        const populateData = (data, level) => {
            const newData = [];
            if (level === numMetaNodes && data) {
                const types = {};
                for (let i = 0; i < data.length; i++) {
                    let type = "others";
                    if (data[i].name in vectorDefinitions) {
                        const asKey = data[i]
                            .name;
                        type = vectorDefinitions[asKey].type;
                    }
                    if (!(type in types)) {
                        types[type] = [];
                    }
                    if (!data[i].description &&
                        data[i].name in vectorDefinitions) {
                        data[i].description =
                            vectorDefinitions[data[i].name].description || "";
                    }
                    types[type].push(data[i]);
                }
                for (const type in types) {
                    newData.push({
                        name: type.charAt(0).toUpperCase() + type.slice(1),
                        description: vectorDefinitions[type]
                            ? vectorDefinitions[type].description
                            : "",
                        icon: typeIcons[type],
                        children: types[type],
                    });
                }
            }
            else if (data) {
                for (let i = 0; i < data.length; i++) {
                    newData.push({
                        name: data[i].name,
                        description: data[i].description || "",
                        color: data[i].color,
                        children: populateData(data[i].children, level + 1),
                    });
                }
            }
            return newData;
        };
        return populateData(treeData, 0);
    }
    handleArrowLeftKeyEvent(e, eventType) {
        const eventTarget = e.target;
        if (!eventTarget) {
            return;
        }
        if (eventType === KeyEventType.KeyDown && !e.repeat) {
            if (e.shiftKey &&
                eventTarget.selectionStart === 0 &&
                eventTarget.selectionEnd === 0 &&
                this.currentTagIndex() > 0) {
                super.handleArrowLeftKeyEvent(e, eventType);
                return;
            }
            else {
                if (eventTarget.selectionStart === 0 &&
                    eventTarget.selectionEnd === 0) {
                    if (this.currentNodeSelection() &&
                        this.currentNodeSelection().getFocussedLevel() === 1) {
                        if (this.currentTagIndex() > 0) {
                            this.decrementCurrentTagIndex(() => {
                                this.focusCurrentTag(Direction.Right);
                            });
                        }
                        e.preventDefault();
                        return;
                    }
                }
            }
        }
        super.handleArrowLeftKeyEvent(e, eventType);
        return;
    }
    handleInputChange(e) {
        super.handleInputChange(e);
        this.noUserInputSelect = true;
    }
}
//# sourceMappingURL=VectorSelectorComponent.js.map