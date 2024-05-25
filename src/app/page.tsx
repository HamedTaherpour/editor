"use client";

import dynamic from "next/dynamic";
import { OnJsonEditorUpdateListener, OnUploadFileListener } from "./lib/editor/type";

const EditorApp = dynamic(() => import("@/app/components/editor/EditorApp"), { ssr: false });

export default function Home() {

  const dataStr = JSON.stringify(
    [
      {
        "id": 275380,
        "type": 0,
        "clazz": null,
        "backgroundColor": null,
        "fontColor": null,
        "baseTag": "p",
        "text": {
          "blocks": [
            {
              "key": "9k69r",
              "text": "یشسیشسی",
              "type": "unstyled",
              "depth": 0,
              "inlineStyleRanges": [],
              "entityRanges": [],
              "data": []
            }
          ],
          "entityMap": []
        },
        "plainText": "یشسیشسی"
      },
      {
        "id": 275381,
        "type": 0,
        "clazz": null,
        "backgroundColor": null,
        "fontColor": null,
        "baseTag": "p",
        "text": {
          "blocks": [
            {
              "key": "kjke",
              "text": "شسیشسیشس",
              "type": "unstyled",
              "depth": 0,
              "inlineStyleRanges": [],
              "entityRanges": [],
              "data": []
            }
          ],
          "entityMap": []
        },
        "plainText": "شسیشسیشس"
      },
      {
        "id": 275302,
        "type": 0,
        "clazz": null,
        "backgroundColor": null,
        "fontColor": null,
        "baseTag": "p",
        "text": {
          "blocks": [
            {
              "key": "3u357",
              "text": "شسیشسیشسیشسی",
              "type": "unstyled",
              "depth": 0,
              "inlineStyleRanges": [],
              "entityRanges": [],
              "data": []
            }
          ],
          "entityMap": []
        },
        "plainText": "شسیشسیشسیشسی"
      }
    ],
    function(key, value) {
      if (value === null) {
        return "";
      }
      return value;
    }
  );
  const dataJson = JSON.parse(dataStr);

  const listener: OnJsonEditorUpdateListener = {
    onUpdate(jsonEditor) {
    }
  };

  const onUploadFileListener: OnUploadFileListener = {
    onUploadFile(file) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ url: "https://www.w3schools.com/html/horse.ogg" });
        }, 3000);
      });
    },
    onUploadImage(file) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ url: "https://s3.cointelegraph.com/uploads/2024-04/8fdd3d0b-924f-491e-83f2-d96220ce0037.jpg" });
        }, 3000);
      });
    },
    onUploadVoice(file) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ url: "https://www.w3schools.com/html/horse.ogg" });
        }, 3000);
      });
    },
    onUploadVideo(file) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ url: "https://www.w3schools.com/html/horse.ogg" });
        }, 3000);
      });
    }
  };

  return (
    <main>
      <EditorApp onJsonEditorUpdateListener={listener} onUploadFileListener={onUploadFileListener} />
    </main>
  );
}
