import { Button } from "@/components/ui/button.tsx";
import { SUPPORTED_COMPONENTS } from "@/constants";
import { VariantProps } from "class-variance-authority";

export type Coordinate = {
  x: number;
  y: number;
};

interface CommonProperties {
  value: string;
  width?: number;
  height?: number;
}

export interface ButtonProperties extends CommonProperties {
  size: VariantProps<typeof Button>["size"];
  variant: VariantProps<typeof Button>["variant"];
}

export interface InputProperties extends CommonProperties {
  placeholder?: string;
}

export interface AvatarProperties {
  source?: string;
  fallback?: string;
}

export type Properties = ButtonProperties | InputProperties | AvatarProperties;

export type PlaygroundUIComponent = {
  id: string;
  type: (typeof SUPPORTED_COMPONENTS)[number];
  coordinates: Coordinate;
  properties: Properties;
  selected?: boolean;
  groupId?: string;
};
