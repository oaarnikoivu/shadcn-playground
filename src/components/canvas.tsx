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
import React, { useCallback, useEffect, useRef, useState } from "react";

export default function Canvas() {
  const components = useComponents();
  const cursorType = useCursorType();
  const { updateCoordinates, selectComponents } = useComponentActions();

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 10 } }),
    useSensor(TouchSensor),
  );

  const isHoldingSpacebarRef = useRef(false);
  const isPanningRef = useRef(false);
  const startPanRef = useRef({ x: 0, y: 0 });

  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === " ") {
        event.preventDefault();
        isHoldingSpacebarRef.current = true;
        if (document.body.style.cursor !== "grabbing") {
          document.body.style.cursor = "grab";
        }
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === " ") {
        event.preventDefault();
        isHoldingSpacebarRef.current = false;
        document.body.style.cursor = isPanningRef.current ? "grabbing" : "auto";
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      setTranslate((prev) => ({
        x: prev.x - event.deltaX,
        y: prev.y - event.deltaY,
      }));
    };

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const handleDragStart = ({ active }: DragStartEvent) => {
    const componentToSelect = components.find(
      (c) => c.id === active.id || c.groupId === active.id,
    );
    if (!componentToSelect) return;

    const componentsToSelect = componentToSelect.groupId
      ? components.filter((c) => c.groupId === componentToSelect.groupId)
      : [componentToSelect];

    selectComponents(
      componentsToSelect.map((c) => c.id),
      true,
    );
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
      updateCoordinates(
        componentsToUpdate.map((c) => c.id),
        delta.x,
        delta.y,
      );
    } else {
      updateCoordinates([componentToUpdate.id], delta.x, delta.y);
    }
  };

  const handleMouseDown = useCallback(
    (event: React.MouseEvent) => {
      if (cursorType === "cursor" && !isHoldingSpacebarRef.current) return;
      document.body.style.cursor = "grabbing";
      isPanningRef.current = true;
      startPanRef.current = {
        x: event.clientX - translate.x,
        y: event.clientY - translate.y,
      };
    },
    [translate, cursorType],
  );

  const handleMouseMove = useCallback(
    (event: React.MouseEvent) => {
      if (cursorType === "cursor" && !isHoldingSpacebarRef.current) return;
      if (!isPanningRef.current) return;

      setTranslate({
        x: event.clientX - startPanRef.current.x,
        y: event.clientY - startPanRef.current.y,
      });
    },
    [cursorType],
  );

  const handleMouseUp = useCallback(() => {
    if (cursorType === "cursor" && !isHoldingSpacebarRef.current) return;
    if (cursorType === "grab") {
      document.body.style.cursor = "grab";
    } else {
      document.body.style.cursor = "auto";
    }
    isPanningRef.current = false;
  }, [cursorType]);

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
            transform: `translate(${translate.x}px, ${translate.y}px)`,
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
