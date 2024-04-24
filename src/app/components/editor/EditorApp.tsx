"use client";

import { useEffect, useState } from "react";

import Editor from "@/app/lib/editor";
import NodeEditorTextModule from "@/app/lib/editor/text/module";
import NodeEditorVoiceModule from "@/app/lib/editor/voice/module";
import NodeEditorImageModule from "@/app/lib/editor/image/module";
import NodeEditorQuoteModule from "@/app/lib/editor/quote/module";
import NodeEditorDividerModule from "@/app/lib/editor/divider/module";
import NodeEditorFileModule from "@/app/lib/editor/file/module";

import NodeEditor from "@/app/components/editor/NodeEditor";

import { EditorContext } from "@/app/lib/editor/hook/context";

import { JsonEditor, OnJsonEditorUpdateListener, OnUploadFileListener, TYPE_NODE_TEXT, TYPE_NODE_VOICE, TYPE_NODE_IMAGE, TYPE_NODE_QUOTE, TYPE_NODE_DIVIDER, NodeText, NodeVoice, NodeImage, NodeQuote, NodeDivider, OnNodeBehavior, Node, TYPE_NODE_FILE, NodeFile } from "@/app/lib/editor/type";

interface AddNode {
  type: number;
  node?: Node;
  index?: number;
}

interface Props {
  value?: JsonEditor;
  onJsonEditorUpdateListener: OnJsonEditorUpdateListener;
  onUploadFileListener: OnUploadFileListener;
}

