import AppIcon from "@/app/components/AppIcon";
import { useEffect, useState, useContext } from "react";
import { createPortal } from "react-dom";
import useOutsideClick from "@/app/lib/OutsideClick";
import { getBlockPositionDOM } from "@/app/lib/editor-text/hook/tools";
import { TextEditorContext } from "@/app/lib/editor-text/hook/context";

const Link = (props) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  const onTextEditorBehavior = useContext(TextEditorContext);

  const menuEl = document.getElementById("menu");
  const [showLink, setShowLink] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const refLink = useOutsideClick((e) => {
    setShowLink(false);
  });

  useEffect(() => {
    if (showLink && refLink.current) {
      const pos = getBlockPositionDOM(props.offsetKey);
      pos.x = pos.x - refLink.current.clientWidth;
      setPosition(pos);
    }
  }, [showLink]);

  const onBtnEditLink = () => {
    onTextEditorBehavior.onBtnLinkEditClick(url, props.entityKey, props.offsetKey);
  };
  const onMouseEnter = (e) => {
    setShowLink(true);
  };
  const onMouseLeave = () => {
    setShowLink(false);
  };

  return (
    <div className="inline-block" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <a href={url} className="text-blue-600 underline underline-offset-1 cursor-pointer">
        {props.children}
      </a>
      {showLink
        ? createPortal(
            <div
              ref={refLink}
              className="absolute z-50"
              style={{
                top: position.y,
                left: position.x,
              }}
            >
              <div className="flex flex-row p-2 rounded-xl border border-gray-2 bg-white shadow-md items-center justify-between">
                <button className="flex outline-none" onClick={() => onBtnEditLink()}>
                  <AppIcon name="copy" className="size-4 ml-1" />
                  <span className="text-gray-8 text-xs">ویرایش</span>
                </button>
                <span className="text-xs text-gray-8 mr-3 min-w-44 max-w-60 text-left truncate dir-ltr" title={url}>
                  {url}
                </span>
                <AppIcon name="global" className="size-4 mr-1" />
              </div>
            </div>,
            menuEl
          )
        : null}
    </div>
  );
};

export default Link;
