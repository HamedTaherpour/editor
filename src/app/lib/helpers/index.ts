export const getElementPosition = (_element: Element) => {
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
    y
  };
};

export const getFileSizeFormat = (size: number): string => {
  const dp = 1;
  const thresh = 1000;

  if (Math.abs(size) < thresh) {
    return size + " B";
  }

  const units = ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  let u = -1;
  const r = 10 ** dp;

  do {
    size /= thresh;
    ++u;
  } while (Math.round(Math.abs(size) * r) / r >= thresh && u < units.length - 1);

  return size.toFixed(dp) + " " + units[u];
};

export const isMobile = (): boolean => {
  return (/Mobi|Android|iPhone/i.test(navigator.userAgent))
};