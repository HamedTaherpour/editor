import { ChangeEvent, useRef, useContext, useState, useEffect } from "react";
import { NodeVoice, OnNodeBehavior } from "@/app/lib/editor/type";
import { EditorContext } from "@/app/lib/editor/hook/context";
import AppIcon from "../AppIcon";
import AppLoadingSpinner from "../AppLoadingSpinner";

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
  const [duration, setDuration] = useState<string>("00:00");
  const [CurrentDuration, setCurrentDuration] = useState<string>("00:00");
  const [fileName, setFileName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const refFile = useRef<HTMLInputElement>(null);

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
      onChangeFileName(e.target.files[0].name);
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
    let minutes = "0" + Math.floor(duration / 60);
    let seconds = "0" + Math.floor(duration - parseInt(minutes) * 60);
    return minutes.substring(-2) + ":" + seconds.substring(-2);
  };

  const onBtnToggleAudioPlayClick = () => {
    if (ref.current) {
      if (ref.current.paused) ref.current.play();
      else ref.current.pause();
    }
  };

  const setVoice = (url: string) => {
    node.url = url;
    if (onNodeBehavior) onNodeBehavior.onUpdate(node);
    setStatus(Status.FileReady);
    if (ref.current) {
      ref.current.src = url;
      ref.current.addEventListener(
        "loadedmetadata",
        () => {
          if (ref.current) setDuration(getDurationFormat(ref.current.duration));
        },
        false
      );
      ref.current.addEventListener(
        "timeupdate",
        () => {
          if (ref.current) setCurrentDuration(getDurationFormat(ref.current.currentTime));
        },
        false
      );
    }
  };

  return (
    <div>
      <audio ref={ref} className="hidden">
        <source type=".mp3,.wav" />
        Your browser does not support the audio element.
      </audio>
      {status === Status.None ? (
        <label className="flex flex-row items-center rounded-lg bg-gray-2 px-4 h-12 cursor-pointer">
          <AppIcon name="volume" className="size-6 ml-3" />
          <span className="text-xs font-semibold text-gray-8 ml-1">فایل صوتی را بارگذاری کنید.</span>
          <span className="text-xs text-gray-8">mp3. mww فرمت</span>
          <input ref={refFile} className="hidden" type="file" accept=".mp3,audio/*" onChange={onChangeFile} />
        </label>
      ) : status === Status.Uploading ? (
        <div className="flex flex-row items-center rounded-lg bg-gray-2 px-4 h-12 cursor-pointer">
          <AppIcon name="volume" className="size-6 ml-3" />
          <div className="flex flex-col flex-1">
            <span className="text-xs font-semibold truncate ml-4">{fileName}</span>
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
          <div className="flex flex-row items-center rounded-lg bg-gray-2 px-4 h-12 cursor-pointer">
            <button className="ml-3" onClick={onBtnToggleAudioPlayClick}>
              <AppIcon name="play" className="size-6" />
            </button>
            <input value={fileName} onChange={(e) => onChangeFileName(e.target.value)} placeholder="نام فایل را بنویسید..." className="text-xs font-semibold placeholder:text-gray-8 outline-none bg-transparent flex-1 truncate ml-4" />
            <div className="text-xs space-x-1">
              <span>{CurrentDuration}</span>
              <span>/</span>
              <span>{duration}</span>
            </div>
          </div>
          <input value={description} onChange={(e) => onChangeDescription(e.target.value)} placeholder="توضیحات مربوط به فایل (اختیاری)" className="text-xs  placeholder:text-gray-6 mt-1 outline-none" />
        </div>
      ) : null}
    </div>
  );
};

export default NodeEditorVoice;
