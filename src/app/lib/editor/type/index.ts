import { KeyboardEvent } from "react";
import { ToolsColorStyleItemTextEditor } from "../../editor-text/type";

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
  backgroundColor: string;
  fontColor: string;
  focus?: () => void;

  constructor(type: number, clazz?: string) {
    this.id = Date.now();
    this.type = type;
    this.clazz = clazz;
    this.backgroundColor = "";
    this.fontColor = "";
  }
}

export class NodeText extends Node {
  text: any;
  plainText: string;
  baseTag: string = "p";

  constructor(text: any = "", plainText: string = "") {
    super(TYPE_NODE_TEXT);
    this.text = text;
    this.plainText = plainText;
  }
}

export class NodeQuote extends Node {
  text: any;
  plainText: string;
  baseTag: string = "p";

  constructor(text: any = "", plainText: string = "") {
    super(TYPE_NODE_QUOTE);
    this.text = text;
    this.plainText = plainText;
    this.clazz = "my-3";
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
  width?: number;
  verticallyAlign: string;

  constructor(path: string = "", caption: string = "") {
    super(TYPE_NODE_IMAGE);
    this.path = path;
    this.caption = caption;
    this.clazz = "my-3";
    this.verticallyAlign = "center";
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
  toolsMenu: Array<any>;
  isClipboardExists(): boolean;
  onStyle(style: ToolsColorStyleItemTextEditor, type: string, index: number): void;
  onCopy(node: Node): void;
  onPast(index: number): void;
  onDelete(node: Node): void;
  onUpdate(node: Node): void;
  onKeyUp(e: KeyboardEvent<HTMLElement>, index: number): void;
  onTransition(typeTransition: number, index: number): void;
}

export interface ImageVerticallyAlignItems {
  [key: string]: ImageVerticallyAlign;
}

export interface ImageVerticallyAlign {
  clazz: string;
  icon: string;
}
