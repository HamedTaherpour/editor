import { useRef, useState, useEffect } from "react";
import { NodeVoice } from "@/app/lib/editor/type";
import AppIcon from "@/app/components/AppIcon";

interface Props {
  node: NodeVoice;
}

const NodeReadonlyVoice = (props: Props) => {
  const { node } = props;
  const ref = useRef<HTMLAudioElement>(null);
  const [duration, setDuration] = useState<string>("00:00");
  const [CurrentDuration, setCurrentDuration] = useState<string>("00:00");

  useEffect(() => {
    setVoice(node.path);
  });

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

  const setVoice = (src: string) => {
    if (ref.current) {
      ref.current.src = src;
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
      <div className="flex flex-col">
        <div className="flex flex-row items-center rounded-lg bg-gray-2 px-4 h-12 cursor-pointer">
          <button className="ml-3" onClick={onBtnToggleAudioPlayClick}>
            <AppIcon name="play" className="size-6" />
          </button>
          <input value={node.fileName} readOnly className="text-xs font-semibold placeholder:text-gray-8 outline-none bg-transparent flex-1 truncate ml-4" />
          <div className="text-xs space-x-1">
            <span>{CurrentDuration}</span>
            <span>/</span>
            <span>{duration}</span>
          </div>
        </div>
        <input value={node.description} readOnly className="text-xs  placeholder:text-gray-6 text-gray-6 mt-1 outline-none" />
      </div>
    </div>
  );
};

export default NodeReadonlyVoice;
