export interface ToolsColorStyleTextEditor {
  [key: string]: ToolsColorStyleItemTextEditor;
}

export interface ToolsColorStyleItemTextEditor {
  title: string;
  value: string;
  method: string;
  option: {
    style: {
      color: string;
      background: string;
    };
    class: {
      color: string;
      bgColor: string;
      background: string;
    };
  };
}

export interface OnTextEditorBehavior {
  onBtnLinkEditClick(url: string, entityKey: string, offsetKey: string): void;

  onBtnHeadingItemClick(item: any): void;

  onBtnStyleClick(item: any): void;

  onBtnColorClick(item: ToolsColorStyleItemTextEditor): void;

  onBtnBackgroundClick(item: ToolsColorStyleItemTextEditor): void;
}
