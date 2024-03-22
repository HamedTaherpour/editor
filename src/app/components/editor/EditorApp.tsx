"use client";

import { useState } from "react";

import Editor from "@/app/lib/editor";
import NodeEditorTextModule from "@/app/lib/editor/text/module";
import NodeEditorVoiceModule from "@/app/lib/editor/voice/module";
import NodeEditorImageModule from "@/app/lib/editor/image/module";

import NodeEditor from "@/app/components/editor/NodeEditor";
import AppMenu from "@/app/components/AppMenu";

import {
  JsonEditor,
  TYPE_NODE_TEXT,
  TYPE_NODE_VOICE,
  TYPE_NODE_IMAGE,
  NodeText,
  NodeVoice,
  NodeImage,
  Node,
  OnUpdateNodeListener,
  OnDeleteNodeListener,
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

  const menuList = [
    {
      title: "متن",
      description: "محتوای متنی به عنوان یک درس",
      icon: "/editor/text.svg",
      action: () => {
        onBtnAddNodeClick(TYPE_NODE_TEXT);
      },
    },
    {
      title: "صدا",
      description: "محتوای صدا به عنوان یک درس",
      icon: "/editor/voice.svg",
      action: () => {
        onBtnAddNodeClick(TYPE_NODE_VOICE);
      },
    },
    {
      title: "تصویر",
      description: "محتوای تصویر به عنوان یک درس",
      icon: "/editor/image.svg",
      action: () => {
        onBtnAddNodeClick(TYPE_NODE_IMAGE);
      },
    },
  ];

  editor.setOnJsonEditorUpdateListener({
    onUpdate: (_jsonEditor) => {
      setJsonEditor({ ..._jsonEditor });
    },
  });

  const onBtnAddNodeClick = (type: number) => {
    switch (type) {
      case TYPE_NODE_TEXT:
        nodeEditorTextModule.add(new NodeText());
        break;
      case TYPE_NODE_VOICE:
        nodeEditorVoiceModule.add(new NodeVoice());
        break;
      case TYPE_NODE_IMAGE:
        nodeEditorImageModule.add(new NodeImage());
        break;
    }
  };

  const onDeleteNodeListener: OnDeleteNodeListener = {
    onDelete: (node: Node) => {
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
      }
    },
  };

  const onUpdateNodeListener: OnUpdateNodeListener = {
    onUpdate: (node: Node) => {
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
      }
    },
  };

  return (
    <div className="flex flex-row">
      <div className="flex flex-col bg-sky-50 min-h-64 px-6 py-4 w-6/12">
        <AppMenu
          activator={
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2Z"
                />
              </svg>
            </button>
          }
          children={
            <div className="flex flex-col gap-y-2">
              {menuList.map((item) => (
                <div
                  key={item.title}
                  onClick={item.action}
                  className="flex flex-row cursor-pointer"
                >
                  <div className="grid place-items-center bg-slate-50 rounded p-2">
                    <img src={item.icon} />
                  </div>
                  <div className="flex flex-col mr-2">
                    <span className="text-xs font-bold">{item.title}</span>
                    <p className="text-[10px] text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          }
        />
        <div className="flex flex-col gap-y-6">
          {jsonEditor.nodes.map((item) => (
            <NodeEditor
              key={item.id}
              node={item}
              onUpdateNodeListener={onUpdateNodeListener}
              onDeleteNodeListener={onDeleteNodeListener}
            />
          ))}
        </div>
      </div>
      <div className="bg-slate-900 text-white dir-ltr w-6/12 overflow-auto">
        <pre>{JSON.stringify(jsonEditor, null, 2)}</pre>
      </div>
    </div>
  );
};

export default EditorApp;
