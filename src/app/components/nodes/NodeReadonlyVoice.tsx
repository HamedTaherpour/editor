"use client";

import React, { useRef, useState, useEffect } from "react";
import AppIcon from "../app/AppIcon";
import useEditor from "@/app/hook/useEditor";

interface Props {
  index: number;
}

const NodeReadonlyVoice = (props: Props) => {
  const { index } = props;
  const { getNodeVoice } = useEditor();
  const node = getNodeVoice(index);

  const ref = useRef<HTMLAudioElement>(null);
  const [duration, setDuration] = useState<string>("00:00");
  const [currentDuration, setCurrentDuration] = useState<string>("00:00");
  const [isVoicePause, setIsVoicePause] = useState<boolean>(false);

  useEffect(() => {
    setVoice(node.value.url);
  }, []);

  const getDurationFormat = (duration: number): string => {
    let minutes = "0" + Math.floor(duration / 60);
    let seconds = "0" + Math.floor(duration - parseInt(minutes) * 60);
    return minutes.substring(-2) + ":" + seconds.substring(-2);
  };

  const onBtnToggleAudioPlayClick = () => {
    if (ref.current) {
      if (ref.current.paused) ref.current.play();
      else ref.current.pause();
      setIsVoicePause(!ref.current.paused);
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
      ref.current.addEventListener("ended", () => {
        setIsVoicePause(false);
      });
    }
  };

  return (
    <div className="node-file-root">
      <audio ref={ref}>
        <source type=".mp3,.wav" />
        Your browser does not support the audio element.
      </audio>
      <div className="node-file-ready">
        <div className="node-file-ready-container">
          <button onClick={onBtnToggleAudioPlayClick}>{isVoicePause ? <AppIcon name="pause" className="icon" /> : <AppIcon name="play" className="icon" />}</button>
          <p className="title">{node.value.fileName}</p>
          <div className="subtitle">
            <span>{currentDuration}</span>
            <span>/</span>
            <span>{duration}</span>
          </div>
        </div>
        <span className="description">{node.value.description}</span>
      </div>
    </div>
  );
};

export default NodeReadonlyVoice;
