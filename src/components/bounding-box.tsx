import useDraggable from "@/hooks/useDraggable.ts";
import { Box } from "@air/react-drag-to-select";
import useStore from "@/stores";

export default function BoundingBox() {
  const boundingBox = useStore((state) => state.boundingBox);
  const setBoundingBox = useStore((state) => state.setBoundingBox);
  const updateComponents = useStore((state) => state.updateComponents);
  const selectedComponents = useStore((state) => state.getSelectedComponents());

  const { ref, getCurrentPosition, onDrag } = useDraggable({
    onDragEnd: () => {
      const newCoordinates = getCurrentPosition();
      const deltaX = newCoordinates.x - (boundingBox?.left ?? 0);
      const deltaY = newCoordinates.y - (boundingBox?.top ?? 0);

      const newBoundingBox: Box = {
        width: boundingBox?.width ?? 0,
        height: boundingBox?.height ?? 0,
        left: newCoordinates.x,
        top: newCoordinates.y,
      };

      updateComponents(
        selectedComponents.map((c) => ({
          ...c,
          coordinates: {
            x: c.coordinates.x + deltaX,
            y: c.coordinates.y + deltaY,
          },
        })),
      );

      setBoundingBox(newBoundingBox);
    },
  });

  if (!boundingBox) return null;

  return (
    <div
      id="bbox"
      ref={ref}
      className="z-10 rounded-xs outline-primary outline-dashed outline-offset-8 cursor-grab"
      style={{
        position: "absolute",
        left: `${boundingBox.left}px`,
        top: `${boundingBox.top}px`,
        height: `${boundingBox.height}px`,
        width: `${boundingBox.width}px`,
      }}
      onMouseDown={onDrag}
    />
  );
}
