import React from "react";

import StoreProvider from "@/app/store/store-provider";
import EditorRoot from "@/app/components/EditorRoot";

import { JsonEditor } from "@/app/type/index.type";
import NodeReadonlyList from "@/app/components/NodeReadonlyList";

interface Props {
  value: JsonEditor;
}

const EditorApp = (props: Props) => {
  return (
    <StoreProvider>
      <EditorRoot>
        <NodeReadonlyList value={props.value} />
      </EditorRoot>
    </StoreProvider>
  );
};

export default EditorApp;
