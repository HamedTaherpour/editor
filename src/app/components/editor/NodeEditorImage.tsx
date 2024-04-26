import { ChangeEvent, KeyboardEvent, MouseEvent, useContext, useEffect, useRef, useState } from "react";
import { NodeImage, OnNodeBehavior } from "@/app/lib/editor/type";
import AppTooltip from "@/app/components/AppTooltip";
import { EditorContext } from "@/app/lib/editor/hook/context";
import useOutsideClick from "@/app/lib/OutsideClick";
import AppIcon from "../AppIcon";
import AppMenu from "../AppMenu";
import { imageVerticallyAlignItems } from "@/app/lib/editor/image/utils";
import AppLoadingSpinner from "../AppLoadingSpinner";

interface Props {
  node: NodeImage;
  index: number;
}

const NodeEditorImage = (props: Props) => {
  const { node, index } = props;

  const onNodeBehavior = useContext<OnNodeBehavior | undefined>(EditorContext);

  const ref = useRef<HTMLImageElement>(null);

  const maxWidth = 432;
  const [size, setSize] = useState({ x: 0 });
  const [showFileSelected, setShowFileSelected] = useState(true);
  const [enabledCaption, setEnabledCaption] = useState(false);
  const [loading, setLoading] = useState(false);
  const refCaption = useRef<HTMLDivElement>(null);
  const refFile = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (node.url) {
      setImage(node.url);
      setShowFileSelected(false);
    } else if (refFile.current) {
      refFile.current.click();
    }
  }, []);

  const handler = (mouseDownEvent: MouseEvent, fromRight: boolean) => {
    const startSize = size;
    const startPosition = {
      x: mouseDownEvent.pageX,
    };

    const onMouseMove = (mouseMoveEvent: any) => {
      const pageX = mouseMoveEvent.pageX;
      const x = fromRight ? startSize.x - startPosition.x + pageX : startSize.x + startPosition.x - pageX;

      if (x < 432) {
        setSize({
          x,
        });
        node.width = x;
        if (onNodeBehavior) onNodeBehavior.onUpdate(node);
      }
    };
    const onMouseUp = () => {
      document.body.removeEventListener("mousemove", onMouseMove);
      // uncomment the following line if not using `{ once: true }`
      // document.body.removeEventListener("mouseup", onMouseUp);
    };

    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseup", onMouseUp, { once: true });
  };

  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!!e.target.files) {
      if (onNodeBehavior) {
        setLoading(true);
        onNodeBehavior
          .onUploadImage(e.target.files[0])
          .then((response) => {
            setImage(response.url);
          })
          .catch(() => {
            onNodeBehavior.onDelete(node);
          })
          .finally(() => setLoading(false));
      }
      node.url = URL.createObjectURL(e.target.files[0]);
      setImage(node.url);
    }
  };

  const setImage = (url: string) => {
    node.url = url;
    if (ref.current) {
      ref.current.src = url;
      const img = new Image();
      img.src = url;
      img.onload = () => {
        let width = 0;
        if (!!node.width) width = node.width;
        else if (img.width >= maxWidth) width = maxWidth;
        else width = img.width;

        setSize({ x: width });
        node.width = width;
        if (onNodeBehavior) onNodeBehavior.onUpdate(node);
      };

      if (onNodeBehavior) onNodeBehavior.onUpdate(node);
    }
    setShowFileSelected(false);
  };

  const onChangeCaption = (e: ChangeEvent<HTMLDivElement>) => {
    node.caption = e.target.textContent;
    if (onNodeBehavior) onNodeBehavior.onUpdate(node);
  };

  const onBtnAddCaptionClick = () => {
    setEnabledCaption(!enabledCaption);
    if (refCaption.current && node.caption) {
      refCaption.current.innerText = node.caption;
      refCaption.current.textContent = node.caption;
    }
  };

  const onBtnSetVerticallyAlignClick = (key: string) => {
    node.verticallyAlign = key;
    if (onNodeBehavior) onNodeBehavior.onUpdate(node);
  };

  return (
    <div className="w-full rounded flex flex-col">
      {showFileSelected ? (
        <label className="px-3 rounded-xl bg-gray-2 flex flex-row items-center cursor-pointer h-12 w-full relative">
          <svg className="ml-3" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.8245 9.56699C21.8388 9.58396 21.8522 9.60146 21.8648 9.61942C21.9421 9.72977 21.9873 9.85772 21.998 9.98919C21.9998 10.0122 22.0006 10.0352 22.0003 10.0583" fill="#171717" />
            <path d="M9.78847 10.5285C9.71222 10.442 9.61554 10.3725 9.50378 10.3279C9.40768 10.2896 9.30697 10.2723 9.20759 10.2747C9.02806 10.2789 8.84942 10.3471 8.7089 10.4805C8.69236 10.4962 8.67669 10.5125 8.66189 10.5292L6.83105 12.4585C6.54592 12.7589 6.55835 13.2336 6.8588 13.5188C7.15926 13.8039 7.63397 13.7915 7.9191 13.491L8.47586 12.9043V16.8752C8.47586 17.2895 8.81164 17.6252 9.22586 17.6252C9.64007 17.6252 9.97586 17.2895 9.97586 16.8752V12.9051L10.5319 13.491C10.8171 13.7915 11.2918 13.8039 11.5922 13.5188C11.8927 13.2336 11.9051 12.7589 11.62 12.4585L9.78847 10.5285Z" fill="#171717" />
            <path d="M22.0003 10.0583V14.9252C22.0003 17.429 21.5309 19.3759 20.2913 20.6826C19.0422 21.9993 17.1705 22.501 14.7752 22.501H9.22501C6.82968 22.501 4.95794 21.9993 3.70888 20.6826C2.46926 19.3759 1.99983 17.429 1.99983 14.9252V9.07442C1.99983 6.57063 2.46926 4.62372 3.70888 3.31697C4.95794 2.00025 6.82968 1.49856 9.22501 1.49856H13.8437H13.8501C13.8635 1.49856 13.8768 1.49891 13.8899 1.4996C13.8746 1.49878 13.8591 1.49843 13.8437 1.49856M13.1002 2.99856H9.22501C6.99521 2.99856 5.62936 3.47199 4.79712 4.34931C3.95543 5.23658 3.49983 6.7026 3.49983 9.07442V14.9252C3.49983 17.297 3.95543 18.763 4.79712 19.6503C5.62936 20.5276 6.99521 21.001 9.22501 21.001H14.7752C17.005 21.001 18.3708 20.5276 19.2031 19.6503C20.0447 18.763 20.5003 17.297 20.5003 14.9252V10.7995H17.5503C16.1137 10.7995 14.9155 10.5559 14.1154 9.71248C13.3266 8.88087 13.1002 7.64662 13.1002 6.14905V2.99856ZM14.6002 6.14905V4.12894L19.5051 9.29955H17.5503C16.2117 9.29955 15.5599 9.05568 15.2037 8.68015C14.8363 8.29286 14.6002 7.57686 14.6002 6.14905Z" fill="#171717" />
            <path d="M14.2898 1.64088C14.3269 1.66776 14.362 1.6983 14.3943 1.73239L21.7945 9.53338C21.8049 9.54433 21.8149 9.55554 21.8245 9.56699" fill="#171717" />
          </svg>
          <span className="text-xs font-semibold text-gray-8 ml-1">فایل خود را بارگذاری کنید.</span>
          <span className="text-xs text-gray-8">pdf . jpj فرمت</span>
          <input ref={refFile} className="hidden" type="file" accept="image/png, image/jpeg" onChange={onChangeFile} />
        </label>
      ) : null}
      <div className={showFileSelected ? "hidden" : "" + " " + imageVerticallyAlignItems[node.verticallyAlign].clazz + " w-full flex"}>
        <div className="flex flex-col" style={{ width: size.x }}>
          <div className="relative">
            <img ref={ref} className="w-full h-full min-w-9 rounded-2xl" />
            <div className="absolute w-full h-full inset-0 flex flex-col justify-between p-2 hover:opacity-100 app-base-transform">
              <div className="flex flex-row justify-between items-start h-2/6">
                <div className="bg-black/80 rounded-lg px-1.5 flex flex-row items-center gap-x-2 py-1">
                  <AppTooltip
                    className="h-6"
                    activatorToolTip={
                      <button onClick={onBtnAddCaptionClick} className="size-6 text-white">
                        C
                      </button>
                    }
                    text="اضافه کردن کپشن"
                  />
                  <div className="w-[1px] h-3 bg-gray-9"></div>
                  <AppMenu
                    activator={
                      <AppTooltip
                        className="h-6"
                        activatorToolTip={
                          <button>
                            <AppIcon name={imageVerticallyAlignItems[node.verticallyAlign].icon} className="fill-white size-6" />
                          </button>
                        }
                        text="چیدمان"
                      />
                    }
                    menu={
                      <div className="bg-black/80 rounded-lg px-1.5 flex flex-row items-center gap-x-2 py-1">
                        {Object.keys(imageVerticallyAlignItems).map((key) => (
                          <button key={key} onClick={() => onBtnSetVerticallyAlignClick(key)}>
                            <AppIcon name={imageVerticallyAlignItems[key].icon} className={(node.verticallyAlign !== key ? "opacity-50" : "") + " fill-white size-6"} />
                          </button>
                        ))}
                      </div>
                    }
                  />
                </div>
                <div className={(loading ? "" : "invisible") + " bg-black/80 rounded-lg flex flex-row px-2 py-1 items-center"}>
                  <AppLoadingSpinner className="size-3 text-white ml-2" />
                  <span className="text-[10px] text-white animate-pulse">در حال بارگذاری . . .</span>
                </div>
              </div>
              <div className="flex flex-row justify-between items-center h-2/6">
                <button className="cursor-move bg-black/60 border border-gray-2 rounded-full w-1.5 h-full flex-none" type="button" onMouseDown={(e) => handler(e, true)}></button>
                <button className="cursor-move bg-black/60 border border-gray-2 rounded-full w-1.5 h-full flex-none" type="button" onMouseDown={(e) => handler(e, false)}></button>
              </div>
              <div className="h-2/6"></div>
            </div>
          </div>
          {enabledCaption ? <p ref={refCaption} data-ph="یک کپشن منویسید" contentEditable="true" onInput={onChangeCaption} className="text-sm text-gray-7 pt-1.5 pb-4 px-4 outline-none text-center resize-none"></p> : null}
        </div>
      </div>
    </div>
  );
};

export default NodeEditorImage;
