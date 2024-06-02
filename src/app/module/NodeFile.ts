import Node from "@/app/module/Node";
import { EditorOptions, FileEditorOptions, FileUploader, INodeFile } from "@/app/type/index.type";
import { nanoid } from "@reduxjs/toolkit";

export default class NodeFile extends Node<INodeFile> {

  private defaultOptions: FileEditorOptions = {
    enabled: true,
    formats: ["image/*",".pdf"],
    formatsTitle: ["pdf", "file"]
  };

  constructor(id: string, index: number, value: INodeFile, dispatch: any, allOption?: EditorOptions) {
    super(id, index, value, dispatch, allOption);
    this.value = value;
    this.index = index;
    this.dispatch = dispatch;
  }

  getFormat(): string {
    if (this.allOption && this.allOption.file && this.allOption.file.formats)
      return this.allOption.file.formats.join();
    else if (this.defaultOptions.formats) {
      return this.defaultOptions.formats.join();
    }
    return "";
  }

  getFormatTitle(): string {
    if (this.allOption && this.allOption.file && this.allOption.file.formatsTitle)
      return this.allOption.file.formatsTitle.join();
    else if (this.defaultOptions.formatsTitle) {
      return this.defaultOptions.formatsTitle.join();
    }
    return "";
  }

  getUploader(): FileUploader | undefined {
    if (this.allOption && this.allOption.file && this.allOption.file.uploader)
      return this.allOption.file.uploader;
    return undefined;
  }

  clone() {
    const newId = nanoid();
    const newIndex = this.index + 1;
    const newValue: INodeFile = {
      ...this.value,
      id: newId
    };
    const newNode = new NodeFile(newId, newIndex, newValue, this.dispatch);
    return newNode;
  }

}