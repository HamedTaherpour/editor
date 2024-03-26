import NodeEditor from "@/app/lib/editor";
import { NodeText, TYPE_NODE_TEXT } from "@/app/lib/editor/type";

class NodeEditorTextModule {
  nodeEditor: NodeEditor;
  constructor(nodeEditor: NodeEditor) {
    this.nodeEditor = nodeEditor;
  }
  add(node: NodeText, index?: number) {
    node.type = TYPE_NODE_TEXT;
    this.nodeEditor.addNode(node, index);
  }
  delete(id: number) {
    this.nodeEditor.deleteNode(id);
  }
  update(node: NodeText) {
    this.nodeEditor.updateNode(node);
  }
}

export default NodeEditorTextModule;
