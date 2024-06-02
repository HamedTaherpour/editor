import { DraftStyleOptions, ImageVerticallyAlignOptions } from "@/app/type/index.type";

export const draftColorStyleOptions: DraftStyleOptions = {
  COLOR_YELLOW: {
    title: "زرد",
    value: "COLOR_YELLOW",
    method: "inline",
    style: "",
    option: {
      style: {
        color: "COLOR_YELLOW",
        background: "BACKGROUND_YELLOW"
      },
      class: {
        color: "et-text-yellow",
        bgColor: "et-bg-yellow",
        background: "et-bg-yellow-bg"
      }
    }
  },
  COLOR_ORAMGE: {
    title: "نارنجی",
    value: "COLOR_ORAMGE",
    method: "inline",
    style: "",
    option: {
      style: {
        color: "COLOR_ORAMGE",
        background: "BACKGROUND_ORAMGE"
      },
      class: {
        color: "et-text-orange",
        bgColor: "et-bg-orange",
        background: "et-bg-orange-bg"
      }
    }
  },
  COLOR_BROWN: {
    title: "قهوه‌ای",
    value: "COLOR_BROWN",
    method: "inline",
    style: "",
    option: {
      style: {
        color: "COLOR_BROWN",
        background: "BACKGROUND_BROWN"
      },
      class: {
        color: "et-text-brown",
        bgColor: "et-bg-brown",
        background: "et-bg-brown-bg"
      }
    }
  },
  COLOR_GRAY: {
    title: "طوسی",
    value: "COLOR_GRAY",
    method: "inline",
    style: "",
    option: {
      style: {
        color: "COLOR_GRAY",
        background: "BACKGROUND_GRAY"
      },
      class: {
        color: "et-text-gray",
        bgColor: "et-bg-gray",
        background: "et-bg-gray-bg"
      }
    }
  },
  COLOR_DARK: {
    title: "رنگ اصلی",
    value: "COLOR_DARK",
    method: "inline",
    style: "",
    option: {
      style: {
        color: "COLOR_DARK",
        background: "BACKGROUND_DARK"
      },
      class: {
        color: "et-text-dark",
        bgColor: "et-bg-dark",
        background: "et-bg-dark-bg"
      }
    }
  },
  COLOR_RED: {
    title: "قرمز",
    value: "COLOR_RED",
    method: "inline",
    style: "",
    option: {
      style: {
        color: "COLOR_RED",
        background: "BACKGROUND_RED"
      },
      class: {
        color: "et-text-red",
        bgColor: "et-bg-red",
        background: "et-bg-red-bg"
      }
    }
  },
  COLOR_PINK: {
    title: "صورتی",
    value: "COLOR_PINK",
    method: "inline",
    style: "",
    option: {
      style: {
        color: "COLOR_PINK",
        background: "BACKGROUND_PINK"
      },
      class: {
        color: "et-text-pink",
        bgColor: "et-bg-pink",
        background: "et-bg-pink-bg"
      }
    }
  },
  COLOR_PURPLE: {
    title: "بنفش",
    value: "COLOR_PURPLE",
    method: "inline",
    style: "",
    option: {
      style: {
        color: "COLOR_PURPLE",
        background: "BACKGROUND_PURPLE"
      },
      class: {
        color: "et-text-purple",
        bgColor: "et-bg-purple",
        background: "et-bg-purple-bg"
      }
    }
  },
  COLOR_BLUE: {
    title: "آبی",
    value: "COLOR_BLUE",
    method: "inline",
    style: "",
    option: {
      style: {
        color: "COLOR_BLUE",
        background: "BACKGROUND_BLUE"
      },
      class: {
        color: "et-text-blue",
        bgColor: "et-bg-blue",
        background: "et-bg-blue-bg"
      }
    }
  },
  COLOR_GREEN: {
    title: "سبز",
    value: "COLOR_GREEN",
    method: "inline",
    style: "",
    option: {
      style: {
        color: "COLOR_GREEN",
        background: "BACKGROUND_GREEN"
      },
      class: {
        color: "et-text-green",
        bgColor: "et-bg-green",
        background: "et-bg-green-bg"
      }
    }
  }
};

export const draftHeadingStyleOptions: DraftStyleOptions = {
  "h1": {
    title: "عنوان بزرگ",
    value: "h1",
    style: "header-one",
    method: "block"
  },
  "h2": {
    title: "عنوان متوسط",
    value: "h2",
    style: "header-two",
    method: "block"
  },
  "h3": {
    title: "عنوان کوچک",
    value: "h3",
    style: "header-three",
    method: "block"
  },
  "p": {
    title: "متن",
    value: "p",
    style: "unstyled",
    method: "block"
  }
};

export const draftFormatStyleOptions: DraftStyleOptions = {
  "ul-decimal": {
    title: "لیست شماره‌دار",
    value: "ul-decimal",
    style: "ul-decimal",
    method: "block"
  },
  "ul-disc": {
    title: "لیست نقطه‌ای",
    value: "ul-disc",
    style: "ul-disc",
    method: "block"
  }
};

export const draftFontStyleOptions: DraftStyleOptions = {
  bold: {
    title: "bold",
    style: "BOLD",
    value: "bold",
    icon: "text-bold",
    method: "inline"
  },
  underline: {
    title: "underline",
    style: "UNDERLINE",
    value: "underline",
    icon: "underline",
    method: "inline"
  },
  italic: {
    title: "italic",
    style: "ITALIC",
    value: "italic",
    icon: "italic",
    method: "inline"
  },
  strike: {
    title: "strike-through",
    style: "STRIKETHROUGH",
    value: "strike-through",
    icon: "text-cross",
    method: "inline"
  }
};

export const imageVerticallyAlignOptions: ImageVerticallyAlignOptions = {
  right: {
    clazz: "et-justify-start",
    icon: "align-right"
  },
  center: {
    clazz: "et-justify-center",
    icon: "align-vertically"
  },
  left: {
    clazz: "et-justify-end",
    icon: "align-left"
  }
};
