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
import { ChangeEvent } from "react";

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
    <div className="flex flex-row items-start group">
      <div className="flex flex-row app-base-transform opacity-0 group-hover:opacity-100 mr-0.5">
        <AppMenu
          className="h-6"
          activator={
            <button className="h-6 w-6">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.7502 4.75146C12.7502 4.33725 12.4144 4.00146 12.0002 4.00146C11.586 4.00146 11.2502 4.33725 11.2502 4.75146V11.2505H4.75134C4.33713 11.2505 4.00134 11.5863 4.00134 12.0005C4.00134 12.4147 4.33713 12.7505 4.75134 12.7505H11.2502V19.249C11.2502 19.6632 11.586 19.999 12.0002 19.999C12.4144 19.999 12.7502 19.6632 12.7502 19.249V12.7505H19.2489C19.6631 12.7505 19.9989 12.4147 19.9989 12.0005C19.9989 11.5863 19.6631 11.2505 19.2489 11.2505H12.7502V4.75146Z"
                  fill="#C8C8C8"
                />
              </svg>
            </button>
          }
          menu={
            <div className="flex flex-col gap-y-2 w-44 h-80 overflow-auto">
              {menuList.map((item) => (
                <div
                  key={item.title}
                  onClick={() => item.action(index)}
                  className="flex flex-row cursor-pointer p-1"
                >
                  <div className="grid place-items-center bg-slate-50 rounded-lg border p-2 flex-none ">
                    <img src={item.icon} />
                  </div>
                  <div className="flex flex-col mr-3">
                    <span className="text-xs font-bold">{item.title}</span>
                    <p className="text-xs text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          }
        />

        <button className="h-6 w-6">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.5 8C10.3284 8 11 7.32843 11 6.5C11 5.67157 10.3284 5 9.5 5C8.67157 5 8 5.67157 8 6.5C8 7.32843 8.67157 8 9.5 8Z"
              fill="#C8C8C8"
            />
            <path
              d="M9.5 13.5C10.3284 13.5 11 12.8284 11 12C11 11.1716 10.3284 10.5 9.5 10.5C8.67157 10.5 8 11.1716 8 12C8 12.8284 8.67157 13.5 9.5 13.5Z"
              fill="#C8C8C8"
            />
            <path
              d="M11 17.5C11 18.3284 10.3284 19 9.5 19C8.67157 19 8 18.3284 8 17.5C8 16.6716 8.67157 16 9.5 16C10.3284 16 11 16.6716 11 17.5Z"
              fill="#C8C8C8"
            />
            <path
              d="M15.5 8C16.3284 8 17 7.32843 17 6.5C17 5.67157 16.3284 5 15.5 5C14.6716 5 14 5.67157 14 6.5C14 7.32843 14.6716 8 15.5 8Z"
              fill="#C8C8C8"
            />
            <path
              d="M17 12C17 12.8284 16.3284 13.5 15.5 13.5C14.6716 13.5 14 12.8284 14 12C14 11.1716 14.6716 10.5 15.5 10.5C16.3284 10.5 17 11.1716 17 12Z"
              fill="#C8C8C8"
            />
            <path
              d="M15.5 19C16.3284 19 17 18.3284 17 17.5C17 16.6716 16.3284 16 15.5 16C14.6716 16 14 16.6716 14 17.5C14 18.3284 14.6716 19 15.5 19Z"
              fill="#C8C8C8"
            />
          </svg>
        </button>
      </div>

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
