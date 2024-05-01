import React from 'react';
import { NodeDivider } from '../../lib/editor/type';
interface Props {
  node: NodeDivider;
  index: number;
}

const NodeEditorDivider = (props: Props) => {
  return (
    <div className="node-divider-root">
      <hr />
    </div>
  );
};

export default NodeEditorDivider;
