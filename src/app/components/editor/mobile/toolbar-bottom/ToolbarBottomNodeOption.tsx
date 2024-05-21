import React, { useContext, MouseEvent } from "react";
import { OnNodeBehavior } from "@/app/lib/editor/type";
import { EditorContext } from "@/app/lib/editor/hook/context";
import { toolsColorStyleItems } from "@/app/lib/editor-text/hook/tools";
import { ToolsColorStyleItemTextEditor } from "@/app/lib/editor-text/type";

const ToolbarBottomNodeOption = () => {

  const onNodeBehavior = useContext<OnNodeBehavior | undefined>(EditorContext);

  const onBtnColorClick = (e: MouseEvent, item: ToolsColorStyleItemTextEditor) => {
    e.preventDefault();
    if (onNodeBehavior)
      onNodeBehavior.onBtnColorClick(item);
  };

  const onBtnBackgroundClick = (e: MouseEvent, item: ToolsColorStyleItemTextEditor) => {
    if (onNodeBehavior)
      onNodeBehavior.onBtnBackgroundClick(item);
  };

  const isTextStyleActive = (style: string, method: string): boolean => {
    if (onNodeBehavior)
      return onNodeBehavior.isTextStyleActive(style, method);
    else
      return false;
  };

  const currentBgColor = () => {
    let current;
    const colorName = Object.keys(toolsColorStyleItems).find((item) => isTextStyleActive(toolsColorStyleItems[item].option.style.background, toolsColorStyleItems[item].method));
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

  const currentColorColor = () => {
    let current;
    const colorName = Object.keys(toolsColorStyleItems).find((item) => isTextStyleActive(toolsColorStyleItems[item].option.style.color, toolsColorStyleItems[item].method));
    if (colorName) {
      current = toolsColorStyleItems[colorName];
    } else {
      current = toolsColorStyleItems["COLOR_DARK"];
    }

    return {
      clazz: current.option.class.color,
      title: current.title
    };
  };

  return (
    <div className="editor-toolbar-bottom-menu-node">
      sdasd
    </div>
  );
};

export default ToolbarBottomNodeOption;