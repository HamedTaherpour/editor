import { INode, INodeText, DraftStyleOption, ImageEditorOptions, EditorOptions } from "@/app/type/index.type";
import { updateNode, deleteNode } from "@/app/store/editor-slice";
import { nanoid } from "@reduxjs/toolkit";

export default class Node<T extends INode = INode> {
  value: T;
  index: number;
  focusFun?: Function;
  dispatch: any;
  id: string;
  protected allOption?: EditorOptions;

  constructor(id: string, index: number, node: T, dispatch: any, allOption?: EditorOptions) {
    this.id = id;
    this.value = node;
    this.index = index;
    this.dispatch = dispatch;
    this.allOption = allOption;
  }

  setNewId(id: string) {
    this.id = id;
    this.value.id = id;
    // this.update()
  }

  delete() {
    this.dispatch(deleteNode(this.index));
  }

  update() {
    this.dispatch(updateNode({ index: this.index, node: this }));
  }

  setIndex(index: number) {
    this.index = index;
  }

  setFocus(focus: Function) {
    this.focusFun = focus;
    this.update();
  }

  focus() {
    if (this.focusFun) {
      this.focusFun();
    }
  }

  setStyle(style: DraftStyleOption, type: string) {
    if (type === "background") {
      if (this.value.backgroundColor === style.value) {
        this.value.backgroundColor = "";
      } else {
        this.value.backgroundColor = style.value;
      }
    } else if (type === "color") {
      if (this.value.fontColor === style.value) {
        this.value.fontColor = "";
      } else {
        this.value.fontColor = style.value;
      }
    }
    this.update();
  }

  isStyleActive(style: DraftStyleOption, type: string): boolean {
    if (type === "background") {
      return this.value.backgroundColor === style.value;
    } else if (type === "color") {
      return this.value.fontColor === style.value;
    }
    return false;
  };

  clone() {
    const newId = nanoid();
    const newIndex = this.index + 1;
    const newValue: INode = {
      ...this.value,
      id: newId
    };
    const newNode = new Node(newId, newIndex, newValue, this.dispatch, this.allOption);
    return newNode;
  }
}