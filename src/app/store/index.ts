import { configureStore } from "@reduxjs/toolkit";
import editorReducer from "./editor-slice";

export const store = configureStore({
  reducer: {
    editor: editorReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;