import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EditorOptions, IEditorStore, JsonEditor, NodeType, OnKeyboardHandling } from "@/app/type/index.type";
import Node from "@/app/module/Node";

const initialState: IEditorStore = {
  nodeList: [],
  options: {}
};

interface Params {
  index: number;
  node: Node;
}

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    addNode: (state, action: PayloadAction<Params>) => {
      const newNodeList = state.nodeList.concat();
      newNodeList.splice(action.payload.index, 0, action.payload.node);
      state.nodeList = newNodeList;
    },
    updateNode: (state, action: PayloadAction<Params>) => {
      const node = action.payload.node;
      const all = state.nodeList;
      all[action.payload.index] = node;
      state.nodeList = [...all];
    },
    deleteNode: (state, action: PayloadAction<number>) => {
      state.nodeList.splice(action.payload, 1);
    },
    setOnKeyboardHandling(state, action: PayloadAction<OnKeyboardHandling>) {
      state.onKeyboardHandling = action.payload;
    },
    setOptions(state, action: PayloadAction<EditorOptions | undefined>) {
      state.options = action.payload;
    },
  }
});

export const { setOptions, setOnKeyboardHandling, addNode, updateNode, deleteNode } = editorSlice.actions;
export default editorSlice.reducer;