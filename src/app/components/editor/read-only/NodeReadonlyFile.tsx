import React, { useState, useEffect } from 'react';
import { NodeFile } from '../../../lib/editor/type';
import { getFileSizeFormat } from '../../../lib/helpers';
import AppIcon from '../../AppIcon';

interface Props {
  node: NodeFile;
}

const NodeReadonlyFile = (props: Props) => {
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

export default NodeReadonlyFile;
