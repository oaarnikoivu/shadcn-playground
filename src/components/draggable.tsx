import useDraggable from "@/hooks/useDraggable";
import { cn } from "@/lib/utils";
import useComponentStore from "@/stores/component.store";
import { PlaygroundUIComponent } from "@/types/component";
import { useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type DraggableProps = {
  component: PlaygroundUIComponent;
};

export default function Draggable({ component }: DraggableProps) {
  const { updateComponent } = useComponentStore();

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
    updateComponent({ ...component, selected: !component.selected });
  };

  const renderComponent = () => {
    switch (component.type) {
      case "button":
        return <Button>Value</Button>;
      case "input":
        return <Input className="focus-visible:outline-none" />;
      default:
        return <></>;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.id !== component.id && component?.selected) {
        updateComponent({ ...component, selected: false });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [component, updateComponent]);

  return (
    <div
      id={component.id}
      ref={ref}
      className={cn(
        component.selected &&
          "z-10 ring-2 outline-none ring-ring ring-offset-background ring-offset-2 rounded-md"
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
