import NodeEditor from "@/app/lib/editor";
import { NodeQuote, TYPE_NODE_QUOTE } from "@/app/lib/editor/type";

class NodeEditorQuoteModule {
  nodeEditor: NodeEditor;
  constructor(nodeEditor: NodeEditor) {
    this.nodeEditor = nodeEditor;
  }
  add(node: NodeQuote, index?: number) {
    node.type = TYPE_NODE_QUOTE;
    this.nodeEditor.addNode(node, index);
  }
  delete(id: number) {
    this.nodeEditor.deleteNode(id);
  }
  update(node: NodeQuote) {
    this.nodeEditor.updateNode(node);
  }
}

export default NodeEditorQuoteModule;
