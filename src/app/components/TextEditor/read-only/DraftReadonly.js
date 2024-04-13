import React, { useEffect, useRef, useState } from "react";

import { Editor } from "draft-js";
import { customStyleMap, blockStyleFn, getFirstInitEditorState, setBaseTag } from "@/app/lib/editor-text/hook/tools";

import "draft-js/dist/Draft.css";

const DraftReadonly = ({ node }) => {
  const [editorState, setEditorState] = useState(getFirstInitEditorState(node, true));

  const newEditorState = setBaseTag(editorState, node);
  if (newEditorState) setEditorState(newEditorState);
  let rootClazz = "node-" + node.id;
  if (node.baseTag === "ul-disc" || node.baseTag === "ul-decimal") {
    rootClazz += " et-bullte";
  }

  useEffect(() => {});

  return (
    <div className={rootClazz + " w-full"}>
      <Editor editorState={editorState} readOnly customStyleMap={customStyleMap} textDirectionality="RTL" blockStyleFn={blockStyleFn} />
    </div>
  );
};

export default DraftReadonly;
