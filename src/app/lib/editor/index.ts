import {
  JsonEditor,
  Node,
  OnJsonEditorUpdateListener,
} from "@/app/lib/editor/type";

class Editor {
  jsonEditor: JsonEditor;
  onJsonEditorUpdateListener: OnJsonEditorUpdateListener | undefined;

  constructor(jsonEditor: JsonEditor) {
    this.jsonEditor = jsonEditor;
  }

  setOnJsonEditorUpdateListener(
    onJsonEditorUpdateListener: OnJsonEditorUpdateListener
  ) {
    this.onJsonEditorUpdateListener = onJsonEditorUpdateListener;
  }

  addNode(node: Node) {
    if (this.jsonEditor) {
      this.jsonEditor.nodes.push(node);
      this.onJsonEditorUpdateListener?.onUpdate(this.jsonEditor);
    }
  }

  updateNode(node: Node) {
    if (!this.jsonEditor) return;
    const index = this.jsonEditor.nodes.findIndex(
      (item) => item.id === node.id
    );
    if (index > -1) {
      this.jsonEditor.nodes[index] = node;
      this.onJsonEditorUpdateListener?.onUpdate(this.jsonEditor);
    } else {
      alert("id not found" + node.id);
    }
  }

  deleteNode(id: number) {
    if (!this.jsonEditor) return;
    const index = this.jsonEditor.nodes.findIndex((item) => item.id === id);
    if (index > -1) {
      this.jsonEditor.nodes.splice(index, 1);
      this.onJsonEditorUpdateListener?.onUpdate(this.jsonEditor);
    } else {
      alert("id not found" + id);
    }
  }
}

export default Editor;
