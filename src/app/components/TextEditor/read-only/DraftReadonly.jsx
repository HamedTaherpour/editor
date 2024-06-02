"use client";

import React from "react";

import { Editor } from "draft-js";

import "draft-js/dist/Draft.css";
import useEditor from "@/app/hook/useEditor";
import useDraft from "@/app/hook/useDraft";

const DraftReadonly = ({ index }) => {
  const { getNodeText } = useEditor();
  const node = getNodeText(index);
  const { customDraftStyleMap, blockDraftStyleFn } = useDraft();

  let rootClazz = "node-" + node.id;
  if (node.value.heading === "ul-disc" || node.value.heading === "ul-decimal") {
    rootClazz += " et-bullets";
  }

  return (
    <div className={rootClazz + " node-draft"}>
      <Editor editorState={node.draftState} readOnly customStyleMap={customDraftStyleMap} textDirectionality="RTL" blockStyleFn={blockDraftStyleFn} />
    </div>
  );
};

export default DraftReadonly;
