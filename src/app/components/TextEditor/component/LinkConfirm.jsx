import React, { useState } from 'react';
import AppIcon from '../../AppIcon';

const LinkConfirm = ({ onBtnSetLinkClick }) => {
  const [link, setLink] = useState('');

  return (
    <div className="link-confirm">
      {link ? (
        <button
          onClick={() => {
            onBtnSetLinkClick(link);
          }}
        >
          <AppIcon name="check" className="icon" />
        </button>
      ) : null}

      <input placeholder="لینک را اینجا بنویسید." onChange={(e) => setLink(e.target.value)} />
    </div>
  );
};

export default LinkConfirm;
