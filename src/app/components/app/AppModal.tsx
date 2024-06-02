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
  const menuEl = document.getElementById("editor-root");

  useEffect(() => {
    setOpen(show);
  }, [show]);

  const render = () => {
    if (open && menuEl) {
      return createPortal(
        <div className="modal-root">
          <div className="modal-root-card">
            {children}
          </div>
        </div>, menuEl
      );
    }
  };

  return <>
    {render}
  </>;

};
export default AppModal;
