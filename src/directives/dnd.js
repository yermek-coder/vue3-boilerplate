const defaultHandler = {
    droppableClass: "droppable",
    isDraggable() {
        return false;
    },
    isDroppable(event) {
        return false;
    },
    onDrag(event) {},
    onDrop(event) {},
    onDragEnd(event) {}
};

export default {
    mounted: function (el, binding) {
        const handler = { ...defaultHandler, ...(binding.value || {}), dragstack: new Set() };
        const className = handler?.droppableClass || "droppable";

        if (handler.isDraggable()) {
            el.setAttribute("draggable", true);
            el.addEventListener("dragstart", event => {
                if (handler.isDraggable(event)) {
                    handler.onDrag(event);
                } else {
                    event.preventDefault();
                }
            });

            el.addEventListener("dragend", event => {
                handler.onDragEnd(event);
            });
        }

        el.addEventListener("dragover", event => {
            if (handler.isDroppable(event)) {
                event.preventDefault();
            }
        });

        el.addEventListener("dragenter", event => {
            if (handler.isDroppable(event)) {
                handler.dragstack.add(event.target);
                if (handler.dragstack.size === 1) {
                    el.classList.add(className);
                }

                event.preventDefault();
            }
        });

        el.addEventListener("dragleave", event => {
            if (handler.isDroppable(event)) {
                handler.dragstack.delete(event.target);
                if (handler.dragstack.size === 0) {
                    el.classList.remove(className);
                }
            }
        });

        el.addEventListener("drop", event => {
            handler.dragstack.clear();
            handler.onDrop(event);
            event.preventDefault();
            el.classList.remove(className);
        });
    }
};
