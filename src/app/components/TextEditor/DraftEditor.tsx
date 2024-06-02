import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { Editor, convertToRaw, getDefaultKeyBinding, EditorState, RichUtils, DraftEditorCommand } from "draft-js";

import Toolbar from "./Toolbar";
import AddNodeMenu from "../AddNodeMenu";
import LinkEditConfirm from "./component/LinkEditConfirm";
import LinkConfirm from "./component/LinkConfirm";
import "draft-js/dist/Draft.css";

import useOutsideClick from "@/app/helpers/OutsideClick";
import { getElementPosition, isMobile } from "../../helpers";
import useEditor from "@/app/hook/useEditor";
import useDraft from "@/app/hook/useDraft";
import { OnTextEditorBehavior, TYPE_NODE_QUOTE } from "@/app/type/index.type";
import { TextEditorContext } from "@/app/helpers/context";

var delta = 200;
var lastKeypressTime = 0;

interface Props {
  index: number;
  placeholder: string,
}

const DraftEditor = (props: Props) => {
  const { index, placeholder } = props;
  const { getNodeText, pressKeyUp } = useEditor();
  const { customDraftStyleMap, getDraftText, blockDraftStyleFn, getDraftBlockPositionFromDOM, getDraftValueOfLine, setDraftLink, editDraftLink, getDraftLineKeySelected, getDraftCharPositionOfLine, getDraftLineNumberSelected, getDraftLineSize } = useDraft();
  const node = getNodeText(index);

  const [showLinkConfirm, setShowLinkConfirm] = useState(false);

  const [showToolbar, setShowToolbar] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const [positionLink, setPositionLink] = useState({ x: 0, y: 0 });
  const [showEditLinkConfirm, setShowEditLinkConfirm] = useState(false);
  const [linkEdit, setLinkEdit] = useState("");
  const [entityKeyEdit, setEntityKeyEdit] = useState("");
  const [offsetKeyEdit, setOffsetKeyEdit] = useState("");

  const [positionMenu, setPositionMenu] = useState({ x: 0, y: 0 });
  const editorRef = useRef<Editor>();
  const ref = useOutsideClick<HTMLDivElement>(() => {
    setShowToolbar(false);
  });
  const refMenu = useOutsideClick<HTMLDivElement>(() => {
    setShowMenu(false);
  });
  const refConfirm = useOutsideClick<HTMLDivElement>((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target && !target.closest(".node-" + node.value.id)) {
      setShowLinkConfirm(false);
    }
  });
  const refEditConfirm = useOutsideClick<HTMLDivElement>((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target && target.closest(".node-" + node.value.id)) {
      setShowEditLinkConfirm(false);
    }
  });
  const menuEl = document.getElementById("editor-root");
  let rootClazz = "node-" + node.value.id;
  if (node.value.heading === "ul-disc" || node.value.heading === "ul-decimal") {
    rootClazz += " et-bullets";
  }

  useEffect(() => {
    node.setOnToggleLinkConfirmListener({
      onToggleLinkConfirm() {
        setShowLinkConfirm(!showLinkConfirm);
      }
    });
    focus();
  }, []);

  useEffect(() => {
    node.setFocus(focus);
  }, [node]);

  useEffect(() => {
    if (showEditLinkConfirm && refEditConfirm.current) {
      const positionBlock = getDraftBlockPositionFromDOM(offsetKeyEdit);
      setPositionLink({
        x: positionBlock.x - refEditConfirm.current.clientWidth,
        y: positionBlock.y
      });
    }
  }, [showEditLinkConfirm]);

  const onTextEditorBehavior: OnTextEditorBehavior = {
    onBtnLinkEditClick(url, entityKey, offsetKey) {
      setEntityKeyEdit(entityKey);
      setOffsetKeyEdit(offsetKey);
      setLinkEdit(url);
      setShowEditLinkConfirm(true);
    }
  };

  const focus = () => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const blur = () => {
    if (editorRef.current)
      editorRef.current?.blur();
  };

  const onFocus = () => {
    // if (onNodeBehavior)
    //   onNodeBehavior.onFocus(index);
  };

  function myKeyBindingFn(event: React.KeyboardEvent<HTMLElement>) {
    setShowMenu(false);
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      const lineNumber = getDraftLineNumberSelected(node.draftState);
      const lineSize = getDraftLineSize(node.draftState);
      if (event.key === "ArrowUp" && lineNumber <= 1) {
        setShowToolbar(false);
        pressKeyUp(event, index);
        return;
      } else if (event.key === "ArrowDown" && lineNumber >= lineSize - 1) {
        setShowToolbar(false);
        pressKeyUp(event, index);
        return;
      }
    } else if (event.key === "Enter") {
      if (node.value.name === TYPE_NODE_QUOTE || node.value.heading === "ul-disc" || node.value.heading === "ul-decimal") {
        var thisKeypressTime = new Date();
        // @ts-ignore
        if (thisKeypressTime - lastKeypressTime <= delta) {
          // @ts-ignore
          thisKeypressTime = 0;
          setShowToolbar(false);
          pressKeyUp(event, index);
          return;
        }
        // @ts-ignore
        lastKeypressTime = thisKeypressTime;
      } else {
        const lineNumber = getDraftLineNumberSelected(node.draftState);
        const lineKey = getDraftLineKeySelected(node.draftState);
        const lineSize = getDraftLineSize(node.draftState);
        const positionOfLine = getDraftCharPositionOfLine(node.draftState);
        const lineLength = getDraftValueOfLine(node.draftState, lineKey).length;
        if (positionOfLine >= lineLength && lineNumber >= lineSize - 1) {
          setShowToolbar(false);
          pressKeyUp(event, index);
          return;
        }
      }
    } else if (event.key === "Backspace") {
      if (node.value.text.length <= 0) {
        setShowToolbar(false);
        pressKeyUp(event, index);
      }
    } else if (event.key === "/") {
      setTimeout(() => {
        openKeySlash(event);
      }, 100);
    }
    return getDefaultKeyBinding(event);
  }

  const handleKeyCommand = (command: DraftEditorCommand, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      node.setDraftState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const openKeySlash = (e: React.KeyboardEvent<HTMLElement>) => {
    setShowMenu(true);
    let x = 0;
    let y = 0;

    const section = window.getSelection();
    if (section) {
      const focusNode = section.focusNode;
      if (focusNode) {
        let el = focusNode.parentNode as HTMLElement;
        if (el) {
          const pos = getElementPosition(el);
          x = pos.x;
          y = pos.y;

          x -= 256;
          y += el.offsetHeight;

          setPositionMenu({
            x: x,
            y: y
          });
        }
      }
    }
  };

  const toggleTransitionToQuote = () => {
    setShowToolbar(false);
    node.toggleTransitionToQuote();
  };

  const onMouseUp = (e: React.MouseEvent<HTMLElement>) => {
    if (!isMobile()) {
      const section = window.getSelection();
      if (!!section && section.toString()) {
        setShowToolbar(true);
      } else {
        const target = e.target as HTMLElement;
        if (target && !target.closest(".node-" + node.value.id)) {
          setShowToolbar(false);
        }
      }
    }
  };

  const onBtnSetLinkClick = (link: string) => {
    node.setDraftState(setDraftLink(node.draftState, link));
    setShowLinkConfirm(false);
  };

  const onBtnSetEditLinkClick = (link: string) => {
    node.setDraftState(editDraftLink(node.draftState, entityKeyEdit, link));
    setShowEditLinkConfirm(false);
  };

  return <div ref={ref} className={rootClazz + " node-draft"} onMouseUp={onMouseUp}>
    <TextEditorContext.Provider value={onTextEditorBehavior}>
      {showMenu && menuEl
        ? createPortal(
          <div
            ref={refMenu}
            style={{
              top: positionMenu.y,
              left: positionMenu.x
            }}
            className="portal"
          >
            <AddNodeMenu index={index} onActionClick={() => setShowMenu(false)} />
          </div>,
          menuEl
        )
        : null}
      <div className="portal-parent">
        {showToolbar ? <Toolbar index={index} toggleTransitionToQuote={toggleTransitionToQuote} /> : null}
        {showLinkConfirm ? (
          <div ref={refConfirm} className="portal">
            <LinkConfirm onBtnSetLinkClick={onBtnSetLinkClick} />
          </div>
        ) : null}
        {showEditLinkConfirm && menuEl
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
      {/*@ts-ignore*/}
      <Editor
        ref={editorRef}
        placeholder={placeholder}
        editorState={node.draftState}
        customStyleMap={customDraftStyleMap}
        textDirectionality="RTL"
        blockStyleFn={blockDraftStyleFn}
        keyBindingFn={myKeyBindingFn}
        handleKeyCommand={handleKeyCommand}
        onFocus={onFocus}
        onChange={(editorState: EditorState) => {
          const changed = !!editorState.getUndoStack().size;
          if (changed) {
            const contentState = editorState.getCurrentContent();
            node.value.text = getDraftText(editorState);
            node.value.json = convertToRaw(contentState);
            // node.update();
          }
          node.setDraftState(editorState);
        }}
      />
    </TextEditorContext.Provider>
  </div>;
};

export default DraftEditor;
