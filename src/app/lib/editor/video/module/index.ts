import NodeEditor from "@/app/lib/editor";
import { NodeVideo, TYPE_NODE_VIDEO } from "@/app/lib/editor/type";

class NodeEditorVideoModule {
  nodeEditor: NodeEditor;
  constructor(nodeEditor: NodeEditor) {
    this.nodeEditor = nodeEditor;
  }
  add(node: NodeVideo, index?: number) {
    node.type = TYPE_NODE_VIDEO;
    this.nodeEditor.addNode(node, index);
  }
  delete(id: number) {
    this.nodeEditor.deleteNode(id);
  }
  update(node: NodeVideo) {
    this.nodeEditor.updateNode(node);
  }
}

export default NodeEditorVideoModule;
