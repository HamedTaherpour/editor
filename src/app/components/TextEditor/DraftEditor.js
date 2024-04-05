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
import { TYPE_NODE_QUOTE } from "@/app/lib/editor/type";
import { EditorContext } from "@/app/lib/editor/hook/context";

var delta = 500;
var lastKeypressTime = 0;

const DraftEditor = ({ onChangeText, placeholder, node, index }) => {
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

  useEffect(() => {
    focusEditor();
  }, []);

  const focusEditor = () => {
    editor.current.focus();
  };
  node.focus = focusEditor;

  function myKeyBindingFn(event) {
    if (node.type === TYPE_NODE_QUOTE && event.key === "Enter") {
      var thisKeypressTime = new Date();
      if (thisKeypressTime - lastKeypressTime <= delta) {
        onNodeBehavior.onKeyUp(event, index);
        // optional - if we'd rather not detect a triple-press
        // as a second double-press, reset the timestamp
        thisKeypressTime = 0;
        return "handled";
      }
      lastKeypressTime = thisKeypressTime;
    } else {
      onNodeBehavior.onKeyUp(event, index);
    }
    return getDefaultKeyBinding(event);
  }

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return true;
    }
    return false;
  };

  const handleReturn = (event) => {
    setShowToolbar(false);
    if (node.type !== TYPE_NODE_QUOTE) {
      onNodeBehavior.onKeyUp(event, index);
      return "handled";
    }
  };

  const onMouseUp = (e) => {
    if (!!window.getSelection().toString()) {
      setShowToolbar(true);
    } else if (!e.target.closest(".ignore")) {
      setShowToolbar(false);
    }
  };

  const onMouseLeave = (e) => {
    if (!e.target.closest(".ignore")) setShowToolbar(false);
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
      background: "rgba(203, 145, 47, 1)",
    },
    BACKGROUND_ORAMGE: {
      background: "rgba(217, 115, 13, 1)",
    },
    BACKGROUND_BROWN: {
      background: "rgba(159, 107, 83, 1)",
    },
    BACKGROUND_GRAY: {
      background: "rgba(120, 119, 116, 1)",
    },
    BACKGROUND_DARK: {
      background: "rgba(36, 36, 36, 1)",
    },
    BACKGROUND_RED: {
      background: "rgba(212, 76, 71, 1)",
    },
    BACKGROUND_PINK: {
      background: "rgba(193, 76, 138, 1)",
    },
    BACKGROUND_PURPLE: {
      background: "rgba(144, 101, 176, 1)",
    },
    BACKGROUND_BLUE: {
      background: "rgba(54, 128, 170, 1)",
    },
    BACKGROUND_GREEN: {
      background: "rgba(68, 131, 97, 1)",
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

  return (
    <div
      className="et-wrapper"
      onMouseLeave={onMouseLeave}
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
        handleReturn={handleReturn}
        handleKeyCommand={handleKeyCommand}
        editorState={editorState}
        customStyleMap={styleMap}
        blockStyleFn={myBlockStyleFn}
        keyBindingFn={myKeyBindingFn}
        onChange={(editorState) => {
          const contentState = editorState.getCurrentContent();
          onChangeText(convertToRaw(contentState));
          setEditorState(editorState);
        }}
      />
    </div>
  );
};

export default DraftEditor;
