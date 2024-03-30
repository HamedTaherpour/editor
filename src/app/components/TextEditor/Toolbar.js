import React, { useState } from "react";
import { RichUtils } from "draft-js";
import AppDropDownMenu from "@/app/components/AppDropDownMenu";

const Toolbar = ({ editorState, setEditorState }) => {
  const [headingSelected, setHeadingSelected] = useState("p");
  const headingItems = {
    h1: {
      title: "عنوان 1",
      value: "h1",
    },
    h2: {
      title: "عنوان 2",
      value: "h2",
    },
    h3: {
      title: "عنوان 3",
      value: "h3",
    },
    p: {
      title: "توضیحات",
      value: "p",
    },
  };
  const onBtnHeadingItemClick = (item) => {
    setHeadingSelected(item.value);
  };

  const colorItems = {
    COLOR_YELLOW: {
      title: "yellow",
      value: "COLOR_YELLOW",
      method: "inline",
      option: {
        style: {
          color: "COLOR_YELLOW",
          background: "BACKGROUND_YELLOW",
        },
        class: {
          color: "text-yellow",
          background: "bg-yellow",
        },
      },
    },
    COLOR_ORAMGE: {
      title: "orange",
      value: "COLOR_ORAMGE",
      method: "inline",
      option: {
        style: {
          color: "COLOR_ORAMGE",
          background: "BACKGROUND_ORAMGE",
        },
        class: {
          color: "text-orange",
          background: "bg-orange",
        },
      },
    },
    COLOR_BROWN: {
      title: "brown",
      value: "COLOR_BROWN",
      method: "inline",
      option: {
        style: {
          color: "COLOR_BROWN",
          background: "BACKGROUND_BROWN",
        },
        class: {
          color: "text-brown",
          background: "bg-brown",
        },
      },
    },
    COLOR_GRAY: {
      title: "gray",
      value: "COLOR_GRAY",
      method: "inline",
      option: {
        style: {
          color: "COLOR_GRAY",
          background: "BACKGROUND_GRAY",
        },
        class: {
          color: "text-gray",
          background: "bg-gray",
        },
      },
    },
    COLOR_DARK: {
      title: "dark",
      value: "COLOR_DARK",
      method: "inline",
      option: {
        style: {
          color: "COLOR_DARK",
          background: "BACKGROUND_DARK",
        },
        class: {
          color: "text-dark",
          background: "bg-dark",
        },
      },
    },
    COLOR_RED: {
      title: "red",
      value: "COLOR_RED",
      method: "inline",
      option: {
        style: {
          color: "COLOR_RED",
          background: "BACKGROUND_RED",
        },
        class: {
          color: "text-red",
          background: "bg-red",
        },
      },
    },
    COLOR_PINK: {
      title: "pink",
      value: "COLOR_PINK",
      method: "inline",
      option: {
        style: {
          color: "COLOR_PINK",
          background: "BACKGROUND_PINK",
        },
        class: {
          color: "text-pink",
          background: "bg-pink",
        },
      },
    },
    COLOR_PURPLE: {
      title: "purple",
      value: "COLOR_PURPLE",
      method: "inline",
      option: {
        style: {
          color: "COLOR_PURPLE",
          background: "BACKGROUND_PURPLE",
        },
        class: {
          color: "text-purple",
          background: "bg-purple",
        },
      },
    },
    COLOR_BLUE: {
      title: "blue",
      value: "COLOR_BLUE",
      method: "inline",
      option: {
        style: {
          color: "COLOR_BLUE",
          background: "BACKGROUND_BLUE",
        },
        class: {
          color: "text-blue",
          background: "bg-blue",
        },
      },
    },
    COLOR_GREEN: {
      title: "green",
      value: "COLOR_GREEN",
      method: "inline",
      option: {
        style: "COLOR_GREEN",
        style: {
          color: "COLOR_GREEN",
          background: "BACKGROUND_GREEN",
        },
        class: {
          color: "text-green",
          background: "bg-green",
        },
      },
    },
  };
  const [colorSelected, setColorSelected] = useState("COLOR_DARK");
  const [colorFontSelected, setColorFontSelected] = useState("COLOR_DARK");
  const [colorBackgroundSelected, setColorBackgroundSelected] =
    useState("dark");

  const toolsBtnItems = [
    {
      label: "bold",
      style: "BOLD",
      icon: "/editor/bold.svg",
      method: "inline",
    },
    {
      label: "underline",
      style: "UNDERLINE",
      icon: "/editor/underline.svg",
      method: "inline",
    },
    {
      label: "italic",
      style: "ITALIC",
      icon: "/editor/italic.svg",
      method: "inline",
    },
    {
      label: "strike-through",
      style: "STRIKETHROUGH",
      icon: "/editor/text-cross.svg",
      method: "inline",
    },
  ];

  const onBtnColorClick = (e, type, item) => {
    if (type === 0) {
      setColorFontSelected(item.value);
      applyStyle(e, item.option.style.color, item.method);
    } else {
      setColorBackgroundSelected(item.value);
      applyStyle(e, item.option.style.background, item.method);
    }
    setColorSelected(item.value);
  };

  const applyStyle = (e, style, method) => {
    e.preventDefault();
    console.log(style, method);
    method === "block"
      ? setEditorState(RichUtils.toggleBlockType(editorState, style))
      : setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const isActive = (style, method) => {
    if (method === "block") {
      const selection = editorState.getSelection();
      const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();
      return blockType === style;
    } else {
      const currentStyle = editorState.getCurrentInlineStyle();
      return currentStyle.has(style);
    }
  };

  return (
    <div className="absolute bottom-6 pb-3">
      <div
        className="rounded-lg shadow-md flex flex-row items-center h-11 border border-slate-200 bg-white"
        onMouseDown={(e) => e.preventDefault()}
      >
        <AppDropDownMenu
          className="px-3"
          onItemClick={onBtnHeadingItemClick}
          activator={
            <span className="text-sm w-14 text-right">
              {headingItems[headingSelected].title}
            </span>
          }
          items={headingItems}
        />
        <div className="border-x border-slate-200 h-full flex items-center">
          <AppDropDownMenu
            className="px-3"
            activator={
              <div
                className={
                  colorItems[colorSelected].option.class.background +
                  " w-4 h-4 rounded"
                }
              ></div>
            }
            menu={
              <div className="p-2 flex flex-col w-40">
                <div className="grid grid-cols-5 gap-1">
                  {Object.keys(colorItems).map((item, i) => (
                    <button
                      key={colorItems[item].value}
                      onClick={(e) => onBtnColorClick(e, 0, colorItems[item])}
                      className={
                        (!!isActive(
                          colorItems[item].option.style.color,
                          item.method
                        )
                          ? "ring ring-slate-200"
                          : "") +
                        " " +
                        colorItems[item].option.class.color +
                        " w-6 h-6 rounded border border-slate-200 text-sm app-base-transform hover:bg-slate-200"
                      }
                    >
                      A
                    </button>
                  ))}
                </div>
                <hr className="my-2" />
                <div className="grid grid-cols-5 gap-1">
                  {Object.keys(colorItems).map((item, i) => (
                    <button
                      key={colorItems[item].value}
                      onClick={(e) => onBtnColorClick(e, 1, colorItems[item])}
                      className={
                        (!!isActive(
                          colorItems[item].option.style.color,
                          item.method
                        )
                          ? "ring ring-slate-200"
                          : "") +
                        " " +
                        colorItems[item].option.class.color +
                        " " +
                        colorItems[item].option.class.background +
                        " w-6 h-6 rounded border border-slate-200 text-sm app-base-transform hover:bg-slate-200 bg-opacity-10"
                      }
                    >
                      A
                    </button>
                  ))}
                </div>
              </div>
            }
          />
        </div>
        <div className="flex flex-row items-center w-44 px-3 h-full">
          {toolsBtnItems.map((item) => (
            <button
              key={item.style}
              onClick={(e) => applyStyle(e, item.style, item.method)}
              className={
                "px-1.5 h-full " +
                (!!isActive(item.style, item.method) ? "bg-slate-100" : "")
              }
            >
              <img src={item.icon} className="w-5 h-5" />
            </button>
          ))}
          <button className="px-1.5 flex-none">
            <img src="/editor/quote-up.svg" className="w-5 h-5" />
          </button>
        </div>
        <button className="flex flex-row gap-x-1 px-3 items-center border-x border-slate-200">
          <span className="text-sm">لینک</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5 5.625C7.15482 5.625 6.875 5.34518 6.875 5C6.875 4.65482 7.15482 4.375 7.5 4.375H15C15.3452 4.375 15.625 4.65482 15.625 5V12.5C15.625 12.8452 15.3452 13.125 15 13.125C14.6548 13.125 14.375 12.8452 14.375 12.5V6.50888L5.44194 15.4419C5.19786 15.686 4.80214 15.686 4.55806 15.4419C4.31398 15.1979 4.31398 14.8021 4.55806 14.5581L13.4911 5.625H7.5Z"
              fill="#ACACAC"
            />
          </svg>
        </button>
        <button className="px-3">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.5">
              <path
                d="M4.16663 8.75C3.47913 8.75 2.91663 9.3125 2.91663 10C2.91663 10.6875 3.47913 11.25 4.16663 11.25C4.85413 11.25 5.41663 10.6875 5.41663 10C5.41663 9.3125 4.85413 8.75 4.16663 8.75Z"
                fill="#ACACAC"
              />
              <path
                d="M15.8333 8.75C15.1458 8.75 14.5833 9.3125 14.5833 10C14.5833 10.6875 15.1458 11.25 15.8333 11.25C16.5208 11.25 17.0833 10.6875 17.0833 10C17.0833 9.3125 16.5208 8.75 15.8333 8.75Z"
                fill="#ACACAC"
              />
              <path
                d="M9.99996 8.75C9.31246 8.75 8.74996 9.3125 8.74996 10C8.74996 10.6875 9.31246 11.25 9.99996 11.25C10.6875 11.25 11.25 10.6875 11.25 10C11.25 9.3125 10.6875 8.75 9.99996 8.75Z"
                fill="#ACACAC"
              />
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
