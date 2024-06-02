"use client";

import AppIcon from "../../app/AppIcon";
import React, { useEffect, useState, useContext } from "react";
import { createPortal } from "react-dom";
import useOutsideClick from "@/app/helpers/OutsideClick";
import { TextEditorContext } from "@/app/helpers/context";
import useDraft from "@/app/hook/useDraft";

const Link = (props) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  const { getDraftBlockPositionFromDOM } = useDraft();
  const onTextEditorBehavior = useContext(TextEditorContext);

  const menuEl = document.getElementById("editor-root");
  const [showLink, setShowLink] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const refLink = useOutsideClick((e) => {
    setShowLink(false);
  });

  useEffect(() => {
    if (showLink && refLink.current) {
      const pos = getDraftBlockPositionFromDOM(props.offsetKey);
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
    <div className="draft-link" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onBtnEditLink}>
      {props.children}
      {showLink
        ? createPortal(
          <div
            ref={refLink}
            className="portal"
            style={{
              top: position.y,
              left: position.x
            }}
          >
            <div className="draft-link-card">
              <button onClick={() => onBtnEditLink()}>
                <AppIcon name="copy" className="icon" />
                <span className="caption">ویرایش</span>
              </button>
              <span className="url" title={url}>
                  {url}
                </span>
            </div>
          </div>,
          menuEl
        )
        : null}
    </div>
  );
};

export default Link;
