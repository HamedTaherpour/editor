import { createContext } from "react";
import { OnTextEditorBehavior } from "@/app/lib/editor-text/type";

export const TextEditorContext = createContext<OnTextEditorBehavior | undefined>(undefined);
