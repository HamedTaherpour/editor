import { useContext } from "react";
import { NodeQuote, OnNodeBehavior } from "@/app/lib/editor/type";
import DraftEditor from "@/app/components/TextEditor/DraftEditor";
import { EditorContext } from "@/app/lib/editor/hook/context";

interface Props {
  node: NodeQuote;
  index: number;
}

const NodeEditorQuote = (props: Props) => {
  const { node, index } = props;

  const onNodeBehavior = useContext<OnNodeBehavior | undefined>(EditorContext);

  const onChangeText = (text: string) => {
    node.plainText = text;
    if (onNodeBehavior) onNodeBehavior.onUpdate(node);
  };

  const onChange = (josn: string) => {
    node.text = josn;
    if (onNodeBehavior) onNodeBehavior.onUpdate(node);
  };

  return (
    <div className="rounded flex flex-row px-1 py-1 bg-slate-100 w-full">
      <div className="w-[3px] bg-slate-500 min-h-full ml-2.5">&nbsp;</div>
      <DraftEditor onChangeText={onChangeText} onChange={onChange} node={node} index={index} placeholder="نقل قول را اینجا بنوسید..." />
    </div>
  );
};

export default NodeEditorQuote;
