import React, { useEffect, useRef, useState } from "react";
import { Editor, EditorState, RichUtils, convertToRaw } from "draft-js";
import Toolbar from "@/app/components/TextEditor/Toolbar";
import { editorDecorator } from "@/app/components/TextEditor/index";
import "draft-js/dist/Draft.css";
const DraftEditor = ({ onChangeText, onKeyUp, onAddNodeListener }) => {
  const [editorState, setEditorState] = useState(
    EditorState.createEmpty(editorDecorator)
  );
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

  const myOnAddNodeListener = (type) => {
    setShowToolbar(false);
    onAddNodeListener.onAdd(type);
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
            onAddNodeListener={myOnAddNodeListener}
          />
        ) : null}
      </div>
      <Editor
        ref={editor}
        placeholder="چیزی منویسید"
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
