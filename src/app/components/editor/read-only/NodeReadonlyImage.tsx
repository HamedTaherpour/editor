import { ChangeEvent, KeyboardEvent, MouseEvent, useContext, useEffect, useRef, useState } from "react";
import { NodeImage, OnNodeBehavior } from "@/app/lib/editor/type";
import { imageVerticallyAlignItems } from "@/app/lib/editor/image/utils";

interface Props {
  node: NodeImage;
}

const NodeReadonlyImage = (props: Props) => {
  const { node } = props;
  const ref = useRef<HTMLImageElement>(null);
  const maxWidth = 432;

  useEffect(() => {
    setImage(node.path);
  });

  const setImage = (url: string) => {
    if (ref.current) {
      ref.current.src = url;
      if (node.width) {
        ref.current.width = node.width;
      } else {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          let width = 0;
          if (!!node.width) width = node.width;
          else if (img.width >= maxWidth) width = maxWidth;
          else width = img.width;
          if (ref.current) ref.current.width = width;
        };
      }
    }
  };

  return (
    <div className="w-full rounded flex flex-col">
      <div className={imageVerticallyAlignItems[node.verticallyAlign].clazz + " w-full flex"}>
        <div className="flex flex-col">
          <img ref={ref} className="min-w-9 rounded-2xl" />
          <p className="text-sm text-gray-7 pt-1.5 pb-4 px-4 outline-none text-center resize-none">{node.caption}</p>
        </div>
      </div>
    </div>
  );
};

export default NodeReadonlyImage;
