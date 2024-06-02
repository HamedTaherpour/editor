import Node from "@/app/module/Node";
import { EditorOptions, FileUploader, ImageEditorOptions, INodeImage, INodeText } from "@/app/type/index.type";
import { nanoid } from "@reduxjs/toolkit";

export default class NodeImage extends Node<INodeImage> {

  private defaultOptions: ImageEditorOptions = {
    enabled: true,
    formats: ["image/png", "image/jpeg"],
    formatsTitle: ["png", "jpj"]
  };

  constructor(id: string, index: number, value: INodeImage, dispatch: any, allOption?: EditorOptions) {
    super(id, index, value, dispatch, allOption);
    this.value = value;
    this.index = index;
    this.dispatch = dispatch;
  }

  setImageUrl(imgUrl: string) {
    this.value.url = imgUrl;
  }

  getFormat(): string {
    if (this.allOption && this.allOption.image && this.allOption.image.formats)
      return this.allOption.image.formats.join();
    else if (this.defaultOptions.formats) {
      return this.defaultOptions.formats.join();
    }
    return "";
  }

  getFormatTitle(): string {
    if (this.allOption && this.allOption.image && this.allOption.image.formatsTitle)
      return this.allOption.image.formatsTitle.join();
    else if (this.defaultOptions.formatsTitle) {
      return this.defaultOptions.formatsTitle.join();
    }
    return "";
  }

  getUploader(): FileUploader | undefined {
    if (this.allOption && this.allOption.image && this.allOption.image.uploader)
      return this.allOption.image.uploader;
    return undefined;
  }

  clone() {
    const newId = nanoid();
    const newIndex = this.index + 1;
    const newValue: INodeImage = {
      ...this.value,
      id: newId
    };
    const newNode = new NodeImage(newId, newIndex, newValue, this.dispatch);
    return newNode;
  }

}