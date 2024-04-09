import React, { useEffect, useRef, useState, useContext } from "react";
import { createPortal } from "react-dom";

import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
  getDefaultKeyBinding,
} from "draft-js";
import {
  getValue,
  getLineNumberSelected,
  getLineKeySelected,
  getLineSize,
  getPositionOfLine,
  getValueOfLine,
  customStyleMap,
  blockStyleFn,
  editLink,
  getBlockPositionDOM,
  setLink,
} from "@/app/lib/editor-text/hook/tools";

import Toolbar from "@/app/components/TextEditor/Toolbar";
import { editorDecorator } from "@/app/components/TextEditor/index";
import ToolsMenuNodeEditor from "@/app/components/editor/ToolsMenuNodeEditor";
import LinkEditConfirm from "@/app/components/TextEditor/component/LinkEditConfirm";
import LinkConfirm from "@/app/components/TextEditor/component/LinkConfirm";
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
  const [showMenu, setShowMenu] = useState(false);

  const [postionLink, setPostionLink] = useState({ x: 0, y: 0 });
  const [showEditLinkConfirm, setShowEditLinkConfirm] = useState(false);
  const [linkEdit, setLinkEdit] = useState("");
  const [showLinkConfirm, setShowLinkConfirm] = useState(false);
  const [entityKeyEdit, setEntityKeyEdit] = useState();
  const [offseKeyEdit, setOffseKeyEdit] = useState();

  const [postionMenu, setPostionMenu] = useState({ x: 0, y: 0 });
  const editor = useRef(null);
  const ref = useOutsideClick(() => {
    setShowToolbar(false);
  });
  const refMenu = useOutsideClick(() => {
    setShowMenu(false);
  });
  const refConfirm = useOutsideClick((e) => {
    if (!e.target.closest(".node-" + node.id)) {
      setShowLinkConfirm(false);
    }
  });
  const refEditConfirm = useOutsideClick((e) => {
    if (!e.target.closest(".node-" + node.id)) {
      setShowEditLinkConfirm(false);
    }
  });
  const menuEl = document.getElementById("menu");

  if (node.baseTag !== "p" && !!!node.text && !!!node.text.blocks) {
    const keys = {
      h1: "header-one",
      h2: "header-two",
      h3: "header-three",
    };
    const style = keys[node.baseTag];
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(editorState.getSelection().getStartKey())
      .getType();
    if (blockType !== style) {
      setEditorState(RichUtils.toggleBlockType(editorState, style));
    }
  }

  useEffect(() => {
    focusEditor();

    if (showEditLinkConfirm && refEditConfirm.current) {
      const positionblock = getBlockPositionDOM(offseKeyEdit);
      setPostionLink({
        x: positionblock.x - refEditConfirm.current.clientWidth,
        y: positionblock.y,
      });
    }
  }, [showEditLinkConfirm]);

  const focusEditor = () => {
    editor.current.focus();
  };
  node.focus = focusEditor;

  function myKeyBindingFn(event) {
    setShowMenu(false);
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      const lineNumber = getLineNumberSelected(editorState);
      const linesize = getLineSize(editorState);
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
        const lineNumber = getLineNumberSelected(editorState);
        const lineKey = getLineKeySelected(editorState);
        const linesize = getLineSize(editorState);
        const postionOfLine = getPositionOfLine(editorState);
        const lineLength = getValueOfLine(editorState, lineKey).length;
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
      }
    } else if (event.key === "/") {
      openKeySlash(event);
    }
    return getDefaultKeyBinding(event);
  }

  const openKeySlash = (e) => {
    setShowMenu(true);
    let x = 0;
    let y = 0;

    let el = window.getSelection().focusNode.parentNode;
    const elHeight = el.offsetHeight;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
      x += el.offsetLeft - el.scrollLeft;
      y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
    }
    x = x - 256;

    setPostionMenu({
      x: x,
      y: y + elHeight,
    });
  };

  const myOnTransitionNodeListener = () => {
    setShowToolbar(false);
    onNodeBehavior.onTransition(
      node.type === TYPE_NODE_TEXT ? TYPE_NODE_QUOTE : TYPE_NODE_TEXT,
      index
    );
  };

  const onMouseUp = (e) => {
    if (!!window.getSelection().toString()) {
      setShowToolbar(true);
    } else if (!e.target.closest(".node-" + node.id)) {
      setShowToolbar(false);
    }
  };

  const onBtnShowLinkConfirmClick = () => {
    setShowLinkConfirm(!showLinkConfirm);
  };

  const onBtnSetLinkClick = (link) => {
    setEditorState(setLink(editorState, link, onLinkActionClick));
    setShowLinkConfirm(false);
  };

  const onBtnSetEditLinkClick = (link) => {
    setEditorState(
      editLink(editorState, entityKeyEdit, link, onLinkActionClick)
    );
    setShowEditLinkConfirm(false);
  };

  const onLinkActionClick = (url, entityKey, offsetKey) => {
    setEntityKeyEdit(entityKey);
    setOffseKeyEdit(offsetKey);
    setLinkEdit(url);
    setShowEditLinkConfirm(true);
  };

  return (
    <div
      ref={ref}
      className={"node-" + node.id + " w-full"}
      onMouseUp={onMouseUp}
    >
      {showMenu
        ? createPortal(
            <div
              ref={refMenu}
              style={{
                top: postionMenu.y,
                left: postionMenu.x,
              }}
              className="absolute z-50 bg-white p-2 border border-slate-200 rounded-lg shadow-xl2"
            >
              <ToolsMenuNodeEditor
                index={index}
                onActionClick={() => setShowMenu(false)}
              />
            </div>,
            menuEl
          )
        : null}
      <div className="relative">
        {showToolbar ? (
          <Toolbar
            editorState={editorState}
            setEditorState={setEditorState}
            onBtnShowLinkConfirmClick={onBtnShowLinkConfirmClick}
            onTransitionNodeListener={myOnTransitionNodeListener}
          />
        ) : null}
        {showLinkConfirm ? (
          <div ref={refConfirm} className="absolute z-50">
            <LinkConfirm onBtnSetLinkClick={onBtnSetLinkClick} />
          </div>
        ) : null}
        {showEditLinkConfirm
          ? createPortal(
              <div
                ref={refEditConfirm}
                className="absolute z-50"
                style={{
                  top: postionLink.y,
                  left: postionLink.x,
                }}
              >
                <LinkEditConfirm
                  onBtnSetEditLinkClick={onBtnSetEditLinkClick}
                  linkEdit={linkEdit}
                />
              </div>,
              menuEl
            )
          : null}
      </div>
      <Editor
        ref={editor}
        placeholder={placeholder}
        editorState={editorState}
        customStyleMap={customStyleMap}
        textDirectionality="RTL"
        blockStyleFn={blockStyleFn}
        keyBindingFn={myKeyBindingFn}
        onChange={(editorState) => {
          const contentState = editorState.getCurrentContent();
          onChange(convertToRaw(contentState));
          onChangeText(getValue(editorState));
          setEditorState(editorState);
        }}
      />
    </div>
  );
};

export default DraftEditor;
