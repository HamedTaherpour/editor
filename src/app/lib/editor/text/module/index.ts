import NodeEditor from "@/app/lib/editor";
import {
  NodeText,
  TYPE_NODE_TEXT,
  TYPE_NODE_QUOTE,
  NodeQuote,
} from "@/app/lib/editor/type";

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
  transitionToQuote(node: NodeText) {
    const newNode = new NodeQuote(node.text);
    newNode.id = node.id;
    this.nodeEditor.updateNode(newNode);
  }
}

export default NodeEditorTextModule;
