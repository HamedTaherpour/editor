"use client";

import dynamic from "next/dynamic";
import { OnJsonEditorUpdateListener, OnUploadFileListener } from "./lib/editor/type";

const EditorApp = dynamic(() => import("@/app/components/editor/EditorApp"), { ssr: false });

export default function Home() {
  const data = {
    1: {
      name: "TestA",
      nodes: [
        {
          id: 1713045576113,
          type: 0,
          clazz: "Hm",
          backgroundColor: "",
          fontColor: "",
          baseTag: "p",
          text: {
            blocks: [
              {
                key: "67k51",
                text: "باگ عجیب برطرف شد؛‌ احتمالاً حالا می‌توانید ویندوز ۱۰ را به ویندوز ۱۱ ارتقا دهید",
                type: "header-two",
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
              },
            ],
            entityMap: {},
          },
          plainText: "باگ عجیب برطرف شد؛‌ احتمالاً حالا می‌توانید ویندوز ۱۰ را به ویندوز ۱۱ ارتقا دهید",
        },
        {
          id: 1713045627008,
          type: 2,
          clazz: "my-3",
          backgroundColor: "",
          fontColor: "",
          path: "blob:https://editor-eta-brown.vercel.app/1a93b7f5-8cdc-4c6d-9b8e-a06cb3edcd49",
          caption: "",
          verticallyAlign: "center",
          width: 432,
        },
        {
          id: 1713045638917,
          type: 0,
          clazz: "Hm",
          backgroundColor: "",
          fontColor: "",
          baseTag: "p",
          text: {
            blocks: [
              {
                key: "7jqif",
                text: "اگر در چند سال گذشته نمی‌توانستید ویندوز ۱۱ را نصب کنید، شاید حالا بتوانید ویندوز خود را ارتقا دهید.",
                type: "unstyled",
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
              },
            ],
            entityMap: {},
          },
          plainText: "اگر در چند سال گذشته نمی‌توانستید ویندوز ۱۱ را نصب کنید، شاید حالا بتوانید ویندوز خود را ارتقا دهید.",
        },
        {
          id: 1713045649493,
          type: 4,
          clazz: "Hm",
          backgroundColor: "",
          fontColor: "",
        },
        {
          id: 1713045658806,
          type: 0,
          clazz: "Hm",
          backgroundColor: "",
          fontColor: "",
          baseTag: "p",
          text: {
            blocks: [
              {
                key: "b4vos",
                text: "مایکروسافت  پس از توقف سازگاری برخی از دستگاه‌های ویندوز ۱۰ به‌دلیل باگ درایور  اینتل، سرانجام این مشکل را برطرف کرد. مشکل مذکور بیش از دو سال پیش رؤیت  شده بود.",
                type: "unstyled",
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
              },
            ],
            entityMap: {},
          },
          plainText: "مایکروسافت  پس از توقف سازگاری برخی از دستگاه‌های ویندوز ۱۰ به‌دلیل باگ درایور  اینتل، سرانجام این مشکل را برطرف کرد. مشکل مذکور بیش از دو سال پیش رؤیت  شده بود.",
        },
        {
          id: 1713045663853,
          type: 0,
          clazz: "Hm",
          backgroundColor: "",
          fontColor: "",
          baseTag: "p",
          text: {
            blocks: [
              {
                key: "d7pt2",
                text: "",
                type: "unstyled",
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
              },
            ],
            entityMap: {},
          },
          plainText: "",
        },
        {
          id: 1713045664045,
          type: 0,
          clazz: "Hm",
          backgroundColor: "",
          fontColor: "",
          baseTag: "p",
          text: {
            blocks: [
              {
                key: "dakv5",
                text: "بسیاری  از کاربران ویندوز نمی‌توانند ویندوز ۱۰ خود را به ۱۱ ارتقا دهند؛ زیرا از  سخت‌افزار قدیمی استفاده می‌کنند که سیستم‌عامل ویندوز ۱۱ از آن پشتیبانی  نمی‌کند. برخی دیگر از کاربران به‌دلیل مشکلات و باگ‌های خاص، از  به‌روز‌رسانی منع شده‌اند. اکنون، مایکروسافت یکی از این موانع ارتقا را  حذف کرده است.",
                type: "unstyled",
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
              },
            ],
            entityMap: {},
          },
          plainText: "بسیاری  از کاربران ویندوز نمی‌توانند ویندوز ۱۰ خود را به ۱۱ ارتقا دهند؛ زیرا از  سخت‌افزار قدیمی استفاده می‌کنند که سیستم‌عامل ویندوز ۱۱ از آن پشتیبانی  نمی‌کند. برخی دیگر از کاربران به‌دلیل مشکلات و باگ‌های خاص، از  به‌روز‌رسانی منع شده‌اند. اکنون، مایکروسافت یکی از این موانع ارتقا را  حذف کرده است.",
        },
        {
          id: 1713045670406,
          type: 0,
          clazz: "Hm",
          backgroundColor: "",
          fontColor: "",
          baseTag: "p",
          text: {
            blocks: [
              {
                key: "d3udm",
                text: "",
                type: "unstyled",
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
              },
            ],
            entityMap: {},
          },
          plainText: "",
        },
        {
          id: 1713045670534,
          type: 0,
          clazz: "Hm",
          backgroundColor: "",
          fontColor: "",
          baseTag: "p",
          text: {
            blocks: [
              {
                key: "3fhge",
                text: "در  سال ۲۰۲۱، مایکروسافت پس از کشف مشکلات سازگاری برخی از نسخه‌های درایور  فناوری صدای هوشمند اینتل (SST) با ویندوز ۱۱، ارتقا را برای برخی از  کاربران ویندوز ۱۰ غیرممکن کرد. این مشکل به از‌کار‌افتادن صفحه‌ی آبی مرگ  (BSOD) برای مشتریان آسیب‌دیده منجر شد و مایکروسافت را مجبور کرد تا  دستگاه‌ها را از دریافت هر نسخه از ویندوز ۱۱ منع کند.",
                type: "unstyled",
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
              },
            ],
            entityMap: {},
          },
          plainText: "در  سال ۲۰۲۱، مایکروسافت پس از کشف مشکلات سازگاری برخی از نسخه‌های درایور  فناوری صدای هوشمند اینتل (SST) با ویندوز ۱۱، ارتقا را برای برخی از  کاربران ویندوز ۱۰ غیرممکن کرد. این مشکل به از‌کار‌افتادن صفحه‌ی آبی مرگ  (BSOD) برای مشتریان آسیب‌دیده منجر شد و مایکروسافت را مجبور کرد تا  دستگاه‌ها را از دریافت هر نسخه از ویندوز ۱۱ منع کند.",
        },
        {
          id: 1713045682143,
          type: 0,
          clazz: "Hm",
          backgroundColor: "",
          fontColor: "",
          baseTag: "p",
          text: {
            blocks: [
              {
                key: "6ki2n",
                text: "",
                type: "header-three",
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
              },
              {
                key: "b8d8q",
                text: "مقالات مرتبط",
                type: "header-three",
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
              },
            ],
            entityMap: {},
          },
          plainText: "\u0001مقالات مرتبط",
        },
        {
          id: 1713045743014,
          type: 3,
          clazz: "my-3",
          backgroundColor: "",
          fontColor: "",
          baseTag: "ul-disc",
          text: {
            blocks: [
              {
                key: "d55cp",
                text: "آپدیت بزرگ ویندوز ۱۱ منتشر شد؛ از ابزار جادویی در Photos تا بهبود ویجت‌ها",
                type: "unordered-list-item",
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [
                  {
                    offset: 0,
                    length: 73,
                    key: 0,
                  },
                ],
                data: {},
              },
              {
                key: "ca0jc",
                text: "بررسی ویندوز ۱۱ ؛ آشنایی با جدیدترین تغییرات، ویژگی ها و هر آنچه باید ",
                type: "unordered-list-item",
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [
                  {
                    offset: 0,
                    length: 70,
                    key: 1,
                  },
                ],
                data: {},
              },
              {
                key: "9k4ls",
                text: "بدانی",
                type: "unordered-list-item",
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [
                  {
                    offset: 0,
                    length: 5,
                    key: 1,
                  },
                ],
                data: {},
              },
            ],
            entityMap: {
              0: {
                type: "LINK",
                mutability: "MUTABLE",
                data: {
                  url: "https://www.zoomit.ir/os/419515-windows-10-sst-driver-issues-upgrade-windows-11/",
                },
              },
              1: {
                type: "LINK",
                mutability: "MUTABLE",
                data: {
                  url: "https://www.zoomit.ir/os/419515-windows-10-sst-driver-issues-upgrade-windows-11/",
                },
              },
            },
          },
          plainText: "آپدیت بزرگ ویندوز ۱۱ منتشر شد؛ از ابزار جادویی در Photos تا بهبود ویجت‌ها\u0001بررسی ویندوز ۱۱ ؛ آشنایی با جدیدترین تغییرات، ویژگی ها و هر آنچه باید \u0001بدانی",
        },
        {
          id: 1713045824718,
          type: 0,
          clazz: "Hm",
          backgroundColor: "",
          fontColor: "",
          baseTag: "p",
          text: {
            blocks: [
              {
                key: "9lfpk",
                text: "",
                type: "unstyled",
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
              },
            ],
            entityMap: {},
          },
          plainText: "",
        },
        {
          id: 1713045837093,
          type: 2,
          clazz: "my-3",
          backgroundColor: "",
          fontColor: "",
          path: "blob:https://editor-eta-brown.vercel.app/1556d202-0690-4b7b-8769-72f6c7fafd04",
          caption: "bitcoin",
          verticallyAlign: "left",
          width: 227,
        },
        {
          id: 1713045859991,
          type: 5,
          clazz: "my-3",
          backgroundColor: "",
          fontColor: "",
          path: "blob:https://editor-eta-brown.vercel.app/aff0cfdc-71a3-4619-a76b-33119c2b0ff9",
          fileName: "3b5fc926-21f1-4427-8dce-986107ec1be6.pdf",
          description: "فایل pdf",
          fileSize: 169833,
        },
        {
          id: 1713045867087,
          type: 1,
          clazz: "my-3",
          backgroundColor: "",
          fontColor: "",
          path: "blob:https://editor-eta-brown.vercel.app/866658d4-4517-4b4c-b2ae-aa553f412226",
          fileName: "RAYE_Escapism._feat._070_Shake_0EBw-CWc4Uw_140.mp3",
          description: "آهنگ",
        },
      ],
    },
    2: {
      name: "TestA",
      nodes: [
        {
          id: 1713095988565,
          type: 0,
          clazz: "Hm",
          backgroundColor: "",
          fontColor: "",
          baseTag: "p",
          text: {
            blocks: [
              {
                key: "3r7q0",
                text: "ادوبی ظاهراً برای آموزش مدل Firefly از تصاویر Midjourney استفاده کرده است",
                type: "header-two",
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
              },
            ],
            entityMap: {},
          },
          plainText: "ادوبی ظاهراً برای آموزش مدل Firefly از تصاویر Midjourney استفاده کرده است",
        },
        {
          id: 1713096139261,
          type: 0,
          clazz: "Hm",
          backgroundColor: "COLOR_BLUE",
          fontColor: "",
          baseTag: "p",
          text: {
            blocks: [
              {
                key: "3kg1h",
                text: "به گفته نماینده ادوبی، برای آموزش هوش مصنوعی Firefly از 5 درصد تصاویر تولیدشده توسط مدل‌های دیگر استفاده شده است.",
                type: "unstyled",
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
              },
            ],
            entityMap: {},
          },
          plainText: "به گفته نماینده ادوبی، برای آموزش هوش مصنوعی Firefly از 5 درصد تصاویر تولیدشده توسط مدل‌های دیگر استفاده شده است.",
        },
        {
          id: 1713096150893,
          type: 2,
          clazz: "my-3",
          backgroundColor: "",
          fontColor: "",
          path: "blob:http://localhost:3000/3ef9a53b-6efa-41ec-9b39-cac74a748475",
          caption: "",
          verticallyAlign: "center",
          width: 432,
        },
        {
          id: 1713096158669,
          type: 3,
          clazz: "my-3",
          backgroundColor: "",
          fontColor: "COLOR_BLUE",
          baseTag: "p",
          text: {
            blocks: [
              {
                key: "ohr5",
                text: "تصاویر ساخته‌شده با هوش مصنوعی در Adobe Stock تنها بخش کوچکی از مجموعه داده آموزشی Firefly هستند.",
                type: "unstyled",
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
              },
            ],
            entityMap: {},
          },
          plainText: "تصاویر ساخته‌شده با هوش مصنوعی در Adobe Stock تنها بخش کوچکی از مجموعه داده آموزشی Firefly هستند.",
        },
        {
          id: 1713096200118,
          type: 1,
          clazz: "my-3",
          backgroundColor: "COLOR_BLUE",
          fontColor: "COLOR_ORAMGE",
          path: "blob:http://localhost:3000/143f347f-9109-4bc6-937f-41776b71619f",
          fileName: "RAYE_Escapism._feat._070_Shake_0EBw-CWc4Uw_140.mp3",
          description: "",
        },
      ],
    },
  };

  const listener: OnJsonEditorUpdateListener = {
    onUpdate(jsonEditor) {},
  };

  const onUploadFileListener: OnUploadFileListener = {
    onUploadFile(file) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ url: "https://s3.cointelegraph.com/uploads/2024-04/8fdd3d0b-924f-491e-83f2-d96220ce0037.jpg" });
        }, 3000);
      });
    },
  };

  return (
    <main>
      <EditorApp onJsonEditorUpdateListener={listener} onUploadFileListener={onUploadFileListener} />
    </main>
  );
}
