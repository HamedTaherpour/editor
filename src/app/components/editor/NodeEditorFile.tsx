import { ChangeEvent, useRef, useContext, useState, useEffect } from "react";
import { NodeFile, OnNodeBehavior } from "@/app/lib/editor/type";
import { EditorContext } from "@/app/lib/editor/hook/context";
import { getFileSizeFormat } from "@/app/lib/utils";
import AppIcon from "@/app/components/AppIcon";
import AppLoadingSpinner from "@/app/components/AppLoadingSpinner";

interface Props {
  index: number;
  node: NodeFile;
}

enum Status {
  None,
  Uploading,
  FileReady,
}

const NodeEditorFile = (props: Props) => {
  const { node, index } = props;
  const onNodeBehavior = useContext<OnNodeBehavior | undefined>(EditorContext);
  const [status, setStatus] = useState<Status>(Status.None);
  const [fileSize, setFileSize] = useState<string>("0");
  const [fileName, setFileName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    if (status === Status.None && node.path) {
      setVoice(node.path);
      setFileName(node.fileName);
      setDescription(node.description);
      setFileSize(getFileSizeFormat(node.fileSize));
    }
  }, [node.path]);

  const onChangeDescription = (value: any) => {
    setDescription(value);
    node.description = value;
    if (onNodeBehavior) onNodeBehavior.onUpdate(node);
  };

  const onChangeFileName = (value: any) => {
    setFileName(value);
    node.fileName = value;
    if (onNodeBehavior) onNodeBehavior.onUpdate(node);
  };

  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!!e.target.files) {
      node.path = URL.createObjectURL(e.target.files[0]);
      node.fileSize = e.target.files[0].size;
      if (onNodeBehavior) onNodeBehavior.onUpdate(node);

      onChangeFileName(e.target.files[0].name);
      setFileSize(getFileSizeFormat(e.target.files[0].size));

      setStatus(Status.Uploading);
      setTimeout(() => {
        setVoice(node.path);
      }, 2000);
    }
  };

  const setVoice = (src: string) => {
    setStatus(Status.FileReady);
  };

  return (
    <div>
      {status === Status.None ? (
        <label className="flex flex-row items-center rounded-lg bg-gray-2 px-4 h-12 cursor-pointer">
          <AppIcon name="document-upload" className="size-6 ml-3" />
          <span className="text-xs font-semibold text-gray-8 ml-1">فایل خود را بارگذاری کنید.</span>
          <span className="text-xs text-gray-8">pdf . jpj فرمت</span>
          <input className="hidden" id="file_input" type="file" accept="image/*,.pdf" onChange={onChangeFile} />
        </label>
      ) : status === Status.Uploading ? (
        <div className="flex flex-row items-center rounded-lg bg-gray-2 px-4 h-12 cursor-pointer">
          <AppIcon name="document-upload" className="size-6 ml-3" />
          <div className="flex flex-col flex-1">
            <span className="text-xs font-semibold truncate ml-4">{fileName}</span>
            <div className="flex flex-row gap-x-1">
              <span className="text-[11px] text-gray-7">8.3 KB</span>
              <span className="text-[11px] text-gray-7">-</span>
              <span className="text-[11px] text-gray-7">34%</span>
              <AppLoadingSpinner className="size-3 text-gray-7" />
            </div>
          </div>
          <button>
            <AppIcon name="x" className="size-5 fill-gray-6" />
          </button>
        </div>
      ) : status === Status.FileReady ? (
        <div className="flex flex-col">
          <div className="flex flex-row items-center rounded-lg bg-gray-2 px-4 h-12">
            <AppIcon name="document-upload" className="size-6 ml-3" />
            <input value={fileName} onChange={(e) => onChangeFileName(e.target.value)} placeholder="نام فایل را بنویسید..." className="text-xs font-semibold placeholder:text-gray-8 outline-none bg-transparent flex-1 truncate ml-4" />
            <a href={node.path} download className="text-xs space-x-1">
              <span>{fileSize}</span>
            </a>
          </div>
          <input value={description} onChange={(e) => onChangeDescription(e.target.value)} placeholder="توضیحات مربوط به فایل (اختیاری)" className="text-xs  placeholder:text-gray-6 text-gray-6 mt-1 outline-none" />
        </div>
      ) : null}
    </div>
  );
};

export default NodeEditorFile;
