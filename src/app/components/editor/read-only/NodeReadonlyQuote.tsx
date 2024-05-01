import { toolsColorStyleItems } from '../../../lib/editor-text/hook/tools';
import { NodeQuote } from '../../../lib/editor/type';
import DraftReadonly from '../../TextEditor/read-only/DraftReadonly';
import React from 'react';

interface Props {
  node: NodeQuote;
}

const NodeReadonlyQuote = (props: Props) => {
  const { node } = props;

  const classNameBgColor = () => {
    let clazz = '';
    if (node.backgroundColor) {
      clazz += toolsColorStyleItems[node.backgroundColor].option.class.background;
    }
    return clazz;
  };

  const classNameBorderColor = () => {
    let clazz = '';
    if (node.backgroundColor) {
      clazz += toolsColorStyleItems[node.backgroundColor].option.class.bgColor;
    }
    return clazz;
  };

  return (
    <div className={classNameBgColor() + ' node-quote-root'}>
      <div className={classNameBorderColor() + ' divider'}>&nbsp;</div>
      <DraftReadonly node={node} />
    </div>
  );
};

export default NodeReadonlyQuote;
