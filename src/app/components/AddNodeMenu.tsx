import AppIcon from "./app/AppIcon";
import React, { useContext } from "react";
import useEditor from "@/app/hook/useEditor";

interface Props {
  index: number;
  onActionClick?: Function;
}

const AddNodeMenu = (props: Props) => {
  const { index, onActionClick } = props;
  const { getNodeListMenu } = useEditor();

  return (
    <div className="menu-node-editor">
      <div className="menu-node-editor-root">
        {getNodeListMenu().map((item) => (
          <div
            key={item.title}
            onClick={() => {
              if (onActionClick) onActionClick();
              item.action(index);
            }}
            className="menu-node-editor-item"
          >
            <div className="menu-node-editor-icon-box">
              <AppIcon name={item.icon} className="icon" />
            </div>
            <div className="menu-node-editor-content">
              <span>{item.title}</span>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddNodeMenu;