const EditorApp = (props: Props) => {
  const { value, onJsonEditorUpdateListener, onUploadFileListener } = props;
  const [isClipboardExists, setIsClipboardExists] = useState(false);
  const [clipboard, setClipboard] = useState<Node>();
  const [jsonEditor, setJsonEditor] = useState<JsonEditor>(
    value || {
      name: "TestA",
      nodes: [],
    }
  );

  const editor = new Editor(jsonEditor);
  const nodeEditorTextModule = new NodeEditorTextModule(editor);
  const nodeEditorVoiceModule = new NodeEditorVoiceModule(editor);
  const nodeEditorImageModule = new NodeEditorImageModule(editor);
  const nodeEditorQuoteModule = new NodeEditorQuoteModule(editor);
  const nodeEditorDividerModule = new NodeEditorDividerModule(editor);
  const nodeEditorFileModule = new NodeEditorFileModule(editor);

  useEffect(() => {
    if (jsonEditor.nodes.length <= 0) {
      onBtnAddNodeClick({ type: TYPE_NODE_TEXT });
    }
  });

  const onNodeBehavior: OnNodeBehavior = {
    toolsMenu: [
      {
        title: "متن",
        description: "محتوای متنی به عنوان یک درس",
        icon: "textalign",
        action: (index: number) => {
          onBtnAddNodeClick({ type: TYPE_NODE_TEXT, index });
        },
      },
      {
        title: "عنوان 1",
        description: "سایز بزرگ برای نوشتن عنوان",
        icon: "smallcaps",
        action: (index: number) => {
          const node = new NodeText();
          node.baseTag = "h1";
          onBtnAddNodeClick({ type: TYPE_NODE_TEXT, node, index });
        },
      },
      {
        title: "عنوان 2",
        description: "سایز متوسط برای نوشتن عنوان",
        icon: "smallcaps",
        action: (index: number) => {
          const node = new NodeText();
          node.baseTag = "h2";
          onBtnAddNodeClick({ type: TYPE_NODE_TEXT, node, index });
        },
      },
      {
        title: "عنوان 3",
        description: "سایز کوچک برای نوشتن عنوان",
        icon: "smallcaps",
        action: (index: number) => {
          const node = new NodeText();
          node.baseTag = "h3";
          onBtnAddNodeClick({ type: TYPE_NODE_TEXT, node, index });
        },
      },
      {
        title: "نقل‌قول",
        description: "برای نوشتن نقل‌قول استفاده کنید.",
        icon: "quote-up",
        action: (index: number) => {
          onBtnAddNodeClick({ type: TYPE_NODE_QUOTE, index });
        },
      },
      {
        title: "لیست نقطه‌ای",
        description: "لیست ساده نقطه‌ای بسازید.",
        icon: "bulleted",
        action: (index: number) => {
          const node = new NodeText();
          node.baseTag = "ul-disc";
          onBtnAddNodeClick({ type: TYPE_NODE_TEXT, index, node });
        },
      },
      {
        title: "لیست شماره‌دار",
        description: "لیست شماره‌دار ایجاد کنید.",
        icon: "numbered",
        action: (index: number) => {
          const node = new NodeText();
          node.baseTag = "ul-decimal";
          onBtnAddNodeClick({ type: TYPE_NODE_TEXT, index, node });
        },
      },
      {
        title: "تصویر",
        description: "تصویر خود را بارگزاری کنید.",
        icon: "gallery",
        action: (index: number) => {
          onBtnAddNodeClick({ type: TYPE_NODE_IMAGE, index });
        },
      },
      {
        title: "فایل یا پوشه",
        description: "فایل خود را بارگزاری کنید.",
        icon: "document",
        action: (index: number) => {
          onBtnAddNodeClick({ type: TYPE_NODE_FILE, index });
        },
      },
      {
        title: "صوتی",
        description: "صوت یا ویس خود را بارگزاری کنید.",
        icon: "volume",
        action: (index: number) => {
          onBtnAddNodeClick({ type: TYPE_NODE_VOICE, index });
        },
      },
      {
        title: "جداکننده",
        description: "جداکننده بخش‌های مختلف",
        icon: "divider",
        action: (index: number) => {
          onBtnAddNodeClick({
            type: TYPE_NODE_DIVIDER,
            index,
          });
        },
      },
    ],
    onStyle(style, type, index) {
      const node = jsonEditor.nodes[index];
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
        clipboard.id = Date.now();
        onBtnAddNodeClick({
          type: clipboard.type,
          node: clipboard,
          index,
        });
      }
    },
    onDelete(node) {
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
      }
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
          const node = jsonEditor.nodes[index] as NodeText;

          if (node.text && node.text.blocks && node.text.blocks[0].text.length <= 0 && index > 0) {
            selectUp(index);
            this.onDelete(jsonEditor.nodes[index]);
          }
          break;
      }
    },
    onTransition(typeTransition, index) {
      const node = jsonEditor.nodes[index];
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
      }
    },
    onMove(fromIndex, toIndex) {
      editor.moveNode(fromIndex, toIndex);
    },
    onUploadFile(file) {
      return onUploadFileListener.onUploadFile(file);
    },
    onUploadImage(file) {
      return onUploadFileListener.onUploadImage(file);
    },
    onUploadVoice(file) {
      return onUploadFileListener.onUploadVoice(file);
    },
  };

  editor.setOnJsonEditorUpdateListener({
    onUpdate: (_jsonEditor) => {
      setJsonEditor(Object.assign({}, _jsonEditor));
      if (onJsonEditorUpdateListener) onJsonEditorUpdateListener.onUpdate(_jsonEditor);
    },
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
    }
  };

  const selectUp = (index: number) => {
    const node = jsonEditor.nodes[index - 1];
    if (!!node && !!node.focus) {
      node.focus();
    }
  };

  const selectDown = (index: number) => {
    const node = jsonEditor.nodes[index + 1];
    if (!!node && !!node.focus) {
      node.focus();
    }
  };

  return (
    <div className={(jsonEditor.nodes.length <= 1 ? "empty-editor " : "") + " flex flex-col min-h-screen et-container mx-auto"}>
      <div className="flex flex-col min-h-96 mt-16 w-full">
        <EditorContext.Provider value={onNodeBehavior}>
          <div className="flex flex-col nodes">
            {jsonEditor.nodes.map((item, i) => (
              <NodeEditor key={item.id} index={i} node={item} />
            ))}
          </div>
        </EditorContext.Provider>
      </div>
      <div className="bg-slate-900 text-white dir-ltr max-h-96 overflow-auto">
        <pre>{JSON.stringify(jsonEditor, null, 2)}</pre>
      </div>
    </div>
  );
};

export default EditorApp;
