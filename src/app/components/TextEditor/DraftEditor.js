import React, {
  useEffect,
  useRef,
  useState,
  useContext,
} from "react";
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

  useEffect(() => {
    focusEditor();
  }, []);

  const focusEditor = () => {
    editor.current.focus();
  };
  node.focus = focusEditor;

  function myKeyBindingFn(event) {
    if (node.type === TYPE_NODE_QUOTE) {
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
      } else if (event.key === "Enter") {
        var thisKeypressTime = new Date();
        if (thisKeypressTime - lastKeypressTime <= delta) {
          thisKeypressTime = 0;
          setShowToolbar(false);
          onNodeBehavior.onKeyUp(event, index);
          return;
        }
        lastKeypressTime = thisKeypressTime;
      }
    } else if (node.type === TYPE_NODE_TEXT) {
      if (
        event.key === "ArrowUp" ||
        event.key === "ArrowDown" ||
        event.key === "Enter"
      ) {
        setShowToolbar(false);
        onNodeBehavior.onKeyUp(event, index);
        return;
      }
    }

    if (event.key === "Backspace") {
      console.log(node.plainText);
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

  const getLineSize = () => {
    const currentBlockKey = editorState.getSelection().getStartKey();
    return editorState.getCurrentContent().getBlockMap().keySeq().size;
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

  const onFocus = () => {
    setShowToolbar(true);
  };

  return (
    <div ref={ref} className={"node-" + node.id + " w-full"}>
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
        onFocus={onFocus}
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
