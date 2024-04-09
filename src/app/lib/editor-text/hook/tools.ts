import exp from "constants";
import { EditorState, RichUtils, ContentBlock } from "draft-js";
import { Node } from "../../editor/type";

// FOR INLINE STYLES
export const customStyleMap = {
  COLOR_YELLOW: {
    color: "rgba(203, 145, 47, 1)",
  },
  COLOR_ORAMGE: {
    color: "rgba(217, 115, 13, 1)",
  },
  COLOR_BROWN: {
    color: "rgba(159, 107, 83, 1)",
  },
  COLOR_GRAY: {
    color: "rgba(120, 119, 116, 1)",
  },
  COLOR_DARK: {
    color: "rgba(36, 36, 36, 1)",
  },
  COLOR_RED: {
    color: "rgba(212, 76, 71, 1)",
  },
  COLOR_PINK: {
    color: "rgba(193, 76, 138, 1)",
  },
  COLOR_PURPLE: {
    color: "rgba(144, 101, 176, 1)",
  },
  COLOR_BLUE: {
    color: "rgba(54, 128, 170, 1)",
  },
  COLOR_GREEN: {
    color: "rgba(68, 131, 97, 1)",
  },
  BACKGROUND_YELLOW: {
    background: "rgba(251, 246, 238, 1)",
  },
  BACKGROUND_ORAMGE: {
    background: "rgba(254, 245, 236, 1)",
  },
  BACKGROUND_BROWN: {
    background: "rgba(248, 244, 242, 1)",
  },
  BACKGROUND_GRAY: {
    background: "rgba(245, 245, 245, 1)",
  },
  BACKGROUND_DARK: {
    background: "rgba(255, 255, 255, 1)",
  },
  BACKGROUND_RED: {
    background: "rgba(251, 239, 238, 1)",
  },
  BACKGROUND_PINK: {
    background: "rgba(250, 240, 245, 1)",
  },
  BACKGROUND_PURPLE: {
    background: "rgba(245, 242, 248, 1)",
  },
  BACKGROUND_BLUE: {
    background: "rgba(239, 246, 250, 1)",
  },
  BACKGROUND_GREEN: {
    background: "rgba(242, 248, 245, 1)",
  },
};

// FOR BLOCK LEVEL STYLES(Returns CSS Class From DraftEditor.css)
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
    default:
      break;
  }
};

export const toolsFontStylsItems = [
  {
    label: "bold",
    style: "BOLD",
    icon: "text-bold",
    method: "inline",
  },
  {
    label: "underline",
    style: "UNDERLINE",
    icon: "underline",
    method: "inline",
  },
  {
    label: "italic",
    style: "ITALIC",
    icon: "italic",
    method: "inline",
  },
  {
    label: "strike-through",
    style: "STRIKETHROUGH",
    icon: "text-cross",
    method: "inline",
  },
];

export const toolsColorStyleItems = {
  COLOR_YELLOW: {
    title: "yellow",
    value: "COLOR_YELLOW",
    method: "inline",
    option: {
      style: {
        color: "COLOR_YELLOW",
        background: "BACKGROUND_YELLOW",
      },
      class: {
        color: "text-yellow",
        background: "bg-yellow-bg",
      },
    },
  },
  COLOR_ORAMGE: {
    title: "orange",
    value: "COLOR_ORAMGE",
    method: "inline",
    option: {
      style: {
        color: "COLOR_ORAMGE",
        background: "BACKGROUND_ORAMGE",
      },
      class: {
        color: "text-orange",
        background: "bg-orange-bg",
      },
    },
  },
  COLOR_BROWN: {
    title: "brown",
    value: "COLOR_BROWN",
    method: "inline",
    option: {
      style: {
        color: "COLOR_BROWN",
        background: "BACKGROUND_BROWN",
      },
      class: {
        color: "text-brown",
        background: "bg-brown-bg",
      },
    },
  },
  COLOR_GRAY: {
    title: "gray",
    value: "COLOR_GRAY",
    method: "inline",
    option: {
      style: {
        color: "COLOR_GRAY",
        background: "BACKGROUND_GRAY",
      },
      class: {
        color: "text-gray",
        background: "bg-gray-bg",
      },
    },
  },
  COLOR_DARK: {
    title: "dark",
    value: "COLOR_DARK",
    method: "inline",
    option: {
      style: {
        color: "COLOR_DARK",
        background: "BACKGROUND_DARK",
      },
      class: {
        color: "text-dark",
        background: "bg-dark-bg",
      },
    },
  },
  COLOR_RED: {
    title: "red",
    value: "COLOR_RED",
    method: "inline",
    option: {
      style: {
        color: "COLOR_RED",
        background: "BACKGROUND_RED",
      },
      class: {
        color: "text-red",
        background: "bg-red-bg",
      },
    },
  },
  COLOR_PINK: {
    title: "pink",
    value: "COLOR_PINK",
    method: "inline",
    option: {
      style: {
        color: "COLOR_PINK",
        background: "BACKGROUND_PINK",
      },
      class: {
        color: "text-pink",
        background: "bg-pink-bg",
      },
    },
  },
  COLOR_PURPLE: {
    title: "purple",
    value: "COLOR_PURPLE",
    method: "inline",
    option: {
      style: {
        color: "COLOR_PURPLE",
        background: "BACKGROUND_PURPLE",
      },
      class: {
        color: "text-purple",
        background: "bg-purple-bg",
      },
    },
  },
  COLOR_BLUE: {
    title: "blue",
    value: "COLOR_BLUE",
    method: "inline",
    option: {
      style: {
        color: "COLOR_BLUE",
        background: "BACKGROUND_BLUE",
      },
      class: {
        color: "text-blue",
        background: "bg-blue-bg",
      },
    },
  },
  COLOR_GREEN: {
    title: "green",
    value: "COLOR_GREEN",
    method: "inline",
    option: {
      style: "COLOR_GREEN",
      style: {
        color: "COLOR_GREEN",
        background: "BACKGROUND_GREEN",
      },
      class: {
        color: "text-green",
        background: "bg-green-bg",
      },
    },
  },
};

