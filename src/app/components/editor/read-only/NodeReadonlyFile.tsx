import { useState, useEffect } from "react";
import { NodeFile } from "@/app/lib/editor/type";
import { getFileSizeFormat } from "@/app/lib/utils";
import AppIcon from "@/app/components/AppIcon";

interface Props {
  node: NodeFile;
}

const NodeReadonlyFile = (props: Props) => {
  const { node } = props;
  const [fileSize, setFileSize] = useState<string>("0");

  useEffect(() => {
    setFileSize(getFileSizeFormat(node.fileSize));
  });

  return (
    <a href={node.path} download className="flex flex-col">
      <div className="flex flex-row items-center rounded-lg bg-gray-2 px-4 h-12">
        <AppIcon name="document-upload" className="size-6 ml-3" />
        <p className="text-xs font-semibold placeholder:text-gray-8 outline-none bg-transparent flex-1 truncate ml-4">{node.fileName}</p>
        <div className="text-xs space-x-1">
          <span>{fileSize}</span>
        </div>
      </div>
      <span className="text-xs placeholder:text-gray-6 text-gray-6 mt-1 outline-none">{node.description}</span>
    </a>
  );
};

export default NodeReadonlyFile;
