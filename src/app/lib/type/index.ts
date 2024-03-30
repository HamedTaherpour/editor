export interface DropDownMenuItemType {
  title: string;
  value: string;
  option?: any;
}

export interface DropDownMenuListType {
  [key: string]: DropDownMenuItemType;
}
