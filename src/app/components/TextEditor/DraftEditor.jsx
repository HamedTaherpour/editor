import React, { useEffect, useRef, useState, useContext } from "react";
import { createPortal } from "react-dom";

import { Editor, convertToRaw, getDefaultKeyBinding } from "draft-js";
import { getValue, getLineNumberSelected, getLineKeySelected, getLineSize, getPositionOfLine, getValueOfLine, customStyleMap, blockStyleFn, editLink, getBlockPositionDOM, setLink, getFirstInitEditorState, setStyle, getLastStyleFontColor, getLastStyleBackgroundColor } from "../../lib/editor-text/hook/tools";

import Toolbar from "./Toolbar";
import MenuNodeEditor from "../editor/MenuNodeEditor";
import LinkEditConfirm from "./component/LinkEditConfirm";
import LinkConfirm from "./component/LinkConfirm";
import "draft-js/dist/Draft.css";
import { TYPE_NODE_QUOTE, TYPE_NODE_TEXT } from "../../lib/editor/type";
import { EditorContext } from "../../lib/editor/hook/context";
import { TextEditorContext } from "../../lib/editor-text/hook/context";

import useOutsideClick from "../../lib/helpers/OutsideClick";
import { getElementPosition } from "../../lib/helpers";

var delta = 200;
var lastKeypressTime = 0;

const DraftEditor = ({ onChangeText, onChange, placeholder, node, index }) => {
  const onNodeBehavior = useContext(EditorContext);

  const onTextEditorBehavior = {
    onBtnLinkEditClick(url, entityKey, offsetKey) {
      setEntityKeyEdit(entityKey);
      setOffseKeyEdit(offsetKey);
      setLinkEdit(url);
      setShowEditLinkConfirm(true);
    }
  };

  const [editorState, setEditorState] = useState(getFirstInitEditorState(node, false));
  const [showToolbar, setShowToolbar] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const [positionLink, setPositionLink] = useState({ x: 0, y: 0 });
  const [showEditLinkConfirm, setShowEditLinkConfirm] = useState(false);
  const [linkEdit, setLinkEdit] = useState("");
  const [showLinkConfirm, setShowLinkConfirm] = useState(false);
  const [entityKeyEdit, setEntityKeyEdit] = useState();
  const [offseKeyEdit, setOffseKeyEdit] = useState();

  const [positionMenu, setPositionMenu] = useState({ x: 0, y: 0 });
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
  const menuEl = document.body;
  let rootClazz = "node-" + node.id;
  if (node.baseTag === "ul-disc" || node.baseTag === "ul-decimal") {
    rootClazz += " et-bullets";
  }

  useEffect(() => {
    node.focus = focus;
    node.focus();
  }, []);

  useEffect(() => {
    if (showEditLinkConfirm && refEditConfirm.current) {
      const positionBlock = getBlockPositionDOM(offseKeyEdit);
      setPositionLink({
        x: positionBlock.x - refEditConfirm.current.clientWidth,
        y: positionBlock.y
      });
    }
  }, [showEditLinkConfirm]);

  const focus = () => {
    editor.current.focus();
  };

  function myKeyBindingFn(event) {
    setShowMenu(false);
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      const lineNumber = getLineNumberSelected(editorState);
      const lineSize = getLineSize(editorState);
      if (event.key === "ArrowUp" && lineNumber <= 1) {
        setShowToolbar(false);
        onNodeBehavior.onKeyUp(event, index);
        return;
      } else if (event.key === "ArrowDown" && lineNumber >= lineSize - 1) {
        setShowToolbar(false);
        onNodeBehavior.onKeyUp(event, index);
        return;
      }
    } else if (event.key === "Enter") {
      if (node.type === TYPE_NODE_QUOTE || node.baseTag === "ul-disc" || node.baseTag === "ul-decimal") {
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
        const lineSize = getLineSize(editorState);
        const positionOfLine = getPositionOfLine(editorState);
        const lineLength = getValueOfLine(editorState, lineKey).length;
        if (positionOfLine >= lineLength && lineNumber >= lineSize - 1) {
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
      setTimeout(() => {
        openKeySlash(event);
      }, 100);
    }
    return getDefaultKeyBinding(event);
  }

  const openKeySlash = (e) => {
    setShowMenu(true);
    let x = 0;
    let y = 0;

    let el = window.getSelection().focusNode.parentNode;
    const pos = getElementPosition(el);
    x = pos.x;
    y = pos.y;

    x -= 256;
    y += el.offsetHeight;

    setPositionMenu({
      x: x,
      y: y
    });
  };

  const myOnTransitionNodeListener = () => {
    setShowToolbar(false);
    onNodeBehavior.onTransition(node.type === TYPE_NODE_TEXT ? TYPE_NODE_QUOTE : TYPE_NODE_TEXT, index);
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
    setEditorState(setLink(editorState, link));
    setShowLinkConfirm(false);
  };

  const onBtnSetEditLinkClick = (link) => {
    setEditorState(editLink(editorState, entityKeyEdit, link));
    setShowEditLinkConfirm(false);
  };

  return (
    <div ref={ref} className={rootClazz + " node-draft"} onMouseUp={onMouseUp}>
      <TextEditorContext.Provider value={onTextEditorBehavior}>
        {showMenu
          ? createPortal(
            <div
              ref={refMenu}
              style={{
                top: positionMenu.y,
                left: positionMenu.x
              }}
              className="portal"
            >
              <MenuNodeEditor index={index} onActionClick={() => setShowMenu(false)} />
            </div>,
            menuEl
          )
          : null}
        <div className="portal-parent">
          {showToolbar ? <Toolbar node={node} editorState={editorState} setEditorState={setEditorState} onBtnShowLinkConfirmClick={onBtnShowLinkConfirmClick} onTransitionNodeListener={myOnTransitionNodeListener} /> : null}
          {showLinkConfirm ? (
            <div ref={refConfirm} className="portal">
              <LinkConfirm onBtnSetLinkClick={onBtnSetLinkClick} />
            </div>
          ) : null}
          {showEditLinkConfirm
            ? createPortal(
              <div
                ref={refEditConfirm}
                className="portal"
                style={{
                  top: positionLink.y,
                  left: positionLink.x
                }}
              >
                <LinkEditConfirm onBtnSetEditLinkClick={onBtnSetEditLinkClick} linkEdit={linkEdit} />
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
            setEditorState(editorState);
            const contentState = editorState.getCurrentContent();
            onChange(convertToRaw(contentState));
            onChangeText(getValue(editorState));
          }}
        />
      </TextEditorContext.Provider>
    </div>
  );
};

export default DraftEditor;
