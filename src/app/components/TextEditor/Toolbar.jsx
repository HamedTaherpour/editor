import React from "react";
import AppDropDownMenu from "../app/AppDropDownMenu";
import AppIcon from "../app/AppIcon";
import useEditor from "@/app/hook/useEditor";
import { draftColorStyleOptions, draftFontStyleOptions } from "@/app/helpers/constants";
import { draftHeadingStyleOptions } from "@/app/helpers/constants";
import { TYPE_NODE_QUOTE } from "@/app/type/index.type";


const Toolbar = ({ index, toggleTransitionToQuote }) => {
  const { getNodeText } = useEditor();
  const node = getNodeText(index);

  const onBtnHeadingItemClick = (item) => {
    node.setDraftHeading(item);
  };

  const onBtnColorClick = (e, item) => {
    e.preventDefault();
    node.setDraftFontColor(item);
  };

  const onBtnBackgroundClick = (e, item) => {
    node.setDraftBackgroundColor(item);
  };

  const onBtnStyleClick = (e, item) => {
    e.preventDefault();
    node.setDraftFontStyle(item);
  };

  const isTextStyleActive = (style, method) => {
    return node.isDraftStyleActive(style, method);
  };

  const onBtnLinkClick = () => {
    node.toggleDraftLink();
  };

  const onBtnToggleQuoteClick = () => {
    toggleTransitionToQuote()
  };

  const classNameDDMColor = () => {
    const colorName = Object.keys(draftColorStyleOptions).find((item) => isTextStyleActive(draftColorStyleOptions[item].option.style.color, draftColorStyleOptions[item].method));
    if (colorName) {
      return draftColorStyleOptions[colorName].option.class.bgColor;
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
              {Object.keys(draftHeadingStyleOptions).map((item) => (
                <span key={draftHeadingStyleOptions[item].value} className={!!isTextStyleActive(draftHeadingStyleOptions[item].style, draftHeadingStyleOptions[item].method) ? "" : "draft-toolbar-heading-deactive"}>
                  {draftHeadingStyleOptions[item].title}
                </span>
              ))}
            </div>
          }
          items={draftHeadingStyleOptions}
        />
        <div className="draft-toolbar-section">
          <AppDropDownMenu
            className="draft-toolbar-action"
            activator={<div className={classNameDDMColor() + " draft-toolbar-color"}></div>}
            classNameDDMColor
            menu={
              <div className="color-palette">
                <div className="color-palette-section">
                  {Object.keys(draftColorStyleOptions).map((item, i) => (
                    <button title={draftColorStyleOptions[item].title} key={draftColorStyleOptions[item].value} onMouseDown={(e) => onBtnColorClick(e, draftColorStyleOptions[item])} className={(!!isTextStyleActive(draftColorStyleOptions[item].option.style.color, draftColorStyleOptions[item].method) ? "active" : "") + " " + draftColorStyleOptions[item].option.class.color}>
                      A
                    </button>
                  ))}
                </div>
                <hr />
                <div className="color-palette-section">
                  {Object.keys(draftColorStyleOptions).map((item, i) => (
                    <button title={draftColorStyleOptions[item].title} key={draftColorStyleOptions[item].value} onMouseDown={(e) => onBtnBackgroundClick(e, draftColorStyleOptions[item])} className={(!!isTextStyleActive(draftColorStyleOptions[item].option.style.background, draftColorStyleOptions[item].method) ? "active" : "") + " " + draftColorStyleOptions[item].option.class.color + " " + draftColorStyleOptions[item].option.class.background}>
                      A
                    </button>
                  ))}
                </div>
              </div>
            }
          />
        </div>
        <div className="draft-toolbar-section">
          {Object.keys(draftFontStyleOptions).map((key) => (
            <button key={draftFontStyleOptions[key].style} onMouseDown={(e) => {
              onBtnStyleClick(e, draftFontStyleOptions[key]);
            }} className={"draft-toolbar-action " + (!!isTextStyleActive(draftFontStyleOptions[key].style, draftFontStyleOptions[key].method) ? "active" : "")}>
              <AppIcon name={draftFontStyleOptions[key].icon} className="icon" />
            </button>
          ))}
          <button className={(node.value.name === TYPE_NODE_QUOTE ? "active" : "") + " draft-toolbar-action"} onMouseDown={() => onBtnToggleQuoteClick()}>
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
