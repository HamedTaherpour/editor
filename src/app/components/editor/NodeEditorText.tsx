import { NodeText, OnUpdateNodeListener } from "@/app/lib/editor/type";

interface Props {
  node: NodeText;
  onUpdateNodeListener: OnUpdateNodeListener;
}

const NodeEditorText = (props: Props) => {
  const { node, onUpdateNodeListener } = props;

  const onChangeText = (e) => {
    node.text = e.target.value;
    onUpdateNodeListener.onUpdate(node);
  };

  return (
    <textarea
      onChange={onChangeText}
      className="bg-transparent outline-none resize-none"
      placeholder="متن خود را وارد کنید . . ."
    />
  );
};

export default NodeEditorText;
