import React, { TouchEvent, ChangeEvent, MouseEvent, useContext, useEffect, useRef, useState } from "react";
import AppTooltip from "../app/AppTooltip";
import AppIcon from "../app/AppIcon";
import AppMenu from "../app/AppMenu";
import AppLoadingSpinner from "../app/AppLoadingSpinner";
import useEditor from "@/app/hook/useEditor";
import { imageVerticallyAlignOptions } from "@/app/helpers/constants";

interface Props {
  index: number;
}

const NodeEditorImage = (props: Props) => {
  const { index } = props;
  const { getNodeImage } = useEditor();
  const node = getNodeImage(index);

  const ref = useRef<HTMLImageElement>(null);

  const maxWidth = 380;
  const [size, setSize] = useState({ x: 0 });
  const [showFileSelected, setShowFileSelected] = useState(true);
  const [enabledCaption, setEnabledCaption] = useState(false);
  const [loading, setLoading] = useState(false);
  const refCaption = useRef<HTMLDivElement>(null);
  const refFile = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (node.value.url) {
      setImage(node.value.url);
      setShowFileSelected(false);

      if (node.value.caption) {
        onBtnAddCaptionClick();
      }

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
        node.value.width = x;
        // if (onNodeBehavior) onNodeBehavior.onUpdate(node);
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
        node.value.width = x;
        node.update();
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
      const localUrl = URL.createObjectURL(e.target.files[0]);
      setImage(localUrl);
      const uploader = node.getUploader();
      if (uploader) {
        setLoading(true);
        uploader(e.target.files[0])
          .then((response) => {
            setImage(response.url);
          })
          .catch(() => {
            node.delete();
          })
          .finally(() => setLoading(false));
      }
    }
  };

  const setImage = (url: string) => {
    node.value.url = url;
    if (ref.current) {
      ref.current.src = url;
      const img = new Image();
      img.src = url;
      img.onload = () => {
        let width = 0;
        if (!!node.value.width) width = node.value.width;
        else if (img.width >= maxWidth) width = maxWidth;
        else width = img.width;
        setSize({ x: width });
        node.value.width = width;
        node.update();
      };
      img.onerror = (event) => {
        console.log("onerror" + event.toString());
      };
      img.onabort = (ev) => {
        console.log("onabort", ev);
      };
      node.update();
    }
    setShowFileSelected(false);
  };

  const onChangeCaption = (e: ChangeEvent<HTMLDivElement>) => {
    node.value.caption = e.target.textContent;
    node.update();
  };

  const onBtnAddCaptionClick = () => {
    setEnabledCaption(!enabledCaption);
      if (refCaption.current && node.value.caption) {
        refCaption.current.innerText = node.value.caption;
        refCaption.current.innerHTML = node.value.caption;
        refCaption.current.textContent = node.value.caption;
      }
  };

  const onBtnSetVerticallyAlignClick = (key: string) => {
    node.value.verticallyAlign = key;
    node.update();
  };

  const onFocus = () => {
    // if (onNodeBehavior)
    //   onNodeBehavior.onFocus(index);
  };

  return (
    <div className="node-file-root" onMouseDown={onFocus}>
      {showFileSelected ? (
        <label className="node-file-none">
          <AppIcon name="document-upload" className="icon" />
          <span className="title">فایل خود را بارگذاری کنید.</span>
          <span className="type">
            فرمت {node.getFormatTitle()}
          </span>
          <input ref={refFile} type="file" accept={node.getFormat()} onChange={onChangeFile} />
        </label>
      ) : null}
      <div className={showFileSelected ? "node-image-container-hidden" : "" + " " + imageVerticallyAlignOptions[node.value.verticallyAlign].clazz + " node-image-container"}>
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
                            <AppIcon name={imageVerticallyAlignOptions[node.value.verticallyAlign].icon} className="node-image-tools-icon" />
                          </button>
                        }
                        text="چیدمان"
                      />
                    }
                    menu={
                      <div className="node-image-tools-vertically-align-box">
                        {Object.keys(imageVerticallyAlignOptions).map((key) => (
                          <button key={key} onClick={() => onBtnSetVerticallyAlignClick(key)}>
                            <AppIcon name={imageVerticallyAlignOptions[key].icon} className={(node.value.verticallyAlign !== key ? "icon-deactive" : "") + " icon"} />
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
          <p ref={refCaption} data-ph="یک کپشن منویسید" contentEditable="true" onInput={onChangeCaption} className={"node-image-caption " + (!enabledCaption && "hidden")}></p>
        </div>
      </div>
    </div>
  );
};

export default NodeEditorImage;
