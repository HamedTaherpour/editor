import React from "react";

import NodeReadonlyImage from "./NodeReadonlyImage";
import NodeReadonlyFile from "./NodeReadonlyFile";
import NodeReadonlyVoice from "./NodeReadonlyVoice";
import NodeReadonlyQuote from "./NodeReadonlyQuote";
import NodeReadonlyText from "./NodeReadonlyText";
import NodeReadonlyDivider from "./NodeReadonlyDivider";
import NodeReadonlyVideo from "./NodeReadonlyVideo";

import useEditor from "@/app/hook/useEditor";
import { TYPE_NODE_DIVIDER, TYPE_NODE_FILE, TYPE_NODE_IMAGE, TYPE_NODE_QUOTE, TYPE_NODE_TEXT, TYPE_NODE_VIDEO, TYPE_NODE_VOICE } from "@/app/type/index.type";
import { draftColorStyleOptions } from "@/app/helpers/constants";

interface Props {
  index: number;
}

const NodeReadonly = (props: Props) => {
  const { index } = props;
  const { getNode } = useEditor();
  const node = getNode(index);

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
      <div className={clazz + " node-editor-container"}>
        {node.value.name === TYPE_NODE_TEXT ? <NodeReadonlyText index={index} /> : null}
        {node.value.name === TYPE_NODE_QUOTE ? <NodeReadonlyQuote index={index} /> : null}
        {node.value.name === TYPE_NODE_VOICE ? <NodeReadonlyVoice index={index} /> : null}
        {node.value.name === TYPE_NODE_IMAGE ? <NodeReadonlyImage index={index} /> : null}
        {node.value.name === TYPE_NODE_DIVIDER ? <NodeReadonlyDivider /> : null}
        {node.value.name === TYPE_NODE_FILE ? <NodeReadonlyFile index={index} /> : null}
        {node.value.name === TYPE_NODE_VIDEO ? <NodeReadonlyVideo index={index} /> : null}
      </div>
    </div>
  );
};

export default NodeReadonly;
