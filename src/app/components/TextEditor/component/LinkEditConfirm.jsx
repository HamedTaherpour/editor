import React, { useState } from 'react';
import AppIcon from '../../app/AppIcon';

const LinkEditConfirm = ({ onBtnSetEditLinkClick, linkEdit }) => {
  const [link, setLink] = useState(linkEdit);

  return (
    <div className="link-confirm">
      {link ? (
        <button
          onClick={() => {
            onBtnSetEditLinkClick(link);
          }}
        >
          <AppIcon name="check" className="icon" />
        </button>
      ) : null}

      <input value={link} placeholder="لینک را اینجا بنویسید." onChange={(e) => setLink(e.target.value)} />
    </div>
  );
};

export default LinkEditConfirm;
