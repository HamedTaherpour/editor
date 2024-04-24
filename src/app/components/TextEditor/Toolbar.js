import React, { useState } from "react";
import AppDropDownMenu from "@/app/components/AppDropDownMenu";
import { toolsFontStylsItems, toolsColorStyleItems, toolsHeadingStyleItems, getLastStyleFontColor, getLastStyleBackgroundColor, setStyle, isStyleActive } from "@/app/lib/editor-text/hook/tools";
import AppIcon from "@/app/components/AppIcon";

const Toolbar = ({ editorState, setEditorState, onTransitionNodeListener, onBtnShowLinkConfirmClick }) => {
  const [colorSelected, setColorSelected] = useState("COLOR_DARK");

  const onBtnHeadingItemClick = (item) => {
    applyStyle(null, item.style, item.method);
  };

  const onBtnColorClick = (e, item) => {
    const lastStyle = getLastStyleFontColor(editorState);

    let newEditorState = editorState;
    if (lastStyle && lastStyle !== item.option.style.color) newEditorState = applyStyle(e, lastStyle, item.method);

    applyStyle(e, item.option.style.color, item.method, newEditorState);

    setColorSelected(item.value);
  };

  const onBtnBackgroundClick = (e, item) => {
    const lastStyle = getLastStyleBackgroundColor(editorState);

    let newEditorState = editorState;
    if (lastStyle && lastStyle !== item.option.style.background) newEditorState = applyStyle(e, lastStyle, item.method);

    applyStyle(e, item.option.style.background, item.method, newEditorState);

    setColorSelected(item.value);
  };

  const onBtnLinkClick = () => {
    onBtnShowLinkConfirmClick();
  };

  const onBtnSetLinkClick = (link) => {
    setShowLinkConfirm(false);
  };

  const onBtnToggleQuoteClick = () => {
    onTransitionNodeListener();
  };

  const applyStyle = (e, style, method, _editorState = editorState) => {
    if (!!e) e.preventDefault();
    const newEditorState = setStyle(_editorState, style, method);
    setEditorState(newEditorState);
    return newEditorState;
  };

  return (
    <div className="absolute bottom-0 pb-3 z-50 ignore text-gray-9">
      <div className="rounded-lg shadow-md flex flex-row items-center h-11 border border-gray-2 bg-white">
        <AppDropDownMenu
          className="px-3 hover:bg-gray-2 app-base-transform h-full"
          onItemClick={onBtnHeadingItemClick}
          activator={
            <div className="w-20 flex">
              {Object.keys(toolsHeadingStyleItems).map((item) => (
                <span key={toolsHeadingStyleItems[item].value} className={(!!isStyleActive(editorState, toolsHeadingStyleItems[item].style, toolsHeadingStyleItems[item].method) ? "" : "hidden") + " text-sm"}>
                  {toolsHeadingStyleItems[item].title}
                </span>
              ))}
            </div>
          }
          items={toolsHeadingStyleItems}
        />
        <div className="border-x border-gray-2 h-full flex items-center">
          <AppDropDownMenu
            className="px-3 hover:bg-gray-2 app-base-transform h-full"
            activator={<div>{Object.keys(toolsColorStyleItems).map((item, i) => (isStyleActive(editorState, toolsColorStyleItems[item].option.style.color, item.method) ? <div key={item} className={toolsColorStyleItems[item].option.class.background + " w-4 h-4 rounded"}></div> : null))}</div>}
            menu={
              <div className="p-2 flex flex-col w-40">
                <div className="grid grid-cols-5 gap-1">
                  {Object.keys(toolsColorStyleItems).map((item, i) => (
                    <button title={toolsColorStyleItems[item].title} key={toolsColorStyleItems[item].value} onClick={(e) => onBtnColorClick(e, toolsColorStyleItems[item])} className={(!!isStyleActive(editorState, toolsColorStyleItems[item].option.style.color, item.method) ? "ring ring-gray-2" : "") + " " + toolsColorStyleItems[item].option.class.color + " size-6 rounded border border-gray-2 text-sm app-base-transform hover:bg-gray-2"}>
                      A
                    </button>
                  ))}
                </div>
                <hr className="my-2" />
                <div className="grid grid-cols-5 gap-1">
                  {Object.keys(toolsColorStyleItems).map((item, i) => (
                    <button title={toolsColorStyleItems[item].title} key={toolsColorStyleItems[item].value} onClick={(e) => onBtnBackgroundClick(e, toolsColorStyleItems[item])} className={(!!isStyleActive(editorState, toolsColorStyleItems[item].option.style.background, item.method) ? "ring ring-gray-2" : "") + " " + toolsColorStyleItems[item].option.class.color + " " + toolsColorStyleItems[item].option.class.background + " size-6 rounded border border-gray-2 text-sm app-base-transform hover:bg-gray-2"}>
                      A
                    </button>
                  ))}
                </div>
              </div>
            }
          />
        </div>
        <div className="flex flex-row items-center w-44 px-3 h-full">
          {toolsFontStylsItems.map((item) => (
            <button key={item.style} onClick={(e) => applyStyle(e, item.style, item.method)} className={"px-1.5 h-full hover:bg-gray-2 app-base-transform " + (!!isStyleActive(editorState, item.style, item.method) ? "bg-gray-2" : "")}>
              <AppIcon name={item.icon} className="size-5" />
            </button>
          ))}
          <button className="px-1.5 flex-none hover:bg-gray-2 app-base-transform h-full" onClick={() => onBtnToggleQuoteClick()}>
            <AppIcon name="quote-up" className="size-5" />
          </button>
        </div>
        <button onClick={onBtnLinkClick} className="flex flex-row gap-x-1 px-3 items-center border-x border-gray-2 hover:bg-gray-2 app-base-transform h-full">
          <span className="text-sm">لینک</span>
          <AppIcon name="arrow-right-up" className="size-5 opacity-50" />
        </button>
        {/* <button className="px-3 hover:bg-gray-2 app-base-transform h-full">
          <AppIcon name="more" className="size-5 opacity-50" />
        </button> */}
      </div>
    </div>
  );
};

export default Toolbar;
