import React, { ChangeEvent, useRef, useContext, useState, useEffect } from 'react';
import { NodeVoice, OnNodeBehavior } from '../../lib/editor/type';
import { EditorContext } from '../../lib/editor/hook/context';
import AppIcon from '../AppIcon';
import AppLoadingSpinner from '../AppLoadingSpinner';
import useOutsideClick from '../../lib/helpers/OutsideClick';

interface Props {
  index: number;
  node: NodeVoice;
}

enum Status {
  None,
  Uploading,
  FileReady,
}

const NodeEditorVoice = (props: Props) => {
  const { node, index } = props;
  const ref = useRef<HTMLAudioElement>(null);
  const onNodeBehavior = useContext<OnNodeBehavior | undefined>(EditorContext);
  const [status, setStatus] = useState<Status>(Status.None);
  const [duration, setDuration] = useState<string>('00:00');
  const [currentDuration, setCurrentDuration] = useState<string>('00:00');
  const [fileName, setFileName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isVoicePause, setIsVoicePause] = useState<boolean>(false);
  const refFile = useRef<HTMLInputElement>(null);
  const [tempFileName, setTempFileName] = useState('');
  const rootRef = useOutsideClick<HTMLDivElement>(() => {
    if (status !== Status.None && fileName.length <= 0) {
      onChangeFileName(tempFileName);
    }
  });

  useEffect(() => {
    if (status === Status.None && node.url) {
      setVoice(node.url);
      setFileName(node.fileName);
      setDescription(node.description);
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
      setTempFileName(e.target.files[0].name);
      if (onNodeBehavior) {
        setStatus(Status.Uploading);
        onNodeBehavior
          .onUploadVoice(e.target.files[0])
          .then((response) => {
            setVoice(response.url);
          })
          .catch(() => {
            onNodeBehavior.onDelete(node);
          });
      }
    }
  };

  const getDurationFormat = (duration: number): string => {
    let minutes = '0' + Math.floor(duration / 60);
    let seconds = '0' + Math.floor(duration - parseInt(minutes) * 60);
    return minutes.substring(-2) + ':' + seconds.substring(-2);
  };

  const onBtnToggleAudioPlayClick = () => {
    if (ref.current) {
      if (ref.current.paused) ref.current.play();
      else ref.current.pause();
      setIsVoicePause(!ref.current.paused);
    }
  };

  const setVoice = (url: string) => {
    node.url = url;
    if (onNodeBehavior) onNodeBehavior.onUpdate(node);
    setStatus(Status.FileReady);
    if (ref.current) {
      ref.current.src = url;
      ref.current.addEventListener(
        'loadedmetadata',
        () => {
          if (ref.current) setDuration(getDurationFormat(ref.current.duration));
        },
        false
      );
      ref.current.addEventListener(
        'timeupdate',
        () => {
          if (ref.current) setCurrentDuration(getDurationFormat(ref.current.currentTime));
        },
        false
      );
      ref.current.addEventListener('ended', () => {
        setIsVoicePause(false);
      });
    }
  };

  return (
    <div ref={rootRef} className="node-file-root">
      <audio ref={ref}>
        <source type=".mp3,.wav" />
        Your browser does not support the audio element.
      </audio>
      {status === Status.None ? (
        <label className="node-file-none">
          <AppIcon name="document-upload" className="icon" />
          <span className="title">فایل صوتی را بارگذاری کنید.</span>
          <span className="type">mp3. mww فرمت</span>
          <input ref={refFile} type="file" accept=".mp3,audio/*" onChange={onChangeFile} />
        </label>
      ) : status === Status.Uploading ? (
        <div className="node-file-uploading">
          <AppIcon name="document-upload" className="icon" />
          <div className="node-file-uploading-container">
            <input value={fileName} onChange={(e) => onChangeFileName(e.target.value)} placeholder="نام فایل را بنویسید..." className="title" />
            <div className="node-file-uploading-loading-box">
              <AppLoadingSpinner className="loading" />
            </div>
          </div>
          <button>
            <AppIcon name="x" className="icon" />
          </button>
        </div>
      ) : status === Status.FileReady ? (
        <div className="node-file-ready">
          <div className="node-file-ready-container">
            <button onClick={onBtnToggleAudioPlayClick}>{isVoicePause ? <AppIcon name="union" className="icon" /> : <AppIcon name="play" className="icon" />}</button>
            <input value={fileName} onChange={(e) => onChangeFileName(e.target.value)} placeholder="نام فایل را بنویسید..." className="title" />
            <div className="subtitle">
              <span>{currentDuration}</span>
              <span>/</span>
              <span>{duration}</span>
            </div>
          </div>
          <input value={description} onChange={(e) => onChangeDescription(e.target.value)} placeholder="توضیحات مربوط به فایل (اختیاری)" className="description" />
        </div>
      ) : null}
    </div>
  );
};

export default NodeEditorVoice;
