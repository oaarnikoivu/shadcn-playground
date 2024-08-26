import { DndContext, DragEndEvent, useDraggable } from "@dnd-kit/core";
import { useComponentActions, useSelected, useStore } from "@/stores";
import { Box } from "@air/react-drag-to-select";
import { useEffect, useRef, useState } from "react";
import createBoundingBox from "@/utils/createBoundingBox.ts";

export default function BoundingBox() {
  const selectedComponents = useSelected();
  const { updateCoordinates } = useComponentActions();

  const handleDragEnd = ({ delta }: DragEndEvent) => {
    if (!delta.x && !delta.y) return;

    selectedComponents.forEach((c) => {
      updateCoordinates(c.id, {
        x: c.coordinates.x + delta.x,
        y: c.coordinates.y + delta.y,
      });
    });
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Draggable />
    </DndContext>
  );
}

function Draggable() {
  const observer = useRef<MutationObserver | null>(null);
  const [boundingBox, setBoundingBox] = useState<Box | null>(null);

  useEffect(() => {
    const targetNode = document.getElementById("canvas");
    if (!targetNode) return;

    observer.current = new MutationObserver(() => {
      const selectedComponents = useStore
        .getState()
        .components.filter((c) => c.selected);
      if (selectedComponents.length > 0) {
        setBoundingBox(createBoundingBox(selectedComponents));
      } else {
        setBoundingBox(null);
      }
    });

    observer.current.observe(targetNode, {
      attributes: true,
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "bbox",
  });

  if (!boundingBox) return null;

  return (
    <div
      id="bbox"
      ref={setNodeRef}
      className="z-10 rounded-xs outline-primary outline-dashed outline-offset-[6px] cursor-grab"
      style={{
        position: "absolute",
        top: `${boundingBox.top}px`,
        left: `${boundingBox.left}px`,
        ...(transform
          ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0px)`,
            }
          : {}),
        width: `${boundingBox.width}px`,
        height: `${boundingBox.height}px`,
      }}
      {...listeners}
      {...attributes}
    />
  );
}
