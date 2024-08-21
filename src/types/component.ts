import { SUPPORTED_COMPONENTS } from "@/constants";
import { VariantProps } from "class-variance-authority";
import { Button } from "@/components/ui/button.tsx";

export type Coordinate = {
  x: number;
  y: number;
};

type CommonProperties = {
  value: string;
};

export type ButtonProperties = {
  size: VariantProps<typeof Button>["size"];
  variant: VariantProps<typeof Button>["variant"];
} & CommonProperties;

export type PlaygroundUIComponent = {
  id: string;
  type: (typeof SUPPORTED_COMPONENTS)[number];
  coordinates: Coordinate;
  properties: ButtonProperties;
  selected?: boolean;
};
