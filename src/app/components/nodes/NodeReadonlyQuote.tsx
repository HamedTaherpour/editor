import DraftReadonly from '../TextEditor/read-only/DraftReadonly';
import React from 'react';
import useEditor from "@/app/hook/useEditor";
import { draftColorStyleOptions } from "@/app/helpers/constants";

interface Props {
  index: number;
}

const NodeReadonlyQuote = (props: Props) => {
  const { index } = props;
  const { getNode } = useEditor();
  const node = getNode(index);

  const classNameBgColor = () => {
    let clazz = '';
    if (node.value.backgroundColor) {
      // @ts-ignore
      clazz += draftColorStyleOptions[node.value.backgroundColor].option.class.background;
    }
    return clazz;
  };

  const classNameBorderColor = () => {
    let clazz = '';
    if (node.value.backgroundColor) {
      // @ts-ignore
      clazz += draftColorStyleOptions[node.value.backgroundColor].option.class.bgColor;
    }
    return clazz;
  };

  return (
    <div className={classNameBgColor() + ' node-quote-root'}>
      <div className={classNameBorderColor() + ' divider'}>&nbsp;</div>
      <DraftReadonly index={index} />
    </div>
  );
};

export default NodeReadonlyQuote;
