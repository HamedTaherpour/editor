import React, { useState } from "react";
import { RichUtils, EditorState } from "draft-js";
import AppDropDownMenu from "@/app/components/AppDropDownMenu";
import { TYPE_NODE_QUOTE } from "@/app/lib/editor/type";
import LinkConfirm from "@/app/components/TextEditor/component/LinkConfirm";
import AppIcon from "@/app/components/AppIcon";

const Toolbar = ({ editorState, setEditorState, onTransitionNodeListener }) => {
  const [showLinkConfirm, setShowLinkConfirm] = useState(false);
  const headingItems = {
    h1: {
      title: "عنوان بزرگ",
      value: "h1",
      style: "header-one",
      method: "block",
    },
    h2: {
      title: "عنوان متوسط",
      value: "h2",
      style: "header-two",
      method: "block",
    },
    h3: {
      title: "عنوان کوچک",
      value: "h3",
      style: "header-three",
      method: "block",
    },
    p: {
      title: "متن",
      value: "p",
      style: "unstyled",
      method: "block",
    },
  };
  const onBtnHeadingItemClick = (item) => {
    applyStyle(null, item.style, item.method);
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
          background: "bg-yellow-bg",
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
          background: "bg-orange-bg",
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
          background: "bg-brown-bg",
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
          background: "bg-gray-bg",
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
          background: "bg-dark-bg",
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
          background: "bg-red-bg",
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
          background: "bg-pink-bg",
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
          background: "bg-purple-bg",
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
          background: "bg-blue-bg",
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
          background: "bg-green-bg",
        },
      },
    },
  };
  const [colorSelected, setColorSelected] = useState("COLOR_DARK");

  const toolsBtnItems = [
    {
      label: "bold",
      style: "BOLD",
      icon: "text-bold",
      method: "inline",
    },
    {
      label: "underline",
      style: "UNDERLINE",
      icon: "underline",
      method: "inline",
    },
    {
      label: "italic",
      style: "ITALIC",
      icon: "italic",
      method: "inline",
    },
    {
      label: "strike-through",
      style: "STRIKETHROUGH",
      icon: "text-cross",
      method: "inline",
    },
  ];

  const onBtnColorClick = (e, item) => {
    const lastStyle = editorState.getCurrentInlineStyle().find((style) => {
      if (!!style) return style.includes("COLOR_");
    });

    let newEditorState = editorState;
    if (lastStyle && lastStyle !== item.option.style.color)
      newEditorState = applyStyle(e, lastStyle, item.method);

    applyStyle(e, item.option.style.color, item.method, newEditorState);

    setColorSelected(item.value);
  };

  const onBtnBackgroundClick = (e, item) => {
    const lastStyle = editorState.getCurrentInlineStyle().find((style) => {
      if (!!style) return style.includes("BACKGROUND_");
    });

    let newEditorState = editorState;
    if (lastStyle && lastStyle !== item.option.style.background)
      newEditorState = applyStyle(e, lastStyle, item.method);

    applyStyle(e, item.option.style.background, item.method, newEditorState);

    setColorSelected(item.value);
  };
  const onBtnLinkClick = (e) => {
    setShowLinkConfirm(!showLinkConfirm);
  };

  const applyStyle = (e, style, method, _editorState = editorState) => {
    if (!!e) e.preventDefault();
    if (method === "block") {
      const newEditorState = RichUtils.toggleBlockType(_editorState, style);
      setEditorState(newEditorState);
      return newEditorState;
    } else {
      const newEditorState = RichUtils.toggleInlineStyle(_editorState, style);
      setEditorState(newEditorState);
      return newEditorState;
    }
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

  const onSetLink = (link) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "LINK",
      "MUTABLE",
      { url: link } // link for testing only
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });

    setEditorState(
      RichUtils.toggleLink(
        newEditorState,
        newEditorState.getSelection(),
        entityKey
      )
    );

    setShowLinkConfirm(false);
  };

  return (
    <div className="absolute bottom-0 pb-3 z-50 ignore">
      <div className="rounded-lg shadow-md flex flex-row items-center h-11 border border-gray-2 bg-white">
        <AppDropDownMenu
          className="px-3 hover:bg-gray-2 app-base-transform h-full"
          onItemClick={onBtnHeadingItemClick}
          activator={
            <div className="w-20 flex">
              {Object.keys(headingItems).map((item) => (
                <span
                  key={headingItems[item].value}
                  className={
                    (!!isActive(
                      headingItems[item].style,
                      headingItems[item].method
                    )
                      ? ""
                      : "hidden") + " text-sm"
                  }
                >
                  {headingItems[item].title}
                </span>
              ))}
            </div>
          }
          items={headingItems}
        />
        <div className="border-x border-gray-2 h-full flex items-center">
          <AppDropDownMenu
            className="px-3 hover:bg-gray-2 app-base-transform h-full"
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
                      title={colorItems[item].title}
                      key={colorItems[item].value}
                      onClick={(e) => onBtnColorClick(e, colorItems[item])}
                      className={
                        (!!isActive(
                          colorItems[item].option.style.color,
                          item.method
                        )
                          ? "ring ring-gray-2"
                          : "") +
                        " " +
                        colorItems[item].option.class.color +
                        " size-6 rounded border border-gray-2 text-sm app-base-transform hover:bg-gray-2"
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
                      title={colorItems[item].title}
                      key={colorItems[item].value}
                      onClick={(e) => onBtnBackgroundClick(e, colorItems[item])}
                      className={
                        (!!isActive(
                          colorItems[item].option.style.background,
                          item.method
                        )
                          ? "ring ring-gray-2"
                          : "") +
                        " " +
                        colorItems[item].option.class.color +
                        " " +
                        colorItems[item].option.class.background +
                        " size-6 rounded border border-gray-2 text-sm app-base-transform hover:bg-gray-2"
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
                "px-1.5 h-full hover:bg-gray-2 app-base-transform " +
                (!!isActive(item.style, item.method) ? "bg-gray-2" : "")
              }
            >
              <AppIcon name={item.icon} className="size-5" />
            </button>
          ))}
          <button
            className="px-1.5 flex-none hover:bg-gray-2 app-base-transform h-full"
            onClick={() => onTransitionNodeListener(TYPE_NODE_QUOTE)}
          >
            <AppIcon name="quote-up" className="size-5" />
          </button>
        </div>
        <button
          onClick={onBtnLinkClick}
          className="flex flex-row gap-x-1 px-3 items-center border-x border-gray-2 hover:bg-gray-2 app-base-transform h-full"
        >
          <span className="text-sm">لینک</span>
          <AppIcon name="arrow-right-up" className="size-5 opacity-50" />
        </button>
        <button className="px-3 hover:bg-gray-2 app-base-transform h-full">
          <AppIcon name="more" className="size-5 opacity-50" />
        </button>
      </div>
      {showLinkConfirm ? <LinkConfirm onSetLink={onSetLink} /> : null}
    </div>
  );
};

export default Toolbar;
