import { useEffect, useRef, useState } from "react";
import { Box } from "@air/react-drag-to-select";
import { useStore } from "@/stores";
import createBoundingBox from "@/utils/createBoundingBox.ts";
import { useDraggable } from "@dnd-kit/core";

export default function BoundingBoxDraggable() {
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
