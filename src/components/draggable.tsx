import { cn } from "@/lib/utils";
import {
  ButtonProperties,
  InputProperties,
  PlaygroundUIComponent,
} from "@/types/component";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useComponentActions, useComponents } from "@/stores";
import useClickOutsideDraggable from "@/hooks/useClickOutsideDraggable.ts";
import { useDraggable } from "@dnd-kit/core";

type DraggableProps = {
  component: PlaygroundUIComponent;
};

export default function Draggable({ component }: DraggableProps) {
  const components = useComponents();
  const { selectComponent, unselectComponent } = useComponentActions();

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: component.id,
  });

  useClickOutsideDraggable(component);

  const handleSelectComponent = () => {
    const componentsToUnselect = components.filter((c) => c.selected);
    componentsToUnselect.forEach((c) => {
      unselectComponent(c.id);
    });
    selectComponent(component.id);
  };

  const renderComponent = () => {
    switch (component.type) {
      case "button": {
        const properties = component.properties as ButtonProperties;
        return (
          <Button variant={properties.variant} size={properties.size}>
            {component.properties.value}
          </Button>
        );
      }
      case "input": {
        const properties = component.properties as InputProperties;
        return (
          <Input
            placeholder={properties.placeholder ?? ""}
            value={properties.value}
            style={{
              width: properties.width && `${properties.width}px`,
              height: properties.height && `${properties.height}px`,
            }}
          />
        );
      }
      default:
        return <></>;
    }
  };

  return (
    <div
      id={component.id}
      ref={setNodeRef}
      className={cn(
        component.selected &&
          "ring-2 outline-none ring-ring ring-offset-background ring-offset-2 rounded-md",
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
      {renderComponent()}
    </div>
  );
}
