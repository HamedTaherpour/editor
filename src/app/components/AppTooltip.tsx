"use client";

import { Children, ReactNode, useEffect, useRef, useState } from "react";
import { cloneElement } from "react";
import useOutsideClick from "@/app/lib/OutsideClick";
import { createPortal } from "react-dom";

interface Props {
  activator: ReactNode;
  text: string;
  className?: string;
}

const AppTooltip = (props: Props) => {
  const [postion, setPostion] = useState({ x: 0, y: 0 });

  const menuEl = document.getElementById("menu");

  const { activator, text, className } = props;

  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const refRoot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (postion.x + postion.y === 0) load();
  });

  const load = () => {
    if (refRoot.current && ref.current) {
      setPostion({
        x:
          refRoot.current.getBoundingClientRect().left -
          ref.current.clientWidth +
          refRoot.current.clientHeight,
        y:
          refRoot.current.getBoundingClientRect().top -
          refRoot.current.clientHeight -
          12,
      });
    }
  };

  const onMouseEnter = () => {
    setOpen(true);
  };

  const onMouseLeave = () => {
    setOpen(false);
  };

  return (
    <div
      ref={refRoot}
      className={className + " relative"}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {activator}
      {open && menuEl
        ? createPortal(
            <div
              ref={ref}
              style={{
                top: postion.y,
                left: postion.x,
              }}
              className="absolute text-sm font-semibold px-1.5 py-2 z-50 rounded-md bg-gray-13 text-white"
            >
              {text}
            </div>,
            menuEl
          )
        : null}
    </div>
  );
};

export default AppTooltip;
