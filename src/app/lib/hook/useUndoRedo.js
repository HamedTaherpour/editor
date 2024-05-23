import { useState, useCallback } from "react";

const useUndoRedo = (initialState) => {
  const [state, setState] = useState(initialState);
  const [history, setHistory] = useState([initialState]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;

  const undo = useCallback(() => {
    if (canUndo) {
      setCurrentIndex(currentIndex - 1);
      setState(history[currentIndex - 1]);
    }
  }, [canUndo, currentIndex, history]);

  const redo = useCallback(() => {
    if (canRedo) {
      setCurrentIndex(currentIndex + 1);
      setState(history[currentIndex + 1]);
    }
  }, [canRedo, currentIndex, history]);

  const updateState = useCallback(
    (newState) => {
      const newHistory = [...history.slice(0, currentIndex + 1), newState];
      setHistory(newHistory);
      setCurrentIndex(newHistory.length - 1);
      setState(newState);
    },
    [currentIndex, history]
  );

  return [state, updateState, undo, redo, canUndo, canRedo];
};

export default useUndoRedo;
