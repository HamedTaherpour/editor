import { useContext } from "react";
import { NodeQuote, OnNodeBehavior } from "@/app/lib/editor/type";
import DraftEditor from "@/app/components/TextEditor/DraftEditor";
import { EditorContext } from "@/app/lib/editor/hook/context";
import { toolsColorStyleItems } from "@/app/lib/editor-text/hook/tools";

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

  const classNameBgColor = () => {
    let clazz = "";
    if (node.backgroundColor) {
      clazz += toolsColorStyleItems[node.backgroundColor].option.class.background;
    }
    return clazz;
  };

  const classNameBorderColor = () => {
    let clazz = "";
    if (node.backgroundColor) {
      clazz += toolsColorStyleItems[node.backgroundColor].option.class.bgColor;
    }
    return clazz;
  };

  return (
    <div className={classNameBgColor() + " rounded flex flex-row px-1 py-1 w-full"}>
      <div className={classNameBorderColor() + " w-[3px] min-h-full ml-2.5"}>&nbsp;</div>
      <DraftEditor onChangeText={onChangeText} onChange={onChange} node={node} index={index} placeholder="نقل قول را اینجا بنوسید..." />
    </div>
  );
};

export default NodeEditorQuote;
