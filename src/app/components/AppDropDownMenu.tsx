"use client";

import { Children, MouseEvent, ReactNode, useState } from "react";
import useOutsideClick from "@/app/lib/OutsideClick";
import {
  DropDownMenuItemType,
  DropDownMenuListType,
} from "@/app/lib/type/index";

interface Props {
  activator: ReactNode;
  menu?: ReactNode;
  items?: DropDownMenuListType;
  className?: string;
  onItemClick?: (item: DropDownMenuItemType) => void;
}

const AppDropDownMenu = (props: Props) => {
  const { activator, items, className, menu, onItemClick } = props;

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>();

  const onClickOutsideClick = () => {
    setOpen(false);
  };
  const ref = useOutsideClick<HTMLDivElement>(onClickOutsideClick);

  const onActivatorClick = (e: MouseEvent) => {
    setOpen(!open);
  };

  const onBtnItemClick = (item: DropDownMenuItemType) => {
    setValue(item.value);
    if (!!onItemClick) onItemClick(item);
  };

  const childActivator = Children.only(activator) as React.ReactElement;

  return (
    <div className={className + " relative"}>
      <button
        className="flex flex-row items-center gap-x-1.5"
        onClick={onActivatorClick}
      >
        {childActivator}
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.32293 6.38394C3.5251 6.14807 3.88021 6.12075 4.11608 6.32293L9.00001 10.5092L13.8839 6.32293C14.1198 6.12075 14.4749 6.14807 14.6771 6.38394C14.8793 6.61981 14.852 6.97492 14.6161 7.17709L9.36608 11.6771C9.15543 11.8576 8.84459 11.8576 8.63394 11.6771L3.38394 7.17709C3.14807 6.97492 3.12075 6.61981 3.32293 6.38394Z"
            fill="#D6D6D6"
          />
        </svg>
      </button>
      {open ? (
        <div
          ref={ref}
          className="absolute bg-white p-1 rounded-lg shadow-lg border border-slate-200 z-50 right-0 min-w-full top-7"
        >
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
                      className="p-1 text-sm app-base-transform hover:bg-slate-200 rounded-md cursor-pointer"
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
