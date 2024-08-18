import { SUPPORTED_COMPONENTS } from "@/constants";

export type Coordinate = {
  x: number;
  y: number;
};

export type PlaygroundUIComponent = {
  id: string;
  type: (typeof SUPPORTED_COMPONENTS)[number];
  coordinates: Coordinate;
  selected?: boolean;
};
