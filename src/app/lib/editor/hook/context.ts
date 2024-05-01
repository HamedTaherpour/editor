import { createContext } from "react";
import { OnNodeBehavior } from '../type';

export const EditorContext = createContext<OnNodeBehavior | undefined>(undefined);
