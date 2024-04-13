import { NodeQuote } from "@/app/lib/editor/type";
import DraftReadonly from "@/app/components/TextEditor/read-only/DraftReadonly";

interface Props {
  node: NodeQuote;
}

const NodeReadonlyQuote = (props: Props) => {
  const { node } = props;

  return (
    <div className="rounded flex flex-row px-1 py-1 bg-slate-100 w-full">
      <div className="w-[3px] bg-slate-500 min-h-full ml-2.5">&nbsp;</div>
      <DraftReadonly node={node} />
    </div>
  );
};

export default NodeReadonlyQuote;
