import NodeEditorText from "@/app/components/editor/NodeEditorText";
import NodeEditorVoice from "@/app/components/editor/NodeEditorVoice";
import NodeEditorImage from "@/app/components/editor/NodeEditorImage";
import NodeEditorQuote from "@/app/components/editor/NodeEditorQuote";
import NodeEditorDivider from "@/app/components/editor/NodeEditorDivider";
import NodeEditorFile from "@/app/components/editor/NodeEditorFile";
import MenuNodeEditor from "@/app/components/editor/MenuNodeEditor";
import ToolsMenuNodeEditor from "@/app/components/editor/ToolsMenuNodeEditor";
import AppMenu from "@/app/components/AppMenu";
import AppIcon from "@/app/components/AppIcon";
import { EditorContext } from "@/app/lib/editor/hook/context";

import { NodeText, NodeVoice, NodeImage, NodeQuote, Node, TYPE_NODE_TEXT, TYPE_NODE_VOICE, TYPE_NODE_IMAGE, TYPE_NODE_QUOTE, TYPE_NODE_DIVIDER, TYPE_NODE_FILE, NodeDivider, OnNodeBehavior, NodeFile, TYPE_NODE_VIDEO, NodeVideo } from "@/app/lib/editor/type";
import AppTooltip from "../AppTooltip";
import { useContext } from "react";
import { ToolsColorStyleItemTextEditor } from "@/app/lib/editor-text/type";
import { toolsColorStyleItems } from "@/app/lib/editor-text/hook/tools";
import NodeEditorVideo from "./NodeEditorVideo";

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
    <div className={node.clazz + " flex flex-row items-start justify-start group node-row"}>
      <div className="flex flex-row app-base-transform opacity-0 group-hover:opacity-100 mr-0.5 h-full w-12">
        <AppMenu
          className="h-6"
          activator={
            <AppTooltip
              text="برای افزودن کلیک کنید"
              activatorToolTip={
                <button className="size-6 rounded-lg hover:bg-gray-2">
                  <AppIcon name="add" className="size-6 fill-gray-6" />
                </button>
              }
            />
          }
          menu={
            <div className="bg-white p-2 border border-slate-200 rounded-lg shadow-xl2 ">
              <MenuNodeEditor index={index} />
            </div>
          }
        />
        <AppMenu
          className="h-6"
          activator={
            <AppTooltip
              text="برای منو کلیک کنید"
              activatorToolTip={
                <button className="size-6 rounded-lg hover:bg-gray-2">
                  <AppIcon name="grip" className="size-6 fill-gray-6" />
                </button>
              }
            />
          }
          menu={<ToolsMenuNodeEditor node={node} onBtnSetStyleClick={onBtnSetStyleClick} onBtnPastClick={onBtnPastClick} onBtnDuplicateClick={onBtnDuplicateClick} onBtnDeleteClick={onBtnDeleteClick} isClipboardExists={!!onNodeBehavior?.isClipboardExists()} />}
        />
      </div>
      <div className={clazz + " et-wrapper  rounded"}>
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
