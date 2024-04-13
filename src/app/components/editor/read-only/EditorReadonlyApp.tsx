"use client";

import { useEffect } from "react";

import NodeReadonly from "@/app/components/editor/read-only/NodeReadonly";

import { JsonEditor } from "@/app/lib/editor/type";

interface Props {
  jsonEditor: JsonEditor;
}

const EditorReadonlyApp = (props: Props) => {
  const { jsonEditor } = props;

  useEffect(() => {});

  return (
    <div className="flex flex-col min-h-screen et-container mx-auto">
      <div className="flex flex-col min-h-96 mt-16 w-full">
        <div className="flex flex-col nodes">
          {jsonEditor.nodes.map((item, i) => (
            <NodeReadonly key={item.id + "" + i} node={item} />
          ))}
        </div>
      </div>
      <div className="bg-slate-900 text-white dir-ltr max-h-96 overflow-auto">
        <pre>{JSON.stringify(jsonEditor, null, 2)}</pre>
      </div>
    </div>
  );
};

export default EditorReadonlyApp;
