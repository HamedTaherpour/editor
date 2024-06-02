import AppIcon from "./app/AppIcon";
import React, { useState } from "react";
import useEditor from "@/app/hook/useEditor";
import { draftColorStyleOptions } from "@/app/helpers/constants";
import { DraftStyleOption } from "@/app/type/index.type";

interface Props {
  index: number;
}

const ToolsOption = (props: Props) => {
  const { index } = props;
  const { getNode, duplicate } = useEditor();
  const node = getNode(index);

  const [openColor, setOpenColor] = useState(false);

  const isStyleActive = (style: DraftStyleOption, type: string): boolean => {
    return node.isStyleActive(style, type);
  };

  const onBtnColorClick = (item: DraftStyleOption) => {
    node.setStyle(item, "color");
  };

  const onBtnBackgroundClick = (item: DraftStyleOption) => {
    node.setStyle(item, "background");
  };

  const onColorMouseEnter = () => {
    setOpenColor(true);
  };

  const onColorMouseLeave = () => {
    setOpenColor(false);
  };

  const onBtnDeleteClick = () => {
    node.delete();
  };

  const onBtnDuplicateClick = () => {
    duplicate(node);
  };

  return (
    <div className="tools-menu-node-editor">
      <button className="tools-menu-node-editor-row" onClick={() => onBtnDeleteClick()}>
        <AppIcon name="trash" className="icon" />
        <span className="title">حذف</span>
      </button>
      <button className="tools-menu-node-editor-row" onClick={() => onBtnDuplicateClick()}>
        <AppIcon name="copy" className="icon" />
        <span className="title">کپی</span>
      </button>
      <div className="tools-menu-node-editor-row-option" onMouseEnter={onColorMouseEnter} onMouseLeave={onColorMouseLeave}>
        <AppIcon name="paint-roller" className="icon" />
        <span className="title">رنگ</span>
        <AppIcon name="arrow-left" className="icon" />
        {openColor ? (
          <div className="color-palette">
            <div className="color-palette-section">
              {Object.keys(draftColorStyleOptions).map((item, i) => (
                // @ts-ignore
                <button key={draftColorStyleOptions[item].value} onClick={(e) => onBtnColorClick(draftColorStyleOptions[item])} className={(!!isStyleActive(draftColorStyleOptions[item], "color") ? "active" : "") + " " + draftColorStyleOptions[item].option.class.color}>
                  A
                </button>
              ))}
            </div>
            <hr />
            <div className="color-palette-section">
              {Object.keys(draftColorStyleOptions).map((item, i) => (
                // @ts-ignore
                <button title={draftColorStyleOptions[item].title} key={draftColorStyleOptions[item].value} onClick={(e) => onBtnBackgroundClick(draftColorStyleOptions[item])} className={(!!isStyleActive(draftColorStyleOptions[item], "background") ? "active" : "") + " " + draftColorStyleOptions[item].option.class.color + " " + draftColorStyleOptions[item].option.class.background}>
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

export default ToolsOption;
