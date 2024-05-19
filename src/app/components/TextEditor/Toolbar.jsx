import React, { useContext } from "react";
import AppDropDownMenu from "../AppDropDownMenu";
import { toolsFontStylsItems, toolsColorStyleItems, toolsHeadingStyleItems, isStyleActive } from "../../lib/editor-text/hook/tools";
import AppIcon from "../AppIcon";
import { TYPE_NODE_QUOTE } from "../../lib/editor/type";
import { EditorContext } from "@/app/lib/editor/hook/context";


const Toolbar = ({ onTransitionNodeListener, onBtnShowLinkConfirmClick, node }) => {
  const onNodeBehavior = useContext(EditorContext);

  const onBtnHeadingItemClick = (item) => {
    if (onNodeBehavior)
      onNodeBehavior.onBtnHeadingItemClick(item);
  };

  const onBtnColorClick = (e, item) => {
    e.preventDefault();
    if (onNodeBehavior)
      onNodeBehavior.onBtnColorClick(item);
  };

  const onBtnBackgroundClick = (e, item) => {
    if (onNodeBehavior)
      onNodeBehavior.onBtnBackgroundClick(item);
  };

  const onBtnStyleClick = (e, item) => {
    e.preventDefault();
    if (onNodeBehavior)
      onNodeBehavior.onBtnStyleClick(item);
  };

  const isTextStyleActive = (style, method) => {
    if (onNodeBehavior)
      return onNodeBehavior.isTextStyleActive(style, method);
    else
      return false;
  };

  const onBtnLinkClick = () => {
    onBtnShowLinkConfirmClick();
  };

  const onBtnToggleQuoteClick = () => {
    onTransitionNodeListener();
  };

  const classNameDDMColor = () => {
    const colorName = Object.keys(toolsColorStyleItems).find((item) => isTextStyleActive(toolsColorStyleItems[item].option.style.color, toolsColorStyleItems[item].method));
    if (colorName) {
      return toolsColorStyleItems[colorName].option.class.bgColor;
    } else {
      return "et-bg-dark";
    }
  };

  return (
    <div className="ignore draft-toolbar">
      <div className="draft-toolbar-card">
        <AppDropDownMenu
          className="draft-toolbar-action"
          onItemClick={onBtnHeadingItemClick}
          activator={
            <div className="draft-toolbar-heading">
              {Object.keys(toolsHeadingStyleItems).map((item) => (
                <span key={toolsHeadingStyleItems[item].value} className={!!isTextStyleActive(toolsHeadingStyleItems[item].style, toolsHeadingStyleItems[item].method) ? "" : "draft-toolbar-heading-deactive"}>
                  {toolsHeadingStyleItems[item].title}
                </span>
              ))}
            </div>
          }
          items={toolsHeadingStyleItems}
        />
        <div className="draft-toolbar-section">
          <AppDropDownMenu
            className="draft-toolbar-action"
            activator={<div className={classNameDDMColor() + " draft-toolbar-color"}></div>}
            classNameDDMColor
            menu={
              <div className="color-palette">
                <div className="color-palette-section">
                  {Object.keys(toolsColorStyleItems).map((item, i) => (
                    <button title={toolsColorStyleItems[item].title} key={toolsColorStyleItems[item].value} onMouseDown={(e) => onBtnColorClick(e, toolsColorStyleItems[item])} className={(!!isTextStyleActive(toolsColorStyleItems[item].option.style.color, toolsColorStyleItems[item].method) ? "active" : "") + " " + toolsColorStyleItems[item].option.class.color}>
                      A
                    </button>
                  ))}
                </div>
                <hr />
                <div className="color-palette-section">
                  {Object.keys(toolsColorStyleItems).map((item, i) => (
                    <button title={toolsColorStyleItems[item].title} key={toolsColorStyleItems[item].value} onMouseDown={(e) => onBtnBackgroundClick(e, toolsColorStyleItems[item])} className={(!!isTextStyleActive(toolsColorStyleItems[item].option.style.background, toolsColorStyleItems[item].method) ? "active" : "") + " " + toolsColorStyleItems[item].option.class.color + " " + toolsColorStyleItems[item].option.class.background}>
                      A
                    </button>
                  ))}
                </div>
              </div>
            }
          />
        </div>
        <div className="draft-toolbar-section">
          {toolsFontStylsItems.map((item) => (
            <button key={item.style} onMouseDown={(e) => {
              onBtnStyleClick(e, item);
            }} className={"draft-toolbar-action " + (!!isTextStyleActive(item.style, item.method) ? "active" : "")}>
              <AppIcon name={item.icon} className="icon" />
            </button>
          ))}
          <button className={(node.type === TYPE_NODE_QUOTE ? "active" : "") + " draft-toolbar-action"} onMouseDown={() => onBtnToggleQuoteClick()}>
            <AppIcon name="quote-up" className="icon" />
          </button>
        </div>
        <button onMouseDown={onBtnLinkClick} className="draft-toolbar-action draft-toolbar-section">
          <span className="title">لینک</span>
          <AppIcon name="arrow-right-up" className="icon" />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
