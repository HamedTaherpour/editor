import React, { useContext, MouseEvent } from "react";
import { OnNodeBehavior } from "@/app/lib/editor/type";
import { EditorContext } from "@/app/lib/editor/hook/context";
import { toolsColorStyleItems } from "@/app/lib/editor-text/hook/tools";
import { ToolsColorStyleItemTextEditor } from "@/app/lib/editor-text/type";

const ToolbarBottomColor = () => {

  const onNodeBehavior = useContext<OnNodeBehavior | undefined>(EditorContext);

  const onBtnColorClick = (e: MouseEvent, item: ToolsColorStyleItemTextEditor) => {
    e.preventDefault();
    if (onNodeBehavior)
      onNodeBehavior.onBtnStyleClick(item);
  };

  const isStyleActive = (style: any, method: string) => {
    if (onNodeBehavior)
      return onNodeBehavior.isTextStyleActive(style, method);
    return false;
  };

  const currentBgColor = () => {
    let current;
    const colorName = Object.keys(toolsColorStyleItems).find((item) => isStyleActive(toolsColorStyleItems[item].option.style.background, toolsColorStyleItems[item].method));
    if (colorName) {
      current = toolsColorStyleItems[colorName];
    } else {
      current = toolsColorStyleItems["COLOR_DARK"];
    }

    return {
      clazz: current.option.class.background,
      title: current.title
    };
  };

  return (
    <div className="editor-toolbar-bottom-menu-node">
      <div className="editor-toolbar-bottom-menu-node-section">
        <div className="editor-toolbar-bottom-menu-node-heading">
          <span>آخرین رنگ‌ها</span>
        </div>
        <div className="editor-toolbar-bottom-menu-node-container">
          <button>
            <div className={"editor-toolbar-bottom-menu-node-box-color " + currentBgColor().clazz}>
              <span>A</span>
            </div>
            <span>پس‌زمینه {currentBgColor().title} </span>
          </button>
        </div>
      </div>
      <div className="editor-toolbar-bottom-menu-node-section">
        <div className="editor-toolbar-bottom-menu-node-heading">
          <span>رنگ اصلی</span>
        </div>
        <div className="editor-toolbar-bottom-menu-node-container">

          {Object.keys(toolsColorStyleItems).map((item) => (
            <button title={toolsColorStyleItems[item].title} key={toolsColorStyleItems[item].value} onClick={(e) => onBtnColorClick(e, toolsColorStyleItems[item])} className={(!!isStyleActive(toolsColorStyleItems[item].option.style.color, toolsColorStyleItems[item].method) ? "active" : "") + " bg "}>
              <div className="editor-toolbar-bottom-menu-node-box-color">
                <span className={toolsColorStyleItems[item].option.class.color}>A</span>
              </div>
              <span>{toolsColorStyleItems[item].title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolbarBottomColor;