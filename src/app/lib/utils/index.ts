export const getElementPostion = (_element: Element) => {
  let x = 0;
  let y = 0;
  let element = _element;
  // @ts-ignore
  while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {
    // @ts-ignore
    x += element.offsetLeft - element.scrollLeft;
    // @ts-ignore
    y += element.offsetTop - element.scrollTop;
    // @ts-ignore
    element = element.offsetParent;
  }

  return {
    x,
    y,
  };
};
