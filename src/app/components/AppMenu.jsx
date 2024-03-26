"use client";

import { useState } from "react";
import { cloneElement } from "react";
import useOutsideClick from "../lib/OutsideClick";

const AppMenu = ({ activator, children, className }) => {
  const [open, setOpen] = useState(false);

  const onClickOutsideClick = () => {
    setOpen(false);
  };
  const ref = useOutsideClick(onClickOutsideClick);

  const onActivatorClick = () => {
    setOpen(!open);
  };

  return (
    <div className={className + " relative"}>
      {cloneElement(activator, {
        onClick: onActivatorClick,
      })}
      {open ? (
        <div
          ref={ref}
          className="absolute bg-white p-4 rounded shadow-2xl z-50"
        >
          {cloneElement(children, {
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
