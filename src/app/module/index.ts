import { nanoid } from "@reduxjs/toolkit";
import { EditorOptions, INodeDivider, INodeFile, INodeImage, INodeText, INodeVideo, INodeVoice, NodeType, TYPE_NODE_DIVIDER, TYPE_NODE_FILE, TYPE_NODE_IMAGE, TYPE_NODE_QUOTE, TYPE_NODE_TEXT, TYPE_NODE_VIDEO, TYPE_NODE_VOICE } from "@/app/type/index.type";
import NodeText from "@/app/module/NodeText";
import useDraft from "@/app/hook/useDraft";
import NodeImage from "@/app/module/NodeImage";
import NodeFile from "@/app/module/NodeFile";
import NodeDivider from "@/app/module/NodeDivider";
import NodeVoice from "@/app/module/NodeVoice";
import NodeVideo from "@/app/module/NodeVideo";

export default class NodeController {
  dispatch: any;
  nodeList: Array<NodeType>;
  editorOptions?: EditorOptions;
  draft = useDraft();

  constructor(nodeList: Array<NodeType>, dispatch: any, editorOptions?: EditorOptions) {
    this.dispatch = dispatch;
    this.nodeList = nodeList;
    this.editorOptions = editorOptions;
  }

  getNewIndex(currentIndex?: number) {
    let newIndex = this.nodeList.length <= 0 ? 0 : this.nodeList.length;
    if (currentIndex || currentIndex === 0) {
      newIndex = currentIndex + 1;
    }
    return newIndex;
  }

  getNodeTextInstance(index?: number, value?: INodeText, readonly = false): NodeText {
    const DEFAULT_BACKGROUND_COLOR = "";
    const DEFAULT_FONT_COLOR = "COLOR_DARK";
    const DEFAULT_TAG = "p";

    let newIndex = this.getNewIndex(index);

    const id = nanoid();
    const defaultValue: INodeText = {
      text: "",
      id,
      name: TYPE_NODE_TEXT,
      backgroundColor: DEFAULT_BACKGROUND_COLOR,
      fontColor: DEFAULT_FONT_COLOR,
      heading: DEFAULT_TAG
    };

    const newValue = {
      ...defaultValue,
      ...value
    };

    let editorState;
    if (value)
      editorState = this.draft.getInitialDraftState(value, readonly);
    else
      editorState = this.draft.getInitialDraftState();

    const node = new NodeText(newValue.id, newIndex, newValue, editorState, this.dispatch);
    return node;
  }

  getNodeQuoteInstance(index?: number, value?: INodeText, readonly = false): NodeText {
    const DEFAULT_BACKGROUND_COLOR = "COLOR_GRAY";
    const DEFAULT_FONT_COLOR = "COLOR_DARK";
    const DEFAULT_TAG = "p";

    let newIndex = this.getNewIndex(index);

    const id = nanoid();
    const defaultValue: INodeText = {
      text: "",
      id,
      clazz: "node-gap",
      name: TYPE_NODE_QUOTE,
      backgroundColor: DEFAULT_BACKGROUND_COLOR,
      fontColor: DEFAULT_FONT_COLOR,
      heading: DEFAULT_TAG
    };

    const newValue = {
      ...defaultValue,
      ...value
    };

    let editorState;
    if (value)
      editorState = this.draft.getInitialDraftState(value, readonly);
    else
      editorState = this.draft.getInitialDraftState();

    const node = new NodeText(newValue.id, newIndex, newValue, editorState, this.dispatch);
    return node;
  }

  getNodeImageInstance(index?: number, value?: INodeImage, readonly = false): NodeImage {
    let newIndex = this.getNewIndex(index);

    const id = nanoid();
    const defaultValue: INodeImage = {
      id,
      name: TYPE_NODE_IMAGE,
      verticallyAlign: "center",
      clazz: "node-gap",
      backgroundColor: "",
      fontColor: "",
      caption: "",
      url: ""
    };

    const newValue = {
      ...defaultValue,
      ...value
    };

    const node = new NodeImage(newValue.id, newIndex, newValue, this.dispatch, this.editorOptions);
    return node;
  }

  getNodeFileInstance(index?: number, value?: INodeFile, readonly = false): NodeFile {
    let newIndex = this.getNewIndex(index);

    const id = nanoid();
    const defaultValue: INodeFile = {
      id,
      name: TYPE_NODE_FILE,
      clazz: "node-gap",
      backgroundColor: "",
      fontColor: "",
      url: "",
      description: "",
      fileName: "",
      fileSize: 0
    };

    const newValue = {
      ...defaultValue,
      ...value
    };

    const node = new NodeFile(newValue.id, newIndex, newValue, this.dispatch, this.editorOptions);
    return node;
  }

  getNodeDividerInstance(index?: number, value?: INodeDivider, readonly = false): NodeDivider {
    let newIndex = this.getNewIndex(index);

    const id = nanoid();
    const defaultValue: INodeDivider = {
      id,
      name: TYPE_NODE_DIVIDER,
      backgroundColor: "",
      fontColor: "",
      clazz: ""
    };

    const newValue = {
      ...defaultValue,
      ...value
    };

    const node = new NodeDivider(newValue.id, newIndex, newValue, this.dispatch);
    return node;
  }

  getNodeVoiceInstance(index?: number, value?: INodeVoice, readonly = false): NodeVoice {
    let newIndex = this.getNewIndex(index);

    const id = nanoid();
    const defaultValue: INodeVoice = {
      id,
      name: TYPE_NODE_VOICE,
      clazz: "node-gap",
      backgroundColor: "",
      fontColor: "",
      url: "",
      description: "",
      fileName: "",
      fileSize: 0
    };

    const newValue = {
      ...defaultValue,
      ...value
    };

    const node = new NodeVoice(newValue.id, newIndex, newValue, this.dispatch, this.editorOptions);
    return node;
  }

  getNodeVideoInstance(index?: number, value?: INodeVideo, readonly = false): NodeVideo {
    let newIndex = this.getNewIndex(index);

    const id = nanoid();
    const defaultValue: INodeVideo = {
      id,
      name: TYPE_NODE_VIDEO,
      clazz: "node-gap",
      backgroundColor: "",
      fontColor: "",
      url: "",
      description: "",
      fileName: "",
      fileSize: 0
    };

    const newValue = {
      ...defaultValue,
      ...value
    };

    const node = new NodeVideo(newValue.id, newIndex, newValue, this.dispatch, this.editorOptions);
    return node;
  }
}