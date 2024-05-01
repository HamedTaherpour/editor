import React, { useState, useEffect } from 'react';
import { getFileSizeFormat } from '../../../lib/helpers';
import AppIcon from '../../AppIcon';
import { NodeVideo } from '../../../lib/editor/type';

interface Props {
  node: NodeVideo;
}

const NodeReadonlyVideo = (props: Props) => {
  const { node } = props;
  const [fileSize, setFileSize] = useState<string>('0');

  useEffect(() => {
    setFileSize(getFileSizeFormat(node.fileSize));
  });

  return (
    <a href={node.url} download className="node-file-root">
      <div className="node-file-ready-container">
        <AppIcon name="document-upload" className="icon" />
        <p className="title">{node.fileName}</p>
        <div className="subtitle">
          <span>{fileSize}</span>
        </div>
      </div>
      <span className="description">{node.description}</span>
    </a>
  );
};

export default NodeReadonlyVideo;
