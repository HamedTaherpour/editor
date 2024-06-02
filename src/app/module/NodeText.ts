import { INodeText, OnToggleLinkConfirmListener, DraftStyleOption, TYPE_NODE_TEXT, TYPE_NODE_QUOTE } from "@/app/type/index.type";
import { EditorState } from "draft-js";
import useDraft from "@/app/hook/useDraft";
import Node from "@/app/module/Node";
import { nanoid } from "@reduxjs/toolkit";

export default class NodeText extends Node<INodeText> {
  draftState: EditorState;
  onToggleLinkConfirmListener?: OnToggleLinkConfirmListener;
  draft = useDraft();

  constructor(id: string, index: number, value: INodeText, editorState: EditorState, dispatch: any) {
    super(id, index, value, dispatch);
    this.value = value;
    this.index = index;
    this.draftState = editorState;
    this.dispatch = dispatch;
  }

  setOnToggleLinkConfirmListener(onToggleLinkConfirmListener: OnToggleLinkConfirmListener) {
    if (!this.onToggleLinkConfirmListener) {
      this.onToggleLinkConfirmListener = onToggleLinkConfirmListener;
      this.update();
    }
  }

  setDraftState(draftState: EditorState) {
    this.draftState = draftState;
    this.update();
  }

  toggleDraftLink() {
    if (this.onToggleLinkConfirmListener) {
      this.onToggleLinkConfirmListener.onToggleLinkConfirm();
    }
  }

  setDraftHeading(option: DraftStyleOption) {
    this.value.heading = option.value;
    const newDraftState = this.draft.setDraftBaseTag(this.draftState, this.value);
    this.setDraftState(newDraftState);
  }

  setDraftFontColor(item: DraftStyleOption) {
    if (!item.option)
      return;
    const lastStyle = this.draft.getLastDraftStyleFontColor(this.draftState);
    let newEditorState = this.draftState;
    if (lastStyle && lastStyle !== item.option.style.color) {
      newEditorState = this.draftApplyStyle(lastStyle, item.method);
    }
    this.draftState = newEditorState;
    this.draftApplyStyle(item.option.style.color, item.method);
  }

  setDraftBackgroundColor(item: DraftStyleOption) {
    if (!item.option)
      return;
    const lastStyle = this.draft.getLastDraftStyleBackgroundColor(this.draftState);
    let newEditorState = this.draftState;
    if (lastStyle && lastStyle !== item.option.style.background) {
      newEditorState = this.draftApplyStyle(lastStyle, item.method);
    }
    this.draftState = newEditorState;
    this.draftApplyStyle(item.option.style.background, item.method);
  }

  setDraftFontStyle(item: DraftStyleOption) {
    this.draftApplyStyle(item.style, item.method);
  }

  isDraftStyleActive(style: any, method: string) {
    return this.draft.isDraftStyleActive(this.draftState, style, method);
  }

  draftApplyStyle(style: string, method: string): EditorState {
    const newEditorState = this.draft.setDraftStyle(this.draftState, style, method);
    this.setDraftState(newEditorState);
    return newEditorState;
  }

  toggleTransitionToQuote() {
    if (this.value.name === TYPE_NODE_TEXT){
      this.value.name = TYPE_NODE_QUOTE;
      if (!this.value.backgroundColor)
        this.value.backgroundColor = "COLOR_GRAY";
    }
    else {
      this.value.name = TYPE_NODE_TEXT;
      this.value.backgroundColor = "";
    }
    this.update();
  }

  clone() {
    const newId = nanoid();
    const newIndex = this.index + 1;
    const newValue: INodeText = {
      ...this.value,
      id: newId
    };
    const newDraftState = this.draft.getInitialDraftState(this.value);
    const newNode = new NodeText(newId, newIndex, newValue, newDraftState, this.dispatch);
    return newNode;
  }
}