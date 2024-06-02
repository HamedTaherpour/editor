import React from "react";

import StoreProvider from "@/app/store/store-provider";
import NodeList from "@/app/components/NodeList";
import EditorRoot from "@/app/components/EditorRoot";

import { EditorOptions, JsonEditor, OnJsonEditorUpdateListener } from "@/app/type/index.type";

interface Props {
  value?: JsonEditor;
  options?: EditorOptions;
  listener: OnJsonEditorUpdateListener;
}

const EditorApp = (props: Props) => {
  return (
    <StoreProvider>
      <EditorRoot>
        <NodeList options={props.options} listener={props.listener} value={props.value} />
      </EditorRoot>
    </StoreProvider>
  );
};

export default EditorApp;
