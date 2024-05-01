"use client";

import React, { useEffect } from "react";
import NodeReadonly from "../read-only/NodeReadonly";
import { JsonEditor } from "../../../lib/editor/type";

interface Props {
  jsonEditor: JsonEditor;
}

const EditorReadonlyApp = (props: Props) => {
  const { jsonEditor } = props;

  return (
    <div className="editor-app-root">
      <div className="editor-app-container">
        <div className="node-list">
          {jsonEditor.map((item, i) => (
            <NodeReadonly key={item.id + "" + i} node={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditorReadonlyApp;
