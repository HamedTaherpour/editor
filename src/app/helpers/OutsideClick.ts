import { RefObject, createRef, useEffect } from "react";

function useOutsideClick<T extends HTMLElement>(callback: Function): RefObject<T> {
  const ref = createRef<T>();

  useEffect(() => {
    const handleClick = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback(event);
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [ref]);

  return ref;
}

export default useOutsideClick;
