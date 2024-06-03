import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EditorOptions, IEditorStore, NodeType, OnKeyboardHandling } from "@/app/type/index.type";
import Node from "@/app/module/Node";

const initialState: IEditorStore = {
  nodeList: [],
  options: {},
  currentNodeSelectedIndex: 0
};

interface Params {
  index: number;
  node: Node;
}

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setNodeList: (state, action: PayloadAction<Array<NodeType>>) => {
      state.nodeList = action.payload.map((item: NodeType) => item);
    },
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
    setCurrentNodeSelectedIndex(state, action: PayloadAction<number>) {
      state.currentNodeSelectedIndex = action.payload;
    }
  }
});

export const { setOptions, setCurrentNodeSelectedIndex, setNodeList, setOnKeyboardHandling, addNode, updateNode, deleteNode } = editorSlice.actions;
export default editorSlice.reducer;