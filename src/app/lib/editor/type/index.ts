export const TYPE_NODE_TEXT = 0;
export const TYPE_NODE_VOICE = 1;
export const TYPE_NODE_IMAGE = 2;

export interface JsonEditor {
  name: string;
  nodes: Array<Node>;
}

export class Node {
  type: number;
  id: number;

  constructor(type: number) {
    this.id = Date.now();
    this.type = type;
  }
}

export class NodeText extends Node {
  text: string;

  constructor(text: string = "") {
    super(TYPE_NODE_TEXT);
    this.text = text;
  }
}

export class NodeVoice extends Node {
  path: string;

  constructor(path: string = "") {
    super(TYPE_NODE_TEXT);
    this.path = path;
  }
}

export class NodeImage extends Node {
  path: string;

  constructor(path: string = "") {
    super(TYPE_NODE_TEXT);
    this.path = path;
  }
}

export interface OnJsonEditorUpdateListener {
  onUpdate(jsonEditor: JsonEditor): void;
}

export interface OnUpdateNodeListener {
  onUpdate(node: Node): void;
}

export interface OnDeleteNodeListener {
  onDelete(node: Node): void;
}
