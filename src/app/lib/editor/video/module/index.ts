import NodeEditor from '../../index';
import { NodeVideo, TYPE_NODE_VIDEO } from '../../type';

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
