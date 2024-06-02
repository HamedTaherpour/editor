import React from "react";
import useEditor from "@/app/hook/useEditor";

interface Props {
  index: number;
}

const NodeEditorDivider = (props: Props) => {
  const { index } = props;
  const { getNodeDivider } = useEditor();

  const onFocus = () => {
  };

  return (
    <div className="node-divider-root" onMouseDown={onFocus}>
      <hr />
    </div>
  );
};

export default NodeEditorDivider;
