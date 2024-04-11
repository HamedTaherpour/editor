import { ChangeEvent, useRef, useContext, useState } from "react";
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

  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!!e.target.files) {
      node.path = URL.createObjectURL(e.target.files[0]);
      if (onNodeBehavior) onNodeBehavior.onUpdate(node);
      setStatus(Status.Uploading);
      setTimeout(() => {
        setStatus(Status.FileReady);
        if (ref.current) {
          ref.current.src = node.path;
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
      }, 2000);
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
          <input className="hidden" id="file_input" type="file" accept=".mp3,audio/*" onChange={onChangeFile} />
        </label>
      ) : status === Status.Uploading ? (
        <div className="flex flex-row items-center rounded-lg bg-gray-2 px-4 h-12 cursor-pointer">
          <AppIcon name="volume" className="size-6 ml-3" />
          <div className="flex flex-col flex-1">
            <span className="text-xs font-semibold">classYoga.mp3</span>
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
          <div className="flex flex-row items-center rounded-lg bg-gray-2 px-4 h-12 cursor-pointer">
            <button className="ml-3" onClick={onBtnToggleAudioPlayClick}>
              <AppIcon name="play" className="size-6" />
            </button>
            <input placeholder="نام فایل را بنویسید..." className="text-xs font-semibold placeholder:text-gray-8 outline-none bg-transparent flex-1" />
            <div className="text-xs space-x-1">
              <span>{CurrentDuration}</span>
              <span>/</span>
              <span>{duration}</span>
            </div>
          </div>
          <input placeholder="توضیحات مربوط به فایل (اختیاری)" className="text-xs  placeholder:text-gray-6 text-gray-6 mt-1 outline-none" />
        </div>
      ) : null}
    </div>
  );
};

export default NodeEditorVoice;
