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

const NodeEditorQuote = (props: Props) => {
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
    <div className="rounded flex flex-row px-1 py-1 bg-slate-100">
      <div className="w-[3px] bg-slate-500 min-h-full  ml-2.5">&nbsp;</div>
      <DraftEditor
        onChangeText={onChangeText}
        onKeyUp={onKeyUp}
        onAddNodeListener={onAddNodeFromChildNodeListener}
      />
    </div>
  );
};

export default NodeEditorQuote;
