import {
  NodeText,
  OnUpdateNodeListener,
  OnPressEnterNodeListener,
  OnRightClickNodeListener,
} from "@/app/lib/editor/type";
import { ChangeEvent, KeyboardEvent, MouseEvent, useRef } from "react";

interface Props {
  node: NodeText;
  onUpdateNodeListener: OnUpdateNodeListener;
  onPressEnterNodeListener: OnPressEnterNodeListener;
  onRightClickNodeListener: OnRightClickNodeListener;
}

const NodeEditorText = (props: Props) => {
  const {
    node,
    onUpdateNodeListener,
    onPressEnterNodeListener,
    onRightClickNodeListener,
  } = props;
  const ref = useRef<HTMLInputElement>(null);

  const onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onPressEnterNodeListener.onClick();
  };

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    node.text = e.target.value;
    onUpdateNodeListener.onUpdate(node);
  };

  const onContextMenu = (e: MouseEvent<HTMLInputElement>) => {
    onRightClickNodeListener.onRightClick(node, e.clientX, e.clientY);
    e.preventDefault();
  };

  return (
    <input
      ref={ref}
      autoFocus
      onContextMenu={onContextMenu}
      onChange={onChangeText}
      onKeyUp={onKeyUp}
      className="bg-transparent outline-none resize-none placeholder:opacity-0 ring-0 focus:placeholder:opacity-100 bg-blue-100 w-full"
      placeholder="متن خود را وارد کنید . . ."
    />
  );
};

export default NodeEditorText;
