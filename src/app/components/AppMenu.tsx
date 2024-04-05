"use client";

import { Children, ReactNode, useRef, useState } from "react";
import { cloneElement } from "react";
import useOutsideClick from "@/app/lib/OutsideClick";
import { createPortal } from "react-dom";

interface Props {
  activator: ReactNode;
  menu: ReactNode;
  className: string;
}

const AppMenu = (props: Props) => {
  const [postion, setPostion] = useState({ x: 0, y: 0 });

  const menuEl = document.getElementById("menu");

  const { activator, menu, className } = props;

  const [open, setOpen] = useState(false);

  const onClickOutsideClick = () => {
    setOpen(false);
  };
  const ref = useOutsideClick<HTMLDivElement>(onClickOutsideClick);
  const refRoot = useRef<HTMLDivElement>(null);

  const onActivatorClick = () => {
    setOpen(!open);
  };

  const onLoad = () => {
    if (refRoot.current && ref.current) {
      setPostion({
        x:
          refRoot.current.getBoundingClientRect().left -
          ref.current.clientWidth +
          refRoot.current.clientHeight,
        y:
          refRoot.current.getBoundingClientRect().top +
          refRoot.current.clientHeight,
      });
    }
  };

  const childActivator = Children.only(activator) as React.ReactElement;
  const childMenu = Children.only(menu) as React.ReactElement;

  return (
    <div ref={refRoot} className={className + " relative"}>
      {cloneElement(childActivator, {
        onClick: onActivatorClick,
      })}
      {open && menuEl
        ? createPortal(
            <div
              ref={ref}
              style={{
                top: postion.y,
                left: postion.x,
              }}
              onLoad={onLoad}
              className="absolute bg-white p-4 border border-slate-200 rounded-2xl shadow-xl2 z-50"
            >
              {cloneElement(childMenu, {
                onClick: () => {
                  setOpen(false);
                },
              })}
            </div>,
            menuEl
          )
        : null}
    </div>
  );
};

export default AppMenu;
