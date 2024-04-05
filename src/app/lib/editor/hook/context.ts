import { createContext } from "react";
import { OnNodeBehavior } from "@/app/lib/editor/type";

export const EditorContext = createContext<OnNodeBehavior | undefined>(
  undefined
);
