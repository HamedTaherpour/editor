import { useContext } from "react";
import { NodeText, OnNodeBehavior } from "@/app/lib/editor/type";
import DraftEditor from "@/app/components/TextEditor/DraftEditor";
import { EditorContext } from "@/app/lib/editor/hook/context";

interface Props {
  node: NodeText;
  index: number;
}

const NodeEditorText = (props: Props) => {
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
    <DraftEditor
      onChangeText={onChangeText}
      onChange={onChange}
      node={node}
      index={index}
      placeholder="متن را اینجا بنوسید..."
    />
  );
};

export default NodeEditorText;
