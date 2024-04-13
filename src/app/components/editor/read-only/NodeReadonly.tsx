import NodeReadonlyImage from "@/app/components/editor/read-only/NodeReadonlyImage";
import NodeReadonlyFile from "@/app/components/editor/read-only/NodeReadonlyFile";
import NodeReadonlyVoice from "@/app/components/editor/read-only/NodeReadonlyVoice";
import NodeReadonlyQuote from "@/app/components/editor/read-only/NodeReadonlyQuote";
import NodeReadonlyText from "@/app/components/editor/read-only/NodeReadonlyText";
import NodeReadonlyDivider from "@/app/components/editor/read-only/NodeReadonlyDivider";

import { NodeText, NodeVoice, NodeImage, NodeQuote, Node, TYPE_NODE_TEXT, TYPE_NODE_VOICE, TYPE_NODE_IMAGE, TYPE_NODE_QUOTE, TYPE_NODE_DIVIDER, TYPE_NODE_FILE, NodeDivider, OnNodeBehavior, NodeFile } from "@/app/lib/editor/type";
import { useEffect } from "react";
import { toolsColorStyleItems } from "@/app/lib/editor-text/hook/tools";

interface Props {
  node: Node;
}

const NodeReadonly = (props: Props) => {
  const { node } = props;

  let clazz = "";
  if (node.backgroundColor) {
    clazz += toolsColorStyleItems[node.backgroundColor].option.class.background;
  }
  if (node.fontColor) {
    clazz += " ";
    clazz += toolsColorStyleItems[node.fontColor].option.class.color;
  }

  useEffect(() => {});

  return (
    <div className={node.clazz + " flex flex-row items-start justify-start"}>
      <div className={clazz + " w-full"}>
        {node.type === TYPE_NODE_TEXT ? <NodeReadonlyText node={node as NodeText} /> : null}
        {node.type === TYPE_NODE_QUOTE ? <NodeReadonlyQuote node={node as NodeQuote} /> : null}
        {node.type === TYPE_NODE_VOICE ? <NodeReadonlyVoice node={node as NodeVoice} /> : null}
        {node.type === TYPE_NODE_IMAGE ? <NodeReadonlyImage node={node as NodeImage} /> : null}
        {node.type === TYPE_NODE_DIVIDER ? <NodeReadonlyDivider /> : null}
        {node.type === TYPE_NODE_FILE ? <NodeReadonlyFile node={node as NodeFile} /> : null}
      </div>
    </div>
  );
};

export default NodeReadonly;
