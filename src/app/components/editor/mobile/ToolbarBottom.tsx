import React, { MouseEvent, useContext, useEffect, useRef, useState } from "react";
import AppIcon from "@/app/components/AppIcon";
import { OnNodeBehavior, TYPE_NODE_FILE, TYPE_NODE_IMAGE, TYPE_NODE_TEXT, TYPE_NODE_VOICE } from "@/app/lib/editor/type";
import { EditorContext } from "@/app/lib/editor/hook/context";
import { ToolsColorStyleItemTextEditor } from "@/app/lib/editor-text/type";

const ToolbarBottom = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [showMenuBottom, setShowMenuBottom] = useState<boolean>(false);
  const [tabName, setTabName] = useState<string>("main");
  const [tabMenuBottomName, setTabMenuBottomName] = useState<string>("tools");
  const onNodeBehavior = useContext<OnNodeBehavior | undefined>(EditorContext);
  let menuList = [];
  if (onNodeBehavior) {
    menuList = onNodeBehavior.toolsMenu;
  }

  useEffect(() => {
    // @ts-ignore
    let height = window.visualViewport.height;
    const viewport = window.visualViewport;

    const onResize = () => {
      if (showMenuBottom) {
        setShowMenuBottom(false);
      }
      if (ref.current) {
        // @ts-ignore
        ref.current.style.bottom = `${Math.max(parseInt(height - viewport.height), 0)}px`;
      }
    };

    const onTouchend = (e: TouchEvent) => {
      let changedTouch = e.changedTouches[0];
      let elem = document.elementFromPoint(changedTouch.clientX, changedTouch.clientY);
      if (elem) {
        const toolbarBottomEl = elem.closest(".editor-toolbar-bottom");
        if (toolbarBottomEl) {
          // On iOS tapping anywhere doesn’t
          // automatically discard keyboard
          e.stopPropagation();
        }
      }
    };

    window.addEventListener("resize", onResize);
    // if(ref.current){
    //   ref.current.addEventListener("touchend", onTouchend);
    // }
  }, [showMenuBottom]); // no dependencies

  const onBtnCloseKeyboard = () => {
  };

  const onBtnOpenMenuNodeEditor = () => {
    setTabMenuBottomName("tools");
    setShowMenuBottom(!showMenuBottom);
  };

  const onBtnAddNodeImage = () => {
    // if (onNodeBehavior) {
    //   onNodeBehavior.onAddNode(TYPE_NODE_IMAGE, onNodeBehavior.getCurrentNodeSelectedIndex());
    // }
  };

  const onBtnAddNodeVoice = () => {
    // if (onNodeBehavior) {
    //   onNodeBehavior.onAddNode(TYPE_NODE_VOICE, onNodeBehavior.getCurrentNodeSelectedIndex());
    // }
  };

  const onBtnAddNodeFile = () => {
    // if (onNodeBehavior) {
    //   onNodeBehavior.onAddNode(TYPE_NODE_FILE, onNodeBehavior.getCurrentNodeSelectedIndex());
    // }
  };

  const onBtnAddNodeText = () => {
    // if (onNodeBehavior) {
    //   onNodeBehavior.onAddNode(TYPE_NODE_TEXT, onNodeBehavior.getCurrentNodeSelectedIndex());
    // }
  };

  const onBtnColorClick = (e: MouseEvent, item: ToolsColorStyleItemTextEditor) => {
  };

  const onBtnTextColorOrBgColor = () => {
    setTabMenuBottomName("color");
    setShowMenuBottom(!showMenuBottom);
  };

  const onBtnBackToMainClick = () => {
    setTabName("main");
  };

  const isStyleActive = () => {
    setTabName("main");
  };

  const onActionClick = (item: any) => {
    // if (onNodeBehavior) {
    //   item.action(onNodeBehavior.getCurrentNodeSelectedIndex());
    // }
  };

  // @ts-ignore
  return (
    <div ref={ref} className="editor-toolbar-bottom">
      <div className="editor-toolbar-bottom-container">
        <div className="editor-toolbar-bottom-side">
          <button onClick={onBtnCloseKeyboard}>
            <AppIcon name="keyboard" />
          </button>
        </div>
        <svg width="2" height="52" viewBox="0 0 2 52" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 0V52" stroke="#E3E3E3" />
        </svg>
        <div className="editor-toolbar-bottom-action">
          {
            tabName === "main" &&
            <>
              <button onClick={onBtnOpenMenuNodeEditor}>
                <AppIcon name="add" />
              </button>
              <button onClick={onBtnAddNodeImage}>
                <AppIcon name="gallery" />
              </button>
              <button onClick={onBtnAddNodeVoice}>
                <AppIcon name="volume" />
              </button>
              <button onClick={onBtnAddNodeFile}>
                <AppIcon name="document" />
              </button>
              <button onClick={onBtnAddNodeText}>
                <AppIcon name="smallcaps" />
              </button>
              <button>
                <AppIcon name="keyboard" />
              </button>
              <button>
                <AppIcon name="keyboard" />
              </button>
              <button>
                <AppIcon name="keyboard" />
              </button>
            </>
          }
          {
            tabName === "text" &&
            <>
              <button onClick={onBtnBackToMainClick}>
                <AppIcon name="alt-arrow-left" />
              </button>
              <button onClick={onBtnAddNodeImage}>
                <AppIcon name="gallery" />
              </button>
              <button onClick={onBtnTextColorOrBgColor}>
                <AppIcon name="paint-roller" />
              </button>
              <button onClick={onBtnAddNodeFile}>
                <AppIcon name="document" />
              </button>
              <button onClick={onBtnAddNodeText}>
                <AppIcon name="smallcaps" />
              </button>
              <button>
                <AppIcon name="keyboard" />
              </button>
              <button>
                <AppIcon name="keyboard" />
              </button>
              <button>
                <AppIcon name="keyboard" />
              </button>
            </>
          }

        </div>
      </div>
      {
        showMenuBottom && <>
          {
            tabMenuBottomName === "tools" && <>
              <div className="editor-toolbar-bottom-menu-node">
                {menuList.map((item) => (
                  <button key={item.title}
                          onClick={() => onActionClick(item)}>
                    <AppIcon name={item.icon} />
                    <span>{item.title}</span>
                  </button>
                ))}
              </div>
            </>
          }
          {
            tabMenuBottomName === "color" && <>
              <div className="editor-toolbar-bottom-menu-node">
                <div className="editor-toolbar-bottom-menu-node-section">
                  <div className="editor-toolbar-bottom-menu-node-heading">
                    <span>آخرین رنگ‌ها</span>
                  </div>
                  <div className="editor-toolbar-bottom-menu-node-container">

                    {/*{Object.keys(toolsColorStyleItems).map((item, i) => (*/}
                    {/*  <button title={toolsColorStyleItems[item].title} key={toolsColorStyleItems[item].value} onClick={(e) => onBtnColorClick(e, toolsColorStyleItems[item])} className={(!!isStyleActive(editorState, toolsColorStyleItems[item].option.style.color, item.method) ? "active" : "") + " " + toolsColorStyleItems[item].option.class.color}>*/}
                    {/*    A*/}
                    {/*  </button>*/}
                    {/*))}*/}

                    <button>
                      <div className="editor-toolbar-bottom-menu-node-box-color">
                        <span>A</span>
                      </div>
                      <span>پس‌زمینه طوسی</span>
                    </button>
                  </div>
                </div>

              </div>
            </>
          }
        </>
      }

    </div>
  );
};
export default ToolbarBottom;
