import { DndContext, DragEndEvent, DragMoveEvent } from "@dnd-kit/core";
import { useComponentActions, useSelected } from "@/stores";
import { useState } from "react";
import useSnapModifier from "@/hooks/useSnapModifier.ts";
import { ButtonProperties, PlaygroundUIComponent } from "@/types/component.ts";
import { Button } from "@/components/ui/button.tsx";
import BoundingBoxDraggable from "@/components/bounding-box/bounding-box-draggable.tsx";

export default function BoundingBox() {
  const selectedComponents = useSelected();
  const { updateCoordinates } = useComponentActions();

  const [compPos, setCompPos] = useState<
    Record<string, { left: number; top: number }>
  >({});

  const [cLeft, setCLeft] = useState<Record<string, number>>({});
  const [cTop, setCTop] = useState<Record<string, number>>({});

  const [isDragging, setIsDragging] = useState(false);

  const modifiers = useSnapModifier();

  const handleDragStart = () => {
    setCompPos(
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

    setCLeft(
      selectedComponents.reduce(
        (acc, c) => {
          acc[c.id] = compPos[c.id].left + delta.x;
          return acc;
        },
        {} as Record<string, number>,
      ),
    );

    setCTop(
      selectedComponents.reduce(
        (acc, c) => {
          acc[c.id] = compPos[c.id].top + delta.y;
          return acc;
        },
        {} as Record<string, number>,
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
    setCompPos({});
    setCLeft({});
    setCTop({});
  };

  const renderComponent = (c: PlaygroundUIComponent) => {
    if (c.type === "button") {
      const properties = c.properties as ButtonProperties;
      return (
        <Button variant={properties.variant} size={properties.size}>
          {c.properties.value}
        </Button>
      );
    }
  };

  return (
    <>
      {isDragging &&
        selectedComponents.map((c) => (
          <div
            key={c.id}
            className="absolute z-10"
            style={{
              left: cLeft[c.id],
              top: cTop[c.id],
            }}
          >
            {renderComponent(c)}
          </div>
        ))}
      <DndContext
        modifiers={modifiers}
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
      >
        <BoundingBoxDraggable />
      </DndContext>
    </>
  );
}
