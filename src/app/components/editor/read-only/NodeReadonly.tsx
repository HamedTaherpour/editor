import NodeReadonlyImage from '../../editor/read-only/NodeReadonlyImage';
import NodeReadonlyFile from '../../editor/read-only/NodeReadonlyFile';
import NodeReadonlyVoice from '../../editor/read-only/NodeReadonlyVoice';
import NodeReadonlyQuote from '../../editor/read-only/NodeReadonlyQuote';
import NodeReadonlyText from '../../editor/read-only/NodeReadonlyText';
import NodeReadonlyDivider from '../..//editor/read-only/NodeReadonlyDivider';
import NodeReadonlyVideo from '../..//editor/read-only/NodeReadonlyVideo';

import { NodeText, NodeVoice, NodeImage, NodeQuote, Node, TYPE_NODE_TEXT, TYPE_NODE_VOICE, TYPE_NODE_IMAGE, TYPE_NODE_QUOTE, TYPE_NODE_DIVIDER, TYPE_NODE_FILE, NodeDivider, OnNodeBehavior, NodeFile, NodeVideo, TYPE_NODE_VIDEO } from '../../../lib/editor/type';
import React, { useEffect } from 'react';
import { toolsColorStyleItems } from '../../../lib/editor-text/hook/tools';

interface Props {
  node: Node;
}

const NodeReadonly = (props: Props) => {
  const { node } = props;

  let clazz = '';
  if (node.backgroundColor) {
    clazz += toolsColorStyleItems[node.backgroundColor].option.class.background;
  }
  if (node.fontColor) {
    clazz += ' ';
    clazz += toolsColorStyleItems[node.fontColor].option.class.color;
  }

  return (
    <div className={node.clazz + ' node-editor-root'}>
      <div className={clazz + ' node-editor-container'}>
        {node.type === TYPE_NODE_TEXT ? <NodeReadonlyText node={node as NodeText} /> : null}
        {node.type === TYPE_NODE_QUOTE ? <NodeReadonlyQuote node={node as NodeQuote} /> : null}
        {node.type === TYPE_NODE_VOICE ? <NodeReadonlyVoice node={node as NodeVoice} /> : null}
        {node.type === TYPE_NODE_IMAGE ? <NodeReadonlyImage node={node as NodeImage} /> : null}
        {node.type === TYPE_NODE_DIVIDER ? <NodeReadonlyDivider /> : null}
        {node.type === TYPE_NODE_FILE ? <NodeReadonlyFile node={node as NodeFile} /> : null}
        {node.type === TYPE_NODE_VIDEO ? <NodeReadonlyVideo node={node as NodeVideo} /> : null}
      </div>
    </div>
  );
};

export default NodeReadonly;
