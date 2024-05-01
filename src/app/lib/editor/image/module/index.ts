import NodeEditor from "../../index";
import { NodeImage, TYPE_NODE_IMAGE } from "../../type";

class NodeEditorImageModule {
  nodeEditor: NodeEditor;
  constructor(nodeEditor: NodeEditor) {
    this.nodeEditor = nodeEditor;
  }
  add(node: NodeImage, index?: number) {
    node.type = TYPE_NODE_IMAGE;
    this.nodeEditor.addNode(node, index);
  }
  delete(id: number) {
    this.nodeEditor.deleteNode(id);
  }
  update(node: NodeImage) {
    this.nodeEditor.updateNode(node);
  }
}

export default NodeEditorImageModule;
