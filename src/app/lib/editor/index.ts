import { JsonEditor, Node, OnJsonEditorUpdateListener } from "@/app/lib/editor/type";

class Editor {
  jsonEditor: JsonEditor;
  onJsonEditorUpdateListener: OnJsonEditorUpdateListener | undefined;

  constructor(jsonEditor: JsonEditor) {
    this.jsonEditor = jsonEditor;
  }

  setOnJsonEditorUpdateListener(onJsonEditorUpdateListener: OnJsonEditorUpdateListener) {
    this.onJsonEditorUpdateListener = onJsonEditorUpdateListener;
  }

  addNode(node: Node, index: number = -1) {
    node.id = this.generateUniqueID();
    if (index > 0) this.jsonEditor.nodes.splice(index, 0, node);
    else this.jsonEditor.nodes.push(node);

    this.onJsonEditorUpdateListener?.onUpdate(this.jsonEditor);
  }

  updateNode(node: Node) {
    const index = this.jsonEditor.nodes.findIndex((item) => item.id === node.id);
    if (index > -1) {
      this.jsonEditor.nodes[index] = node;
      this.onJsonEditorUpdateListener?.onUpdate(this.jsonEditor);
    } else {
      alert("id not found" + node.id);
    }
  }

  deleteNode(id: number) {
    const index = this.jsonEditor.nodes.findIndex((item) => item.id === id);

    if (index > -1) {
      this.jsonEditor.nodes.splice(index, 1);
      this.onJsonEditorUpdateListener?.onUpdate(this.jsonEditor);
    } else {
      alert("id not found" + id);
    }
  }

  moveNode(fromIndex: number, toIndex: number) {
    var element = this.jsonEditor.nodes[fromIndex];
    this.jsonEditor.nodes.splice(fromIndex, 1);
    this.jsonEditor.nodes.splice(toIndex, 0, element);
    this.onJsonEditorUpdateListener?.onUpdate(this.jsonEditor);
  }

  generateUniqueID() {
    const time = new Date().getTime().toString().slice(6, 10);
    const randomeNumber = Math.floor(Math.random() * (9 - 0) + 0);
    return parseInt(`${time}${randomeNumber}${this.jsonEditor.nodes.length}`);
  }
}

export default Editor;
