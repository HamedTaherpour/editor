"use client";

import dynamic from "next/dynamic";
import { OnJsonEditorUpdateListener, OnUploadFileListener, EditorOptions } from "./lib/editor/type";

const EditorApp = dynamic(() => import("@/app/components/editor/EditorApp"), { ssr: false });

export default function Home() {

  const dataStr = JSON.stringify(
    [
      {
        "id": 856530,
        "type": 0,
        "clazz": "",
        "backgroundColor": "",
        "fontColor": "",
        "baseTag": "p",
        "text": "",
        "plainText": "",
        "heroRef": {
          "current": {}
        }
      },
      {
        "id": 856581,
        "type": 0,
        "clazz": "",
        "backgroundColor": "",
        "fontColor": "",
        "baseTag": "p",
        "text": "",
        "plainText": "",
        "heroRef": {
          "current": {}
        }
      },
      {
        "id": 856502,
        "type": 0,
        "clazz": "",
        "backgroundColor": "",
        "fontColor": "",
        "baseTag": "p",
        "text": "",
        "plainText": "",
        "heroRef": {
          "current": {}
        }
      },
      {
        "id": 856583,
        "type": 0,
        "clazz": "",
        "backgroundColor": "",
        "fontColor": "",
        "baseTag": "p",
        "text": "",
        "plainText": "",
        "heroRef": {
          "current": {}
        }
      },
      {
        "id": 857934,
        "type": 2,
        "clazz": "node-gap",
        "backgroundColor": "",
        "fontColor": "",
        "url": "",
        "caption": "",
        "verticallyAlign": "center"
      },
      {
        "id": 857905,
        "type": 0,
        "clazz": "",
        "backgroundColor": "",
        "fontColor": "",
        "baseTag": "p",
        "text": "",
        "plainText": "",
        "heroRef": {
          "current": {}
        }
      },
      {
        "id": 857906,
        "type": 0,
        "clazz": "",
        "backgroundColor": "",
        "fontColor": "",
        "baseTag": "p",
        "text": "",
        "plainText": "",
        "heroRef": {
          "current": {}
        }
      },
      {
        "id": 857907,
        "type": 0,
        "clazz": "",
        "backgroundColor": "",
        "fontColor": "",
        "baseTag": "p",
        "text": "",
        "plainText": "",
        "heroRef": {
          "current": {}
        }
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

  const options: EditorOptions = {
    text: {
      enabled: false
    }
  };

  return (
    <main>
      <div style={
        {
          width: "100%",
          height: "400px",
          backgroundColor: "red"
        }
      }>

      </div>
      <div style={{
        width:"600px",
        border:"1px solid red",
      }}>
        <EditorApp value={dataJson} onJsonEditorUpdateListener={listener} onUploadFileListener={onUploadFileListener} />
      </div>
    </main>
  );
}
