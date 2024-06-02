// import React, { useContext, MouseEvent } from "react";
// import { OnNodeBehavior } from "@/app/lib/editor/type";
// import { EditorContext } from "@/app/lib/editor/hook/context";
// import { ToolsColorStyleItemTextEditor } from "@/app/lib/editor-text/type";
// import { draftColorStyleOptions } from "@/app/helpers/constants";
//
// const ToolbarBottomNodeOption = () => {
//
//   const onNodeBehavior = useContext<OnNodeBehavior | undefined>(EditorContext);
//
//   const onBtnColorClick = (e: MouseEvent, item: ToolsColorStyleItemTextEditor) => {
//     e.preventDefault();
//     if (onNodeBehavior)
//       onNodeBehavior.onBtnColorClick(item);
//   };
//
//   const onBtnBackgroundClick = (e: MouseEvent, item: ToolsColorStyleItemTextEditor) => {
//     if (onNodeBehavior)
//       onNodeBehavior.onBtnBackgroundClick(item);
//   };
//
//   const isTextStyleActive = (style: string, method: string): boolean => {
//     if (onNodeBehavior)
//       return onNodeBehavior.isTextStyleActive(style, method);
//     else
//       return false;
//   };
//
//   const currentBgColor = () => {
//     let current;
//     // @ts-ignore
//     const colorName = Object.keys(draftColorStyleOptions).find((item) => isTextStyleActive(draftColorStyleOptions[item].option.style.background, draftColorStyleOptions[item].method));
//     if (colorName) {
//       current = draftColorStyleOptions[colorName];
//     } else {
//       current = draftColorStyleOptions["COLOR_DARK"];
//     }
//
//     return {
//       // @ts-ignore
//       clazz: current.option.class.background,
//       title: current.title
//     };
//   };
//
//   const currentColorColor = () => {
//     let current;
//     // @ts-ignore
//     const colorName = Object.keys(draftColorStyleOptions).find((item) => isTextStyleActive(draftColorStyleOptions[item].option.style.color, draftColorStyleOptions[item].method));
//     if (colorName) {
//       current = draftColorStyleOptions[colorName];
//     } else {
//       current = draftColorStyleOptions["COLOR_DARK"];
//     }
//
//     return {
//       // @ts-ignore
//       clazz: current.option.class.color,
//       title: current.title
//     };
//   };
//
//   return (
//     <div className="editor-toolbar-bottom-menu-node">
//       sdasd
//     </div>
//   );
// };
//
// export default ToolbarBottomNodeOption;