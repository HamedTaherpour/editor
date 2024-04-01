export const TYPE_NODE_TEXT = 0;
export const TYPE_NODE_VOICE = 1;
export const TYPE_NODE_IMAGE = 2;
export const TYPE_NODE_QUOTE = 3;

export interface JsonEditor {
  name: string;
  nodes: Array<Node>;
}

export class Node {
  type: number;
  id: number;
  clazz?: string;

  constructor(type: number, clazz?: string) {
    this.id = Date.now();
    this.type = type;
    this.clazz = clazz;
  }
}

export class NodeText extends Node {
  text: string;

  constructor(text: string = "") {
    super(TYPE_NODE_TEXT);
    this.text = text;
  }
}

export class NodeQuote extends Node {
  text: string;

  constructor(text: string = "") {
    super(TYPE_NODE_QUOTE);
    this.text = text;
    this.clazz = "my-5";
  }
}

export class NodeVoice extends Node {
  path: string;

  constructor(path: string = "") {
    super(TYPE_NODE_VOICE);
    this.path = path;
  }
}

export class NodeImage extends Node {
  path: string;

  constructor(path: string = "") {
    super(TYPE_NODE_IMAGE);
    this.path = path;
  }
}

export interface OnJsonEditorUpdateListener {
  onUpdate(jsonEditor: JsonEditor): void;
}

export interface OnUpdateNodeListener {
  onUpdate(node: Node): void;
}

export interface OnPressEnterNodeListener {
  onClick(index?: number): void;
}

export interface OnRightClickNodeListener {
  onRightClick(node: Node, posX: number, posY: number): void;
}

export interface OnDeleteNodeListener {
  onDelete(node: Node): void;
}

export interface OnAddNodeFromChildNodeListener {
  onAdd(type: number): void;
}
