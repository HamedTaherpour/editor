import React, { KeyboardEvent, RefObject } from "react";
import { ToolsColorStyleItemTextEditor } from "../../editor-text/type";

export const TYPE_NODE_TEXT = 0;
export const TYPE_NODE_VOICE = 1;
export const TYPE_NODE_IMAGE = 2;
export const TYPE_NODE_QUOTE = 3;
export const TYPE_NODE_DIVIDER = 4;
export const TYPE_NODE_FILE = 5;
export const TYPE_NODE_VIDEO = 6;

export interface JsonEditor extends Array<Node> {
}

export interface ImageEditorOptions {
  enabled?: boolean;
}

export interface TextEditorOptions {
  enabled?: boolean;
}

export interface H1EditorOptions {
  enabled?: boolean;
}

export interface H2EditorOptions {
  enabled?: boolean;
}

export interface H3EditorOptions {
  enabled?: boolean;
}

export interface QuoteEditorOptions {
  enabled?: boolean;
}

export interface BulletEditorOptions {
  enabled?: boolean;
}

export interface BulletNumberEditorOptions {
  enabled?: boolean;
}

export interface VideoEditorOptions {
  enabled?: boolean;
}

export interface FileEditorOptions {
  enabled?: boolean;
}

export interface VoiceEditorOptions {
  enabled?: boolean;
}

export interface DividerEditorOptions {
  enabled?: boolean;
}

export interface EditorOptions {
  image?: ImageEditorOptions;
  text?: TextEditorOptions;
  h1?: H1EditorOptions;
  h2?: H2EditorOptions;
  h3?: H3EditorOptions;
  quote?: QuoteEditorOptions;
  bullet?: BulletEditorOptions;
  bulletNumber?: BulletNumberEditorOptions;
  video?: VideoEditorOptions;
  file?: FileEditorOptions;
  voice?: VoiceEditorOptions;
  divider?: DividerEditorOptions;
}

export class Node {
  type: number;
  id: number;
  clazz?: string | null;
  backgroundColor: string | null;
  fontColor: string | null;
  heroRef?: RefObject<any>;

  constructor(type: number, clazz: string = "") {
    this.id = 1; // set from Editor Class
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
    this.clazz = "node-gap";
    this.backgroundColor = "COLOR_GRAY";
  }
}

export class NodeVoice extends Node {
  url: string;
  fileName: string;
  description: string;

  constructor(url: string = "") {
    super(TYPE_NODE_VOICE);
    this.url = url;
    this.fileName = "";
    this.description = "";
    this.clazz = "node-gap";
  }
}

export class NodeFile extends Node {
  url: string;
  fileName: string;
  fileSize: number;
  description: string;

  constructor(url: string = "") {
    super(TYPE_NODE_FILE);
    this.url = url;
    this.fileName = "";
    this.description = "";
    this.fileSize = 0;
    this.clazz = "node-gap";
  }
}

export class NodeVideo extends Node {
  url: string;
  fileName: string;
  fileSize: number;
  description: string;

  constructor(url: string = "") {
    super(TYPE_NODE_FILE);
    this.url = url;
    this.fileName = "";
    this.description = "";
    this.fileSize = 0;
    this.clazz = "node-gap";
  }
}

export class NodeImage extends Node {
  url: string;
  caption: any;
  width?: number;
  verticallyAlign: string;

  constructor(url: string = "", caption: string = "") {
    super(TYPE_NODE_IMAGE);
    this.url = url;
    this.caption = caption;
    this.clazz = "node-gap";
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

  getToolsMenu(): Array<any>;

  isClipboardExists(): boolean;

  onStyle(style: ToolsColorStyleItemTextEditor, type: string, index: number): void;

  onCopy(node: Node): void;

  onDuplicate(index: number): void;

  onPast(index: number): void;

  onDelete(node: Node): void;

  onUpdate(node: Node): void;

  onKeyUp(e: KeyboardEvent<HTMLElement>, index: number): void;

  onTransition(typeTransition: number, index: number): void;

  onMove(fromIndex: number, toIndex: number): void;

  onUploadFile(file: File): Promise<any>;

  onUploadImage(file: File): Promise<any>;

  onUploadVoice(file: File): Promise<any>;

  onUploadVideo(file: File): Promise<any>;

  onAddNode(type: number, index?: number): void;

  onBtnHeadingItemClick(item: any): void;

  onBtnStyleClick(item: any): void;

  onBtnColorClick(item: ToolsColorStyleItemTextEditor): void;

  onBtnBackgroundClick(item: ToolsColorStyleItemTextEditor): void;

  isTextStyleActive(style: any, method: string): boolean;

  onFocus(index: number): void;

  setOnTextHighlightListener(onTextHighlightListener: OnTextHighlightListener): void;

  onShowTextToolbar(on: boolean): void;

  getCurrentNodeSelectedIndex(): number;

  getCurrentNodeSelected(): Node;

  focusCurrentNodeSelected(): void;

  onBtnShowLinkConfirmClick(): void;

  blurCurrentNodeSelected(): void;

  undo(): void;
}

export interface OnTextHighlightListener {
  onTextHighlight(on: boolean): void;
}

export interface OnUploadFileListener {
  onUploadFile?(file: File): Promise<any>;

  onUploadImage?(file: File): Promise<any>;

  onUploadVoice?(file: File): Promise<any>;

  onUploadVideo?(file: File): Promise<any>;
}

export interface ImageVerticallyAlignItems {
  [key: string]: ImageVerticallyAlign;
}

export interface ImageVerticallyAlign {
  clazz: string;
  icon: string;
}
