import useEditor from "@/app/hook/useEditor";
import NodeEditor from "@/app/components/nodes/NodeEditor";
import { EditorOptions, JsonEditor, NodeType, OnJsonEditorUpdateListener, OnKeyboardHandling } from "@/app/type/index.type";
import React, { useEffect } from "react";

interface Props {
  value?: JsonEditor;
  options?: EditorOptions;
  listener: OnJsonEditorUpdateListener;
}

const NodeList = (props: Props) => {
  const { listener, options, value } = props;

  const { nodeList, getNodeText, getNode, setKeyboardHandling, selectDown, selectUp, addNewNodeText, setEditorOptions, getJsonEditor, setJsonEditor, currentNodeSelectedIndex } = useEditor();

  const onKeyboardHandling: OnKeyboardHandling = {
    onKeyUp(e: React.KeyboardEvent<HTMLElement>, index: number) {
      switch (e.key) {
        case "ArrowDown":
          selectDown(index);
          break;
        case "ArrowUp":
          selectUp(index);
          break;
        case "Enter":
          addNewNodeText(index);
          break;
        case "Backspace":
          const node = getNodeText(index);
          if (node.value.text.length <= 0 && index > 0) {
            selectUp(index);
            node.delete();
          }
          break;
      }
    }
  };

  useEffect(() => {
    if (value && value?.length > 0) {
      setJsonEditor(value);
    }
  }, [value]);

  useEffect(() => {
    const currentNode = getNode(currentNodeSelectedIndex);
    if (currentNode)
      currentNode.focus();
  }, [currentNodeSelectedIndex]);

  useEffect(() => {
    if (nodeList.length <= 0) {
      addNewNodeText();
    }
    setKeyboardHandling(onKeyboardHandling);

    listener.onUpdate(getJsonEditor());
  }, [nodeList]);

  useEffect(() => {
    setEditorOptions(options);
  }, [options]);

  const renderNodeList = nodeList.map(((item: NodeType, index: number) => <NodeEditor key={item.id} index={index} />));

  return (<div className={(nodeList.length <= 1 ? "empty-editor " : "") + " editor-app-root"}>
    <div id="node-list" className="node-list">
      {renderNodeList}
    </div>
  </div>);
};

export default NodeList;