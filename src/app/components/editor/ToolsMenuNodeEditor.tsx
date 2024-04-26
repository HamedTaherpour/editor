import AppIcon from "@/app/components/AppIcon";
import { toolsColorStyleItems } from "@/app/lib/editor-text/hook/tools";
import { ToolsColorStyleItemTextEditor } from "@/app/lib/editor-text/type";
import { Node } from "@/app/lib/editor/type";
import { useState } from "react";

interface Props {
  onBtnPastClick: Function;
  onBtnDuplicateClick: Function;
  onBtnDeleteClick: Function;
  onBtnSetStyleClick: Function;
  isClipboardExists: boolean;
  node: Node;
}

const ToolsMenuNodeEditor = (props: Props) => {
  const { node, onBtnSetStyleClick, onBtnDuplicateClick, onBtnDeleteClick, onBtnPastClick, isClipboardExists } = props;

  const [openColor, setOpenColor] = useState(false);

  const isStyleActive = (style: ToolsColorStyleItemTextEditor, type: string): boolean => {
    if (type === "background") {
      return node.backgroundColor === style.value;
    } else if (type === "color") {
      return node.fontColor === style.value;
    }
    return false;
  };

  const onBtnColorClick = (item: ToolsColorStyleItemTextEditor) => {
    onBtnSetStyleClick(item, "color");
  };

  const onBtnBackgroundClick = (item: ToolsColorStyleItemTextEditor) => {
    onBtnSetStyleClick(item, "background");
  };

  const onColorMouseEnter = () => {
    setOpenColor(true);
  };

  const onColorMouseLeave = () => {
    setOpenColor(false);
  };

  return (
    <div className="p-1 bg-white shadow-lg flex flex-col gap-y-1 rounded-lg">
      <button className="flex flex-row items-center rounded-md hover:bg-gray-2 gap-x-1 w-28 h-7 p-1 app-base-transform" onClick={() => onBtnDeleteClick()}>
        <AppIcon name="trash" className="size-4" />
        <span className="text-xs">حذف</span>
      </button>
      <button className="flex flex-row items-center rounded-md hover:bg-gray-2 gap-x-1 w-28 h-7 p-1 app-base-transform" onClick={() => onBtnDuplicateClick()}>
        <AppIcon name="copy" className="size-4" />
        <span className="text-xs">کپی</span>
      </button>
      <div className="flex flex-row items-center rounded-md hover:bg-gray-2 gap-x-1 w-28 h-7 p-1 relative" onMouseEnter={onColorMouseEnter} onMouseLeave={onColorMouseLeave}>
        <AppIcon name="paint-roller" className="size-4" />
        <span className="text-xs flex-1 text-right">رنگ</span>
        <AppIcon name="arrow-left" className="size-4" />
        {openColor ? (
          <div className="p-2 flex flex-col w-40 absolute bg-white shadow-lg rounded-lg -left-36">
            <div className="grid grid-cols-5 gap-1">
              {Object.keys(toolsColorStyleItems).map((item, i) => (
                <button key={toolsColorStyleItems[item].value} onClick={(e) => onBtnColorClick(toolsColorStyleItems[item])} className={(!!isStyleActive(toolsColorStyleItems[item], "color") ? "ring ring-gray-2" : "") + " " + toolsColorStyleItems[item].option.class.color + " size-6 rounded border border-gray-2 text-sm app-base-transform hover:bg-gray-2"}>
                  A
                </button>
              ))}
            </div>
            <hr className="my-2" />
            <div className="grid grid-cols-5 gap-1">
              {Object.keys(toolsColorStyleItems).map((item, i) => (
                <button title={toolsColorStyleItems[item].title} key={toolsColorStyleItems[item].value} onClick={(e) => onBtnBackgroundClick(toolsColorStyleItems[item])} className={(!!isStyleActive(toolsColorStyleItems[item], "background") ? "ring ring-gray-2" : "") + " " + toolsColorStyleItems[item].option.class.color + " " + toolsColorStyleItems[item].option.class.background + " size-6 rounded border border-gray-2 text-sm app-base-transform hover:bg-gray-2"}>
                  A
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ToolsMenuNodeEditor;
