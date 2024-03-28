import NodeEditorText from "@/app/components/editor/NodeEditorText";
import NodeEditorVoice from "@/app/components/editor/NodeEditorVoice";
import NodeEditorImage from "@/app/components/editor/NodeEditorImage";
import AppMenu from "@/app/components/AppMenu";

import {
  NodeText,
  NodeVoice,
  NodeImage,
  Node,
  OnUpdateNodeListener,
  OnPressEnterNodeListener,
  OnDeleteNodeListener,
  TYPE_NODE_TEXT,
  TYPE_NODE_VOICE,
  TYPE_NODE_IMAGE,
  OnRightClickNodeListener,
} from "@/app/lib/editor/type";

interface Props {
  index: number;
  node: Node;
  menuList: Array<any>;
  onUpdateNodeListener: OnUpdateNodeListener;
  onPressEnterNodeListener: OnPressEnterNodeListener;
  onDeleteNodeListener: OnDeleteNodeListener;
  onRightClickNodeListener: OnRightClickNodeListener;
}

const NodeEditor = (props: Props) => {
  const {
    index,
    node,
    menuList,
    onUpdateNodeListener,
    onPressEnterNodeListener,
    onDeleteNodeListener,
    onRightClickNodeListener,
  } = props;

  const myOnPressEnterNodeListener: OnPressEnterNodeListener = {
    onClick: () => {
      onPressEnterNodeListener.onClick(index);
    },
  };

  const onBtnDeleteClick = (node: Node) => {
    onDeleteNodeListener.onDelete(node);
  };

  return (
    <div className="flex flex-row items-start bg-red-300 ring-1 ring-red-600 group">
      <AppMenu
        className="app-base-transform h-6 opacity-0 group-hover:opacity-100"
        activator={
          <button className="h-6 w-6">
            <svg
              className="bg-green-600"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M18 12.998h-5v5a1 1 0 0 1-2 0v-5H6a1 1 0 0 1 0-2h5v-5a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2"
              />
            </svg>
          </button>
        }
        menu={
          <div className="flex flex-col gap-y-2 w-44">
            {menuList.map((item) => (
              <div
                key={item.title}
                onClick={() => item.action(index)}
                className="flex flex-row cursor-pointer"
              >
                <div className="grid place-items-center bg-slate-50 rounded p-2 flex-none ">
                  <img src={item.icon} />
                </div>
                <div className="flex flex-col mr-2">
                  <span className="text-xs font-bold">{item.title}</span>
                  <p className="text-[10px] text-gray-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        }
      />

      {node.type === TYPE_NODE_TEXT ? (
        <NodeEditorText
          node={node as NodeText}
          onRightClickNodeListener={onRightClickNodeListener}
          onPressEnterNodeListener={myOnPressEnterNodeListener}
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
          onRightClickNodeListener={onRightClickNodeListener}
          onPressEnterNodeListener={myOnPressEnterNodeListener}
          onUpdateNodeListener={onUpdateNodeListener}
        />
      ) : null}
    </div>
  );
};

export default NodeEditor;
