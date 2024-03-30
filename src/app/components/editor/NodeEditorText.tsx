import {
  NodeText,
  OnUpdateNodeListener,
  OnPressEnterNodeListener,
  OnRightClickNodeListener,
} from "@/app/lib/editor/type";
import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useRef,
  useState,
} from "react";
import AppDropDownMenu from "@/app/components/AppDropDownMenu";
import { DropDownMenuItemType, DropDownMenuListType } from "@/app/lib/type";
import HtmlBehaviour from "@/app/lib/editor/HtmlBehaviour";

interface Props {
  node: NodeText;
  onUpdateNodeListener: OnUpdateNodeListener;
  onPressEnterNodeListener: OnPressEnterNodeListener;
  onRightClickNodeListener: OnRightClickNodeListener;
}

const NodeEditorText = (props: Props) => {
  const {
    node,
    onUpdateNodeListener,
    onPressEnterNodeListener,
    onRightClickNodeListener,
  } = props;
  const ref = useRef<HTMLInputElement>(null);

  const [htmlStr, setHtmlStr] = useState<string>("");
  const htmlB = new HtmlBehaviour("");
  htmlB.setOnHtmlChangeListener({
    onChange(htmlStr) {
      console.log(htmlStr);
      setHtmlStr(htmlStr);
    },
  });

  const [showToolbar, setShowToolbar] = useState<boolean>(false);
  const [headingSelected, setHeadingSelected] = useState<string>("p");
  const headingItems: DropDownMenuListType = {
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
  const onBtnHeadingItemClick = (item: DropDownMenuItemType) => {
    setHeadingSelected(item.value);
  };

  const colorItems: DropDownMenuListType = {
    yellow: {
      title: "yellow",
      value: "yellow",
      option: {
        class: {
          text: "text-yellow",
          backgeound: "bg-yellow",
        },
      },
    },
    orange: {
      title: "orange",
      value: "orange",
      option: {
        class: {
          text: "text-orange",
          backgeound: "bg-orange",
        },
      },
    },
    brown: {
      title: "brown",
      value: "brown",
      option: {
        class: {
          text: "text-brown",
          backgeound: "bg-brown",
        },
      },
    },
    gray: {
      title: "gray",
      value: "gray",
      option: {
        class: {
          text: "text-gray",
          backgeound: "bg-gray",
        },
      },
    },
    dark: {
      title: "dark",
      value: "dark",
      option: {
        class: {
          text: "text-dark",
          backgeound: "bg-dark",
        },
      },
    },
    red: {
      title: "red",
      value: "red",
      option: {
        class: {
          text: "text-red",
          backgeound: "bg-red",
        },
      },
    },
    pink: {
      title: "pink",
      value: "pink",
      option: {
        class: {
          text: "text-pink",
          backgeound: "bg-pink",
        },
      },
    },
    purple: {
      title: "purple",
      value: "purple",
      option: {
        class: {
          text: "text-purple",
          backgeound: "bg-purple",
        },
      },
    },
    blue: {
      title: "blue",
      value: "blue",
      option: {
        class: {
          text: "text-blue",
          backgeound: "bg-blue",
        },
      },
    },
    green: {
      title: "green",
      value: "green",
      option: {
        class: {
          text: "text-green",
          backgeound: "bg-green",
        },
      },
    },
  };
  const [colorSelected, setColorSelected] = useState<string>("dark");
  const [colorFontSelected, setColorFontSelected] = useState<string>("dark");
  const [colorBackgroundSelected, setColorBackgroundSelected] =
    useState<string>("dark");

  const onBtnColorClick = (type: number, item: DropDownMenuItemType) => {
    if (type === 0) setColorFontSelected(item.value);
    else setColorBackgroundSelected(item.value);
    setColorSelected(item.value);
  };

  const onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onPressEnterNodeListener.onClick();
    else if (e.key === "Backspace") setShowToolbar(false);
  };

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    node.text = e.target.value;
    onUpdateNodeListener.onUpdate(node);
  };

  const onContextMenu = (e: MouseEvent<HTMLInputElement>) => {
    onRightClickNodeListener.onRightClick(node, e.clientX, e.clientY);
    e.preventDefault();
  };

  const onMouseUp = (mouseMoveEvent: any) => {
    setShowToolbar(true);
    // else setShowToolbar(false);
    // console.log(text);
  };

  const getTextHighlight = () => {};

  const onBtnBoldClick = () => {
    const text = ref.current?.value.toString() || "";
    const start = ref.current?.selectionStart || 0;
    const end = ref.current?.selectionEnd || text.length - 1;
    const textSelected = text.substring(start, end);

    let tag = `<span class="font-bold">${textSelected}</span>`;
    let htmlStr = !htmlB.isBaseTag(text) ? htmlB.getBaseTemplate(text) : text;
    htmlB.insertTag(tag, start, end);

    console.log(tag);
  };

  return (
    <div className="relative">
      {showToolbar ? (
        <div className="rounded-lg shadow-md flex flex-row items-center h-8 border border-slate-200 absolute bottom-10 bg-white">
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
          <div className=" border-x border-slate-200 h-full flex items-center">
            <AppDropDownMenu
              className="px-3"
              activator={
                <div
                  className={
                    colorItems[colorSelected].option.class.backgeound +
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
                        onClick={() => onBtnColorClick(0, colorItems[item])}
                        className={
                          colorItems[item].option.class.text +
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
                        onClick={() => onBtnColorClick(1, colorItems[item])}
                        className={
                          colorItems[item].option.class.text +
                          " " +
                          colorItems[item].option.class.backgeound +
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
          <div className="flex flex-row items-center gap-x-1.5 w-44 p-3">
            <button onClick={onBtnBoldClick} className="px-1">
              <img src="/editor/bold.svg" />
            </button>
            <button className="px-1">
              <img src="/editor/underline.svg" />
            </button>
            <button className="px-1">
              <img src="/editor/italic.svg" />
            </button>
            <button className="px-1">
              <img src="/editor/text-cross.svg" />
            </button>
            <button className="px-1">
              <img src="/editor/quote-up.svg" />
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
      ) : null}

      <input
        ref={ref}
        autoFocus
        onContextMenu={onContextMenu}
        onChange={onChangeText}
        onMouseUp={onMouseUp}
        onKeyUp={onKeyUp}
        className="bg-transparent outline-none resize-none placeholder:opacity-0 ring-0 focus:placeholder:opacity-100 bg-blue-100 w-full"
        placeholder="متن خود را وارد کنید . . ."
      />
      <div dangerouslySetInnerHTML={{ __html: htmlStr }} />
    </div>
  );
};

export default NodeEditorText;
