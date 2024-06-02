// import React, { MouseEvent, useContext, useEffect, useRef, useState } from "react";
// import AppIcon from "@/app/components/app/AppIcon";
// import { OnNodeBehavior, TYPE_NODE_FILE, TYPE_NODE_IMAGE, TYPE_NODE_TEXT, TYPE_NODE_VOICE } from "@/app/lib/editor/type";
// import { EditorContext } from "@/app/lib/editor/hook/context";
// import { ToolsColorStyleItemTextEditor, ToolsStyleItemTextEditor } from "@/app/lib/editor-text/type";
// import ToolbarBottomColor from "@/app/components/editor/mobile/toolbar-bottom/ToolbarBottomColor";
// import { toolsColorStyleItems, toolsFontStylsItems } from "@/app/lib/editor-text/hook/tools";
// import { useKeyboard } from "@/app/lib/editor/hook/index";
// import ToolbarBottomNodeOption from "@/app/components/editor/mobile/toolbar-bottom/ToolbarBottomNodeOption";
// import AppModal from "@/app/components/app/AppModal";
//
// const ToolbarBottom = () => {
//   const ref = useRef<HTMLDivElement>(null);
//   const [showMenuBottom, setShowMenuBottom] = useState<boolean>(false);
//   const [showToolsMenuNodeEditor, setShowToolsMenuNodeEditor] = useState<boolean>(false);
//   const [showColorMenuNodeEditor, setShowColorMenuNodeEditor] = useState<boolean>(false);
//   const [menuBottomHeight, setMenuBottomHeight] = useState<string>("0px");
//   const [tabName, setTabName] = useState<string>("main");
//   const [tabMenuBottomName, setTabMenuBottomName] = useState<string>("tools");
//   const { keyboardHeight, keyboardIsOpen } = useKeyboard({
//     keyboardClose() {
//       if (onNodeBehavior)
//         onNodeBehavior.blurCurrentNodeSelected();
//     }
//   });
//   const onNodeBehavior = useContext<OnNodeBehavior | undefined>(EditorContext);
//   let menuList = [];
//   if (onNodeBehavior) {
//     menuList = onNodeBehavior.getToolsMenu();
//   }
//
//   useEffect(() => {
//     document.addEventListener("selectionchange", function(event) {
//       const selection = window.getSelection();
//       if (!selection)
//         return;
//
//       if (selection.toString().length > 0)
//         setTabName("text");
//       else
//         setTabName("main");
//     });
//
//   }, []);
//
//   useEffect(() => {
//     if (ref.current) {
//       if (keyboardIsOpen) {
//         ref.current.style.bottom = `${keyboardHeight}px`;
//         if (showMenuBottom) {
//           setMenuBottomHeight(`0px`);
//           setTabMenuBottomName("tools");
//           setShowMenuBottom(false);
//         }
//       } else {
//         ref.current.style.bottom = "0px";
//       }
//     }
//   }, [keyboardIsOpen]);
//
//   const onBtnOpenMenuNodeEditor = () => {
//     console.log(keyboardHeight);
//     setTabMenuBottomName("tools");
//     if (showMenuBottom) {
//       setMenuBottomHeight(`0px`);
//       setShowMenuBottom(false);
//     } else {
//       setMenuBottomHeight(`${keyboardHeight}px`);
//       setShowMenuBottom(true);
//     }
//   };
//
//   const onBtnAddNodeImage = () => {
//     if (onNodeBehavior) {
//       onNodeBehavior.onAddNode(TYPE_NODE_IMAGE, onNodeBehavior.getCurrentNodeSelectedIndex());
//     }
//   };
//
//   const onBtnAddNodeVoice = () => {
//     if (onNodeBehavior) {
//       onNodeBehavior.onAddNode(TYPE_NODE_VOICE, onNodeBehavior.getCurrentNodeSelectedIndex());
//     }
//   };
//
//   const onBtnAddNodeFile = () => {
//     if (onNodeBehavior) {
//       onNodeBehavior.onAddNode(TYPE_NODE_FILE, onNodeBehavior.getCurrentNodeSelectedIndex());
//     }
//   };
//
//   const onBtnStyleClick = (e: MouseEvent, item: ToolsStyleItemTextEditor) => {
//     e.preventDefault();
//     if (onNodeBehavior) {
//       onNodeBehavior.onBtnStyleClick(item);
//     }
//   };
//
//   const onBtnAddNodeText = () => {
//     if (onNodeBehavior) {
//       onNodeBehavior.onAddNode(TYPE_NODE_TEXT, onNodeBehavior.getCurrentNodeSelectedIndex());
//     }
//   };
//
//   const onBtnTextColorOrBgColor = (e: MouseEvent) => {
//     // e.preventDefault();
//     if (showMenuBottom) {
//       setMenuBottomHeight(`0px`);
//       setTabMenuBottomName("tools");
//       setShowMenuBottom(false);
//     } else {
//       setTabMenuBottomName("color");
//       setMenuBottomHeight(`${keyboardHeight}px`);
//       setShowMenuBottom(true);
//     }
//   };
//
//   const onBtnModalTextColorOrBgColor = (e: MouseEvent) => {
//     setShowToolsMenuNodeEditor(false);
//     setShowColorMenuNodeEditor(true);
//   };
//
//   const onBtnLink = (e: MouseEvent) => {
//     if (onNodeBehavior)
//       onNodeBehavior.onBtnShowLinkConfirmClick();
//   };
//
//   const onBtnBackToMainClick = () => {
//     setTabName("main");
//     setShowMenuBottom(false);
//     setMenuBottomHeight("0px");
//     setTabMenuBottomName("tools");
//   };
//
//   const onBtnMoreClick = () => {
//     setShowToolsMenuNodeEditor(!showToolsMenuNodeEditor);
//   };
//
//   const onBtnDelete = () => {
//     setShowToolsMenuNodeEditor(false);
//     if (onNodeBehavior)
//       onNodeBehavior.onDelete(onNodeBehavior.getCurrentNodeSelected());
//   };
//
//   const onBtnUndo = () => {
//     if (onNodeBehavior)
//       onNodeBehavior.undo();
//   };
//
//   const onBtnDuplicateClick = () => {
//     setShowToolsMenuNodeEditor(false);
//     if (onNodeBehavior) {
//       onNodeBehavior.onDuplicate(onNodeBehavior.getCurrentNodeSelectedIndex());
//     }
//   };
//
//   const isTextStyleActive = (style: string, method: string): boolean => {
//     if (onNodeBehavior)
//       return onNodeBehavior.isTextStyleActive(style, method);
//     else
//       return false;
//   };
//
//   const onActionClick = (item: any) => {
//     if (onNodeBehavior) {
//       item.action(onNodeBehavior.getCurrentNodeSelectedIndex());
//     }
//   };
//
//   const currentNodeBgColor = () => {
//     let current;
//     const colorName = Object.keys(toolsColorStyleItems).find((item) => isNodeStyleActive(toolsColorStyleItems[item], "background"));
//     if (colorName) {
//       current = toolsColorStyleItems[colorName];
//     } else {
//       current = toolsColorStyleItems["COLOR_DARK"];
//     }
//
//     return {
//       clazz: current.option.class.background,
//       title: current.title
//     };
//   };
//
//   const currentNodeColorColor = () => {
//     let current;
//     const colorName = Object.keys(toolsColorStyleItems).find((item) => isNodeStyleActive(toolsColorStyleItems[item], "color"));
//     if (colorName) {
//       current = toolsColorStyleItems[colorName];
//     } else {
//       current = toolsColorStyleItems["COLOR_DARK"];
//     }
//
//     return {
//       clazz: current.option.class.color,
//       title: current.title
//     };
//   };
//
//   const onBtnNodeColorClick = (item: ToolsColorStyleItemTextEditor) => {
//     if (onNodeBehavior) {
//       onNodeBehavior.onStyle(item, "color", onNodeBehavior.getCurrentNodeSelectedIndex());
//     }
//   };
//
//   const onBtnNodeBackGroundClick = (item: ToolsColorStyleItemTextEditor) => {
//     if (onNodeBehavior) {
//       onNodeBehavior.onStyle(item, "background", onNodeBehavior.getCurrentNodeSelectedIndex());
//     }
//   };
//
//   const isNodeStyleActive = (style: ToolsColorStyleItemTextEditor, type: string): boolean => {
//     if (!onNodeBehavior)
//       return false;
//     const node = onNodeBehavior.getCurrentNodeSelected();
//     if (!node)
//       return false;
//     if (type === "background") {
//       return node.backgroundColor === style.value;
//     } else if (type === "color") {
//       return node.fontColor === style.value;
//     }
//     return false;
//   };
//
//   return (
//     <div ref={ref} className="editor-toolbar-bottom">
//       <AppModal show={showToolsMenuNodeEditor}>
//         <div className="modal-root-header">
//           <button onClick={() => setShowToolsMenuNodeEditor(false)}>
//             <AppIcon name="x" />
//           </button>
//         </div>
//         <div className="modal-color-container">
//           <button onClick={onBtnDelete}>
//             <AppIcon name="trash" />
//             <span>حذف</span>
//           </button>
//           <button onClick={onBtnDuplicateClick}>
//             <AppIcon name="copy" />
//             <span>کپی</span>
//           </button>
//           <button onClick={onBtnModalTextColorOrBgColor}>
//             <AppIcon name="paint-roller" />
//             <span>رنگ</span>
//             <AppIcon name="arrow-left" />
//           </button>
//         </div>
//       </AppModal>
//       <AppModal show={showColorMenuNodeEditor}>
//         <div className="modal-root-header">
//           <button onClick={() => setShowColorMenuNodeEditor(false)}>
//             <AppIcon name="x" />
//           </button>
//         </div>
//         <div className="modal-root-list">
//           <div className="modal-color-section">
//             <div className="modal-color-heading">
//               <span>آخرین رنگ‌ها</span>
//             </div>
//             <div className="modal-color-container color">
//               <button>
//                 <div className={"modal-color-box-color " + currentNodeBgColor().clazz}>
//                   <span>A</span>
//                 </div>
//                 <span>پس‌زمینه {currentNodeBgColor().title} </span>
//               </button>
//               <button>
//                 <div className={"modal-color-box-color " + currentNodeColorColor().clazz}>
//                   <span>A</span>
//                 </div>
//                 <span> {currentNodeColorColor().title} </span>
//               </button>
//             </div>
//           </div>
//           <div className="modal-color-section">
//             <div className="modal-color-heading">
//               <span>رنگ اصلی</span>
//             </div>
//             <div className="modal-color-container color">
//               {Object.keys(toolsColorStyleItems).map((item) => (
//                 <button title={toolsColorStyleItems[item].title} key={toolsColorStyleItems[item].value} onMouseDown={(e) => onBtnNodeColorClick(toolsColorStyleItems[item])}>
//                   <div className="modal-color-box-color">
//                     <span className={toolsColorStyleItems[item].option.class.color}>A</span>
//                   </div>
//                   <span>{toolsColorStyleItems[item].title}</span>
//                 </button>
//               ))}
//             </div>
//           </div>
//           <div className="modal-color-section">
//             <div className="modal-color-heading">
//               <span>رنگ پس‌زمینه</span>
//             </div>
//             <div className="modal-color-container color">
//               {Object.keys(toolsColorStyleItems).map((item) => (
//                 <button title={toolsColorStyleItems[item].title} key={toolsColorStyleItems[item].value} onMouseDown={(e) => onBtnNodeBackGroundClick(toolsColorStyleItems[item])}>
//                   <div className={"modal-color-box-color " + toolsColorStyleItems[item].option.class.background}>
//                     <span className={toolsColorStyleItems[item].option.class.color}>A</span>
//                   </div>
//                   <span>{toolsColorStyleItems[item].title}</span>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </AppModal>
//
//       <div className="editor-toolbar-bottom-container">
//         {
//           keyboardIsOpen && <>
//             <div className="editor-toolbar-bottom-side">
//               <button>
//                 <AppIcon name="keyboard" />
//               </button>
//             </div>
//             <svg width="2" height="52" viewBox="0 0 2 52" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M1 0V52" stroke="#E3E3E3" />
//             </svg>
//           </>
//         }
//         <div className="editor-toolbar-bottom-action">
//           {
//             tabName === "main" &&
//             <>
//               <button onClick={onBtnOpenMenuNodeEditor}>
//                 <AppIcon name="add" />
//               </button>
//               <button onClick={onBtnAddNodeImage}>
//                 <AppIcon name="gallery" />
//               </button>
//               <button onClick={onBtnAddNodeVoice}>
//                 <AppIcon name="volume" />
//               </button>
//               <button onClick={onBtnAddNodeFile}>
//                 <AppIcon name="document" />
//               </button>
//               <button onClick={onBtnAddNodeText}>
//                 <AppIcon name="smallcaps" />
//               </button>
//               <button onClick={onBtnUndo}>
//                 <AppIcon name="undo" />
//               </button>
//               <button onClick={onBtnDelete}>
//                 <AppIcon name="trash" />
//               </button>
//               <button onClick={onBtnMoreClick}>
//                 <AppIcon name="more" />
//               </button>
//             </>
//           }
//           {
//             tabName === "text" &&
//             <>
//               <button onClick={onBtnBackToMainClick}>
//                 <AppIcon name="alt-arrow-left" />
//               </button>
//               <button onClick={onBtnAddNodeImage}>
//                 <AppIcon name="gallery" />
//               </button>
//               <button onMouseDown={onBtnTextColorOrBgColor} className={tabMenuBottomName === "color" ? "active" : ""}>
//                 <AppIcon name="paint-roller" />
//               </button>
//               {toolsFontStylsItems.map((item) => (
//                 <button key={item.style} onMouseDown={(e) => onBtnStyleClick(e, item)} className={(!!isTextStyleActive(item.style, item.method) ? "active" : "")}>
//                   <AppIcon name={item.icon} className="icon" />
//                 </button>
//               ))}
//               <button onClick={onBtnAddNodeText}>
//                 <AppIcon name="smallcaps" />
//               </button>
//               <button onClick={onBtnLink}>
//                 <AppIcon name="link" />
//               </button>
//               <button>
//                 <AppIcon name="undo" />
//               </button>
//             </>
//           }
//
//         </div>
//       </div>
//       {showMenuBottom && <>
//         <div className="editor-toolbar-bottom-menu-node-root" style={{ height: menuBottomHeight }}>
//           {
//             tabMenuBottomName === "tools" && <>
//               <div className="editor-toolbar-bottom-menu-node">
//                 <div className="editor-toolbar-bottom-menu-node-container">
//                   {menuList.map((item) => (
//                     <button key={item.title}
//                             onClick={() => onActionClick(item)}>
//                       <AppIcon name={item.icon} />
//                       <span>{item.title}</span>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </>
//           }
//           {
//             tabMenuBottomName === "color" && <>
//               <ToolbarBottomColor />
//             </>
//           }
//           {
//             tabMenuBottomName === "node-option" && <>
//               <ToolbarBottomNodeOption />
//             </>
//           }
//         </div>
//       </>}
//     </div>
//   );
// };
//
// export default ToolbarBottom;
