import { NodeText } from '../../../lib/editor/type';
import DraftReadonly from '../../TextEditor/read-only/DraftReadonly';
import React from 'react';

interface Props {
  node: NodeText;
}

const NodeReadonlyText = (props: Props) => {
  const { node } = props;

  return <DraftReadonly node={node} />;
};

export default NodeReadonlyText;
