export interface OnDragEndListener {
  onEnd(toIndex: number): void;
}

export const nodeDragAndDropHandler = (dragableEl: HTMLElement, onDragEndListener: OnDragEndListener) => {
  let draggedItem: HTMLElement;
  let replaceItem: HTMLElement;

  const onDragStart = (e: DragEvent) => {
    if (e.target) {
      draggedItem = e.target as HTMLElement;
      draggedItem.style.display = "none";
    }
  };

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(dragableEl, e.clientY);
    if (afterElement != null) {
      replaceItem = afterElement;
      dragableEl.insertBefore(draggedItem, afterElement);
    }
  };

  const onDragEnd = (e: DragEvent) => {
    if (replaceItem && draggedItem) {
      let index = -1;
      if (replaceItem.dataset.index) {
        index = parseInt(replaceItem.dataset.index);
      }
      onDragEndListener.onEnd(index);
      draggedItem.style.display = "";
      replaceItem.classList.remove("border-t");
      replaceItem.classList.remove("border-blue-500");
      draggedItem = null!;
      replaceItem = null!;

      dragableEl.removeEventListener("dragstart", onDragStart);
      dragableEl.removeEventListener("dragend", onDragEnd);
      dragableEl.removeEventListener("dragover", onDragOver);
    }
  };

  const getDragAfterElement = (container: HTMLElement, y: number): HTMLElement => {
    // @ts-ignore
    const draggableElements = [...container.querySelectorAll(".node-row:not(.dragging)")];

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          child.classList.add("border-t");
          child.classList.add("border-blue-500");
          return {
            offset: offset,
            element: child,
          };
        } else {
          child.classList.remove("border-t");
          child.classList.remove("border-blue-500");
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
      }
    ).element;
  };

  dragableEl.addEventListener("dragstart", onDragStart);
  dragableEl.addEventListener("dragend", onDragEnd);
  dragableEl.addEventListener("dragover", onDragOver);
};
