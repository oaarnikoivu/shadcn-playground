import useDraggable from "@/hooks/useDraggable";
import useComponentStore from "@/stores/component.store";
import { PlaygroundUIComponent } from "@/types/component";
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

  const renderComponent = () => {
    switch (component.type) {
      case "button":
        return <Button>Value</Button>;
      case "input":
        return <Input />;
      default:
        return <></>;
    }
  };

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        left: `${component.coordinates.x}px`,
        top: `${component.coordinates.y}px`,
      }}
      onMouseDown={onDrag}
    >
      {renderComponent()}
    </div>
  );
}
