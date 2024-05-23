import { useState } from "react";

export const useKeyboard = () => {

  const [keyboardHeight, setKeyboardHeight] = useState(400);
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);
  let height = 0;
  if (window.visualViewport)
    height = window.visualViewport.height;
  const viewport = window.visualViewport;

  const onResize = () => {
    if (!viewport)
      return;
    const h = Math.max(height - viewport.height, 0);
    const isOpen = h > 1;
    if (isOpen)
      setKeyboardHeight(h);
    setKeyboardIsOpen(isOpen);
  };

  window.addEventListener("resize", onResize, { once: true });

  return {
    keyboardHeight, keyboardIsOpen
  };
};