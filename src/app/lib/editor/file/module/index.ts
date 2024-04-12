import NodeEditor from "@/app/lib/editor";
import { NodeFile, TYPE_NODE_FILE } from "@/app/lib/editor/type";

class NodeEditorFileModule {
  nodeEditor: NodeEditor;
  constructor(nodeEditor: NodeEditor) {
    this.nodeEditor = nodeEditor;
  }
  add(node: NodeFile, index?: number) {
    node.type = TYPE_NODE_FILE;
    this.nodeEditor.addNode(node, index);
  }
  delete(id: number) {
    this.nodeEditor.deleteNode(id);
  }
  update(node: NodeFile) {
    this.nodeEditor.updateNode(node);
  }
}

export default NodeEditorFileModule;
