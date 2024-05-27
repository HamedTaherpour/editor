import { EditorState, RichUtils, ContentBlock, convertFromRaw, CompositeDecorator } from "draft-js";
import { NodeQuote, NodeText } from "../../editor/type";
import { ToolsColorStyleTextEditor } from "../type";

import LinkComponent from "../../../components/TextEditor/component/Link";
import LinkReadonlyComponent from "../../../components/TextEditor/component/read-only/LinkReadonly";

// FOR INLINE STYLES
export const customStyleMap = {
  COLOR_YELLOW: {
    color: "#CB912F"
  },
  COLOR_ORAMGE: {
    color: "#D9730D"
  },
  COLOR_BROWN: {
    color: "#9F6B53"
  },
  COLOR_GRAY: {
    color: "#787774"
  },
  COLOR_DARK: {
    color: "#242424"
  },
  COLOR_RED: {
    color: "#d44c47"
  },
  COLOR_PINK: {
    color: "#c14c8a"
  },
  COLOR_PURPLE: {
    color: "#9065B0"
  },
  COLOR_BLUE: {
    color: "#3680AA"
  },
  COLOR_GREEN: {
    color: "#448361"
  },

  BACKGROUND_YELLOW: {
    backgroundColor: "#FBF6EE"
  },
  BACKGROUND_ORAMGE: {
    backgroundColor: "#FEF5EC"
  },
  BACKGROUND_BROWN: {
    backgroundColor: "#F8F4F2"
  },
  BACKGROUND_GRAY: {
    backgroundColor: "#F5F5F5"
  },
  BACKGROUND_DARK: {
    backgroundColor: "#FFFFFF"
  },
  BACKGROUND_RED: {
    backgroundColor: "#FBEFEE"
  },
  BACKGROUND_PINK: {
    backgroundColor: "#FAF0F5"
  },
  BACKGROUND_PURPLE: {
    backgroundColor: "#F5F2F8"
  },
  BACKGROUND_BLUE: {
    backgroundColor: "#EFF6FA"
  },
  BACKGROUND_GREEN: {
    backgroundColor: "#F2F8F5"
  }
};

// FOR BLOCK LEVEL STYLES(Returns CSS Class From DraftEditor.css)
// @ts-ignore
export const blockStyleFn = (contentBlock: ContentBlock) => {
  const type = contentBlock.getType();
  switch (type) {
    case "header-one":
      return "te-header-one";
    case "header-two":
      return "te-header-two";
    case "header-three":
      return "te-header-three";
    case "unstyled":
      return "te-unstyled";
    case "unordered-list-item":
      return "te-unordered-list-item";
    case "ordered-list-item":
      return "te-ordered-list-item";
    default:
      break;
  }
};

export const toolsFontStylsItems = [
  {
    label: "bold",
    style: "BOLD",
    icon: "text-bold",
    method: "inline"
  },
  {
    label: "underline",
    style: "UNDERLINE",
    icon: "underline",
    method: "inline"
  },
  {
    label: "italic",
    style: "ITALIC",
    icon: "italic",
    method: "inline"
  },
  {
    label: "strike-through",
    style: "STRIKETHROUGH",
    icon: "text-cross",
    method: "inline"
  }
];

