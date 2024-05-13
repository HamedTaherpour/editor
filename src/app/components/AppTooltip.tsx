'use client';

import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { getElementPosition } from '../lib/helpers';

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
      const pos = getElementPosition(el);
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
    <div ref={refRoot} className={className + ' tooltip'} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {activatorToolTip}
      {open && menuEl
        ? createPortal(
            <div
              ref={ref}
              style={{
                top: postion.y,
                left: postion.x,
              }}
              className="portal tooltip-card"
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
