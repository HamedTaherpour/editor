import NodeEditorText from "./NodeEditorText";
import NodeEditorVoice from "./NodeEditorVoice";
import NodeEditorImage from "./NodeEditorImage";
import NodeEditorQuote from "./NodeEditorQuote";
import NodeEditorDivider from "./NodeEditorDivider";
import NodeEditorFile from "./NodeEditorFile";
import MenuNodeEditor from "./MenuNodeEditor";
import NodeEditorVideo from "./NodeEditorVideo";
import ToolsMenuNodeEditor from "./ToolsMenuNodeEditor";
import AppMenu from "../AppMenu";
import AppIcon from "../AppIcon";
import { EditorContext } from "../../lib/editor/hook/context";

import { NodeText, NodeVoice, NodeImage, NodeVideo, NodeQuote, Node, TYPE_NODE_TEXT, TYPE_NODE_VOICE, TYPE_NODE_IMAGE, TYPE_NODE_QUOTE, TYPE_NODE_VIDEO, TYPE_NODE_DIVIDER, TYPE_NODE_FILE, NodeDivider, OnNodeBehavior, NodeFile } from "../../lib/editor/type";
import AppTooltip from "../AppTooltip";
import React, { useContext } from "react";
import { ToolsColorStyleItemTextEditor } from "../../lib/editor-text/type";
import { toolsColorStyleItems } from "../../lib/editor-text/hook/tools";

interface Props {
  index: number;
  node: Node;
}

const NodeEditor = (props: Props) => {
  const { index, node } = props;
  const onNodeBehavior = useContext<OnNodeBehavior | undefined>(EditorContext);

  let clazz = "";
  if (node.backgroundColor) {
    clazz += toolsColorStyleItems[node.backgroundColor].option.class.background;
  }
  if (node.fontColor) {
    clazz += " ";
    clazz += toolsColorStyleItems[node.fontColor].option.class.color;
  }

  const onBtnDeleteClick = () => {
    if (onNodeBehavior) onNodeBehavior.onDelete(node);
  };

  const onBtnDuplicateClick = () => {
    if (onNodeBehavior) {
      onNodeBehavior.onDuplicate(index);
    }
  };

  const onBtnPastClick = () => {
    if (onNodeBehavior) onNodeBehavior.onPast(index);
  };

  const onBtnSetStyleClick = (item: ToolsColorStyleItemTextEditor, type: string) => {
    if (onNodeBehavior) onNodeBehavior.onStyle(item, type, index);
  };

  return (
    <div className={node.clazz + " node-editor-root"}>
      <div className="node-editor-actions">
        <AppMenu
          className="node-editor-menu"
          activator={
            <AppTooltip
              text="برای افزودن کلیک کنید"
              activatorToolTip={
                <button>
                  <AppIcon name="add" className="icon" />
                </button>
              }
            />
          }
          menu={<MenuNodeEditor index={index} />}
        />
        <AppMenu
          className="node-editor-menu"
          activator={
            <AppTooltip
              text="برای منو کلیک کنید"
              activatorToolTip={
                <button>
                  <AppIcon name="grip" className="icon" />
                </button>
              }
            />
          }
          menu={<ToolsMenuNodeEditor node={node} onBtnSetStyleClick={onBtnSetStyleClick} onBtnPastClick={onBtnPastClick} onBtnDuplicateClick={onBtnDuplicateClick} onBtnDeleteClick={onBtnDeleteClick} isClipboardExists={!!onNodeBehavior?.isClipboardExists()} />}
        />
      </div>
      <div className={clazz + " node-editor-container"}>
        {node.type === TYPE_NODE_TEXT ? <NodeEditorText node={node as NodeText} index={index} /> : null}
        {node.type === TYPE_NODE_QUOTE ? <NodeEditorQuote node={node as NodeQuote} index={index} /> : null}
        {node.type === TYPE_NODE_VOICE ? <NodeEditorVoice node={node as NodeVoice} index={index} /> : null}
        {node.type === TYPE_NODE_IMAGE ? <NodeEditorImage node={node as NodeImage} index={index} /> : null}
        {node.type === TYPE_NODE_DIVIDER ? <NodeEditorDivider node={node as NodeDivider} index={index} /> : null}
        {node.type === TYPE_NODE_FILE ? <NodeEditorFile node={node as NodeFile} index={index} /> : null}
        {node.type === TYPE_NODE_VIDEO ? <NodeEditorVideo node={node as NodeVideo} index={index} /> : null}
      </div>
    </div>
  );
};

export default NodeEditor;
