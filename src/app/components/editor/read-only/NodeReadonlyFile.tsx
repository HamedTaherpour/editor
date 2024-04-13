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
    <div>
      <div className="flex flex-col">
        <div className="flex flex-row items-center rounded-lg bg-gray-2 px-4 h-12">
          <AppIcon name="document-upload" className="size-6 ml-3" />
          <input value={node.fileName} readOnly className="text-xs font-semibold placeholder:text-gray-8 outline-none bg-transparent flex-1 truncate ml-4" />
          <a href={node.path} download className="text-xs space-x-1">
            <span>{fileSize}</span>
          </a>
        </div>
        <input value={node.description} readOnly className="text-xs  placeholder:text-gray-6 text-gray-6 mt-1 outline-none" />
      </div>
    </div>
  );
};

export default NodeReadonlyFile;