export const toolsColorStyleItems: ToolsColorStyleTextEditor = {
  COLOR_YELLOW: {
    title: "زرد",
    value: "COLOR_YELLOW",
    method: "inline",
    option: {
      style: {
        color: "COLOR_YELLOW",
        background: "BACKGROUND_YELLOW"
      },
      class: {
        color: "et-text-yellow",
        bgColor: "et-bg-yellow",
        background: "et-bg-yellow-bg"
      }
    }
  },
  COLOR_ORAMGE: {
    title: "نارنجی",
    value: "COLOR_ORAMGE",
    method: "inline",
    option: {
      style: {
        color: "COLOR_ORAMGE",
        background: "BACKGROUND_ORAMGE"
      },
      class: {
        color: "et-text-orange",
        bgColor: "et-bg-orange",
        background: "et-bg-orange-bg"
      }
    }
  },
  COLOR_BROWN: {
    title: "قهوه‌ای",
    value: "COLOR_BROWN",
    method: "inline",
    option: {
      style: {
        color: "COLOR_BROWN",
        background: "BACKGROUND_BROWN"
      },
      class: {
        color: "et-text-brown",
        bgColor: "et-bg-brown",
        background: "et-bg-brown-bg"
      }
    }
  },
  COLOR_GRAY: {
    title: "طوسی",
    value: "COLOR_GRAY",
    method: "inline",
    option: {
      style: {
        color: "COLOR_GRAY",
        background: "BACKGROUND_GRAY"
      },
      class: {
        color: "et-text-gray",
        bgColor: "et-bg-gray",
        background: "et-bg-gray-bg"
      }
    }
  },
  COLOR_DARK: {
    title: "رنگ اصلی",
    value: "COLOR_DARK",
    method: "inline",
    option: {
      style: {
        color: "COLOR_DARK",
        background: "BACKGROUND_DARK"
      },
      class: {
        color: "et-text-dark",
        bgColor: "et-bg-dark",
        background: "et-bg-dark-bg"
      }
    }
  },
  COLOR_RED: {
    title: "قرمز",
    value: "COLOR_RED",
    method: "inline",
    option: {
      style: {
        color: "COLOR_RED",
        background: "BACKGROUND_RED"
      },
      class: {
        color: "et-text-red",
        bgColor: "et-bg-red",
        background: "et-bg-red-bg"
      }
    }
  },
  COLOR_PINK: {
    title: "صورتی",
    value: "COLOR_PINK",
    method: "inline",
    option: {
      style: {
        color: "COLOR_PINK",
        background: "BACKGROUND_PINK"
      },
      class: {
        color: "et-text-pink",
        bgColor: "et-bg-pink",
        background: "et-bg-pink-bg"
      }
    }
  },
  COLOR_PURPLE: {
    title: "بنفش",
    value: "COLOR_PURPLE",
    method: "inline",
    option: {
      style: {
        color: "COLOR_PURPLE",
        background: "BACKGROUND_PURPLE"
      },
      class: {
        color: "et-text-purple",
        bgColor: "et-bg-purple",
        background: "et-bg-purple-bg"
      }
    }
  },
  COLOR_BLUE: {
    title: "آبی",
    value: "COLOR_BLUE",
    method: "inline",
    option: {
      style: {
        color: "COLOR_BLUE",
        background: "BACKGROUND_BLUE"
      },
      class: {
        color: "et-text-blue",
        bgColor: "et-bg-blue",
        background: "et-bg-blue-bg"
      }
    }
  },
  COLOR_GREEN: {
    title: "سبز",
    value: "COLOR_GREEN",
    method: "inline",
    option: {
      style: {
        color: "COLOR_GREEN",
        background: "BACKGROUND_GREEN"
      },
      class: {
        color: "et-text-green",
        bgColor: "et-bg-green",
        background: "et-bg-green-bg"
      }
    }
  }
};

export const toolsHeadingStyleItems = {
  "h1": {
    title: "عنوان بزرگ",
    value: "h1",
    style: "header-one",
    method: "block"
  },
  "h2": {
    title: "عنوان متوسط",
    value: "h2",
    style: "header-two",
    method: "block"
  },
  "h3": {
    title: "عنوان کوچک",
    value: "h3",
    style: "header-three",
    method: "block"
  },
  "p": {
    title: "متن",
    value: "p",
    style: "unstyled",
    method: "block"
  }
};

const findLinkEntities = (contentBlock: any, callback: any, contentState: any) => {
  contentBlock.findEntityRanges((character: any) => {
    const entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === "LINK";
  }, callback);
};

export const editorDecorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: LinkComponent
  }
]);

export const readonlyDecorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: LinkReadonlyComponent
  }
]);

export const getFirstInitEditorState = (node: NodeText | NodeQuote | undefined, readonly: boolean): EditorState => {
  const decorator = readonly ? readonlyDecorator : editorDecorator;
  let editorState = EditorState.createEmpty(decorator);
  if (node) {
    if (!!node.text && !!node.text.blocks) {
      const content = convertFromRaw(node.text);
      editorState = EditorState.createWithContent(content, decorator);
      editorState = EditorState.moveSelectionToEnd(editorState);
    }
    editorState = setBaseTag(editorState, node);
  }
  return editorState;
};

