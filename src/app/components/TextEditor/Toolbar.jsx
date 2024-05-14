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

  const onBtnColorClick = (e, item) => {
    const lastStyle = getLastStyleFontColor(editorState);
    let newEditorState = editorState;
    if (lastStyle && lastStyle !== item.option.style.color) applyStyle(e, lastStyle, item.method);
    applyStyle(e, item.option.style.color, item.method, newEditorState);
  };

  const onBtnBackgroundClick = (e, item) => {
    const lastStyle = getLastStyleBackgroundColor(editorState);

    let newEditorState = editorState;
    if (lastStyle && lastStyle !== item.option.style.background) applyStyle(e, lastStyle, item.method);

    applyStyle(e, item.option.style.background, item.method, newEditorState);
  };

  const onBtnLinkClick = () => {
    onBtnShowLinkConfirmClick();
  };

  const onBtnToggleQuoteClick = () => {
    onTransitionNodeListener();
  };

  const applyStyle = (e, style, method, _editorState = editorState) => {
    if (!!e) e.preventDefault();
    const newEditorState = setStyle(_editorState, style, method);
    setEditorState(newEditorState);
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
                    <button title={toolsColorStyleItems[item].title} key={toolsColorStyleItems[item].value} onClick={(e) => onBtnColorClick(e, toolsColorStyleItems[item])} className={(!!isStyleActive(editorState, toolsColorStyleItems[item].option.style.color, item.method) ? "active" : "") + " " + toolsColorStyleItems[item].option.class.color}>
                      A
                    </button>
                  ))}
                </div>
                <hr />
                <div className="color-palette-section">
                  {Object.keys(toolsColorStyleItems).map((item, i) => (
                    <button title={toolsColorStyleItems[item].title} key={toolsColorStyleItems[item].value} onClick={(e) => onBtnBackgroundClick(e, toolsColorStyleItems[item])} className={(!!isStyleActive(editorState, toolsColorStyleItems[item].option.style.background, item.method) ? "active" : "") + " " + toolsColorStyleItems[item].option.class.color + " " + toolsColorStyleItems[item].option.class.background}>
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
            <button key={item.style} onClick={(e) => applyStyle(e, item.style, item.method)} className={"draft-toolbar-action " + (!!isStyleActive(editorState, item.style, item.method) ? "active" : "")}>
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
