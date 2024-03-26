"use client";

import { useState } from "react";

import Editor from "@/app/lib/editor";
import NodeEditorTextModule from "@/app/lib/editor/text/module";
import NodeEditorVoiceModule from "@/app/lib/editor/voice/module";
import NodeEditorImageModule from "@/app/lib/editor/image/module";

import NodeEditor from "@/app/components/editor/NodeEditor";
import AppContextMenu from "@/app/components/AppContextMenu";

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
  OnPressEnterNodeListener,
  OnDeleteNodeListener,
  OnRightClickNodeListener,
} from "@/app/lib/editor/type";

const EditorApp = () => {
  const [contextMenuOpen, setContextMenuOpen] = useState<boolean>(false);
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
      action: (index: number) => {
        onBtnAddNodeClick(TYPE_NODE_TEXT, index);
      },
    },
    {
      title: "صدا",
      description: "محتوای صدا به عنوان یک درس",
      icon: "/editor/voice.svg",
      action: (index: number) => {
        onBtnAddNodeClick(TYPE_NODE_VOICE, index);
      },
    },
    {
      title: "تصویر",
      description: "محتوای تصویر به عنوان یک درس",
      icon: "/editor/image.svg",
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

  const onPressEnterNodeListener: OnPressEnterNodeListener = {
    onClick: (index: number) => {
      onBtnAddNodeClick(TYPE_NODE_TEXT, index);
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

  const onRightClickNodeListener: OnRightClickNodeListener = {
    onRightClick(node: Node, posX: number, posY: number) {
      // setContextMenuOpen(!contextMenuOpen);
    },
  };

  return (
    <div className="flex flex-row">
      {/* <AppContextMenu open={contextMenuOpen} posX={850} posY={100} /> */}
      <div className="flex flex-col bg-sky-50 min-h-64 px-6 py-4 w-6/12">
        <div className="flex flex-col">
          {jsonEditor.nodes.map((item, i) => (
            <NodeEditor
              key={item.id}
              index={i}
              node={item}
              menuList={menuList}
              onUpdateNodeListener={onUpdateNodeListener}
              onRightClickNodeListener={onRightClickNodeListener}
              onPressEnterNodeListener={onPressEnterNodeListener}
              onDeleteNodeListener={onDeleteNodeListener}
            />
          ))}
          <button
            className="text-slate-500 cursor-text text-right ring-1 ring-red-300"
            onClick={() => onBtnAddNodeClick(TYPE_NODE_TEXT)}
          >
            یک متن اضافه کنید
          </button>
        </div>
      </div>
      <div className="bg-slate-900 text-white dir-ltr w-6/12 overflow-auto">
        <pre>{JSON.stringify(jsonEditor, null, 2)}</pre>
      </div>
    </div>
  );
};

export default EditorApp;
