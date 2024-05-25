import { useState } from "react";

interface Props {
  keyboardClose: Function;
}

export const useKeyboard = (props: Props) => {
  const { keyboardClose } = props;

  const [keyboardHeight, setKeyboardHeight] = useState(400);
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);
  let height = 0;
  const viewport = window.visualViewport;
  if (viewport)
    height = viewport.height;

  const onResize = (event: any) => {
    if (!viewport)
      return;
    const h = Math.max(height - viewport.height, 0);
    console.log(event.target.height);
    const isOpen = h > 1;
    if (isOpen)
      setKeyboardHeight(h);
    setKeyboardIsOpen(isOpen);
  };

  function onScroll(e: TouchEvent) {
    const target = e.target as HTMLElement;
    if (target && !target.closest(".editor-toolbar-bottom")) {
      keyboardClose();
    }
  }

  if (viewport)
    viewport.addEventListener("resize", onResize);
  window.addEventListener("touchmove", onScroll);

  return {
    keyboardHeight, keyboardIsOpen
  };
};