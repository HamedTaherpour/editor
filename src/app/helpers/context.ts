import { createContext } from "react";
import { OnTextEditorBehavior } from "@/app/type/index.type";

export const TextEditorContext = createContext<OnTextEditorBehavior | undefined>(undefined);
