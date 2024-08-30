import { DndContext, DragEndEvent, DragMoveEvent } from "@dnd-kit/core";
import { useComponentActions, useSelected } from "@/stores";
import { useRef, useState } from "react";
import BoundingBoxDraggable from "@/components/bounding-box/bounding-box-draggable.tsx";
import CanvasComponent from "@/components/canvas-component.tsx";

export default function BoundingBox() {
  const selectedComponents = useSelected();
  const { updateCoordinates } = useComponentActions();

  const initialComponentPositionsRef = useRef<
    Record<string, { left: number; top: number }>
  >({});

  const [newComponentPositions, setNewComponentPositions] = useState<
    Record<string, { left: number; top: number }>
  >({});

  const isDraggingRef = useRef(false);

  const showSelectedComponents = (show: boolean) => {
    selectedComponents.forEach((c) => {
      const el = document.getElementById(c.id);
      if (!el) return;
      el.style.opacity = show ? "1" : "0";
    });
  };

  const handleDragStart = () => {
    initialComponentPositionsRef.current = selectedComponents.reduce(
      (acc, c) => {
        const el = document.getElementById(c.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          acc[c.id] = {
            left: rect.left + window.scrollX,
            top: rect.top + window.scrollY,
          };
        }
        return acc;
      },
      {} as Record<string, { left: number; top: number }>,
    );
  };

  const handleDragMove = ({ delta }: DragMoveEvent) => {
    isDraggingRef.current = true;

    setNewComponentPositions(
      selectedComponents.reduce(
        (acc, c) => {
          acc[c.id] = {
            left: initialComponentPositionsRef.current[c.id].left + delta.x,
            top: initialComponentPositionsRef.current[c.id].top + delta.y,
          };
          return acc;
        },
        {} as Record<string, { left: number; top: number }>,
      ),
    );

    showSelectedComponents(false);
  };

  const handleDragEnd = ({ delta }: DragEndEvent) => {
    if (!delta.x && !delta.y) return;

    selectedComponents.forEach((c) => {
      updateCoordinates(c.id, {
        x: c.coordinates.x + delta.x,
        y: c.coordinates.y + delta.y,
      });
    });

    isDraggingRef.current = false;
    initialComponentPositionsRef.current = {};
    showSelectedComponents(true);
    setNewComponentPositions({});
  };

  return (
    <>
      {isDraggingRef.current &&
        selectedComponents.map((c) => (
          <div
            key={c.id}
            className="absolute z-10"
            style={{
              left: newComponentPositions[c.id].left,
              top: newComponentPositions[c.id].top,
            }}
          >
            <CanvasComponent component={c} />
          </div>
        ))}
      <DndContext
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
      >
        <BoundingBoxDraggable />
      </DndContext>
    </>
  );
}
