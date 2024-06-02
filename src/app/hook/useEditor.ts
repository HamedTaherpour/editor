import { useAppDispatch, useAppSelector } from "@/app/store/use-store";
import { addNode, setOnKeyboardHandling, setOptions } from "@/app/store/editor-slice";
import { nanoid } from "@reduxjs/toolkit";
import { DraftStyleOption, EditorOptions, INodeDivider, INodeFile, INodeImage, INodeText, INodeVideo, INodeVoice, JsonEditor, NodeType, OnKeyboardHandling, TYPE_NODE_DIVIDER, TYPE_NODE_FILE, TYPE_NODE_IMAGE, TYPE_NODE_QUOTE, TYPE_NODE_TEXT, TYPE_NODE_VIDEO, TYPE_NODE_VOICE } from "@/app/type/index.type";
import useDraft from "@/app/hook/useDraft";
import NodeText from "@/app/module/NodeText";
import Node from "@/app/module/Node";
import { KeyboardEvent } from "react";
import NodeImage from "@/app/module/NodeImage";
import NodeFile from "@/app/module/NodeFile";
import NodeVideo from "@/app/module/NodeVideo";
import NodeVoice from "@/app/module/NodeVoice";
import NodeDivider from "@/app/module/NodeDivider";
import { draftHeadingStyleOptions, draftFormatStyleOptions } from "@/app/helpers/constants";

