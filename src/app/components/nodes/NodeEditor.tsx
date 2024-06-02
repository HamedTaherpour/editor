import NodeEditorText from "./NodeEditorText";
import NodeEditorQuote from "./NodeEditorQuote";
import AddNodeMenu from "../AddNodeMenu";
import ToolsOption from "../ToolsOption";
import AppMenu from "../app/AppMenu";
import AppIcon from "../app/AppIcon";

import AppTooltip from "../app/AppTooltip";
import React, { useEffect } from "react";
import useEditor from "@/app/hook/useEditor";
import { TYPE_NODE_DIVIDER, TYPE_NODE_FILE, TYPE_NODE_IMAGE, TYPE_NODE_QUOTE, TYPE_NODE_TEXT, TYPE_NODE_VIDEO, TYPE_NODE_VOICE } from "@/app/type/index.type";
import NodeEditorImage from "@/app/components/nodes/NodeEditorImage";
import NodeEditorFile from "@/app/components/nodes/NodeEditorFile";
import NodeEditorVideo from "@/app/components/nodes/NodeEditorVideo";
import NodeEditorVoice from "@/app/components/nodes/NodeEditorVoice";
import NodeEditorDivider from "@/app/components/nodes/NodeEditorDivider";
import { draftColorStyleOptions } from "@/app/helpers/constants";

interface Props {
  index: number;
}

const NodeEditor = (props: Props) => {
  const { index } = props;
  const { getNode } = useEditor();
  const node = getNode(index);

  useEffect(() => {
    node.setIndex(index);
    node.update();
  }, [index]);

  let clazz = "";
  if (node.value.backgroundColor) {
    // @ts-ignore
    clazz += draftColorStyleOptions[node.value.backgroundColor].option.class.background;
  }
  if (node.value.fontColor) {
    clazz += " ";
    // @ts-ignore
    clazz += draftColorStyleOptions[node.value.fontColor].option.class.color;
  }

  return (
    <div className={node.value.clazz + " node-editor-root"}>
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
          menu={<AddNodeMenu index={index} />}
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
          menu={<ToolsOption index={index} />}
        />
      </div>
      <div className={clazz + " node-editor-container"}>
        {node.value.name === TYPE_NODE_TEXT ? <NodeEditorText index={index} /> : null}
        {node.value.name === TYPE_NODE_QUOTE ? <NodeEditorQuote index={index} /> : null}
        {node.value.name === TYPE_NODE_VOICE ? <NodeEditorVoice index={index} /> : null}
        {node.value.name === TYPE_NODE_IMAGE ? <NodeEditorImage index={index} /> : null}
        {node.value.name === TYPE_NODE_DIVIDER ? <NodeEditorDivider index={index} /> : null}
        {node.value.name === TYPE_NODE_FILE ? <NodeEditorFile index={index} /> : null}
        {node.value.name === TYPE_NODE_VIDEO ? <NodeEditorVideo index={index} /> : null}
      </div>
    </div>
  );
};

export default NodeEditor;
