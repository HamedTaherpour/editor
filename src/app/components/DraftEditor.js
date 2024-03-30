import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
  CompositeDecorator,
} from "draft-js";
import Toolbar from "@/app/components/TextEditor/Toolbar";
import "./DraftEditor.css";

const DraftEditor = ({ onChangeText, onKeyUp }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [showToolbar, setShowToolbar] = useState(false);
  const editor = useRef(null);

  useEffect(() => {
    focusEditor();
  }, []);

  const focusEditor = () => {
    editor.current.focus();
  };

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
    onKeyUp(event);
    return "handled";
  };

  const onMouseUp = (e) => {
    if (!!window.getSelection().toString()) {
      setShowToolbar(true);
    } else {
      setShowToolbar(false);
    }
  };

  const onMouseLeave = (e) => {
    setShowToolbar(false);
  };

  // FOR INLINE STYLES
  const styleMap = {
    CODE: {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 16,
      padding: 2,
    },
    HIGHLIGHT: {
      backgroundColor: "#F7A5F7",
    },
    UPPERCASE: {
      textTransform: "uppercase",
    },
    LOWERCASE: {
      textTransform: "lowercase",
    },
    CODEBLOCK: {
      fontFamily: '"fira-code", "monospace"',
      fontSize: "inherit",
      background: "#ffeff0",
      fontStyle: "italic",
      lineHeight: 1.5,
      padding: "0.3rem 0.5rem",
      borderRadius: " 0.2rem",
    },
    SUPERSCRIPT: {
      verticalAlign: "super",
      fontSize: "80%",
    },
    SUBSCRIPT: {
      verticalAlign: "sub",
      fontSize: "80%",
    },
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
      case "blockQuote":
        return "superFancyBlockquote";
      case "leftAlign":
        return "leftAlign";
      case "rightAlign":
        return "rightAlign";
      case "centerAlign":
        return "centerAlign";
      case "justifyAlign":
        return "justifyAlign";
      default:
        break;
    }
  };

  return (
    <div
      className="relative w-full"
      onClick={focusEditor}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
    >
      {showToolbar ? (
        <Toolbar editorState={editorState} setEditorState={setEditorState} />
      ) : null}
      <Editor
        ref={editor}
        handleReturn={handleReturn}
        handleKeyCommand={handleKeyCommand}
        editorState={editorState}
        customStyleMap={styleMap}
        blockStyleFn={myBlockStyleFn}
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
