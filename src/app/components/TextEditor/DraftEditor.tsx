import React, { useEffect, useRef, useState, useContext, forwardRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";

import { Editor, convertToRaw, getDefaultKeyBinding, EditorState, RichUtils, DraftEditorCommand } from "draft-js";

import { getValue, getLineNumberSelected, getLineKeySelected, getLineSize, getPositionOfLine, getValueOfLine, customStyleMap, blockStyleFn, editLink, getBlockPositionDOM, setLink, getFirstInitEditorState, setStyle, getLastStyleFontColor, getLastStyleBackgroundColor, isStyleActive, getValueHighlight } from "../../lib/editor-text/hook/tools";

import Toolbar from "./Toolbar";
import MenuNodeEditor from "../editor/MenuNodeEditor";
import LinkEditConfirm from "./component/LinkEditConfirm";
import LinkConfirm from "./component/LinkConfirm";
import { NodeText, OnNodeBehavior, TYPE_NODE_QUOTE, TYPE_NODE_TEXT } from "../../lib/editor/type";
import { EditorContext } from "../../lib/editor/hook/context";
import { TextEditorContext } from "../../lib/editor-text/hook/context";
import "draft-js/dist/Draft.css";

import useOutsideClick from "../../lib/helpers/OutsideClick";
import { getElementPosition, isMobile } from "../../lib/helpers";
import { OnTextEditorBehavior, ToolsColorStyleItemTextEditor, ToolsStyleItemTextEditor } from "@/app/lib/editor-text/type";

var delta = 200;
var lastKeypressTime = 0;

interface Props {
  node: NodeText;
  index: number;
  placeholder: string,
  onChange: (json: string) => void,
  onChangeText: (text: string) => void,
}

const DraftEditor = forwardRef(function DraftEditor(props: Props, _ref) {
  const { node, index, onChangeText, onChange, placeholder } = props;
  const [editorState, setEditorState] = useState<EditorState>(getFirstInitEditorState(node, false));
  const [showLinkConfirm, setShowLinkConfirm] = useState(false);

  useImperativeHandle(_ref, () => {
    return {
      onBtnShowLinkConfirmClick,
      blur,
      focus,
      onBtnHeadingItemClick: baseOnBtnHeadingItemClick,
      onBtnColorClick: baseOnBtnColorClick,
      onBtnBackgroundClick: baseOnBtnBackgroundClick,
      onBtnStyleClick: baseOnBtnStyleClick,
      isTextStyleActive: baseIsTextStyleActive
    };
  }, [editorState, showLinkConfirm]);

  const onNodeBehavior = useContext<OnNodeBehavior | undefined>(EditorContext);

  const [showToolbar, setShowToolbar] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const [positionLink, setPositionLink] = useState({ x: 0, y: 0 });
  const [showEditLinkConfirm, setShowEditLinkConfirm] = useState(false);
  const [linkEdit, setLinkEdit] = useState("");
  const [reRender, setReRender] = useState(false);
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
    if (target && target.closest(".node-" + node.id)) {
      setShowLinkConfirm(false);
    }
  });
  const refEditConfirm = useOutsideClick<HTMLDivElement>((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target && target.closest(".node-" + node.id)) {
      setShowEditLinkConfirm(false);
    }
  });
  const menuEl = document.body;
  let rootClazz = "node-" + node.id;
  if (node.baseTag === "ul-disc" || node.baseTag === "ul-decimal") {
    rootClazz += " et-bullets";
  }

  useEffect(() => {
    setReRender(!reRender);
  }, [editorState]);

  useEffect(() => {
    focus();
  }, []);

  useEffect(() => {
    if (showEditLinkConfirm && refEditConfirm.current) {
      const positionBlock = getBlockPositionDOM(offsetKeyEdit);
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
    if (editorRef.current)
      editorRef.current.focus();
  };

  const blur = () => {
    if (editorRef.current)
      editorRef.current?.blur();
  };

  const onFocus = () => {
    if (onNodeBehavior)
      onNodeBehavior.onFocus(index);
  };

  const baseOnBtnHeadingItemClick = (item: ToolsStyleItemTextEditor) => {
    applyStyle(item.style, item.method, editorState);
  };

  const baseOnBtnColorClick = (item: ToolsColorStyleItemTextEditor) => {
    const lastStyle = getLastStyleFontColor(editorState);
    let newEditorState = editorState;
    if (lastStyle && lastStyle !== item.option.style.color) {
      newEditorState = applyStyle(lastStyle, item.method, editorState);
    }
    applyStyle(item.option.style.color, item.method, newEditorState);
  };

  const baseOnBtnBackgroundClick = (item: ToolsColorStyleItemTextEditor) => {
    const lastStyle = getLastStyleBackgroundColor(editorState);
    let newEditorState = editorState;
    if (lastStyle && lastStyle !== item.option.style.background) {
      newEditorState = applyStyle(lastStyle, item.method, editorState);
    }
    applyStyle(item.option.style.background, item.method, newEditorState);
  };

  const baseOnBtnStyleClick = (item: ToolsStyleItemTextEditor) => {
    applyStyle(item.style, item.method, editorState);
  };

  const baseIsTextStyleActive = (style: string, method: string) => {
    return isStyleActive(editorState, style, method);
  };

  const applyStyle = (style: string, method: string, editorState: EditorState) => {
    const newEditorState = setStyle(editorState, style, method);
    setEditorState(newEditorState);
    return newEditorState;
  };

  function myKeyBindingFn(event: React.KeyboardEvent<HTMLElement>) {
    setShowMenu(false);
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      const lineNumber = getLineNumberSelected(editorState);
      const lineSize = getLineSize(editorState);
      if (event.key === "ArrowUp" && lineNumber <= 1) {
        setShowToolbar(false);
        if (onNodeBehavior)
          onNodeBehavior.onKeyUp(event, index);
        return;
      } else if (event.key === "ArrowDown" && lineNumber >= lineSize - 1) {
        setShowToolbar(false);
        if (onNodeBehavior)
          onNodeBehavior.onKeyUp(event, index);
        return;
      }
    } else if (event.key === "Enter") {
      if (node.type === TYPE_NODE_QUOTE || node.baseTag === "ul-disc" || node.baseTag === "ul-decimal") {
        var thisKeypressTime = new Date();
        // @ts-ignore
        if (thisKeypressTime - lastKeypressTime <= delta) {
          // @ts-ignore
          thisKeypressTime = 0;
          setShowToolbar(false);
          if (onNodeBehavior)
            onNodeBehavior.onKeyUp(event, index);
          return;
        }
        // @ts-ignore
        lastKeypressTime = thisKeypressTime;
      } else {
        const lineNumber = getLineNumberSelected(editorState);
        const lineKey = getLineKeySelected(editorState);
        const lineSize = getLineSize(editorState);
        const positionOfLine = getPositionOfLine(editorState);
        const lineLength = getValueOfLine(editorState, lineKey).length;
        if (positionOfLine >= lineLength && lineNumber >= lineSize - 1) {
          setShowToolbar(false);
          if (onNodeBehavior)
            onNodeBehavior.onKeyUp(event, index);
          return;
        }
      }
    } else if (event.key === "Backspace") {
      if (node.plainText.length <= 0) {
        setShowToolbar(false);
        if (onNodeBehavior)
          onNodeBehavior.onKeyUp(event, index);
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
      setEditorState(newState);
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

  const myOnTransitionNodeListener = () => {
    setShowToolbar(false);
    if (onNodeBehavior)
      onNodeBehavior.onTransition(node.type === TYPE_NODE_TEXT ? TYPE_NODE_QUOTE : TYPE_NODE_TEXT, index);
  };

  const onMouseUp = (e: React.MouseEvent<HTMLElement>) => {
    if(!isMobile()) {
      const section = window.getSelection();
      if (!!section && section.toString()) {
        setShowToolbar(true);
      } else {
        const target = e.target as HTMLElement;
        if (target && !target.closest(".node-" + node.id)) {
          setShowToolbar(false);
        }
      }
    }
  };

  const onBtnShowLinkConfirmClick = () => {
    setShowLinkConfirm(!showLinkConfirm);
  };

  const onBtnSetLinkClick = (link: string) => {
    setEditorState(setLink(editorState, link));
    setShowLinkConfirm(false);
  };

  const onBtnSetEditLinkClick = (link: string) => {
    setEditorState(editLink(editorState, entityKeyEdit, link));
    setShowEditLinkConfirm(false);
  };

  return <div ref={ref} className={rootClazz + " node-draft"} onMouseUp={onMouseUp}>
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
        {showToolbar ? <Toolbar key={reRender + ""} node={node} onBtnShowLinkConfirmClick={onBtnShowLinkConfirmClick} onTransitionNodeListener={myOnTransitionNodeListener} /> : null}
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
      {/*@ts-ignore*/}
      <Editor
        ref={editorRef}
        placeholder={placeholder}
        editorState={editorState}
        customStyleMap={customStyleMap}
        textDirectionality="RTL"
        blockStyleFn={blockStyleFn}
        keyBindingFn={myKeyBindingFn}
        handleKeyCommand={handleKeyCommand}
        onFocus={onFocus}
        onChange={(editorState: EditorState) => {
          const changed = !!editorState.getUndoStack().size;
          if (changed) {
            const contentState = editorState.getCurrentContent();
            // @ts-ignore
            onChange(convertToRaw(contentState));
            onChangeText(getValue(editorState));
          }
          setEditorState(editorState);
        }}
      />
    </TextEditorContext.Provider>
  </div>;
});

export default DraftEditor;