const useEditor = () => {

  const dispatch = useAppDispatch();
  const nodeList = useAppSelector((state) => state.editor.nodeList);
  const onKeyboardHandling = useAppSelector((state) => state.editor.onKeyboardHandling);
  const editorOptions = useAppSelector((state) => state.editor.options);

  const { getInitialDraftState } = useDraft();

  const nodeListMenu = [
    {
      title: "متن",
      description: "محتوای متنی به عنوان یک درس",
      icon: "textalign",
      type: "text",
      action: (index: number) => {
        addNewNodeText(index);
      }
    },
    {
      title: "عنوان 1",
      description: "سایز بزرگ برای نوشتن عنوان",
      icon: "smallcaps",
      type: "h1",
      action: (index: number) => {
        addNewNodeHeading(draftHeadingStyleOptions["h1"], index);
      }
    },
    {
      title: "عنوان 2",
      description: "سایز متوسط برای نوشتن عنوان",
      icon: "smallcaps",
      type: "h2",
      action: (index: number) => {
        addNewNodeHeading(draftHeadingStyleOptions["h2"], index);
      }
    },
    {
      title: "عنوان 3",
      description: "سایز کوچک برای نوشتن عنوان",
      icon: "smallcaps",
      type: "h3",
      action: (index: number) => {
        addNewNodeHeading(draftHeadingStyleOptions["h3"], index);
      }
    },
    {
      title: "نقل‌قول",
      description: "برای نوشتن نقل‌قول استفاده کنید.",
      icon: "quote-up",
      type: "quote",
      action: (index: number) => {
        addNewNodeQuote(index);
      }
    },
    {
      title: "لیست نقطه‌ای",
      description: "لیست ساده نقطه‌ای بسازید.",
      icon: "bulleted",
      type: "ul-disc",
      action: (index: number) => {
        addNewNodeHeading(draftFormatStyleOptions["ul-disc"], index);
      }
    },
    {
      title: "لیست شماره‌دار",
      description: "لیست شماره‌دار ایجاد کنید.",
      icon: "numbered",
      type: "ul-decimal",
      action: (index: number) => {
        addNewNodeHeading(draftFormatStyleOptions["ul-decimal"], index);
      }
    },
    {
      title: "تصویر",
      description: "تصویر خود را بارگذاری کنید.",
      icon: "gallery",
      type: "image",
      action: (index: number) => {
        addNewNodeImage(index);
      }
    },
    {
      title: "ویدیو",
      description: "ویدیو خود را بارگذاری کنید.",
      icon: "play-circle",
      type: "video",
      action: (index: number) => {
        addNewNodeVideo(index);
      }
    },
    {
      title: "فایل یا پوشه",
      description: "فایل خود را بارگذاری کنید.",
      icon: "document",
      type: "file",
      action: (index: number) => {
        addNewNodeFile(index);
      }
    },
    {
      title: "صوتی",
      description: "صوت یا ویس خود را بارگذاری کنید.",
      icon: "volume",
      type: "voice",
      action: (index: number) => {
        addNewNodeVoice(index);
      }
    },
    {
      title: "جداکننده",
      description: "جداکننده بخش‌های مختلف",
      icon: "divider",
      type: "divider",
      action: (index: number) => {
        addNewNodeDivider(index);
      }
    }
  ];

  const setKeyboardHandling = (onKeyboardHandling: OnKeyboardHandling) => {
    dispatch(setOnKeyboardHandling(onKeyboardHandling));
  };

  const pressKeyUp = (e: KeyboardEvent<HTMLElement>, index: number) => {
    if (onKeyboardHandling)
      onKeyboardHandling.onKeyUp(e, index);
  };

  const selectUp = (currentIndex: number) => {
    const node = getNode(currentIndex - 1);
    if (node) {
      node.focus();
    }
  };

  const selectDown = (currentIndex: number) => {
    const node = getNode(currentIndex + 1);
    if (node) {
      node.focus();
    }
  };

  const duplicate = (node: Node) => {
    const newNode = node.clone();
    dispatch(addNode({ index: newNode.index, node: newNode }));
  };

  // region Add Node
  const addNewNodeText = (index?: number): NodeText => {
    const DEFAULT_BACKGROUND_COLOR = "";
    const DEFAULT_FONT_COLOR = "COLOR_DARK";
    const DEFAULT_TAG = "p";

    let newIndex = nodeList.length <= 0 ? 0 : nodeList.length;
    if (index || index === 0) {
      newIndex = index + 1;
    }

    const id = nanoid();
    const value: INodeText = {
      text: "",
      id,
      name: TYPE_NODE_TEXT,
      backgroundColor: DEFAULT_BACKGROUND_COLOR,
      fontColor: DEFAULT_FONT_COLOR,
      heading: DEFAULT_TAG
    };
    const editorState = getInitialDraftState();
    const node = new NodeText(id, newIndex, value, editorState, dispatch);

    dispatch(addNode({ index: newIndex, node }));
    return node;
  };

  const addNodeText = (value: INodeText, index?: number, readonly = false): NodeText => {
    let newIndex = nodeList.length <= 0 ? 0 : nodeList.length;
    if (index || index === 0) {
      newIndex = index + 1;
    }

    const editorState = getInitialDraftState(value, readonly);
    const node = new NodeText(value.id, newIndex, value, editorState, dispatch);

    dispatch(addNode({ index: newIndex, node }));
    return node;
  };

  const addNewNodeImage = (index?: number): NodeImage => {
    let newIndex = nodeList.length <= 0 ? 0 : nodeList.length;
    if (index || index === 0) {
      newIndex = index + 1;
    }

    const id = nanoid();
    const value: INodeImage = {
      id,
      name: TYPE_NODE_IMAGE,
      verticallyAlign: "center",
      clazz: "node-gap",
      backgroundColor: "",
      fontColor: "",
      caption: "",
      url: ""
    };
    const node = new NodeImage(id, newIndex, value, dispatch, editorOptions);

    dispatch(addNode({ index: newIndex, node }));
    return node;
  };

  const addNodeImage = (value: INodeImage, index?: number): NodeImage => {
    let newIndex = nodeList.length <= 0 ? 0 : nodeList.length;
    if (index || index === 0) {
      newIndex = index + 1;
    }
    const node = new NodeImage(value.id, newIndex, value, dispatch, editorOptions);

    dispatch(addNode({ index: newIndex, node }));
    return node;
  };

  const addNewNodeFile = (index?: number): NodeFile => {
    let newIndex = nodeList.length <= 0 ? 0 : nodeList.length;
    if (index || index === 0) {
      newIndex = index + 1;
    }

    const id = nanoid();
    const value: INodeFile = {
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
    const node = new NodeFile(id, newIndex, value, dispatch, editorOptions);

    dispatch(addNode({ index: newIndex, node }));
    return node;
  };

  const addNodeFile = (value: INodeFile, index?: number): NodeFile => {
    let newIndex = nodeList.length <= 0 ? 0 : nodeList.length;
    if (index || index === 0) {
      newIndex = index + 1;
    }

    const node = new NodeFile(value.id, newIndex, value, dispatch, editorOptions);

    dispatch(addNode({ index: newIndex, node }));
    return node;
  };

  const addNewNodeDivider = (index?: number): NodeDivider => {
    let newIndex = nodeList.length <= 0 ? 0 : nodeList.length;
    if (index || index === 0) {
      newIndex = index + 1;
    }

    const id = nanoid();
    const value: INodeDivider = {
      id,
      name: TYPE_NODE_DIVIDER,
      backgroundColor: "",
      fontColor: "",
      clazz: ""
    };


    const node = new NodeDivider(id, newIndex, value, dispatch, editorOptions);

    dispatch(addNode({ index: newIndex, node }));
    return node;
  };

  const addNodeDivider = (value: INodeDivider, index?: number): NodeDivider => {
    let newIndex = nodeList.length <= 0 ? 0 : nodeList.length;
    if (index || index === 0) {
      newIndex = index + 1;
    }

    const node = new NodeDivider(value.id, newIndex, value, dispatch, editorOptions);

    dispatch(addNode({ index: newIndex, node }));
    return node;
  };

  const addNewNodeVoice = (index?: number): NodeVoice => {
    let newIndex = nodeList.length <= 0 ? 0 : nodeList.length;
    if (index || index === 0) {
      newIndex = index + 1;
    }

    const id = nanoid();
    const value: INodeVoice = {
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
    const node = new NodeVoice(id, newIndex, value, dispatch, editorOptions);

    dispatch(addNode({ index: newIndex, node }));
    return node;
  };

  const addNodeVoice = (value: INodeVoice, index?: number): NodeVoice => {
    let newIndex = nodeList.length <= 0 ? 0 : nodeList.length;
    if (index || index === 0) {
      newIndex = index + 1;
    }

    const node = new NodeVoice(value.id, newIndex, value, dispatch, editorOptions);

    dispatch(addNode({ index: newIndex, node }));
    return node;
  };

  const addNewNodeVideo = (index?: number): NodeVideo => {
    let newIndex = nodeList.length <= 0 ? 0 : nodeList.length;
    if (index || index === 0) {
      newIndex = index + 1;
    }

    const id = nanoid();
    const value: INodeVideo = {
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
    const node = new NodeVideo(id, newIndex, value, dispatch, editorOptions);

    dispatch(addNode({ index: newIndex, node }));
    return node;
  };

  const addNodeVideo = (value: INodeVideo, index?: number): NodeVideo => {
    let newIndex = nodeList.length <= 0 ? 0 : nodeList.length;
    if (index || index === 0) {
      newIndex = index + 1;
    }

    const node = new NodeVideo(value.id, newIndex, value, dispatch, editorOptions);

    dispatch(addNode({ index: newIndex, node }));
    return node;
  };

  const addNewNodeHeading = (option: DraftStyleOption, index?: number): NodeText => {
    const newNode = addNewNodeText(index);
    newNode.setDraftHeading(option);
    return newNode;
  };

  const addNewNodeQuote = (index?: number): NodeText => {
    const DEFAULT_BACKGROUND_COLOR = "COLOR_GRAY";
    const DEFAULT_FONT_COLOR = "COLOR_DARK";
    const DEFAULT_TAG = "p";

    let newIndex = nodeList.length <= 0 ? 0 : nodeList.length;
    if (index || index === 0) {
      newIndex = index + 1;
    }

    const id = nanoid();
    const value: INodeText = {
      text: "",
      id,
      clazz: "node-gap",
      name: TYPE_NODE_QUOTE,
      backgroundColor: DEFAULT_BACKGROUND_COLOR,
      fontColor: DEFAULT_FONT_COLOR,
      heading: DEFAULT_TAG
    };
    const editorState = getInitialDraftState();
    const node = new NodeText(id, newIndex, value, editorState, dispatch);

    dispatch(addNode({ index: newIndex, node }));
    return node;
  };
  // endregion

  // region Get Node
  const getNodeText = (index: number): NodeText => {
    return nodeList[index] as NodeText;
  };

  const getNodeImage = (index: number): NodeImage => {
    return nodeList[index] as NodeImage;
  };

  const getNodeFile = (index: number): NodeFile => {
    return nodeList[index] as NodeFile;
  };

  const getNodeVideo = (index: number): NodeVideo => {
    return nodeList[index] as NodeVideo;
  };

  const getNodeVoice = (index: number): NodeVoice => {
    return nodeList[index] as NodeVoice;
  };

  const getNodeDivider = (index: number): NodeDivider => {
    return nodeList[index] as NodeDivider;
  };

  const getNode = (index: number): Node => {
    return nodeList[index] as Node<INodeText>;
  };
  // endregion

  const getNodeListMenu = () => {
    if (editorOptions) {
      return nodeListMenu.filter((item: { type: any }) => {
        const type = item.type;
        // @ts-ignore
        if (!editorOptions[type])
          return true;
        // @ts-ignore
        else if (editorOptions[type].enabled === false){
          return false;
        }
        return true;
      });
    } else {
      return nodeListMenu;
    }
  };

  const setEditorOptions = (options?: EditorOptions) => {
    dispatch(setOptions(options));
  };

  const getJsonEditor = () => {
    return nodeList.map((item: NodeType) => {
      return { ...item.value };
    });
  };

  const setJsonEditor = (jsonEditor?: JsonEditor, readonly = false) => {
    if (jsonEditor) {
      for (let index in jsonEditor) {
        if (jsonEditor[index].name === TYPE_NODE_TEXT || jsonEditor[index].name === TYPE_NODE_QUOTE) {
          const myItem = jsonEditor[index] as INodeText;
          addNodeText(myItem, parseInt(index), readonly);
        } else if (jsonEditor[index].name === TYPE_NODE_IMAGE) {
          const myItem = jsonEditor[index] as INodeImage;
          addNodeImage(myItem, parseInt(index));
        } else if (jsonEditor[index].name === TYPE_NODE_FILE) {
          const myItem = jsonEditor[index] as INodeFile;
          addNodeFile(myItem, parseInt(index));
        } else if (jsonEditor[index].name === TYPE_NODE_VIDEO) {
          const myItem = jsonEditor[index] as INodeVideo;
          addNodeVideo(myItem, parseInt(index));
        } else if (jsonEditor[index].name === TYPE_NODE_VOICE) {
          const myItem = jsonEditor[index] as INodeVoice;
          addNodeVoice(myItem, parseInt(index));
        } else if (jsonEditor[index].name === TYPE_NODE_DIVIDER) {
          const myItem = jsonEditor[index] as INodeDivider;
          addNodeDivider(myItem, parseInt(index));
        }
      }
    }
  };

  return {
    addNewNodeText,
    nodeList,
    getNodeImage,
    getNodeText,
    selectUp,
    selectDown,
    getNode, setKeyboardHandling, pressKeyUp, duplicate, getNodeListMenu, setEditorOptions, editorOptions, getNodeFile, getNodeVideo, getNodeVoice, getNodeDivider,
    getJsonEditor, setJsonEditor
  };
};

export default useEditor;