import React, { TouchEvent, ChangeEvent, MouseEvent, useContext, useEffect, useRef, useState } from "react";
import { NodeImage, OnNodeBehavior } from "../../lib/editor/type";
import AppTooltip from "../AppTooltip";
import { EditorContext } from "../../lib/editor/hook/context";
import AppIcon from "../AppIcon";
import AppMenu from "../AppMenu";
import { imageVerticallyAlignItems } from "../../lib/editor/image/utils";
import AppLoadingSpinner from "../AppLoadingSpinner";

interface Props {
  node: NodeImage;
  index: number;
}

const NodeEditorImage = (props: Props) => {
  const { node, index } = props;

  const onNodeBehavior = useContext<OnNodeBehavior | undefined>(EditorContext);

  const ref = useRef<HTMLImageElement>(null);

  const maxWidth = 380;
  const [size, setSize] = useState({ x: 0 });
  const [showFileSelected, setShowFileSelected] = useState(true);
  const [enabledCaption, setEnabledCaption] = useState(false);
  const [loading, setLoading] = useState(false);
  const refCaption = useRef<HTMLDivElement>(null);
  const refFile = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (node.url) {
      setImage(node.url);
      setShowFileSelected(false);
    } else if (refFile.current) {
      refFile.current.click();
    }
  }, []);

  const handlerImageSizeDesktop = (mouseDownEvent: MouseEvent, fromRight: boolean) => {
    const startSize = size;
    const startPosition = {
      x: mouseDownEvent.pageX
    };

    const onMouseMove = (mouseMoveEvent: any) => {
      const pageX = mouseMoveEvent.pageX;
      const x = fromRight ? startSize.x - startPosition.x + pageX : startSize.x + startPosition.x - pageX;

      if (x < maxWidth) {
        setSize({
          x
        });
        node.width = x;
        if (onNodeBehavior) onNodeBehavior.onUpdate(node);
      }
    };
    const onMouseUp = () => {
      document.body.removeEventListener("mousemove", onMouseMove);
      // uncomment the following line if not using `{ once: true }`
      // document.body.removeEventListener("mouseup", onMouseUp);
    };

    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseup", onMouseUp, { once: true });
  };

  const handlerImageSizeMobile = (touchEvent: TouchEvent, fromRight: boolean) => {
    const startSize = size;
    let changedTouch = touchEvent.changedTouches[0];
    const startPosition = {
      x: changedTouch.pageX
    };

    const onTouchMove = (touchEvent: any) => {
      let changedTouch = touchEvent.changedTouches[0];
      const pageX = changedTouch.pageX;
      const x = fromRight ? startSize.x - startPosition.x + pageX : startSize.x + startPosition.x - pageX;

      if (x < 400) {
        setSize({
          x
        });
        node.width = x;
        if (onNodeBehavior) onNodeBehavior.onUpdate(node);
      }
    };
    const onTouchEnd = () => {
      document.body.removeEventListener("touchmove", onTouchMove);
      // uncomment the following line if not using `{ once: true }`
      // document.body.removeEventListener("mouseup", onMouseUp);
    };

    document.body.addEventListener("touchmove", onTouchMove);
    document.body.addEventListener("touchend", onTouchEnd, { once: true });
  };

  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!!e.target.files) {
      if (onNodeBehavior) {
        setLoading(true);
        onNodeBehavior
          .onUploadImage(e.target.files[0])
          .then((response) => {
            setImage(response.url);
          })
          .catch(() => {
            onNodeBehavior.onDelete(node);
          })
          .finally(() => setLoading(false));
      }
      node.url = URL.createObjectURL(e.target.files[0]);
      setImage(node.url);
    }
  };

  const setImage = (url: string) => {
    node.url = url;
    if (ref.current) {
      ref.current.src = url;
      const img = new Image();
      img.src = url;
      img.onload = () => {
        let width = 0;
        if (!!node.width) width = node.width;
        else if (img.width >= maxWidth) width = maxWidth;
        else width = img.width;

        setSize({ x: width });
        node.width = width;
        if (onNodeBehavior) onNodeBehavior.onUpdate(node);
      };

      if (onNodeBehavior) onNodeBehavior.onUpdate(node);
    }
    setShowFileSelected(false);
  };

  const onChangeCaption = (e: ChangeEvent<HTMLDivElement>) => {
    node.caption = e.target.textContent;
    if (onNodeBehavior) onNodeBehavior.onUpdate(node);
  };

  const onBtnAddCaptionClick = () => {
    setEnabledCaption(!enabledCaption);
    if (refCaption.current && node.caption) {
      refCaption.current.innerText = node.caption;
      refCaption.current.textContent = node.caption;
    }
  };

  const onBtnSetVerticallyAlignClick = (key: string) => {
    node.verticallyAlign = key;
    if (onNodeBehavior) onNodeBehavior.onUpdate(node);
  };

  return (
    <div className="node-file-root">
      {showFileSelected ? (
        <label className="node-file-none">
          <AppIcon name="document-upload" className="icon" />
          <span className="title">فایل خود را بارگذاری کنید.</span>
          <span className="type">pdf . jpj فرمت</span>
          <input ref={refFile} type="file" accept="image/png, image/jpeg" onChange={onChangeFile} />
        </label>
      ) : null}
      <div className={showFileSelected ? "node-image-container-hidden" : "" + " " + imageVerticallyAlignItems[node.verticallyAlign].clazz + " node-image-container"}>
        <div className="node-image-resize" style={{ width: size.x }}>
          <div className="node-image-tools">
            <img ref={ref} />
            <div className="node-image-tools-container">
              <div className="node-image-tools-selction">
                <div className="menu-box">
                  <AppTooltip
                    className="tools"
                    activatorToolTip={
                      <button onClick={onBtnAddCaptionClick} className="node-image-tools-btn-caption">
                        C
                      </button>
                    }
                    text="اضافه کردن کپشن"
                  />
                  <div className="divider"></div>
                  <AppMenu
                    activator={
                      <AppTooltip
                        className="tools"
                        activatorToolTip={
                          <button>
                            <AppIcon name={imageVerticallyAlignItems[node.verticallyAlign].icon} className="node-image-tools-icon" />
                          </button>
                        }
                        text="چیدمان"
                      />
                    }
                    menu={
                      <div className="node-image-tools-vertically-align-box">
                        {Object.keys(imageVerticallyAlignItems).map((key) => (
                          <button key={key} onClick={() => onBtnSetVerticallyAlignClick(key)}>
                            <AppIcon name={imageVerticallyAlignItems[key].icon} className={(node.verticallyAlign !== key ? "icon-deactive" : "") + " icon"} />
                          </button>
                        ))}
                      </div>
                    }
                  />
                </div>
                <div className={(loading ? "" : "node-image-upload-loading-invisible") + "  node-image-upload-loading"}>
                  <AppLoadingSpinner className="loading" />
                  <span className="caption">در حال بارگذاری . . .</span>
                </div>
              </div>
              <div className="node-image-tools-selction handle-resize">
                <button type="button" onTouchStart={(e) => handlerImageSizeMobile(e, true)} onMouseDown={(e) => handlerImageSizeDesktop(e, true)}></button>
                <button type="button" onTouchStart={(e) => handlerImageSizeMobile(e, false)} onMouseDown={(e) => handlerImageSizeDesktop(e, false)}></button>
              </div>
              <div className="node-image-tools-selction"></div>
            </div>
          </div>
          {enabledCaption ? <p ref={refCaption} data-ph="یک کپشن منویسید" contentEditable="true" onInput={onChangeCaption} className="node-image-caption"></p> : null}
        </div>
      </div>
    </div>
  );
};

export default NodeEditorImage;
