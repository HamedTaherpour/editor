"use client";

import { JsonEditor, NodeType } from "@/app/type/index.type";
import React, { useEffect } from "react";
import NodeReadonly from "@/app/components/nodes/NodeReadonly";
import useEditor from "@/app/hook/useEditor";

interface Props {
  value: JsonEditor;
}

const NodeReadonlyList = (props: Props) => {
  const { value } = props;
  const {nodeList,setJsonEditor} = useEditor()


  useEffect(() => {
    setJsonEditor(value,true)
  }, []);

  const renderNodeList = nodeList.map(((item: NodeType, index: number) => <NodeReadonly key={item.id} index={index} />));

  return <div>
    {renderNodeList}
  </div>;
};

export default NodeReadonlyList;