"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
  show: boolean;
  children: React.ReactNode;
}

const AppModal = (props: Props) => {
  const { show, children } = props;
  const [open, setOpen] = useState(show);
  const menuEl = document.body;

  useEffect(() => {
    setOpen(show);
  }, [show]);

  return <>
    {
      open &&
      createPortal(
        <div className="modal-root">
          <div className="modal-root-card">
            {children}
          </div>
        </div>
        , menuEl
      )
    }
  </>;

};
export default AppModal;
