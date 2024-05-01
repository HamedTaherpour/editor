import NodeEditor from "../../index";
import { NodeVoice, TYPE_NODE_VOICE } from '../../type';

class NodeEditorVoiceModule {
  nodeEditor: NodeEditor;
  constructor(nodeEditor: NodeEditor) {
    this.nodeEditor = nodeEditor;
  }
  add(node: NodeVoice, index?: number) {
    node.type = TYPE_NODE_VOICE;
    this.nodeEditor.addNode(node, index);
  }
  delete(id: number) {
    this.nodeEditor.deleteNode(id);
  }
  update(node: NodeVoice) {
    this.nodeEditor.updateNode(node);
  }
}

export default NodeEditorVoiceModule;
