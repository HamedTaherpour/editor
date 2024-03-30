import {
  NodeText,
  OnUpdateNodeListener,
  OnPressEnterNodeListener,
  OnRightClickNodeListener,
} from "@/app/lib/editor/type";
import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useRef,
  useState,
} from "react";
import AppDropDownMenu from "@/app/components/AppDropDownMenu";
import DraftEditor from "@/app/components/DraftEditor";
import { DropDownMenuItemType, DropDownMenuListType } from "@/app/lib/type";
import HtmlBehaviour from "@/app/lib/editor/HtmlBehaviour";

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

  const onChangeText = (text: string) => {
    node.text = text;
    onUpdateNodeListener.onUpdate(node);
  };

  const onContextMenu = (e: MouseEvent<HTMLInputElement>) => {
    onRightClickNodeListener.onRightClick(node, e.clientX, e.clientY);
    e.preventDefault();
  };

  return <DraftEditor onChangeText={onChangeText} onKeyUp={onKeyUp} />;
};

export default NodeEditorText;