export const toolsHeadingStyleItems = {
  h1: {
    title: "عنوان بزرگ",
    value: "h1",
    style: "header-one",
    method: "block",
  },
  h2: {
    title: "عنوان متوسط",
    value: "h2",
    style: "header-two",
    method: "block",
  },
  h3: {
    title: "عنوان کوچک",
    value: "h3",
    style: "header-three",
    method: "block",
  },
  p: {
    title: "متن",
    value: "p",
    style: "unstyled",
    method: "block",
  },
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

export const setStyle = (
  editorState: EditorState,
  style: any,
  method: string
): EditorState => {
  if (method === "block") {
    return RichUtils.toggleBlockType(editorState, style);
  } else {
    return RichUtils.toggleInlineStyle(editorState, style);
  }
};

export const getLastStyleBackgroundColor = (
  editorState: EditorState
): boolean => {
  return editorState.getCurrentInlineStyle().find((style: any) => {
    if (!!style) return style.includes("BACKGROUND_");
  });
};

export const getLastStyleFontColor = (editorState: EditorState): boolean => {
  return editorState.getCurrentInlineStyle().find((style: any) => {
    if (!!style) return style.includes("COLOR_");
  });
};

export const isStyleActive = (
  editorState: EditorState,
  style: any,
  method: string
): boolean => {
  if (method === "block") {
    const selection = editorState.getSelection();
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();
    return blockType === style;
  } else {
    const currentStyle = editorState.getCurrentInlineStyle();
    return currentStyle.has(style);
  }
};

export const editLink = (
  editorState: EditorState,
  entityKey: string,
  link: string,
  onActionClick: Function
): EditorState => {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.replaceEntityData(entityKey, {
    url: link,
    onActionClick,
  });

  const newEditorState = EditorState.set(editorState, {
    currentContent: contentStateWithEntity,
  });

  return RichUtils.toggleLink(
    newEditorState,
    newEditorState.getSelection(),
    entityKey
  );
};

export const setLink = (
  editorState: EditorState,
  link: string,
  onActionClick: Function
): EditorState => {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity("LINK", "MUTABLE", {
    url: link,
    onActionClick,
  });
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

  const newEditorState = EditorState.set(editorState, {
    currentContent: contentStateWithEntity,
  });

  return RichUtils.toggleLink(
    newEditorState,
    newEditorState.getSelection(),
    entityKey
  );
};

export const getBlockPositionDOM = (offsetKey: string) => {
  let postion = { x: 0, y: 0 };
  console.log(offsetKey);

  let x = 0;
  let y = 0;
  let blockEl = document.querySelector(
    'span[data-offset-key="' + offsetKey + '"]'
  );
  const blockHeight = blockEl.offsetHeight;
  const blockWidth = blockEl.offsetWidth;
  while (blockEl && !isNaN(blockEl.offsetLeft) && !isNaN(blockEl.offsetTop)) {
    x += blockEl.offsetLeft - blockEl.scrollLeft;
    y += blockEl.offsetTop - blockEl.scrollTop;
    blockEl = blockEl.offsetParent;
  }

  x = x + blockWidth;
  postion = {
    x: x,
    y: y + blockHeight,
  };
  return postion;
};
