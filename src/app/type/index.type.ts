import { RawDraftContentState } from "draft-js";
import Node from "@/app/module/Node";
import NodeText from "@/app/module/NodeText";
import { KeyboardEvent } from "react";
import NodeImage from "@/app/module/NodeImage";
import NodeFile from "@/app/module/NodeFile";
import NodeVoice from "@/app/module/NodeVoice";
import NodeDivider from "@/app/module/NodeDivider";
import NodeVideo from "@/app/module/NodeVideo";

export const TYPE_NODE_TEXT = 0;
export const TYPE_NODE_VOICE = 1;
export const TYPE_NODE_IMAGE = 2;
export const TYPE_NODE_QUOTE = 3;
export const TYPE_NODE_DIVIDER = 4;
export const TYPE_NODE_FILE = 5;
export const TYPE_NODE_VIDEO = 6;

export type NodeName = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type NodeType = Node<INode> | NodeText | NodeImage | NodeFile | NodeVoice | NodeVideo | NodeDivider;
export type FileUploader = (file: File) => Promise<any>

export interface IEditorStore {
  nodeList: Array<NodeType>;
  onKeyboardHandling?: OnKeyboardHandling;
  options?: EditorOptions,
  currentNodeSelectedIndex: number,
}

export interface INode {
  name: NodeName;
  id: string;
  clazz?: string | null;
  backgroundColor: string | null;
  fontColor: string | null;
}

export interface INodeText extends INode {
  json?: RawDraftContentState;
  text: string;
  heading: string;
}

export interface INodeImage extends INode {
  url: string;
  caption: any;
  width?: number;
  verticallyAlign: string;
}

export interface INodeFile extends INode {
  url: string;
  fileName: string;
  fileSize: number;
  description: string;
}

export interface INodeVideo extends INode {
  url: string;
  fileName: string;
  fileSize: number;
  description: string;
}

export interface INodeVoice extends INode {
  url: string;
  fileName: string;
  fileSize: number;
  description: string;
}

export interface INodeDivider extends INode {
}

export interface DraftStyleOptions {
  [key: string]: DraftStyleOption;
}

export interface DraftStyleOption {
  title: string;
  value: string;
  method: string;
  style: string;
  icon?: string,
  option?: {
    style: {
      color: string;
      background: string;
    };
    class: {
      color: string;
      bgColor: string;
      background: string;
    };
  };
}

export interface OnToggleLinkConfirmListener {
  onToggleLinkConfirm: () => void;
}

export interface OnKeyboardHandling {
  onKeyUp(e: KeyboardEvent<HTMLElement>, index: number): void;
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

export interface ImageEditorOptions {
  enabled?: boolean;
  formats?: string[];
  formatsTitle?: string[];
  uploader?: FileUploader;
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
  formats?: string[];
  formatsTitle?: string[];
  uploader?: FileUploader;
}

export interface FileEditorOptions {
  enabled?: boolean;
  formats?: string[];
  formatsTitle?: string[];
  uploader?: FileUploader;
}

export interface VoiceEditorOptions {
  enabled?: boolean;
  formats?: string[];
  formatsTitle?: string[];
  uploader?: FileUploader;
}

export interface DividerEditorOptions {
  enabled?: boolean;
}

export interface JsonEditor extends Array<INode> {
}

export interface OnJsonEditorUpdateListener {
  onUpdate(jsonEditor: JsonEditor): void;
}

export interface ImageVerticallyAlignOptions {
  [key: string]: ImageVerticallyAlignOption;
}

export interface ImageVerticallyAlignOption {
  clazz: string;
  icon: string;
}

export interface DropDownMenuItemType {
  title: string;
  value: string;
  option?: any;
}

export interface DropDownMenuListType {
  [key: string]: DropDownMenuItemType;
}

export interface OnTextEditorBehavior {
  onBtnLinkEditClick(url: string, entityKey: string, offsetKey: string): void;
}