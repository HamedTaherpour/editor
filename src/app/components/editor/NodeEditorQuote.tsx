import React, { createRef, useContext } from "react";
import { NodeQuote, OnNodeBehavior } from '../../lib/editor/type';
import DraftEditor from '../TextEditor/DraftEditor';
import { EditorContext } from '../../lib/editor/hook/context';
import { toolsColorStyleItems } from '../../lib/editor-text/hook/tools';

interface Props {
  node: NodeQuote;
  index: number;
}

const NodeEditorQuote = (props: Props) => {
  const { node, index } = props;
  node.heroRef = node.heroRef || createRef();

  const onNodeBehavior = useContext<OnNodeBehavior | undefined>(EditorContext);

  const onChangeText = (text: string) => {
    node.plainText = text;
    if (onNodeBehavior) onNodeBehavior.onUpdate(node);
  };

  const onChange = (josn: string) => {
    node.text = josn;
    if (onNodeBehavior) onNodeBehavior.onUpdate(node);
  };

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
      <DraftEditor ref={node.heroRef}  onChangeText={onChangeText} onChange={onChange} node={node} index={index} placeholder="نقل قول را اینجا بنوسید..." />
    </div>
  );
};

export default NodeEditorQuote;
