import NodeEditor from "@/app/lib/editor";
import { NodeImage, TYPE_NODE_IMAGE } from "@/app/lib/editor/type";

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
