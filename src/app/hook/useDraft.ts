import { CompositeDecorator, ContentBlock, convertFromRaw, EditorState, RichUtils } from "draft-js";
import { INodeText, DraftStyleOptions } from "@/app/type/index.type";
import LinkComponent from "@/app/components/TextEditor/component/Link";
import LinkReadonlyComponent from "@/app/components/TextEditor/component/read-only/LinkReadonly";

const useDraft = () => {

  const customDraftStyleMap = {
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

  // @ts-ignore
  const blockDraftStyleFn = (contentBlock: ContentBlock) => {
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

  const findLinkEntities = (contentBlock: any, callback: any, contentState: any) => {
    contentBlock.findEntityRanges((character: any) => {
      const entityKey = character.getEntity();
      return entityKey !== null && contentState.getEntity(entityKey).getType() === "LINK";
    }, callback);
  };

  const editorDecorator = new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: LinkComponent
    }
  ]);

  const readonlyDecorator = new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: LinkReadonlyComponent
    }
  ]);

  const getInitialDraftState = (node?: INodeText | undefined, readonly?: boolean): EditorState => {
    const decorator = readonly ? readonlyDecorator : editorDecorator;
    let editorState = EditorState.createEmpty(decorator);
    if (node) {
      if (!!node.json && !!node.json.blocks) {
        const content = convertFromRaw(node.json);
        editorState = EditorState.createWithContent(content, decorator);
        editorState = EditorState.moveSelectionToEnd(editorState);
      }
      editorState = setDraftBaseTag(editorState, node);
    }
    return editorState;
  };

  const setDraftBaseTag = (editorState: EditorState, node: INodeText): EditorState => {
    let newEditorState = editorState;

    const keys: { [key: string]: string } = {
      p: "unstyled",
      h1: "header-one",
      h2: "header-two",
      h3: "header-three",
      "ul-disc": "unordered-list-item",
      "ul-decimal": "ordered-list-item"
    };

    const style = keys[node.heading];
    const blockType = editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getStartKey()).getType();
    if (blockType !== style) {
      newEditorState = setDraftStyle(editorState, style, "block");
    }

    return newEditorState;
  };

  const setDraftStyle = (editorState: EditorState, style: any, method: string): EditorState => {
    if (method === "block") {
      return RichUtils.toggleBlockType(editorState, style);
    } else {
      return RichUtils.toggleInlineStyle(editorState, style);
    }
  };

  const getLastDraftStyleFontColor = (editorState: EditorState): any => {
    return editorState.getCurrentInlineStyle().find((style: any) => {
      if (!!style) {
        console.log(style);
        return style.includes("COLOR_");
      }
    });
  };

  const getLastDraftStyleBackgroundColor = (editorState: EditorState): any => {
    return editorState.getCurrentInlineStyle().find((style: any) => {
      if (!!style) return style.includes("BACKGROUND_");
    });
  };

  const isDraftStyleActive = (editorState: EditorState, style: any, method: string): boolean => {
    if (method === "block") {
      const selection = editorState.getSelection();
      const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
      return blockType === style;
    } else {
      const currentStyle = editorState.getCurrentInlineStyle();
      return currentStyle.has(style);
    }
  };

  const getDraftBlockPositionFromDOM = (offsetKey: string) => {
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

  const getDraftLineNumberSelected = (editorState: EditorState): number => {
    const currentBlockKey = getDraftLineKeySelected(editorState);
    return editorState
      .getCurrentContent()
      .getBlockMap()
      .keySeq()
      .findIndex((k: any) => k === currentBlockKey);
  };

  const getDraftLineKeySelected = (editorState: EditorState) => {
    return editorState.getSelection().getStartKey();
  };

  const getDraftLineSize = (editorState: EditorState): number => {
    return editorState.getCurrentContent().getBlockMap().keySeq().size;
  };

  const getDraftCharPositionOfLine = (editorState: EditorState) => {
    const selectionState = editorState.getSelection();
    return selectionState.getStartOffset();
  };

  const getDraftValueOfLine = (editorState: EditorState, lineKey: any) => {
    let currentContent = editorState.getCurrentContent();
    let currentContentBlock = currentContent.getBlockForKey(lineKey);
    return currentContentBlock.getText();
  };

  const getDraftText = (editorState: EditorState) => {
    return editorState.getCurrentContent().getPlainText("\u0001");
  };

  const setDraftLink = (editorState: EditorState, link: string): EditorState => {
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

  const editDraftLink = (editorState: EditorState, entityKey: string, link: string): EditorState => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.replaceEntityData(entityKey, {
      url: link
    });

    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity
    });

    return RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey);
  };

  return {
    customDraftStyleMap, blockDraftStyleFn, setDraftBaseTag, setDraftLink, editDraftLink,
    getInitialDraftState, getDraftBlockPositionFromDOM, getDraftLineNumberSelected, getDraftLineKeySelected, getDraftLineSize, getDraftCharPositionOfLine, getDraftValueOfLine, getDraftText,
    setDraftStyle, isDraftStyleActive, getLastDraftStyleBackgroundColor, getLastDraftStyleFontColor
  };
};

export default useDraft;