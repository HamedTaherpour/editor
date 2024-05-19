import React, { createRef, useContext } from "react";
import { NodeText, OnNodeBehavior } from "../../lib/editor/type";
import DraftEditor from "../TextEditor/DraftEditor";
import { EditorContext } from "../../lib/editor/hook/context";

interface Props {
  node: NodeText;
  index: number;
}

const NodeEditorText = (props: Props) => {
  const { node, index } = props;
  node.heroRef = node.heroRef || createRef();

  const onNodeBehavior = useContext<OnNodeBehavior | undefined>(EditorContext);

  const onChangeText = (text: string) => {
    node.plainText = text;
    if (onNodeBehavior) onNodeBehavior.onUpdate(node);
  };

  const onChange = (json: string) => {
    node.text = json;
    if (onNodeBehavior) onNodeBehavior.onUpdate(node);
  };

  return <DraftEditor ref={node.heroRef}  onChangeText={onChangeText} onChange={onChange} node={node} index={index} placeholder="متن را اینجا بنوسید..." />;
};

export default NodeEditorText;
