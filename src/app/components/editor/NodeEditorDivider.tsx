import React, { useContext } from "react";
import { NodeDivider, OnNodeBehavior } from "../../lib/editor/type";
import { EditorContext } from "@/app/lib/editor/hook/context";

interface Props {
  node: NodeDivider;
  index: number;
}

const NodeEditorDivider = (props: Props) => {
  const { index } = props;
  const onNodeBehavior = useContext<OnNodeBehavior | undefined>(EditorContext);

  const onFocus = () => {
    if (onNodeBehavior)
      onNodeBehavior.onFocus(index);
  };

  return (
    <div className="node-divider-root" onMouseDown={onFocus}>
      <hr />
    </div>
  );
};

export default NodeEditorDivider;
