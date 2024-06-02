import React from "react";
import DraftEditor from "../TextEditor/DraftEditor";
import useEditor from "@/app/hook/useEditor";
import { draftColorStyleOptions } from "@/app/helpers/constants";

interface Props {
  index: number;
}

const NodeEditorQuote = (props: Props) => {
  const { index } = props;
  const { getNode } = useEditor();
  const node = getNode(index);

  const classNameBgColor = () => {
    let clazz = "";
    if (node.value.backgroundColor) {
      // @ts-ignore
      clazz += draftColorStyleOptions[node.value.backgroundColor].option.class.background;
    }
    return clazz;
  };

  const classNameBorderColor = () => {
    let clazz = "";
    if (node.value.backgroundColor) {
      // @ts-ignore
      clazz += draftColorStyleOptions[node.value.backgroundColor].option.class.bgColor;
    }
    return clazz;
  };

  return (
    <div className={classNameBgColor() + " node-quote-root"}>
      <div className={classNameBorderColor() + " divider"}>&nbsp;</div>
      <DraftEditor index={index} placeholder="نقل قول را اینجا بنوسید..." />
    </div>
  );
};

export default NodeEditorQuote;
