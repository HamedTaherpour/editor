import React, { useEffect, useRef, useState, useContext } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
  getDefaultKeyBinding,
} from "draft-js";
import Toolbar from "@/app/components/TextEditor/Toolbar";
import { editorDecorator } from "@/app/components/TextEditor/index";
import "draft-js/dist/Draft.css";
import { TYPE_NODE_QUOTE, TYPE_NODE_TEXT } from "@/app/lib/editor/type";
import { EditorContext } from "@/app/lib/editor/hook/context";
import useOutsideClick from "@/app/lib/OutsideClick";

var delta = 200;
var lastKeypressTime = 0;

const DraftEditor = ({ onChangeText, onChange, placeholder, node, index }) => {
  const onNodeBehavior = useContext(EditorContext);

  let initEditorState = EditorState.createEmpty(editorDecorator);
  if (!!node.text && !!node.text.blocks) {
    const content = convertFromRaw(node.text);
    initEditorState = EditorState.createWithContent(content, editorDecorator);
    initEditorState = EditorState.moveSelectionToEnd(initEditorState);
  }
  const [editorState, setEditorState] = useState(initEditorState);
  const [showToolbar, setShowToolbar] = useState(false);
  const editor = useRef(null);
  const ref = useOutsideClick(() => {
    setShowToolbar(false);
  });

  if (node.baseTag !== "p" && !!!node.text && !!!node.text.blocks) {
    const keys = {
      h1: "header-one",
      h2: "header-two",
      h3: "header-three",
    };
    const style = keys[node.baseTag];
    const selection = editorState.getSelection();
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();
    if (blockType !== style) {
      setEditorState(RichUtils.toggleBlockType(editorState, style));
    }
  }

  useEffect(() => {
    focusEditor();
  }, []);

  const focusEditor = () => {
    editor.current.focus();
  };
  node.focus = focusEditor;

  function myKeyBindingFn(event) {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      const lineNumber = getLineNumberSelected();
      const linesize = getLineSize();
      if (event.key === "ArrowUp" && lineNumber <= 1) {
        setShowToolbar(false);
        onNodeBehavior.onKeyUp(event, index);
        return;
      } else if (event.key === "ArrowDown" && lineNumber >= linesize - 1) {
        setShowToolbar(false);
        onNodeBehavior.onKeyUp(event, index);
        return;
      }
    } else if (event.key === "Enter") {
      if (node.type === TYPE_NODE_QUOTE) {
        var thisKeypressTime = new Date();
        if (thisKeypressTime - lastKeypressTime <= delta) {
          thisKeypressTime = 0;
          setShowToolbar(false);
          onNodeBehavior.onKeyUp(event, index);
          return;
        }
        lastKeypressTime = thisKeypressTime;
      } else {
        const lineNumber = getLineNumberSelected();
        const lineKey = getLineKeySelected();
        const linesize = getLineSize();
        const postionOfLine = getPositionOfLine();
        const lineLength = getValueOfLine(lineKey).length;
        if (postionOfLine >= lineLength && lineNumber >= linesize - 1) {
          setShowToolbar(false);
          onNodeBehavior.onKeyUp(event, index);
          return;
        }
      }
    } else if (event.key === "Backspace") {
      if (node.plainText.length <= 0) {
        setShowToolbar(false);
        onNodeBehavior.onKeyUp(event, index);
        return;
      }
    }
    return getDefaultKeyBinding(event);
  }

  const getLineNumberSelected = () => {
    const currentBlockKey = editorState.getSelection().getStartKey();
    return editorState
      .getCurrentContent()
      .getBlockMap()
      .keySeq()
      .findIndex((k) => k === currentBlockKey);
  };
  const getLineKeySelected = () => {
    return editorState.getSelection().getStartKey();
  };
  const getLineSize = () => {
    const currentBlockKey = editorState.getSelection().getStartKey();
    return editorState.getCurrentContent().getBlockMap().keySeq().size;
  };
  const getPositionOfLine = () => {
    const selectionState = editorState.getSelection();
    return selectionState.getStartOffset();
  };
  const getValueHighlight = () => {
    let selectionState = editorState.getSelection();
    let anchorKey = selectionState.getAnchorKey();
    let currentContent = editorState.getCurrentContent();
    let currentContentBlock = currentContent.getBlockForKey(anchorKey);
    let start = selectionState.getStartOffset();
    let end = selectionState.getEndOffset();
    let selectedText = currentContentBlock.getText().slice(start, end);
    return selectedText;
  };
  const getValueOfLine = (lineKey) => {
    let currentContent = editorState.getCurrentContent();
    let currentContentBlock = currentContent.getBlockForKey(lineKey);
    return currentContentBlock.getText();
  };
  const getValue = (contentState) => {
    contentState = contentState || editorState.getCurrentContent();
    return contentState.getPlainText("\u0001");
  };

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return true;
    }
    return false;
  };

  // FOR INLINE STYLES
  const styleMap = {
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
  const myBlockStyleFn = (contentBlock) => {
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

  const myOnTransitionNodeListener = (typeTransition) => {
    setShowToolbar(false);
    onNodeBehavior.onTransition(typeTransition, index);
  };

  const onMouseUp = (e) => {
    if (!!window.getSelection().toString()) {
      setShowToolbar(true);
    } else if (!e.target.closest(".node-" + node.id)) {
      setShowToolbar(false);
    }
  };

  return (
    <div
      ref={ref}
      className={"node-" + node.id + " w-full"}
      onMouseUp={onMouseUp}
    >
      <div className="relative">
        {showToolbar ? (
          <Toolbar
            editorState={editorState}
            setEditorState={setEditorState}
            onTransitionNodeListener={myOnTransitionNodeListener}
          />
        ) : null}
      </div>
      <Editor
        ref={editor}
        placeholder={placeholder}
        handleKeyCommand={handleKeyCommand}
        editorState={editorState}
        customStyleMap={styleMap}
        textDirectionality="RTL"
        blockStyleFn={myBlockStyleFn}
        keyBindingFn={myKeyBindingFn}
        onChange={(editorState) => {
          const contentState = editorState.getCurrentContent();
          onChange(convertToRaw(contentState));
          onChangeText(getValue(contentState));
          setEditorState(editorState);
        }}
      />
    </div>
  );
};

export default DraftEditor;
