import Draggable from "@/components/draggable.tsx";
import { useComponentActions, useComponents, useCursorType } from "@/stores";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import React, { useCallback, useEffect, useState } from "react";

export default function Canvas() {
  const components = useComponents();
  const cursorType = useCursorType();
  const { updateCoordinates, selectComponent, selectComponents } =
    useComponentActions();

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 10 } }),
    useSensor(TouchSensor),
  );

  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });

  const handleDragStart = ({ active }: DragStartEvent) => {
    const componentToSelect = components.find(
      (c) => c.id === active.id || c.groupId === active.id,
    );
    if (!componentToSelect) return;

    if (componentToSelect.groupId) {
      const componentsToSelect = components.filter(
        (c) => c.groupId === componentToSelect.groupId,
      );
      selectComponents(componentsToSelect.map((c) => c.id));
    } else {
      selectComponent(componentToSelect.id);
    }
  };

  const handleDragEnd = ({ delta, active }: DragEndEvent) => {
    if (!delta.x && !delta.y) return;

    const componentToUpdate = components.find(
      (c) => c.id === active.id || c.groupId === active.id,
    );
    if (!componentToUpdate) return;

    if (componentToUpdate.groupId) {
      const componentsToUpdate = components.filter(
        (c) => c.groupId === componentToUpdate.groupId,
      );
      componentsToUpdate.forEach((c) => {
        updateCoordinates(c.id, {
          x: c.coordinates.x + delta.x,
          y: c.coordinates.y + delta.y,
        });
      });
    } else {
      updateCoordinates(componentToUpdate.id, {
        x: componentToUpdate.coordinates.x + delta.x,
        y: componentToUpdate.coordinates.y + delta.y,
      });
    }
  };

  const handleMouseDown = useCallback(
    (event: React.MouseEvent) => {
      if (cursorType === "cursor") return;
      document.body.style.cursor = "grabbing";
      setIsPanning(true);
      setStartPan({
        x: event.clientX - translateX,
        y: event.clientY - translateY,
      });
    },
    [translateX, translateY, cursorType],
  );

  const handleMouseMove = useCallback(
    (event: React.MouseEvent) => {
      if (!isPanning || cursorType === "cursor") return;
      setTranslateX(event.clientX - startPan.x);
      setTranslateY(event.clientY - startPan.y);
    },
    [isPanning, startPan, cursorType],
  );

  const handleMouseUp = useCallback(() => {
    if (cursorType === "cursor") return;
    document.body.style.cursor = "grab";
    setIsPanning(false);
  }, [cursorType]);

  const handleWheel = useCallback((event: WheelEvent) => {
    setTranslateX((prev) => prev - event.deltaX);
    setTranslateY((prev) => prev - event.deltaY);
  }, []);

  useEffect(() => {
    window.addEventListener("wheel", handleWheel);
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [handleWheel]);

  return (
    <main
      id="canvas"
      className="w-screen h-screen relative overflow-hidden"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div
          id="infinite-canvas"
          style={{
            transform: `translate(${translateX}px, ${translateY}px)`,
            transformOrigin: "0 0",
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          {components.map((component) => (
            <Draggable key={component.id} component={component} />
          ))}
        </div>
      </DndContext>
    </main>
  );
}
