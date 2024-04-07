"use client";

import { Children, MouseEvent, ReactNode, useState } from "react";
import useOutsideClick from "@/app/lib/OutsideClick";
import {
  DropDownMenuItemType,
  DropDownMenuListType,
} from "@/app/lib/type/index";
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
    setOpen(!open);
  };

  const onBtnItemClick = (item: DropDownMenuItemType) => {
    setValue(item.value);
    if (!!onItemClick) onItemClick(item);
  };

  const childActivator = Children.only(activator) as React.ReactElement;

  return (
    <div ref={refRoot} className={className + " relative"}>
      <button
        className="flex flex-row items-center gap-x-1.5 h-full"
        onClick={onActivatorClick}
      >
        {childActivator}
        <AppIcon name="arrow-down" className="size-[18px] opacity-50" />
      </button>
      {open ? (
        <div className="absolute bg-white p-1 rounded-lg shadow-lg border border-slate-200 z-50 right-0 min-w-full top-10">
          {!!menu ? (
            <div>{menu}</div>
          ) : (
            <div>
              {!!items ? (
                <div className="flex flex-col gap-y-1 min-w-full">
                  {Object.keys(items).map((item, i) => (
                    <div
                      key={items[item].value}
                      onClick={() => onBtnItemClick(items[item])}
                      className="p-1 text-sm app-base-transform hover:bg-gray-2 rounded-md cursor-pointer"
                    >
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
