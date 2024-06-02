import React from "react";
import DraftEditor from "../TextEditor/DraftEditor";

interface Props {
  index: number;
}

const NodeEditorText = (props: Props) => {
  const { index } = props;

  return <DraftEditor index={index} placeholder="متن را اینجا بنوسید..." />;
};

export default NodeEditorText;
