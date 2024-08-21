import useDraggable from "@/hooks/useDraggable";
import { cn } from "@/lib/utils";
import {
  ButtonProperties,
  InputProperties,
  PlaygroundUIComponent,
} from "@/types/component";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import useStore from "@/stores";
import useClickOutsideDraggable from "@/hooks/useClickOutsideDraggable.ts";

type DraggableProps = {
  component: PlaygroundUIComponent;
};

export default function Draggable({ component }: DraggableProps) {
  const updateComponent = useStore((state) => state.updateComponent);
  const updateComponents = useStore((state) => state.updateComponents);
  const selectedComponents = useStore((state) => state.getSelectedComponents());

  useClickOutsideDraggable(component);

  const { ref, getCurrentPosition, onDrag } = useDraggable({
    initialCoordinates: component.coordinates,
    onDragEnd: () => {
      const newCoordinates = getCurrentPosition();
      updateComponent({
        ...component,
        coordinates: newCoordinates,
      });
    },
  });

  const handleSelectComponent = () => {
    updateComponents(
      selectedComponents
        .map((c) => ({ ...c, selected: false }))
        .concat({ ...component, selected: true }),
    );
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
      ref={ref}
      className={cn(
        component.selected &&
          "ring-2 outline-none ring-ring ring-offset-background ring-offset-2 rounded-md",
      )}
      style={{
        position: "absolute",
        left: `${component.coordinates.x}px`,
        top: `${component.coordinates.y}px`,
      }}
      onClick={handleSelectComponent}
      onMouseDown={onDrag}
    >
      {renderComponent()}
    </div>
  );
}
