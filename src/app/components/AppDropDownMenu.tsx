"use client";

import React, { Children, MouseEvent, ReactNode, useState } from "react";
import useOutsideClick from "../lib/helpers/OutsideClick";
import { DropDownMenuItemType, DropDownMenuListType } from "../lib/type";
import AppIcon from "./AppIcon";

interface Props {
  activator: ReactNode;
  menu?: ReactNode;
  items?: DropDownMenuListType;
  className?: string;
  onItemClick?: (item: DropDownMenuItemType) => void;
}

const AppDropDownMenu = (props: Props) => {
  const { activator, items, className, menu, onItemClick } = props;

  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>();
  const onClickOutsideClick = () => {
    setOpen(false);
  };
  const refRoot = useOutsideClick<HTMLDivElement>(onClickOutsideClick);

  const onActivatorClick = (e: MouseEvent) => {
    e.preventDefault();
    setOpen(!open);
  };

  const onBtnItemClick = (e: MouseEvent, item: DropDownMenuItemType) => {
    setValue(item.value);
    if (!!onItemClick) onItemClick(item);
  };

  const childActivator = Children.only(activator) as React.ReactElement;

  return (
    <div ref={refRoot} className={className + " drop-down-menu-root"}>
      <button className="drop-down-menu-activator" onMouseDown={onActivatorClick}>
        {childActivator}
        <AppIcon name="arrow-down" className="icon" />
      </button>
      {open ? (
        <div className="drop-down-menu-card">
          {!!menu ? (
            <div>{menu}</div>
          ) : (
            <div>
              {!!items ? (
                <div className="drop-down-menu-container">
                  {Object.keys(items).map((item, i) => (
                    <div key={items[item].value} onMouseDown={(e) => onBtnItemClick(e, items[item])} className="drop-down-menu-item">
                      {items[item].title}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default AppDropDownMenu;
