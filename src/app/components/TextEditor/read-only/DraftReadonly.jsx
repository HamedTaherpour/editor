import React, { useEffect, useState } from 'react';

import { Editor } from 'draft-js';
import { customStyleMap, blockStyleFn, getFirstInitEditorState } from '../../../lib/editor-text/hook/tools';

import 'draft-js/dist/Draft.css';

const DraftReadonly = ({ node }) => {
  const [editorState, setEditorState] = useState(getFirstInitEditorState(node, true));

  let rootClazz = 'node-' + node.id;
  if (node.baseTag === 'ul-disc' || node.baseTag === 'ul-decimal') {
    rootClazz += ' et-bullets';
  }

  return (
    <div className={rootClazz + ' node-draft'}>
      <Editor editorState={editorState} readOnly customStyleMap={customStyleMap} textDirectionality="RTL" blockStyleFn={blockStyleFn} />
    </div>
  );
};

export default DraftReadonly;
