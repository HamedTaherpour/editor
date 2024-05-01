import React from 'react';

const LinkReadonly = (props) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();

  return (
    <a href={url} className="draft-link" title={url}>
      {props.children}
    </a>
  );
};

export default LinkReadonly;
