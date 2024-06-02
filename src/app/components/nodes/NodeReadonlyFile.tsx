import React from "react";
import { getFileSizeFormat } from "../../helpers";
import AppIcon from "../app/AppIcon";
import useEditor from "@/app/hook/useEditor";

interface Props {
  index: number;
}

const NodeReadonlyFile = (props: Props) => {
  const { index } = props;
  const { getNodeFile } = useEditor();
  const node = getNodeFile(index);


  return (
    <a href={node.value.url} download className="node-file-root">
      <div className="node-file-ready-container">
        <AppIcon name="document-upload" className="icon" />
        <p className="title">{node.value.fileName}</p>
        <div className="subtitle">
          <span>{getFileSizeFormat(node.value.fileSize)}</span>
        </div>
      </div>
      <span className="description">{node.value.description}</span>
    </a>
  );
};

export default NodeReadonlyFile;
