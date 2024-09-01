import CanvasComponent from "@/components/canvas-component.tsx";
import useClickOutsideDraggable from "@/hooks/useClickOutsideDraggable.ts";
import { cn } from "@/lib/utils";
import { useComponentActions, useComponents } from "@/stores";
import { PlaygroundUIComponent } from "@/types/component";
import { useDraggable } from "@dnd-kit/core";

type DraggableProps = {
  component: PlaygroundUIComponent;
};

export default function Draggable({ component }: DraggableProps) {
  const components = useComponents();
  const { selectComponent, selectComponents, unselectComponent } =
    useComponentActions();

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: component.groupId ?? component.id,
  });

  useClickOutsideDraggable(component);

  const handleSelectComponent = () => {
    components.forEach((c) => {
      if (c.selected) {
        unselectComponent(c.id);
      }
    });

    if (component.groupId) {
      selectComponents(
        components
          .filter((c) => c.groupId === component.groupId)
          .map((c) => c.id)
      );
    } else {
      selectComponent(component.id);
    }
  };

  return (
    <div
      id={component.id}
      ref={setNodeRef}
      className={cn(
        component.selected &&
          "ring-2 outline-none ring-ring ring-offset-background ring-offset-2 rounded-md"
      )}
      style={{
        position: "absolute",
        left: `${component.coordinates.x}px`,
        top: `${component.coordinates.y}px`,
        ...(transform
          ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0px)`,
            }
          : {}),
      }}
      onClick={handleSelectComponent}
      {...listeners}
      {...attributes}
    >
      <CanvasComponent component={component} />
    </div>
  );
}
