import NodeEditor from "../../index";
import { NodeQuote, NodeText, TYPE_NODE_QUOTE } from "../../type";

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
  transitionToText(node: NodeQuote) {
    const newNode = new NodeText(node.text);
    newNode.id = node.id;
    newNode.baseTag = node.baseTag;
    this.nodeEditor.updateNode(newNode);
  }
}

export default NodeEditorQuoteModule;
