import React, { MouseEvent, useContext, useEffect, useRef, useState } from "react";
import AppIcon from "@/app/components/AppIcon";
import { OnNodeBehavior, TYPE_NODE_FILE, TYPE_NODE_IMAGE, TYPE_NODE_TEXT, TYPE_NODE_VOICE } from "@/app/lib/editor/type";
import { EditorContext } from "@/app/lib/editor/hook/context";
import { ToolsColorStyleItemTextEditor, ToolsStyleItemTextEditor } from "@/app/lib/editor-text/type";
import ToolbarBottomColor from "@/app/components/editor/mobile/toolbar-bottom/ToolbarBottomColor";
import { toolsFontStylsItems } from "@/app/lib/editor-text/hook/tools";
import ToolbarBottomNodeOption from "@/app/components/editor/mobile/toolbar-bottom/ToolbarBottomNodeOption";

const ToolbarBottom = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [showMenuBottom, setShowMenuBottom] = useState<boolean>(false);
  const [tabName, setTabName] = useState<string>("main");
  const [tabMenuBottomName, setTabMenuBottomName] = useState<string>("tools");
  const onNodeBehavior = useContext<OnNodeBehavior | undefined>(EditorContext);
  let menuList = [];
  if (onNodeBehavior) {
    menuList = onNodeBehavior.toolsMenu;
    onNodeBehavior.setOnTextHighlightListener({
      onTextHighlight(on: boolean) {
        if (on)
          setTabName("text");
        else
          setTabName("main");
      }
    });
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


  useEffect(() => {
    setShowMenuBottom(false);
  }, [tabName]);

  const onBtnCloseKeyboard = () => {
  };

  const onBtnOpenMenuNodeEditor = () => {
    setTabMenuBottomName("tools");
    setShowMenuBottom(!showMenuBottom);
  };

  const onBtnAddNodeImage = () => {
    if (onNodeBehavior) {
      onNodeBehavior.onAddNode(TYPE_NODE_IMAGE, onNodeBehavior.getCurrentNodeSelectedIndex());
    }
  };

  const onBtnAddNodeVoice = () => {
    if (onNodeBehavior) {
      onNodeBehavior.onAddNode(TYPE_NODE_VOICE, onNodeBehavior.getCurrentNodeSelectedIndex());
    }
  };

  const onBtnAddNodeFile = () => {
    if (onNodeBehavior) {
      onNodeBehavior.onAddNode(TYPE_NODE_FILE, onNodeBehavior.getCurrentNodeSelectedIndex());
    }
  };

  const onBtnStyleClick = (e: MouseEvent, item: ToolsStyleItemTextEditor) => {
    e.preventDefault();
    if (onNodeBehavior) {
      onNodeBehavior.onBtnStyleClick(item);
    }
  };

  const onBtnAddNodeText = () => {
    if (onNodeBehavior) {
      onNodeBehavior.onAddNode(TYPE_NODE_TEXT, onNodeBehavior.getCurrentNodeSelectedIndex());
    }
  };

  const onBtnTextColorOrBgColor = (e: MouseEvent) => {
    e.preventDefault();
    setTabMenuBottomName("color");
    setShowMenuBottom(!showMenuBottom);
  };

  const onBtnBackToMainClick = () => {
    setTabName("main");
    setShowMenuBottom(false);
    setTabMenuBottomName("tools");
  };

  const onBtnMoreClick = () => {
    setShowMenuBottom(true);
    setTabMenuBottomName("node-option");
  };

  const isTextStyleActive = (style: string, method: string): boolean => {
    if (onNodeBehavior)
      return onNodeBehavior.isTextStyleActive(style, method);
    else
      return false;
  };

  const onActionClick = (item: any) => {
    if (onNodeBehavior) {
      item.action(onNodeBehavior.getCurrentNodeSelectedIndex());
    }
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
                <AppIcon name="undo" />
              </button>
              <button>
                <AppIcon name="trash" />
              </button>
              <button onClick={onBtnMoreClick}>
                <AppIcon name="more" />
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
              <button onMouseDown={onBtnTextColorOrBgColor} className={tabMenuBottomName === "color" ? "active" : ""}>
                <AppIcon name="paint-roller" />
              </button>
              {toolsFontStylsItems.map((item) => (
                <button key={item.style} onMouseDown={(e) => onBtnStyleClick(e, item)} className={(!!isTextStyleActive(item.style, item.method) ? "active" : "")}>
                  <AppIcon name={item.icon} className="icon" />
                </button>
              ))}
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
                <div className="editor-toolbar-bottom-menu-node-container">
                  {menuList.map((item) => (
                    <button key={item.title}
                            onClick={() => onActionClick(item)}>
                      <AppIcon name={item.icon} />
                      <span>{item.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          }
          {
            tabMenuBottomName === "color" && <>
              <ToolbarBottomColor />
            </>
          }
          {
            tabMenuBottomName === "node-option" && <>
              <ToolbarBottomNodeOption />
            </>
          }
        </>
      }

    </div>
  );
};
export default ToolbarBottom;
