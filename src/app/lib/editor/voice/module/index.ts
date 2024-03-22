import NodeEditor from "@/app/lib/editor";
import { NodeVoice, TYPE_NODE_VOICE } from "@/app/lib/editor/type";

class NodeEditorVoiceModule {
  nodeEditor: NodeEditor;
  constructor(nodeEditor: NodeEditor) {
    this.nodeEditor = nodeEditor;
  }
  add(node: NodeVoice) {
    node.type = TYPE_NODE_VOICE;
    this.nodeEditor.addNode(node);
  }
  delete(id: number) {
    this.nodeEditor.deleteNode(id);
  }
  update(node: NodeVoice) {
    this.nodeEditor.updateNode(node);
  }
}

export default NodeEditorVoiceModule;
