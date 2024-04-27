import { ChangeEvent, useRef, useContext, useState, useEffect } from "react";
import { NodeVideo, OnNodeBehavior } from "@/app/lib/editor/type";
import { EditorContext } from "@/app/lib/editor/hook/context";
import { getFileSizeFormat } from "@/app/lib/utils";
import AppIcon from "@/app/components/AppIcon";
import AppLoadingSpinner from "@/app/components/AppLoadingSpinner";
import useOutsideClick from "@/app/lib/OutsideClick";

interface Props {
  index: number;
  node: NodeVideo;
}

enum Status {
  None,
  Uploading,
  FileReady,
}

const NodeEditorVideo = (props: Props) => {
  const { node, index } = props;
  const onNodeBehavior = useContext<OnNodeBehavior | undefined>(EditorContext);
  const [status, setStatus] = useState<Status>(Status.None);
  const [fileSize, setFileSize] = useState<string>("0");
  const [fileName, setFileName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const refFile = useRef<HTMLInputElement>(null);
  const [tempFileName, setTempFileName] = useState("");
  const rootRef = useOutsideClick<HTMLDivElement>(() => {
    if (status !== Status.None && fileName.length <= 0) {
      onChangeFileName(tempFileName);
    }
  });

  useEffect(() => {
    if (status === Status.None && node.url) {
      setVideo(node.url);
      setFileName(node.fileName);
      setDescription(node.description);
      setFileSize(getFileSizeFormat(node.fileSize));
    } else if (refFile.current) {
      refFile.current.click();
    }
  }, [node.url]);

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
      node.fileSize = e.target.files[0].size;
      setTempFileName(e.target.files[0].name);
      setFileSize(getFileSizeFormat(node.fileSize));
      if (onNodeBehavior) {
        setStatus(Status.Uploading);
        onNodeBehavior
          .onUploadVideo(e.target.files[0])
          .then((response) => {
            setVideo(response.url);
          })
          .catch(() => {
            onNodeBehavior.onDelete(node);
          });
      }
    }
  };

  const setVideo = (url: string) => {
    node.url = url;
    if (onNodeBehavior) onNodeBehavior.onUpdate(node);
    setStatus(Status.FileReady);
  };

  return (
    <div ref={rootRef}>
      {status === Status.None ? (
        <label className="flex flex-row items-center rounded-lg bg-gray-2 px-4 h-12 cursor-pointer">
          <AppIcon name="document-upload" className="size-6 ml-3" />
          <span className="text-xs font-semibold text-gray-8 ml-1">ویدیو خود را بارگذاری کنید.</span>
          <span className="text-xs text-gray-8">.mp4 فرمت</span>
          <input ref={refFile} className="hidden" type="file" accept="video/*,.mp4" onChange={onChangeFile} />
        </label>
      ) : status === Status.Uploading ? (
        <div className="flex flex-row items-center rounded-lg bg-gray-2 px-4 h-12 cursor-pointer">
          <AppIcon name="document-upload" className="size-6 ml-3" />
          <div className="flex flex-col flex-1">
            <input value={fileName} onChange={(e) => onChangeFileName(e.target.value)} placeholder="نام فایل را بنویسید..." className="text-xs font-semibold placeholder:text-gray-8 outline-none bg-transparent flex-1 truncate ml-4" />
            <div className="flex flex-row gap-x-1">
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
            <input value={fileName} onChange={(e) => onChangeFileName(e.target.value)} placeholder="نام ویدیو را بنویسید..." className="text-xs font-semibold placeholder:text-gray-8 outline-none bg-transparent flex-1 truncate ml-4" />
            <a href={node.url} target="_blank" className="text-xs space-x-1">
              <span>{fileSize}</span>
            </a>
          </div>
          <input value={description} onChange={(e) => onChangeDescription(e.target.value)} placeholder="توضیحات مربوط به ویدیو (اختیاری)" className="text-xs  placeholder:text-gray-6 mt-1 outline-none" />
        </div>
      ) : null}
    </div>
  );
};

export default NodeEditorVideo;
