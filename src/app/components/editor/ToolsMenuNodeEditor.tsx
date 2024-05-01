import AppIcon from '../AppIcon';
import { toolsColorStyleItems } from '../../lib/editor-text/hook/tools';
import { ToolsColorStyleItemTextEditor } from '../../lib/editor-text/type';
import { Node } from '../../lib/editor/type';
import React, { useState } from 'react';

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
    if (type === 'background') {
      return node.backgroundColor === style.value;
    } else if (type === 'color') {
      return node.fontColor === style.value;
    }
    return false;
  };

  const onBtnColorClick = (item: ToolsColorStyleItemTextEditor) => {
    onBtnSetStyleClick(item, 'color');
  };

  const onBtnBackgroundClick = (item: ToolsColorStyleItemTextEditor) => {
    onBtnSetStyleClick(item, 'background');
  };

  const onColorMouseEnter = () => {
    setOpenColor(true);
  };

  const onColorMouseLeave = () => {
    setOpenColor(false);
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
              {Object.keys(toolsColorStyleItems).map((item, i) => (
                <button key={toolsColorStyleItems[item].value} onClick={(e) => onBtnColorClick(toolsColorStyleItems[item])} className={(!!isStyleActive(toolsColorStyleItems[item], 'color') ? 'active' : '') + ' ' + toolsColorStyleItems[item].option.class.color}>
                  A
                </button>
              ))}
            </div>
            <hr />
            <div className="color-palette-section">
              {Object.keys(toolsColorStyleItems).map((item, i) => (
                <button title={toolsColorStyleItems[item].title} key={toolsColorStyleItems[item].value} onClick={(e) => onBtnBackgroundClick(toolsColorStyleItems[item])} className={(!!isStyleActive(toolsColorStyleItems[item], 'background') ? 'active' : '') + ' ' + toolsColorStyleItems[item].option.class.color + ' ' + toolsColorStyleItems[item].option.class.background}>
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
