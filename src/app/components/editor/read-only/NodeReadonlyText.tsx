import { NodeText } from "@/app/lib/editor/type";
import DraftReadonly from "@/app/components/TextEditor/read-only/DraftReadonly";

interface Props {
  node: NodeText;
}

const NodeReadonlyText = (props: Props) => {
  const { node } = props;

  return <DraftReadonly node={node} />;
};

export default NodeReadonlyText;
