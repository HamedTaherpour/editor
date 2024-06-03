import { useAppDispatch, useAppSelector } from "@/app/store/use-store";
import { addNode, setOnKeyboardHandling, setOptions, setNodeList, setCurrentNodeSelectedIndex } from "@/app/store/editor-slice";
import { DraftStyleOption, EditorOptions, INodeDivider, INodeFile, INodeImage, INodeText, INodeVideo, INodeVoice, JsonEditor, NodeType, OnKeyboardHandling, TYPE_NODE_DIVIDER, TYPE_NODE_FILE, TYPE_NODE_IMAGE, TYPE_NODE_QUOTE, TYPE_NODE_TEXT, TYPE_NODE_VIDEO, TYPE_NODE_VOICE } from "@/app/type/index.type";
import NodeText from "@/app/module/NodeText";
import Node from "@/app/module/Node";
import { KeyboardEvent } from "react";
import NodeImage from "@/app/module/NodeImage";
import NodeFile from "@/app/module/NodeFile";
import NodeVideo from "@/app/module/NodeVideo";
import NodeVoice from "@/app/module/NodeVoice";
import NodeDivider from "@/app/module/NodeDivider";
import { draftHeadingStyleOptions, draftFormatStyleOptions } from "@/app/helpers/constants";
import NodeController from "@/app/module";

const useEditor = () => {

  const dispatch = useAppDispatch();
  const nodeList = useAppSelector((state) => state.editor.nodeList);
  const currentNodeSelectedIndex = useAppSelector((state) => state.editor.currentNodeSelectedIndex);
  const onKeyboardHandling = useAppSelector((state) => state.editor.onKeyboardHandling);
  const editorOptions = useAppSelector((state) => state.editor.options);

  const nodeController = new NodeController(nodeList, dispatch, editorOptions);

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
    const node = nodeController.getNodeTextInstance(index);
    dispatch(addNode({ index: node.index, node }));
    setCurrentNodeIndex(node.index);
    return node;
  };

  const addNewNodeImage = (index?: number): NodeImage => {
    const node = nodeController.getNodeImageInstance(index);
    dispatch(addNode({ index: node.index, node }));
    return node;
  };

  const addNewNodeFile = (index?: number): NodeFile => {
    const node = nodeController.getNodeFileInstance(index);
    dispatch(addNode({ index: node.index, node }));
    return node;
  };

  const addNewNodeDivider = (index?: number): NodeDivider => {
    const node = nodeController.getNodeDividerInstance(index);
    dispatch(addNode({ index: node.index, node }));
    return node;
  };

  const addNewNodeVoice = (index?: number): NodeVoice => {
    const node = nodeController.getNodeVoiceInstance(index);
    dispatch(addNode({ index: node.index, node }));
    return node;
  };

  const addNewNodeVideo = (index?: number): NodeVideo => {
    const node = nodeController.getNodeVideoInstance(index);
    dispatch(addNode({ index: node.index, node }));
    return node;
  };

  const addNewNodeHeading = (option: DraftStyleOption, index?: number): NodeText => {
    const newNode = addNewNodeText(index);
    newNode.setDraftHeading(option);
    return newNode;
  };

  const addNewNodeQuote = (index?: number): NodeText => {
    const node = nodeController.getNodeQuoteInstance(index);
    dispatch(addNode({ index: node.index, node }));
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
        else if (editorOptions[type].enabled === false) {
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
      let newNodeList: Array<NodeType> = [];
      for (let index in jsonEditor) {
        let node: NodeType;
        if (jsonEditor[index].name === TYPE_NODE_TEXT) {
          const myNode = jsonEditor[index] as INodeText;
          node = nodeController.getNodeTextInstance(parseInt(index), myNode, readonly);
        } else if (jsonEditor[index].name === TYPE_NODE_QUOTE) {
          const myItem = jsonEditor[index] as INodeText;
          node = nodeController.getNodeQuoteInstance(parseInt(index), myItem, readonly);
        } else if (jsonEditor[index].name === TYPE_NODE_IMAGE) {
          const myItem = jsonEditor[index] as INodeImage;
          node = nodeController.getNodeImageInstance(parseInt(index), myItem, readonly);
        } else if (jsonEditor[index].name === TYPE_NODE_FILE) {
          const myItem = jsonEditor[index] as INodeFile;
          node = nodeController.getNodeFileInstance(parseInt(index), myItem, readonly);
        } else if (jsonEditor[index].name === TYPE_NODE_VIDEO) {
          const myItem = jsonEditor[index] as INodeVideo;
          node = nodeController.getNodeVideoInstance(parseInt(index), myItem, readonly);
        } else if (jsonEditor[index].name === TYPE_NODE_VOICE) {
          const myItem = jsonEditor[index] as INodeVoice;
          node = nodeController.getNodeVoiceInstance(parseInt(index), myItem, readonly);
        } else if (jsonEditor[index].name === TYPE_NODE_DIVIDER) {
          const myItem = jsonEditor[index] as INodeDivider;
          node = nodeController.getNodeDividerInstance(parseInt(index), myItem, readonly);
        }
        // @ts-ignore
        if (node)
          newNodeList.push(node);
      }
      dispatch(setNodeList(newNodeList));
    }
  };

  const setCurrentNodeIndex = (index: number) => {
    dispatch(setCurrentNodeSelectedIndex(index));
  };

  return {
    addNewNodeText,
    nodeList, currentNodeSelectedIndex,
    getNodeImage,
    getNodeText,
    selectUp,
    selectDown,
    getNode, setKeyboardHandling, pressKeyUp, duplicate, getNodeListMenu, setEditorOptions, editorOptions, getNodeFile, getNodeVideo, getNodeVoice, getNodeDivider, setCurrentNodeIndex,
    getJsonEditor, setJsonEditor
  };
};

export default useEditor;