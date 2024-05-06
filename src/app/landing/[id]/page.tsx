import EditorReadonlyApp from "@/app/components/editor/read-only/EditorReadonlyApp";

const Page = ({ params }: { params: { id: any } }) => {
  const id = params.id;

  const dataStr = JSON.stringify([
    {
      "id": 583720,
      "text": {
        "blocks": [
          {
            "key": "b9vmg",
            "data": [],
            "text": "\u0645\u062a\u0646 \u0645\u0642\u0627\u0644\u0647",
            "type": "unstyled",
            "depth": 0,
            "entityRanges": [],
            "inlineStyleRanges": []
          }
        ],
        "entityMap": []
      },
      "type": 0,
      "clazz": null,
      "baseTag": "p",
      "fontColor": null,
      "plainText": "\u0645\u062a\u0646 \u0645\u0642\u0627\u0644\u0647",
      "backgroundColor": null
    },
    {
      "id": 591461,
      "url": "http:\/\/mydev.test\/media\/3\/167870.jpg",
      "type": 2,
      "clazz": "node-gap",
      "width": 374,
      "caption": "this is a caption",
      "fontColor": null,
      "backgroundColor": null,
      "verticallyAlign": "center"
    },
    {
      "id": 597934,
      "text": {
        "blocks": [
          {
            "key": "cpub7",
            "data": [],
            "text": null,
            "type": "unstyled",
            "depth": 0,
            "entityRanges": [],
            "inlineStyleRanges": []
          }
        ],
        "entityMap": []
      },
      "type": 0,
      "clazz": null,
      "baseTag": "p",
      "fontColor": null,
      "plainText": null,
      "backgroundColor": null
    },
    {
      "id": 597955,
      "text": {
        "blocks": [
          {
            "key": "1lk8a",
            "data": [],
            "text": "this is a block",
            "type": "unstyled",
            "depth": 0,
            "entityRanges": [],
            "inlineStyleRanges": [
              {
                "style": "COLOR_ORAMGE",
                "length": 15,
                "offset": 0
              }
            ]
          }
        ],
        "entityMap": []
      },
      "type": 3,
      "clazz": "node-gap",
      "baseTag": "p",
      "fontColor": null,
      "plainText": "this is a block",
      "backgroundColor": "COLOR_GRAY"
    }
  ], function(key, value) {
    if (value === null) {
      return "";
    }
    return value;
  });
  const dataJson = JSON.parse(dataStr);

  return (
    <div>
      <EditorReadonlyApp jsonEditor={dataJson} />
    </div>
  );
};

export default Page;
