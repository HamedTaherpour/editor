import React, { ChangeEvent, useRef, useState, useEffect } from "react";
import AppIcon from "../app/AppIcon";
import AppLoadingSpinner from "../app/AppLoadingSpinner";
import { getFileSizeFormat } from "../../helpers";
import useOutsideClick from "@/app/helpers/OutsideClick";
import useEditor from "@/app/hook/useEditor";

interface Props {
  index: number;
}

enum Status {
  None,
  Uploading,
  FileReady,
}

const NodeEditorFile = (props: Props) => {
  const { index } = props;
  const { getNodeFile } = useEditor();
  const node = getNodeFile(index);

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
    if (status === Status.None && node.value.url) {
      setFile(node.value.url);
      setFileName(node.value.fileName);
      setDescription(node.value.description);
      setFileSize(getFileSizeFormat(node.value.fileSize));
    } else if (refFile.current) {
      refFile.current.click();
    }
  }, [node.value.url]);

  const onChangeDescription = (value: any) => {
    setDescription(value);
    node.value.description = value;
    node.update();
  };

  const onChangeFileName = (value: any) => {
    setFileName(value);
    node.value.fileName = value;
    node.update();
  };

  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!!e.target.files) {
      node.value.fileSize = e.target.files[0].size;
      node.update();
      setTempFileName(e.target.files[0].name);
      setFileSize(getFileSizeFormat(node.value.fileSize));
      const uploader = node.getUploader();
      if (uploader) {
        setStatus(Status.Uploading);
        uploader(e.target.files[0])
          .then((response) => {
            setFile(response.url);
            node.update();
          })
          .catch(() => {
            node.delete();
          });
      }
    }
  };

  const setFile = (url: string) => {
    node.value.url = url;
    setStatus(Status.FileReady);
  };

  const onFocus = () => {
    // if (onNodeBehavior)
    //   onNodeBehavior.onFocus(index);
  };

  return (
    <div ref={rootRef} className="node-file-root" onMouseDown={onFocus}>
      {status === Status.None ? (
        <label className="node-file-none">
          <AppIcon name="document-upload" className="icon" />
          <span className="title">فایل خود را بارگذاری کنید.</span>
          <span className="type">
            فرمت {node.getFormatTitle()}
          </span>
          <input ref={refFile} type="file" accept={node.getFormat()} onChange={onChangeFile} />
        </label>
      ) : status === Status.Uploading ? (
        <div className="node-file-uploading">
          <AppIcon name="document-upload" className="icon" />
          <div className="node-file-uploading-container">
            <input value={fileName} onChange={(e) => onChangeFileName(e.target.value)} placeholder="نام فایل را بنویسید..." className="title" />
            <div className="node-file-uploading-loading-box">
              <AppLoadingSpinner className="loading " />
            </div>
          </div>
          <button>
            <AppIcon name="x" className="icon" />
          </button>
        </div>
      ) : status === Status.FileReady ? (
        <div className="node-file-ready">
          <div className="node-file-ready-container">
            <AppIcon name="document-upload" className="icon" />
            <input value={fileName} onChange={(e) => onChangeFileName(e.target.value)} placeholder="نام فایل را بنویسید..." className="title" />
            <a href={node.value.url} target="_blank" className="subtitle">
              <span>{fileSize}</span>
            </a>
          </div>
          <input value={description} onChange={(e) => onChangeDescription(e.target.value)} placeholder="توضیحات مربوط به فایل (اختیاری)" className="description" />
        </div>
      ) : null}
    </div>
  );
};

export default NodeEditorFile;
