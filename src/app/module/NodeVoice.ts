import Node from "@/app/module/Node";
import { EditorOptions, FileUploader, INodeVoice, VoiceEditorOptions } from "@/app/type/index.type";
import { nanoid } from "@reduxjs/toolkit";

export default class NodeVoice extends Node<INodeVoice> {

  private defaultOptions: VoiceEditorOptions = {
    enabled: true,
    formats:  [".mp3", "audio/*"],
    formatsTitle: [".mp3", "صدا"],
  };

  constructor(id: string, index: number, value: INodeVoice, dispatch: any, allOption?: EditorOptions) {
    super(id, index, value, dispatch, allOption);
    this.value = value;
    this.index = index;
    this.dispatch = dispatch;
  }

  getFormat(): string {
    if (this.allOption && this.allOption.voice && this.allOption.voice.formats)
      return this.allOption.voice.formats.join();
    else if (this.defaultOptions.formats) {
      return this.defaultOptions.formats.join();
    }
    return "";
  }

  getFormatTitle(): string {
    if (this.allOption && this.allOption.voice && this.allOption.voice.formatsTitle)
      return this.allOption.voice.formatsTitle.join();
    else if (this.defaultOptions.formatsTitle) {
      return this.defaultOptions.formatsTitle.join();
    }
    return "";
  }

  getUploader(): FileUploader | undefined {
    if (this.allOption && this.allOption.voice && this.allOption.voice.uploader)
      return this.allOption.voice.uploader;
    return undefined;
  }

  clone() {
    const newId = nanoid();
    const newIndex = this.index + 1;
    const newValue: INodeVoice = {
      ...this.value,
      id: newId
    };
    const newNode = new NodeVoice(newId, newIndex, newValue, this.dispatch);
    return newNode;
  }

}