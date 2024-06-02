import Node from "@/app/module/Node";
import { EditorOptions,  FileUploader, INodeFile, INodeVideo, VideoEditorOptions } from "@/app/type/index.type";
import { nanoid } from "@reduxjs/toolkit";

export default class NodeVideo extends Node<INodeFile> {

  private defaultOptions: VideoEditorOptions = {
    enabled: true,
    formats: ["video/*",".mp4"],
    formatsTitle: [".mp4"]
  };

  constructor(id: string, index: number, value: INodeFile, dispatch: any, allOption?: EditorOptions) {
    super(id, index, value, dispatch, allOption);
    this.value = value;
    this.index = index;
    this.dispatch = dispatch;
  }

  getFormat(): string {
    if (this.allOption && this.allOption.video && this.allOption.video.formats)
      return this.allOption.video.formats.join();
    else if (this.defaultOptions.formats) {
      return this.defaultOptions.formats.join();
    }
    return "";
  }

  getFormatTitle(): string {
    if (this.allOption && this.allOption.video && this.allOption.video.formatsTitle)
      return this.allOption.video.formatsTitle.join();
    else if (this.defaultOptions.formatsTitle) {
      return this.defaultOptions.formatsTitle.join();
    }
    return "";
  }

  getUploader(): FileUploader | undefined {
    if (this.allOption && this.allOption.video && this.allOption.video.uploader)
      return this.allOption.video.uploader;
    return undefined;
  }

  clone() {
    const newId = nanoid();
    const newIndex = this.index + 1;
    const newValue: INodeVideo = {
      ...this.value,
      id: newId
    };
    const newNode = new NodeVideo(newId, newIndex, newValue, this.dispatch);
    return newNode;
  }

}