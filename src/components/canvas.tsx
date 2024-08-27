import Draggable from "@/components/draggable.tsx";
import { useComponentActions, useComponents } from "@/stores";
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import useSnapModifier from "@/hooks/useSnapModifier.ts";
import GridOverlay from "@/components/grid-overlay.tsx";

export default function Canvas() {
  const components = useComponents();
  const { updateCoordinates } = useComponentActions();

  const modifiers = useSnapModifier();

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 10 } }),
    useSensor(TouchSensor),
  );

  const handleDragEnd = ({ delta, active }: DragEndEvent) => {
    if (!delta.x && !delta.y) return;

    const componentToUpdate = components.find((c) => c.id === active.id);
    if (!componentToUpdate) return;

    updateCoordinates(componentToUpdate.id, {
      x: componentToUpdate.coordinates.x + delta.x,
      y: componentToUpdate.coordinates.y + delta.y,
    });
  };

  return (
    <main
      id="canvas"
      className="w-screen h-screen -mt-[var(--header-height)] relative"
    >
      {modifiers.length > 0 && <GridOverlay gridSize={40} />}
      <DndContext
        modifiers={modifiers}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        {components.map((component) => (
          <Draggable key={component.id} component={component} />
        ))}
      </DndContext>
    </main>
  );
}
