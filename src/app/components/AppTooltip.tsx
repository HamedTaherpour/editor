"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { getElementPostion } from "../lib/utils";

interface Props {
  activatorToolTip: ReactNode;
  text: string;
  className?: string;
}

const AppTooltip = (props: Props) => {
  const [postion, setPostion] = useState({ x: 0, y: 0 });

  const menuEl = document.body;

  const { activatorToolTip, text, className } = props;

  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const refRoot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) load();
  }, [open]);

  const load = () => {
    if (refRoot.current && ref.current) {
      let x = 0;
      let y = 0;

      let el = refRoot.current;
      const pos = getElementPostion(el);
      x = pos.x;
      y = pos.y;

      x -= ref.current.clientWidth;
      x += el.clientWidth;
      y -= el.offsetHeight + 8;

      setPostion({ x, y });
    }
  };

  const onMouseEnter = () => {
    setOpen(true);
  };

  const onMouseLeave = () => {
    setOpen(false);
  };

  return (
    <div ref={refRoot} className={className + " relative "} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {activatorToolTip}
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