export const setBaseTag = (editorState: EditorState, node: NodeText | NodeQuote): EditorState => {
  let newEditorState = editorState;
  if (node.baseTag !== "p" && !!!node.text && !!!node.text.blocks) {
    const keys: { [key: string]: string } = {
      h1: "header-one",
      h2: "header-two",
      h3: "header-three",
      "ul-disc": "unordered-list-item",
      "ul-decimal": "ordered-list-item"
    };

    const style = keys[node.baseTag];
    const blockType = editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getStartKey()).getType();
    if (blockType !== style) {
      newEditorState = setStyle(editorState, style, "block");
    }
  }
  return newEditorState;
};

export const getLineNumberSelected = (editorState: EditorState) => {
  const currentBlockKey = getLineKeySelected(editorState);
  return editorState
    .getCurrentContent()
    .getBlockMap()
    .keySeq()
    .findIndex((k: any) => k === currentBlockKey);
};

export const getLineKeySelected = (editorState: EditorState) => {
  return editorState.getSelection().getStartKey();
};

export const getLineSize = (editorState: EditorState) => {
  return editorState.getCurrentContent().getBlockMap().keySeq().size;
};

export const getPositionOfLine = (editorState: EditorState) => {
  const selectionState = editorState.getSelection();
  return selectionState.getStartOffset();
};

export const getValueHighlight = (editorState: EditorState) => {
  let selectionState = editorState.getSelection();
  let anchorKey = selectionState.getAnchorKey();
  let currentContent = editorState.getCurrentContent();
  let currentContentBlock = currentContent.getBlockForKey(anchorKey);
  let start = selectionState.getStartOffset();
  let end = selectionState.getEndOffset();
  let selectedText = currentContentBlock.getText().slice(start, end);
  return selectedText;
};

export const getValueOfLine = (editorState: EditorState, lineKey: any) => {
  let currentContent = editorState.getCurrentContent();
  let currentContentBlock = currentContent.getBlockForKey(lineKey);
  return currentContentBlock.getText();
};

export const getValue = (editorState: EditorState) => {
  return editorState.getCurrentContent().getPlainText("\u0001");
};

export const setStyle = (editorState: EditorState, style: any, method: string): EditorState => {
  if (method === "block") {
    return RichUtils.toggleBlockType(editorState, style);
  } else {
    return RichUtils.toggleInlineStyle(editorState, style);
  }
};

export const getLastStyleBackgroundColor = (editorState: EditorState): any => {
  return editorState.getCurrentInlineStyle().find((style: any) => {
    if (!!style) return style.includes("BACKGROUND_");
  });
};

export const getLastStyleFontColor = (editorState: EditorState): any => {
  return editorState.getCurrentInlineStyle().find((style: any) => {
    if (!!style) {
      console.log(style);
      return style.includes("COLOR_");
    }
  });
};

export const isStyleActive = (editorState: EditorState, style: any, method: string): boolean => {
  if (method === "block") {
    const selection = editorState.getSelection();
    const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
    return blockType === style;
  } else {
    const currentStyle = editorState.getCurrentInlineStyle();
    return currentStyle.has(style);
  }
};

export const editLink = (editorState: EditorState, entityKey: string, link: string): EditorState => {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.replaceEntityData(entityKey, {
    url: link
  });

  const newEditorState = EditorState.set(editorState, {
    currentContent: contentStateWithEntity
  });

  return RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey);
};

export const setLink = (editorState: EditorState, link: string): EditorState => {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity("LINK", "MUTABLE", {
    url: link
  });
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

  const newEditorState = EditorState.set(editorState, {
    currentContent: contentStateWithEntity
  });

  return RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey);
};

export const getBlockPositionDOM = (offsetKey: string) => {
  let position = { x: 0, y: 0 };
  let x = 0;
  let y = 0;
  let blockEl = document.querySelector("span[data-offset-key=\"" + offsetKey + "\"]");
  if (blockEl) {
    // @ts-ignore
    const blockHeight = blockEl.offsetHeight;
    // @ts-ignore
    const blockWidth = blockEl.offsetWidth;
    // @ts-ignore
    while (blockEl && !isNaN(blockEl.offsetLeft) && !isNaN(blockEl.offsetTop)) {
      // @ts-ignore
      x += blockEl.offsetLeft - blockEl.scrollLeft;
      // @ts-ignore
      y += blockEl.offsetTop - blockEl.scrollTop;
      // @ts-ignore
      blockEl = blockEl.offsetParent;
    }

    x = x + blockWidth;
    position = {
      x: x,
      y: y + blockHeight
    };
  }
  return position;
};
