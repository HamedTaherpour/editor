"use client";

import { useState } from "react";

import Editor from "@/app/lib/editor";
import NodeEditorTextModule from "@/app/lib/editor/text/module";
import NodeEditorVoiceModule from "@/app/lib/editor/voice/module";
import NodeEditorImageModule from "@/app/lib/editor/image/module";
import NodeEditorQuoteModule from "@/app/lib/editor/quote/module";
import NodeEditorDividerModule from "@/app/lib/editor/divider/module";

import NodeEditor from "@/app/components/editor/NodeEditor";

import { EditorContext } from "@/app/lib/editor/hook/context";

import {
  JsonEditor,
  TYPE_NODE_TEXT,
  TYPE_NODE_VOICE,
  TYPE_NODE_IMAGE,
  TYPE_NODE_QUOTE,
  TYPE_NODE_DIVIDER,
  NodeText,
  NodeVoice,
  NodeImage,
  NodeQuote,
  NodeDivider,
  OnNodeBehavior,
} from "@/app/lib/editor/type";

const EditorApp = () => {
  const [jsonEditor, setJsonEditor] = useState<JsonEditor>({
    name: "TestA",
    nodes: [],
  });
  const editor = new Editor(jsonEditor);
  const nodeEditorTextModule = new NodeEditorTextModule(editor);
  const nodeEditorVoiceModule = new NodeEditorVoiceModule(editor);
  const nodeEditorImageModule = new NodeEditorImageModule(editor);
  const nodeEditorQuoteModule = new NodeEditorQuoteModule(editor);
  const nodeEditorDividerModule = new NodeEditorDividerModule(editor);

  const onNodeBehavior: OnNodeBehavior = {
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
          onBtnAddNodeClick(TYPE_NODE_TEXT, index);
          break;
        case "Backspace":
          const node = jsonEditor.nodes[index] as NodeText;

          if (
            node.text &&
            node.text.blocks &&
            node.text.blocks[0].text.length <= 0
          ) {
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
            nodeEditorTextModule.transition(typeTransition, node as NodeText);
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
      }
    },
  };

  const menuList = [
    {
      title: "متن",
      description: "محتوای متنی به عنوان یک درس",
      icon: "/editor/text.svg",
      action: (index: number) => {
        onBtnAddNodeClick(TYPE_NODE_TEXT, index);
      },
    },
    {
      title: "سرفصل‌ها",
      description: "نمایش سرفصل‌ها و محتوای دوره",
      icon: "/editor/title.svg",
      action: (index: number) => {
        onBtnAddNodeClick(TYPE_NODE_TEXT, index);
      },
    },
    {
      title: "عنوان 1",
      description: "سایز بزرگ برای نوشتن عنوان",
      icon: "/editor/h1.svg",
      action: (index: number) => {
        onBtnAddNodeClick(TYPE_NODE_TEXT, index);
      },
    },
    {
      title: "عنوان 2",
      description: "سایز متوسط برای نوشتن عنوان",
      icon: "/editor/h1.svg",
      action: (index: number) => {
        onBtnAddNodeClick(TYPE_NODE_TEXT, index);
      },
    },
    {
      title: "عنوان 3",
      description: "سایز کوچک برای نوشتن عنوان",
      icon: "/editor/h1.svg",
      action: (index: number) => {
        onBtnAddNodeClick(TYPE_NODE_TEXT, index);
      },
    },
    {
      title: "نقل‌قول",
      description: "برای نوشتن نقل‌قول استفاده کنید.",
      icon: "/editor/quote.svg",
      action: (index: number) => {
        onBtnAddNodeClick(TYPE_NODE_QUOTE, index);
      },
    },
    {
      title: "لینک",
      description: "صوت یا ویس خود را بارگزاری کنید.",
      icon: "/editor/quote.svg",
      action: (index: number) => {
        onBtnAddNodeClick(TYPE_NODE_TEXT, index);
      },
    },
    {
      title: "تصویر",
      description: "تصویر خود را بارگزاری کنید.",
      icon: "/editor/image.svg",
      action: (index: number) => {
        onBtnAddNodeClick(TYPE_NODE_IMAGE, index);
      },
    },
    {
      title: "ویدیو",
      description: "ویدیو خود را بارگزاری کنید.",
      icon: "/editor/video.svg",
      action: (index: number) => {
        onBtnAddNodeClick(TYPE_NODE_TEXT, index);
      },
    },
    {
      title: "فایل یا پوشه",
      description: "فایل خود را بارگزاری کنید.",
      icon: "/editor/file.svg",
      action: (index: number) => {
        onBtnAddNodeClick(TYPE_NODE_TEXT, index);
      },
    },
    {
      title: "صوتی",
      description: "صوت یا ویس خود را بارگزاری کنید.",
      icon: "/editor/voice.svg",
      action: (index: number) => {
        onBtnAddNodeClick(TYPE_NODE_TEXT, index);
      },
    },
    {
      title: "لیست افقی",
      description: "معرفی کردن ویژگی‌ها و امکانات",
      icon: "/editor/row-horizontal.svg",
      action: (index: number) => {
        onBtnAddNodeClick(TYPE_NODE_VOICE, index);
      },
    },
    {
      title: "لیست آکاردئونی",
      description: "برای سوالات متداول و غیره",
      icon: "/editor/row-horizontal.svg",
      action: (index: number) => {
        onBtnAddNodeClick(TYPE_NODE_VOICE, index);
      },
    },
    {
      title: "جداکننده",
      description: "جداکننده بخش‌های مختلف",
      icon: "/editor/divider.svg",
      action: (index: number) => {
        onBtnAddNodeClick(TYPE_NODE_DIVIDER, index);
      },
    },
    {
      title: "نظرات",
      description: "نمایش رضایت شرکت‌کنندگان قبلی ",
      icon: "/editor/star.svg",
      action: (index: number) => {
        onBtnAddNodeClick(TYPE_NODE_IMAGE, index);
      },
    },
    {
      title: "ایموجی",
      description: "ایموجی مدنظر را انتخاب کنید.",
      icon: "/editor/sticker.svg",
      action: (index: number) => {
        onBtnAddNodeClick(TYPE_NODE_IMAGE, index);
      },
    },
  ];

  editor.setOnJsonEditorUpdateListener({
    onUpdate: (_jsonEditor) => {
      setJsonEditor({ ..._jsonEditor });
    },
  });

  const onBtnAddNodeClick = (type: number, _index: number = -1) => {
    const index = _index >= 0 ? _index + 1 : _index;

    switch (type) {
      case TYPE_NODE_TEXT:
        nodeEditorTextModule.add(new NodeText(), index);
        break;
      case TYPE_NODE_VOICE:
        nodeEditorVoiceModule.add(new NodeVoice(), index);
        break;
      case TYPE_NODE_IMAGE:
        nodeEditorImageModule.add(new NodeImage(), index);
        break;
      case TYPE_NODE_QUOTE:
        nodeEditorQuoteModule.add(new NodeQuote(), index);
        break;
      case TYPE_NODE_DIVIDER:
        nodeEditorDividerModule.add(new NodeDivider(), index);
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
    <div className="flex flex-col min-h-screen et-container mx-auto">
      <div className="flex flex-col min-h-96 mt-16 w-full">
        <EditorContext.Provider value={onNodeBehavior}>
          <div className="flex flex-col">
            {jsonEditor.nodes.map((item, i) => (
              <NodeEditor
                key={item.id}
                index={i}
                node={item}
                menuList={menuList}
              />
            ))}
            <button
              className="text-slate-500 cursor-text text-right"
              onClick={() => onBtnAddNodeClick(TYPE_NODE_TEXT)}
            >
              یک متن اضافه کنید
            </button>
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
