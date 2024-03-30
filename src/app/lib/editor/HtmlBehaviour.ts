export interface OnHtmlChangeListener {
  onChange: (htmlStr: string) => void;
}

class HtmlBehaviour {
  htmlStr: string;
  onHtmlChangeListener: OnHtmlChangeListener | undefined;
  baseTag: string;

  constructor(htmlStr: string, baseTag: string) {
    this.htmlStr = htmlStr;
    this.baseTag = baseTag || "P";
  }

  setHtmlStr(htmlStr: string) {
    this.htmlStr = htmlStr;
  }

  getTagName(htmlStr: string) {
    let el = document.createElement("div");
    el.innerHTML = htmlStr;
    return el.childNodes[0].nodeName;
  }

  isBaseTag(htmlStr: string) {
    return this.getTagName(htmlStr) === this.baseTag;
  }

  getBaseTemplate(htmlStr: string) {
    let el = document.createElement(this.baseTag);
    el.innerHTML = htmlStr;
    return el.outerHTML;
  }

  insertTag(tag: string, start: number, end: number) {}

  setOnHtmlChangeListener(onHtmlChangeListener: OnHtmlChangeListener) {
    this.onHtmlChangeListener = onHtmlChangeListener;
  }

  getHtml() {
    return this.htmlStr;
  }
}

export default HtmlBehaviour;
