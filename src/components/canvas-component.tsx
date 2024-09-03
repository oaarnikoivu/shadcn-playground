import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import {
  AvatarProperties,
  ButtonProperties,
  InputProperties,
  PlaygroundUIComponent,
} from "@/types/component.ts";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type CanvasComponentProps = {
  component: PlaygroundUIComponent;
};

export default function CanvasComponent({ component }: CanvasComponentProps) {
  switch (component.type) {
    case "button": {
      const properties = component.properties as ButtonProperties;

      return (
        <Button variant={properties.variant} size={properties.size}>
          {properties.value}
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
    case "avatar": {
      const properties = component.properties as AvatarProperties;

      return (
        <Avatar>
          <AvatarImage src={properties.source} alt={properties.source} />
          <AvatarFallback>{properties.fallback}</AvatarFallback>
        </Avatar>
      );
    }
    default:
      return <></>;
  }
}
