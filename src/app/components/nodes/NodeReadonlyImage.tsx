"use client";

import React, { useEffect, useRef } from "react";
import useEditor from "@/app/hook/useEditor";
import { imageVerticallyAlignOptions } from "@/app/helpers/constants";

interface Props {
  index: number;
}

const NodeReadonlyImage = (props: Props) => {
  const { index } = props;
  const { getNodeImage } = useEditor();
  const node = getNodeImage(index);

  const ref = useRef<HTMLImageElement>(null);
  const maxWidth = 380;

  useEffect(() => {
    setImage(node.value.url);
  }, []);

  const setImage = (url: string) => {
    if (ref.current) {
      ref.current.src = url;
      if (node.value.width) {
        ref.current.width = node.value.width;
      } else {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          let width = 0;
          if (!!node.value.width) width = node.value.width;
          else if (img.width >= maxWidth) width = maxWidth;
          else width = img.width;
          if (ref.current) ref.current.width = width;
        };
      }
    }
  };

  return (
    <div className={imageVerticallyAlignOptions[node.value.verticallyAlign].clazz + " node-image-read-only"}>
      <div className="node-image-resize">
        <img ref={ref} />
        <p className="node-image-caption">{node.value.caption}</p>
      </div>
    </div>
  );
};

export default NodeReadonlyImage;
