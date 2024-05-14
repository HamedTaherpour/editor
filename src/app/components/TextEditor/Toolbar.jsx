import React, { useContext } from "react";
import AppDropDownMenu from "../AppDropDownMenu";
import { toolsFontStylsItems, toolsColorStyleItems, toolsHeadingStyleItems, getLastStyleFontColor, getLastStyleBackgroundColor, setStyle, isStyleActive } from "../../lib/editor-text/hook/tools";
import AppIcon from "../AppIcon";
import { TYPE_NODE_QUOTE } from "../../lib/editor/type";
import { TextEditorContext } from "@/app/lib/editor-text/hook/context";

const Toolbar = ({ editorState, setEditorState, onTransitionNodeListener, onBtnShowLinkConfirmClick, node }) => {
  const onTextEditorBehavior = useContext(TextEditorContext);

  const onBtnHeadingItemClick = (item) => {
    if (onTextEditorBehavior)
      onTextEditorBehavior.onBtnHeadingItemClick(item);
  };

  const onBtnColorClick = (item) => {
    if (onTextEditorBehavior)
      onTextEditorBehavior.onBtnColorClick(item);
  };

  const onBtnBackgroundClick = (item) => {
    if (onTextEditorBehavior)
      onTextEditorBehavior.onBtnBackgroundClick(item);
  };

  const onBtnStyleClick = (item) => {
    if (onTextEditorBehavior)
      onTextEditorBehavior.onBtnStyleClick(item);
  };

  const onBtnLinkClick = () => {
    onBtnShowLinkConfirmClick();
  };

  const onBtnToggleQuoteClick = () => {
    onTransitionNodeListener();
  };

  const classNameDDMColor = () => {
    const colorName = Object.keys(toolsColorStyleItems).find((item) => isStyleActive(editorState, toolsColorStyleItems[item].option.style.color, item.method));
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
                <span key={toolsHeadingStyleItems[item].value} className={!!isStyleActive(editorState, toolsHeadingStyleItems[item].style, toolsHeadingStyleItems[item].method) ? "" : "draft-toolbar-heading-deactive"}>
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
                    <button title={toolsColorStyleItems[item].title} key={toolsColorStyleItems[item].value} onClick={(e) => onBtnColorClick(toolsColorStyleItems[item])} className={(!!isStyleActive(editorState, toolsColorStyleItems[item].option.style.color, item.method) ? "active" : "") + " " + toolsColorStyleItems[item].option.class.color}>
                      A
                    </button>
                  ))}
                </div>
                <hr />
                <div className="color-palette-section">
                  {Object.keys(toolsColorStyleItems).map((item, i) => (
                    <button title={toolsColorStyleItems[item].title} key={toolsColorStyleItems[item].value} onClick={(e) => onBtnBackgroundClick(toolsColorStyleItems[item])} className={(!!isStyleActive(editorState, toolsColorStyleItems[item].option.style.background, item.method) ? "active" : "") + " " + toolsColorStyleItems[item].option.class.color + " " + toolsColorStyleItems[item].option.class.background}>
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
            <button key={item.style} onClick={(e) => onBtnStyleClick(item)} className={"draft-toolbar-action " + (!!isStyleActive(editorState, item.style, item.method) ? "active" : "")}>
              <AppIcon name={item.icon} className="icon" />
            </button>
          ))}
          <button className={(node.type === TYPE_NODE_QUOTE ? "active" : "") + " draft-toolbar-action"} onClick={() => onBtnToggleQuoteClick()}>
            <AppIcon name="quote-up" className="icon" />
          </button>
        </div>
        <button onClick={onBtnLinkClick} className="draft-toolbar-action draft-toolbar-section">
          <span className="title">لینک</span>
          <AppIcon name="arrow-right-up" className="icon" />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
