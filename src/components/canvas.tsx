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

export default function Canvas() {
  const components = useComponents();
  const { updateCoordinates } = useComponentActions();

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
    <main id="canvas" className="w-screen h-[calc(100vh-88px)] relative">
      <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        {components.map((component) => (
          <Draggable key={component.id} component={component} />
        ))}
      </DndContext>
    </main>
  );
}
