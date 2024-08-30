import {
  ButtonProperties,
  InputProperties,
  PlaygroundUIComponent,
} from "@/types/component.ts";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";

type CanvasComponentProps = {
  component: PlaygroundUIComponent;
};

export default function CanvasComponent({ component }: CanvasComponentProps) {
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
}
