import React, { ChangeEvent, useRef, useContext, useState, useEffect } from 'react';
import { NodeFile, OnNodeBehavior } from '../../lib/editor/type';
import { EditorContext } from '../../lib/editor/hook/context';
import AppIcon from '../AppIcon';
import AppLoadingSpinner from '../AppLoadingSpinner';
import { getFileSizeFormat } from '../../lib/helpers';
import useOutsideClick from '../../lib/helpers/OutsideClick';

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
  const [fileSize, setFileSize] = useState<string>('0');
  const [fileName, setFileName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const refFile = useRef<HTMLInputElement>(null);
  const [tempFileName, setTempFileName] = useState('');
  const rootRef = useOutsideClick<HTMLDivElement>(() => {
    if (status !== Status.None && fileName.length <= 0) {
      onChangeFileName(tempFileName);
    }
  });

  useEffect(() => {
    if (status === Status.None && node.url) {
      setFile(node.url);
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
          .onUploadFile(e.target.files[0])
          .then((response) => {
            setFile(response.url);
          })
          .catch(() => {
            onNodeBehavior.onDelete(node);
          });
      }
    }
  };

  const setFile = (url: string) => {
    node.url = url;
    if (onNodeBehavior) onNodeBehavior.onUpdate(node);
    setStatus(Status.FileReady);
  };

  const onFocus = () => {
    if (onNodeBehavior)
      onNodeBehavior.onFocus(index);
  };

  return (
    <div ref={rootRef} className="node-file-root" onMouseDown={onFocus}>
      {status === Status.None ? (
        <label className="node-file-none">
          <AppIcon name="document-upload" className="icon" />
          <span className="title">فایل خود را بارگذاری کنید.</span>
          <span className="type">pdf . jpj فرمت</span>
          <input ref={refFile} type="file" accept="image/*,.pdf" onChange={onChangeFile} />
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
            <a href={node.url} target="_blank" className="subtitle">
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
