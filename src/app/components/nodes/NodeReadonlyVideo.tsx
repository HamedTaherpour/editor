"use client";

import React, { useState, useEffect } from 'react';
import { getFileSizeFormat } from '../../helpers';
import AppIcon from '../app/AppIcon';
import useEditor from "@/app/hook/useEditor";

interface Props {
  index: number;
}

const NodeReadonlyVideo = (props: Props) => {
  const { index } = props;
  const { getNodeVideo } = useEditor();
  const node = getNodeVideo(index);

  const [fileSize, setFileSize] = useState<string>('0');

  useEffect(() => {
    setFileSize(getFileSizeFormat(node.value.fileSize));
  },[]);

  return (
    <a href={node.value.url} download className="node-file-root">
      <div className="node-file-ready-container">
        <AppIcon name="document-upload" className="icon" />
        <p className="title">{node.value.fileName}</p>
        <div className="subtitle">
          <span>{fileSize}</span>
        </div>
      </div>
      <span className="description">{node.value.description}</span>
    </a>
  );
};

export default NodeReadonlyVideo;
