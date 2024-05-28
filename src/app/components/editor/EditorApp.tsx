import React, { useEffect, useState } from "react";

import Editor from "../../lib/editor";
import NodeEditorTextModule from "../..//lib/editor/text/module";
import NodeEditorVoiceModule from "../../lib/editor/voice/module";
import NodeEditorImageModule from "../../lib/editor/image/module";
import NodeEditorQuoteModule from "../../lib/editor/quote/module";
import NodeEditorDividerModule from "../../lib/editor/divider/module";
import NodeEditorFileModule from "../../lib/editor/file/module";
import NodeEditorVideoModule from "../../lib/editor/video/module";

import { EditorContext } from "../../lib/editor/hook/context";

import { EditorOptions, JsonEditor, Node, NodeDivider, NodeFile, NodeImage, NodeQuote, NodeText, NodeVideo, NodeVoice, OnJsonEditorUpdateListener, OnNodeBehavior, OnTextHighlightListener, OnUploadFileListener, TYPE_NODE_DIVIDER, TYPE_NODE_FILE, TYPE_NODE_IMAGE, TYPE_NODE_QUOTE, TYPE_NODE_TEXT, TYPE_NODE_VIDEO, TYPE_NODE_VOICE } from "../../lib/editor/type";
import NodeEditor from "./NodeEditor";
import { ToolsColorStyleItemTextEditor, ToolsStyleItemTextEditor } from "@/app/lib/editor-text/type";
import { useEditorOptions } from "@/app/lib/editor/hook";

interface AddNode {
  type: number;
  node?: Node;
  index?: number;
}

interface Props {
  value?: JsonEditor;
  onJsonEditorUpdateListener: OnJsonEditorUpdateListener;
  onUploadFileListener: OnUploadFileListener;
  options?: EditorOptions;
}

