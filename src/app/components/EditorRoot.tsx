import React from "react";

const EditorRoot = ({ children }: { children: React.ReactNode }) => {
  return (
    <div id="editor-root">
      {children}
    </div>
  );
};

export default EditorRoot;