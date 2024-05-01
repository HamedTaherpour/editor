import AppIcon from '../AppIcon';
import { EditorContext } from '../../lib/editor/hook/context';
import { OnNodeBehavior } from '../../lib/editor/type';
import React, { useContext } from 'react';

interface Props {
  index: number;
  onActionClick?: Function;
}

const MenuNodeEditor = (props: Props) => {
  const { index, onActionClick } = props;
  const onNodeBehavior = useContext<OnNodeBehavior | undefined>(EditorContext);
  let menuList = [];
  if (onNodeBehavior) menuList = onNodeBehavior.toolsMenu;

  return (
    <div className="menu-node-editor">
      <div className="menu-node-editor-root">
        {menuList.map((item) => (
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

export default MenuNodeEditor;
