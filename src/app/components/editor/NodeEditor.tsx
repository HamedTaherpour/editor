import NodeEditorText from "@/app/components/editor/NodeEditorText";
import NodeEditorVoice from "@/app/components/editor/NodeEditorVoice";
import NodeEditorImage from "@/app/components/editor/NodeEditorImage";

import {
  NodeText,
  NodeVoice,
  NodeImage,
  Node,
  OnUpdateNodeListener,
  OnDeleteNodeListener,
  TYPE_NODE_TEXT,
  TYPE_NODE_VOICE,
  TYPE_NODE_IMAGE,
} from "@/app/lib/editor/type";

interface Props {
  node: Node;
  onUpdateNodeListener: OnUpdateNodeListener;
  onDeleteNodeListener: OnDeleteNodeListener;
}

const NodeEditor = (props: Props) => {
  const { node, onUpdateNodeListener, onDeleteNodeListener } = props;

  const onBtnDeleteClick = (node: Node) => {
    onDeleteNodeListener.onDelete(node);
  };

  return (
    <div className="flex flex-col border border-slate-300 rounded p-4">
      {node.type === TYPE_NODE_TEXT ? (
        <NodeEditorText
          node={node as NodeText}
          onUpdateNodeListener={onUpdateNodeListener}
        />
      ) : null}
      {node.type === TYPE_NODE_VOICE ? (
        <NodeEditorVoice
          node={node as NodeVoice}
          onUpdateNodeListener={onUpdateNodeListener}
        />
      ) : null}
      {node.type === TYPE_NODE_IMAGE ? (
        <NodeEditorImage
          node={node as NodeImage}
          onUpdateNodeListener={onUpdateNodeListener}
        />
      ) : null}
      <div className="flex flex-row mt-2">
        <button
          onClick={() => onBtnDeleteClick(node)}
          className="bg-rose-700 text-white rounded px-4 text-xs py-1 font-bold"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NodeEditor;
