import { MouseEventHandler, useRef, useState } from "react";
import {
  NodeImage,
  OnUpdateNodeListener,
  OnPressEnterNodeListener,
  OnRightClickNodeListener,
} from "@/app/lib/editor/type";

interface Props {
  node: NodeImage;
  onUpdateNodeListener: OnUpdateNodeListener;
  onPressEnterNodeListener: OnPressEnterNodeListener;
  onRightClickNodeListener: OnRightClickNodeListener;
}

const NodeEditorImage = (props: Props) => {
  const {
    node,
    onUpdateNodeListener,
    onPressEnterNodeListener,
    onRightClickNodeListener,
  } = props;

  const ref = useRef<HTMLImageElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const [size, setSize] = useState({ x: 0 });
  const [showFileSelected, setShowFileSelected] = useState(true);

  const handler = (mouseDownEvent: MouseEvent) => {
    const startSize = size;
    const startPosition = {
      x: mouseDownEvent.pageX,
    };

    function onMouseMove(mouseMoveEvent: MouseEvent) {
      setSize((currentSize) => ({
        x: startSize.x + startPosition.x - mouseMoveEvent.pageX,
      }));
    }
    function onMouseUp() {
      document.body.removeEventListener("mousemove", onMouseMove);
      // uncomment the following line if not using `{ once: true }`
      // document.body.removeEventListener("mouseup", onMouseUp);
    }

    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseup", onMouseUp, { once: true });
  };

  const onKeyUp = (e) => {
    if (e.key === "Enter") onPressEnterNodeListener.onClick();
  };

  const onChangeFile = (e) => {
    node.path = URL.createObjectURL(e.target.files[0]);
    if (ref.current) {
      ref.current.src = URL.createObjectURL(e.target.files[0]);
    }
    onUpdateNodeListener.onUpdate(node);
    setSize({ x: 250 });
    setShowFileSelected(false);
  };

  const onContextMenu = (e) => {
    // onRightClickNodeListener.onRightClick(node, e.clientX, e.clientY);
    // e.preventDefault();
  };

  return (
    <div
      ref={rootRef}
      className="w-full bg-slate-300 rounded flex flex-row justify-between items-center overflow-x-hidden"
    >
      {showFileSelected ? (
        <label className="w-52 bg-slate-700 rounded text-white flex justify-center gap-2 mx-auto my-2 py-2 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M16 11V6h2v5zm-5 6.9q-.875-.25-1.437-.975T9 15.25V6h2zm.75 4.1q-2.6 0-4.425-1.825T5.5 15.75V6.5q0-1.875 1.313-3.187T10 2q1.875 0 3.188 1.313T14.5 6.5V14h-2V6.5q-.025-1.05-.737-1.775T10 4q-1.05 0-1.775.725T7.5 6.5v9.25q-.025 1.775 1.225 3.013T11.75 20q.625 0 1.188-.162T14 19.35v2.225q-.525.2-1.088.313T11.75 22M16 21v-3h-3v-2h3v-3h2v3h3v2h-3v3z"
            />
          </svg>
          <span className="text-sm">عکس خود را انتخاب کنید</span>
          <input
            className="hidden"
            id="file_input"
            type="file"
            accept="image/png, image/jpeg"
            onChange={onChangeFile}
          />
        </label>
      ) : null}

      <div className="bg-blue-400 w-full flex justify-center">
        <div className="relative" style={{ width: size.x }}>
          <img
            ref={ref}
            className="w-full h-full min-w-9"
            onContextMenu={onContextMenu}
          />
          {!showFileSelected ? (
            <div className="absolute w-full h-full inset-0 flex flex-col justify-between">
              <div></div>
              <div className="flex flex-row justify-between items-center">
                <div></div>
                <button
                  className="cursor-move -ml-1 bg-slate-900/40 border border-white/50 rounded-full  w-3 h-10"
                  type="button"
                  onMouseDown={handler}
                ></button>
              </div>
              <div></div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default NodeEditorImage;
