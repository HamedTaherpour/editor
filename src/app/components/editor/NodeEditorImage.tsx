import { useRef } from "react";
import { NodeImage, OnUpdateNodeListener } from "@/app/lib/node-editor/type";

interface Props {
  node: NodeImage;
  onUpdateNodeListener: OnUpdateNodeListener;
}

const NodeEditorImage = (props: Props) => {
  const { node, onUpdateNodeListener } = props;
  const ref = useRef<HTMLImageElement>(null);

  const onChangeFile = (e) => {
    node.path = URL.createObjectURL(e.target.files[0]);
    if (ref.current) {
      ref.current.src = URL.createObjectURL(e.target.files[0]);
    }
    onUpdateNodeListener.onUpdate(node);
  };

  return (
    <div className="w-full bg-slate-300 rounded px-6 py-2 flex flex-row justify-between items-center">
      <img ref={ref} />

      <label className="bg-slate-800 rounded-full text-white p-2">
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
        <input
          className="hidden"
          id="file_input"
          type="file"
          accept="image/png, image/jpeg"
          onChange={onChangeFile}
        />
      </label>
    </div>
  );
};

export default NodeEditorImage;
