import { useContext } from "react";
import { NodeDivider, OnNodeBehavior } from "@/app/lib/editor/type";
import { EditorContext } from "@/app/lib/editor/hook/context";

interface Props {
  node: NodeDivider;
  index: number;
}

const NodeEditorDivider = (props: Props) => {
  const { node, index } = props;

  const onNodeBehavior = useContext<OnNodeBehavior | undefined>(EditorContext);

  return (
    <div className="w-full h-6 flex items-center">
      <hr className="border-slate-200 w-full" />
    </div>
  );
};

export default NodeEditorDivider;
