import NodeEditorText from "@/app/components/editor/NodeEditorText";
import NodeEditorVoice from "@/app/components/editor/NodeEditorVoice";
import NodeEditorImage from "@/app/components/editor/NodeEditorImage";
import NodeEditorQuote from "@/app/components/editor/NodeEditorQuote";
import NodeEditorDivider from "@/app/components/editor/NodeEditorDivider";
import AppMenu from "@/app/components/AppMenu";
import AppIcon from "@/app/components/AppIcon";

import {
  NodeText,
  NodeVoice,
  NodeImage,
  NodeQuote,
  Node,
  TYPE_NODE_TEXT,
  TYPE_NODE_VOICE,
  TYPE_NODE_IMAGE,
  TYPE_NODE_QUOTE,
  TYPE_NODE_DIVIDER,
  NodeDivider,
} from "@/app/lib/editor/type";

interface Props {
  index: number;
  node: Node;
  menuList: Array<any>;
}

const NodeEditor = (props: Props) => {
  const { index, node, menuList } = props;

  return (
    <div
      className={node.clazz + " flex flex-row items-start justify-start group"}
    >
      <div className="flex flex-row app-base-transform opacity-0 group-hover:opacity-100 mr-0.5 h-full w-12">
        <AppMenu
          className="h-6"
          activator={
            <button className="size-6">
              <AppIcon name="add" className="size-6 fill-gray-5 " />
            </button>
          }
          menu={
            <div className="flex flex-col gap-y-2 w-72 h-96 overflow-auto">
              {menuList.map((item) => (
                <div
                  key={item.title}
                  onClick={() => item.action(index)}
                  className="flex flex-row cursor-pointer p-1 w-full"
                >
                  <div className="grid place-items-center bg-slate-50 rounded-lg border p-2 flex-none ">
                    <AppIcon name={item.icon} className="size-6" />
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

        <button className="size-6">
          <AppIcon name="grip" className="size-6 fill-gray-5 " />
        </button>
      </div>
      {node.type === TYPE_NODE_TEXT ? (
        <NodeEditorText node={node as NodeText} index={index} />
      ) : null}
      {node.type === TYPE_NODE_QUOTE ? (
        <NodeEditorQuote node={node as NodeQuote} index={index} />
      ) : null}

      {node.type === TYPE_NODE_VOICE ? (
        <NodeEditorVoice node={node as NodeVoice} index={index} />
      ) : null}
      {node.type === TYPE_NODE_IMAGE ? (
        <NodeEditorImage node={node as NodeImage} index={index} />
      ) : null}
      {node.type === TYPE_NODE_DIVIDER ? (
        <NodeEditorDivider node={node as NodeDivider} index={index} />
      ) : null}
    </div>
  );
};

export default NodeEditor;
