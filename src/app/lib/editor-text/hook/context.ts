import { createContext } from "react";
import { OnTextEditorBehavior } from "../type";

export const TextEditorContext = createContext<OnTextEditorBehavior | undefined>(undefined);
