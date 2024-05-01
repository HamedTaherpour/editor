import React, { useEffect, useRef } from 'react';
import { NodeImage } from '../../../lib/editor/type';
import { imageVerticallyAlignItems } from '../../../lib/editor/image/utils';

interface Props {
  node: NodeImage;
}

const NodeReadonlyImage = (props: Props) => {
  const { node } = props;
  const ref = useRef<HTMLImageElement>(null);
  const maxWidth = 432;

  useEffect(() => {
    setImage(node.url);
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
    <div className={imageVerticallyAlignItems[node.verticallyAlign].clazz + ' node-image-read-only'}>
      <div className="node-image-resize">
        <img ref={ref} />
        <p className="node-image-caption">{node.caption}</p>
      </div>
    </div>
  );
};

export default NodeReadonlyImage;
