import DraftReadonly from '../TextEditor/read-only/DraftReadonly';
import React from 'react';

interface Props {
  index: number;
}

const NodeReadonlyText = (props: Props) => {
  const { index } = props;

  return <DraftReadonly index={index} />;
};

export default NodeReadonlyText;
