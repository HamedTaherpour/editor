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
      background: string;
    };
  };
}
