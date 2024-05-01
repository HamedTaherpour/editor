'use client';

import React, { Children, ReactNode, useEffect, useRef, useState } from 'react';
import { cloneElement } from 'react';
import useOutsideClick from '../lib/helpers/OutsideClick';
import { createPortal } from 'react-dom';
import { getElementPostion } from '../lib/helpers';

interface Props {
  activator: ReactNode;
  menu: ReactNode;
  className?: string;
}

const AppMenu = (props: Props) => {
  const [postion, setPostion] = useState({ x: 0, y: 0 });

  const menuEl = document.body;

  const { activator, menu, className } = props;

  const [open, setOpen] = useState(false);

  const onClickOutsideClick = () => {
    setOpen(false);
  };
  const ref = useOutsideClick<HTMLDivElement>(onClickOutsideClick);
  const refRoot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) load();
  }, [open]);

  const onActivatorClick = () => {
    setOpen(!open);
  };

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
      y += el.offsetHeight;

      setPostion({ x, y });
    }
  };

  // const childActivator = Children.only(activator) as React.ReactElement;
  const childMenu = Children.only(menu) as React.ReactElement;

  return (
    <div ref={refRoot} className={className + ' menu-root'}>
      <div onClick={onActivatorClick}>{activator}</div>
      {open && menuEl
        ? createPortal(
            <div
              ref={ref}
              style={{
                top: postion.y,
                left: postion.x,
              }}
              onClick={() => setOpen(false)}
              className="portal"
            >
              {cloneElement(childMenu, {})}
            </div>,
            menuEl
          )
        : null}
    </div>
  );
};

export default AppMenu;
