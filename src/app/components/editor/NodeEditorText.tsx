import {
  NodeText,
  OnUpdateNodeListener,
  OnPressEnterNodeListener,
  OnRightClickNodeListener,
  OnAddNodeFromChildNodeListener,
} from "@/app/lib/editor/type";
import { KeyboardEvent } from "react";
import DraftEditor from "@/app/components/TextEditor/DraftEditor";

interface Props {
  node: NodeText;
  onUpdateNodeListener: OnUpdateNodeListener;
  onPressEnterNodeListener: OnPressEnterNodeListener;
  onRightClickNodeListener: OnRightClickNodeListener;
  onAddNodeFromChildNodeListener: OnAddNodeFromChildNodeListener;
}

const NodeEditorText = (props: Props) => {
  const {
    node,
    onUpdateNodeListener,
    onPressEnterNodeListener,
    onAddNodeFromChildNodeListener,
  } = props;

  const onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onPressEnterNodeListener.onClick();
  };

  const onChangeText = (text: string) => {
    node.text = text;
    onUpdateNodeListener.onUpdate(node);
  };

  return (
    <DraftEditor
      onChangeText={onChangeText}
      onKeyUp={onKeyUp}
      onAddNodeListener={onAddNodeFromChildNodeListener}
    />
  );
};

export default NodeEditorText;
