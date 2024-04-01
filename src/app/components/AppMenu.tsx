"use client";

import { Children, ReactNode, useState } from "react";
import { cloneElement } from "react";
import useOutsideClick from "@/app/lib/OutsideClick";

interface Props {
  activator: ReactNode;
  menu: ReactNode;
  className: string;
}

const AppMenu = (props: Props) => {
  const { activator, menu, className } = props;

  const [open, setOpen] = useState(false);

  const onClickOutsideClick = () => {
    setOpen(false);
  };
  const ref = useOutsideClick<HTMLDivElement>(onClickOutsideClick);

  const onActivatorClick = () => {
    setOpen(!open);
  };

  const childActivator = Children.only(activator) as React.ReactElement;
  const childMenu = Children.only(menu) as React.ReactElement;

  return (
    <div className={className + " relative"}>
      {cloneElement(childActivator, {
        onClick: onActivatorClick,
      })}
      {open ? (
        <div
          ref={ref}
          className="absolute bg-white p-4 border border-slate-200 rounded-2xl shadow-xl2 z-50"
        >
          {cloneElement(childMenu, {
            onClick: () => {
              setOpen(false);
            },
          })}
        </div>
      ) : null}
    </div>
  );
};

export default AppMenu;