const EditorApp = (props: Props) => {

  const { value, onJsonEditorUpdateListener, onUploadFileListener } = props;
  const [isClipboardExists, setIsClipboardExists] = useState(false);
  const [clipboard, setClipboard] = useState<Node>();
  const [jsonEditor, setJsonEditor] = useState<JsonEditor>(value || []);

  let highlightListener: OnTextHighlightListener;

  const editorOptions = useEditorOptions(props.options);
  const editor = new Editor(jsonEditor);
  const nodeEditorTextModule = new NodeEditorTextModule(editor);
  const nodeEditorVoiceModule = new NodeEditorVoiceModule(editor);
  const nodeEditorImageModule = new NodeEditorImageModule(editor);
  const nodeEditorQuoteModule = new NodeEditorQuoteModule(editor);
  const nodeEditorDividerModule = new NodeEditorDividerModule(editor);
  const nodeEditorFileModule = new NodeEditorFileModule(editor);
  const nodeEditorVideoModule = new NodeEditorVideoModule(editor);
  const [currentNodeIndex, setCurrentNodeIndex] = useState(-1);

  useEffect(() => {
    if (jsonEditor.length <= 0) {
      onBtnAddNodeClick({ type: TYPE_NODE_TEXT });
    }
  }, [jsonEditor.length]);

  useEffect(() => {
    if (value)
      setJsonEditor(value);
  }, [value]);

  const onNodeBehavior: OnNodeBehavior = {
    toolsMenu: [
      {
        title: "متن",
        description: "محتوای متنی به عنوان یک درس",
        icon: "textalign",
        type: "text",
        action: (index: number) => {
          onBtnAddNodeClick({ type: TYPE_NODE_TEXT, index });
        }
      },
      {
        title: "عنوان 1",
        description: "سایز بزرگ برای نوشتن عنوان",
        icon: "smallcaps",
        type: "h1",
        action: (index: number) => {
          const node = new NodeText();
          node.baseTag = "h1";
          onBtnAddNodeClick({ type: TYPE_NODE_TEXT, node, index });
        }
      },
      {
        title: "عنوان 2",
        description: "سایز متوسط برای نوشتن عنوان",
        icon: "smallcaps",
        type: "h2",
        action: (index: number) => {
          const node = new NodeText();
          node.baseTag = "h2";
          onBtnAddNodeClick({ type: TYPE_NODE_TEXT, node, index });
        }
      },
      {
        title: "عنوان 3",
        description: "سایز کوچک برای نوشتن عنوان",
        icon: "smallcaps",
        type: "h3",
        action: (index: number) => {
          const node = new NodeText();
          node.baseTag = "h3";
          onBtnAddNodeClick({ type: TYPE_NODE_TEXT, node, index });
        }
      },
      {
        title: "نقل‌قول",
        description: "برای نوشتن نقل‌قول استفاده کنید.",
        icon: "quote-up",
        type: "quote",
        action: (index: number) => {
          onBtnAddNodeClick({ type: TYPE_NODE_QUOTE, index });
        }
      },
      {
        title: "لیست نقطه‌ای",
        description: "لیست ساده نقطه‌ای بسازید.",
        icon: "bulleted",
        type: "bullet",
        action: (index: number) => {
          const node = new NodeText();
          node.baseTag = "ul-disc";
          onBtnAddNodeClick({ type: TYPE_NODE_TEXT, index, node });
        }
      },
      {
        title: "لیست شماره‌دار",
        description: "لیست شماره‌دار ایجاد کنید.",
        icon: "numbered",
        type: "bulletNumber",
        action: (index: number) => {
          const node = new NodeText();
          node.baseTag = "ul-decimal";
          onBtnAddNodeClick({ type: TYPE_NODE_TEXT, index, node });
        }
      },
      {
        title: "تصویر",
        description: "تصویر خود را بارگذاری کنید.",
        icon: "gallery",
        type: "image",
        action: (index: number) => {
          onBtnAddNodeClick({ type: TYPE_NODE_IMAGE, index });
        }
      },
      {
        title: "ویدیو",
        description: "ویدیو خود را بارگذاری کنید.",
        icon: "play-circle",
        type: "video",
        action: (index: number) => {
          onBtnAddNodeClick({ type: TYPE_NODE_VIDEO, index });
        }
      },
      {
        title: "فایل یا پوشه",
        description: "فایل خود را بارگذاری کنید.",
        icon: "document",
        type: "file",
        action: (index: number) => {
          onBtnAddNodeClick({ type: TYPE_NODE_FILE, index });
        }
      },
      {
        title: "صوتی",
        description: "صوت یا ویس خود را بارگذاری کنید.",
        icon: "volume",
        type: "voice",
        action: (index: number) => {
          onBtnAddNodeClick({ type: TYPE_NODE_VOICE, index });
        }
      },
      {
        title: "جداکننده",
        description: "جداکننده بخش‌های مختلف",
        icon: "divider",
        type: "divider",
        action: (index: number) => {
          onBtnAddNodeClick({
            type: TYPE_NODE_DIVIDER,
            index
          });
        }
      }
    ],
    getToolsMenu(): Array<any> {
      return this.toolsMenu.filter((item: { type: string }) => {
        // @ts-ignore
        return editorOptions[item.type] && editorOptions[item.type].enabled;
      });
    },
    onStyle(style, type, index) {
      const node = jsonEditor[index];
      if (type === "background") {
        if (node.backgroundColor === style.value) {
          node.backgroundColor = "";
        } else {
          node.backgroundColor = style.value;
        }
      } else if (type === "color") {
        if (node.fontColor === style.value) {
          node.fontColor = "";
        } else {
          node.fontColor = style.value;
        }
      }

      this.onUpdate(node);
    },
    isClipboardExists() {
      return isClipboardExists;
    },
    onCopy(node) {
      setClipboard(Object.assign({}, node));
      setIsClipboardExists(true);
    },
    onPast(index) {
      if (clipboard) {
        onBtnAddNodeClick({
          type: clipboard.type,
          node: clipboard,
          index
        });
      }
    },
    onDelete(node: Node) {
      switch (node.type) {
        case TYPE_NODE_TEXT:
          nodeEditorTextModule.delete(node.id);
          break;
        case TYPE_NODE_VOICE:
          nodeEditorVoiceModule.delete(node.id);
          break;
        case TYPE_NODE_IMAGE:
          nodeEditorImageModule.delete(node.id);
          break;
        case TYPE_NODE_QUOTE:
          nodeEditorQuoteModule.delete(node.id);
          break;
        case TYPE_NODE_DIVIDER:
          nodeEditorDividerModule.delete(node.id);
          break;
        case TYPE_NODE_FILE:
          nodeEditorFileModule.delete(node.id);
          break;
        case TYPE_NODE_VIDEO:
          nodeEditorVideoModule.delete(node.id);
          break;
      }
    },
    onDuplicate(index) {
      const node = Object.assign({}, jsonEditor[index]);
      onBtnAddNodeClick({
        type: node.type,
        node: node,
        index: index + 1
      });
    },
    onKeyUp(e, index) {
      switch (e.key) {
        case "ArrowDown":
          selectDown(index);
          break;
        case "ArrowUp":
          selectUp(index);
          break;
        case "Enter":
          onBtnAddNodeClick({ type: TYPE_NODE_TEXT, index });
          break;
        case "Backspace":
          const node = jsonEditor[index] as NodeText;

          if (node.text && node.text.blocks && node.text.blocks[0].text.length <= 0 && index > 0) {
            selectUp(index);
            this.onDelete(jsonEditor[index]);
          }
          break;
      }
    },
    onTransition(typeTransition, index) {
      const node = jsonEditor[index];
      if (!!node) {
        switch (node.type) {
          case TYPE_NODE_TEXT:
            if (typeTransition === TYPE_NODE_QUOTE) nodeEditorTextModule.transitionToQuote(node as NodeText);
            break;
          case TYPE_NODE_QUOTE:
            if (typeTransition === TYPE_NODE_TEXT) nodeEditorQuoteModule.transitionToText(node as NodeQuote);
            break;
        }
      }
    },
    onUpdate(node) {
      switch (node.type) {
        case TYPE_NODE_TEXT:
          nodeEditorTextModule.update(node as NodeText);
          break;
        case TYPE_NODE_VOICE:
          nodeEditorVoiceModule.update(node as NodeVoice);
          break;
        case TYPE_NODE_IMAGE:
          nodeEditorImageModule.update(node as NodeImage);
          break;
        case TYPE_NODE_QUOTE:
          nodeEditorQuoteModule.update(node as NodeQuote);
          break;
        case TYPE_NODE_DIVIDER:
          nodeEditorDividerModule.update(node as NodeDivider);
          break;
        case TYPE_NODE_FILE:
          nodeEditorFileModule.update(node as NodeFile);
          break;
        case TYPE_NODE_VIDEO:
          nodeEditorVideoModule.update(node as NodeVideo);
          break;
      }
    },
    onMove(fromIndex, toIndex) {
      editor.moveNode(fromIndex, toIndex);
    },
    onUploadFile(file) {
      if (onUploadFileListener.onUploadFile) return onUploadFileListener.onUploadFile(file);
      else return Promise.reject("");
    },
    onUploadImage(file) {
      if (onUploadFileListener.onUploadImage) return onUploadFileListener.onUploadImage(file);
      else return Promise.reject("");
    },
    onUploadVoice(file) {
      if (onUploadFileListener.onUploadVoice) return onUploadFileListener.onUploadVoice(file);
      else return Promise.reject("");
    },
    onUploadVideo(file) {
      if (onUploadFileListener.onUploadVideo) return onUploadFileListener.onUploadVideo(file);
      else return Promise.reject("");
    },
    onAddNode(type, index) {
      onBtnAddNodeClick({
        type,
        index
      });
    },
    onBtnHeadingItemClick(item: ToolsStyleItemTextEditor) {
      const node = jsonEditor[currentNodeIndex];
      if (node && node.heroRef && node.heroRef.current) {
        node.heroRef.current.onBtnHeadingItemClick(item);
      }
    },
    onBtnBackgroundClick(item: ToolsColorStyleItemTextEditor) {
      const node = jsonEditor[currentNodeIndex];
      if (node && node.heroRef && node.heroRef.current) {
        node.heroRef.current.onBtnBackgroundClick(item);
      }
    },
    onBtnColorClick(item: ToolsColorStyleItemTextEditor) {
      const node = jsonEditor[currentNodeIndex];
      if (node && node.heroRef && node.heroRef.current) {
        node.heroRef.current.onBtnColorClick(item);
      }
    },
    onBtnStyleClick(item: ToolsStyleItemTextEditor) {
      const node = jsonEditor[currentNodeIndex];
      if (node && node.heroRef && node.heroRef.current) {
        node.heroRef.current.onBtnStyleClick(item);
      }
    },
    isTextStyleActive(style: any, method: string): boolean {
      const node = jsonEditor[currentNodeIndex];
      if (node && node.heroRef && node.heroRef.current) {
        return node.heroRef.current.isTextStyleActive(style, method);
      } else
        return false;
    },
    onFocus(index: number) {
      setCurrentNodeIndex(index);
    },
    getCurrentNodeSelectedIndex(): number {
      return currentNodeIndex;
    },
    getCurrentNodeSelected(): Node {
      const node = jsonEditor[currentNodeIndex];
      return node;
    },
    onShowTextToolbar(on: boolean) {
      if (highlightListener)
        highlightListener.onTextHighlight(on);
    },
    setOnTextHighlightListener(onTextHighlightListener: OnTextHighlightListener) {
      highlightListener = onTextHighlightListener;
    },
    focusCurrentNodeSelected() {
      const node = jsonEditor[currentNodeIndex];
      if (node && node.heroRef && node.heroRef.current)
        node.heroRef.current.focus();
    },
    blurCurrentNodeSelected() {
      const node = jsonEditor[currentNodeIndex];
      if (node && node.heroRef && node.heroRef.current)
        node.heroRef.current.blur();
    },
    undo() {
      console.log("aaaa");
    },
    onBtnShowLinkConfirmClick() {
      const node = jsonEditor[currentNodeIndex];
      if (node && node.heroRef && node.heroRef.current)
        node.heroRef.current.onBtnShowLinkConfirmClick();
    }
  };

  editor.setOnJsonEditorUpdateListener({
    onUpdate: (_jsonEditor) => {
      setJsonEditor([..._jsonEditor]);
      if (onJsonEditorUpdateListener) onJsonEditorUpdateListener.onUpdate(_jsonEditor);
    }
  });

  const onBtnAddNodeClick = (params: AddNode) => {
    const { type, index, node } = params;
    let _index = typeof index === "undefined" ? -1 : index + 1;

    switch (type) {
      case TYPE_NODE_TEXT:
        nodeEditorTextModule.add((node as NodeText) || new NodeText(), _index);
        break;
      case TYPE_NODE_VOICE:
        nodeEditorVoiceModule.add((node as NodeVoice) || new NodeVoice(), _index);
        break;
      case TYPE_NODE_IMAGE:
        nodeEditorImageModule.add((node as NodeImage) || new NodeImage(), _index);
        break;
      case TYPE_NODE_QUOTE:
        nodeEditorQuoteModule.add((node as NodeQuote) || new NodeQuote(), _index);
        break;
      case TYPE_NODE_DIVIDER:
        nodeEditorDividerModule.add(new NodeDivider(), _index);
        break;
      case TYPE_NODE_FILE:
        nodeEditorFileModule.add((node as NodeFile) || new NodeFile(), _index);
        break;
      case TYPE_NODE_VIDEO:
        nodeEditorVideoModule.add((node as NodeVideo) || new NodeVideo(), _index);
        break;
    }

    // handlingAddBlankLines(index);
  };

  const handlingAddBlankLines = (index?: number) => {
    let _index = typeof index === "undefined" ? 0 : index + 1;
    if (_index + 1 === jsonEditor.length) {
      for (let x = 0; x <= 2; x++) {
        nodeEditorTextModule.add(new NodeText());
      }
      setTimeout(() => {
        const node = jsonEditor[_index];
        if (node && node.heroRef && node.heroRef.current) {
          node.heroRef.current.focus();
        }
      }, 100);
    }
  };

  const selectUp = (index: number) => {
    const node = jsonEditor[index - 1];
    if (node && node.heroRef && node.heroRef.current) {
      node.heroRef.current.focus();
    }
  };

  const selectDown = (index: number) => {
    const node = jsonEditor[index + 1];
    if (node && node.heroRef && node.heroRef.current) {
      node.heroRef.current.focus();
    }
  };

  return (
    <div className={(jsonEditor.length <= 1 ? "empty-editor " : "") + " editor-app-root"}>
      <EditorContext.Provider value={onNodeBehavior}>
        <div id="node-list" className="node-list">
          {jsonEditor.map((item: any, i: number) => (
            <NodeEditor key={item.id} index={i} node={item} />
          ))}
        </div>
        {/*{*/}
        {/*  isMobile() && createPortal(*/}
        {/*    <ToolbarBottom />,*/}
        {/*  document.body,*/}
        {/*  )*/}
        {/*}*/}
      </EditorContext.Provider>
    </div>
  );
};

export default EditorApp;
