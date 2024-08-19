import { Coordinate } from "@/types/component";
import { useCallback, useEffect, useRef } from "react";

type DraggableOptions = {
  initialCoordinates?: Coordinate;
  onDrag?: (x: number, y: number) => void;
  onDragEnd: () => void;
};

export default function useDraggable({
  initialCoordinates,
  onDrag,
  onDragEnd,
}: DraggableOptions) {
  const divRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const position = useRef(initialCoordinates ?? { x: 0, y: 0 });

  const getCurrentPosition = useCallback(() => {
    if (!divRef.current) return { x: 0, y: 0 };
    return {
      x: parseInt(divRef.current.style.left, 10) || 0,
      y: parseInt(divRef.current.style.top, 10) || 0,
    };
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!divRef.current) return;

    isDragging.current = true;

    position.current = {
      x: e.clientX - divRef.current.offsetLeft,
      y: e.clientY - divRef.current.offsetTop,
    };

    // Might need these in the future:
    e.stopPropagation();
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!divRef.current) return;
      if (!isDragging.current) return;

      const newX = e.clientX - position.current.x;
      const newY = e.clientY - position.current.y;

      divRef.current.style.left = `${newX}px`;
      divRef.current.style.top = `${newY}px`;

      onDrag?.(newX, newY);

      e.stopPropagation();
      e.preventDefault();
    },
    [onDrag],
  );

  const handleMouseUp = useCallback(
    (e: MouseEvent) => {
      if (isDragging.current) {
        isDragging.current = false;
        onDragEnd();
        e.stopPropagation();
        e.preventDefault();
      }
    },
    [onDragEnd],
  );

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return {
    ref: divRef,
    isDragging: isDragging.current,
    getCurrentPosition,
    onDrag: handleMouseDown,
  };
}
