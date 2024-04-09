import AppIcon from "@/app/components/AppIcon";
import { EditorContext } from "@/app/lib/editor/hook/context";
import { OnNodeBehavior } from "@/app/lib/editor/type";
import { useContext } from "react";

interface Props {
  index: number;
  onActionClick?: Function;
}

const ToolsMenuNodeEditor = (props: Props) => {
  const { index, onActionClick } = props;
  const onNodeBehavior = useContext<OnNodeBehavior | undefined>(EditorContext);
  let menuList = [];
  if (onNodeBehavior) menuList = onNodeBehavior.toolsMenu;

  return (
    <div className="flex flex-col gap-y-2 w-64 h-96 overflow-auto">
      {menuList.map((item) => (
        <div
          key={item.title}
          onClick={() => {
            if (onActionClick) onActionClick();
            item.action(index);
          }}
          className="flex flex-row cursor-pointer p-1 w-full hover:bg-gray-2 app-base-transform"
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
  );
};

export default ToolsMenuNodeEditor;
