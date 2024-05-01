import NodeEditor from "../../index";
import { NodeDivider, TYPE_NODE_DIVIDER } from "../../type";

class NodeEditorDividerModule {
  nodeEditor: NodeEditor;
  constructor(nodeEditor: NodeEditor) {
    this.nodeEditor = nodeEditor;
  }
  add(node: NodeDivider, index?: number) {
    node.type = TYPE_NODE_DIVIDER;
    this.nodeEditor.addNode(node, index);
  }
  delete(id: number) {
    this.nodeEditor.deleteNode(id);
  }
  update(node: NodeDivider) {
    this.nodeEditor.updateNode(node);
  }
}

export default NodeEditorDividerModule;
