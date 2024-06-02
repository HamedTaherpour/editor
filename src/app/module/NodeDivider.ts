import Node from "@/app/module/Node";
import { EditorOptions, INodeDivider  } from "@/app/type/index.type";
import { nanoid } from "@reduxjs/toolkit";

export default class NodeDivider extends Node<INodeDivider> {

  constructor(id: string, index: number, value: INodeDivider, dispatch: any, allOption?: EditorOptions) {
    super(id, index, value, dispatch, allOption);
    this.value = value;
    this.index = index;
    this.dispatch = dispatch;
  }

  clone() {
    const newId = nanoid();
    const newIndex = this.index + 1;
    const newValue: INodeDivider = {
      ...this.value,
      id: newId
    };
    const newNode = new NodeDivider(newId, newIndex, newValue, this.dispatch);
    return newNode;
  }

}