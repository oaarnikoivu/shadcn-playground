import { DndContext, DragEndEvent, DragMoveEvent } from "@dnd-kit/core";
import { useComponentActions, useSelected } from "@/stores";
import { useState } from "react";
import BoundingBoxDraggable from "@/components/bounding-box/bounding-box-draggable.tsx";
import CanvasComponent from "@/components/canvas-component.tsx";

export default function BoundingBox() {
  const selectedComponents = useSelected();
  const { updateCoordinates } = useComponentActions();

  const [initialComponentPositions, setInitialComponentPositions] = useState<
    Record<string, { left: number; top: number }>
  >({});

  const [newComponentPositions, setNewComponentPositions] = useState<
    Record<string, { left: number; top: number }>
  >({});

  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = () => {
    setInitialComponentPositions(
      selectedComponents.reduce(
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
      ),
    );
  };

  const handleDragMove = ({ delta }: DragMoveEvent) => {
    setIsDragging(true);

    setNewComponentPositions(
      selectedComponents.reduce(
        (acc, c) => {
          acc[c.id] = {
            left: initialComponentPositions[c.id].left + delta.x,
            top: initialComponentPositions[c.id].top + delta.y,
          };
          return acc;
        },
        {} as Record<string, { left: number; top: number }>,
      ),
    );

    selectedComponents.forEach((c) => {
      const el = document.getElementById(c.id);
      if (!el) return;
      el.style.opacity = "0";
    });
  };

  const handleDragEnd = ({ delta }: DragEndEvent) => {
    if (!delta.x && !delta.y) return;

    selectedComponents.forEach((c) => {
      updateCoordinates(c.id, {
        x: c.coordinates.x + delta.x,
        y: c.coordinates.y + delta.y,
      });
    });

    selectedComponents.forEach((c) => {
      const el = document.getElementById(c.id);
      if (!el) return;
      el.style.opacity = "1";
    });

    setIsDragging(false);
    setInitialComponentPositions({});
    setNewComponentPositions({});
  };

  return (
    <>
      {isDragging &&
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
