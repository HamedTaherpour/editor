import { KeyboardEvent } from "react";

export const TYPE_NODE_TEXT = 0;
export const TYPE_NODE_VOICE = 1;
export const TYPE_NODE_IMAGE = 2;
export const TYPE_NODE_QUOTE = 3;
export const TYPE_NODE_DIVIDER = 4;

export interface JsonEditor {
  name: string;
  nodes: Array<Node>;
}

export class Node {
  type: number;
  id: number;
  clazz?: string;
  focus?: () => void;

  constructor(type: number, clazz?: string) {
    this.id = Date.now();
    this.type = type;
    this.clazz = clazz;
  }
}

export class NodeText extends Node {
  text: any;

  constructor(text: any = "") {
    super(TYPE_NODE_TEXT);
    this.text = text;
  }
}

export class NodeQuote extends Node {
  text: any;

  constructor(text: any = "") {
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
  caption: any;

  constructor(path: string = "", caption: string = "") {
    super(TYPE_NODE_IMAGE);
    this.path = path;
    this.caption = caption;
  }
}

export class NodeDivider extends Node {
  constructor() {
    super(TYPE_NODE_DIVIDER);
  }
}

export interface OnJsonEditorUpdateListener {
  onUpdate(jsonEditor: JsonEditor): void;
}

export interface OnNodeBehavior {
  onDelete(node: Node): void;
  onUpdate(node: Node): void;
  onKeyUp(e: KeyboardEvent<HTMLElement>, index: number): void;
  onTransition(typeTransition: number, index: number): void;
}
