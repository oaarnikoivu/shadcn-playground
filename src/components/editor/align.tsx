import {
  AlignCenterHorizontal,
  AlignCenterVertical,
  AlignEndHorizontal,
  AlignEndVertical,
  AlignStartHorizontal,
  AlignStartVertical,
} from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group.tsx";
import { useComponentActions, useSelected } from "@/stores";
import Section from "@/components/editor/section.tsx";
import {
  alignCenterHorizontal,
  alignCenterVertical,
  alignEndHorizontal,
  alignEndVertical,
  alignStartHorizontal,
  alignStartVertical,
} from "@/utils/align.ts";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const AlignOptions = {
  "align-center-horizontal": {
    icon: AlignCenterHorizontal,
    handler: alignCenterHorizontal,
    tooltip: "Align center horizontally",
  },
  "align-center-vertical": {
    icon: AlignCenterVertical,
    handler: alignCenterVertical,
    tooltip: "Align center vertically",
  },
  "align-end-horizontal": {
    icon: AlignEndHorizontal,
    handler: alignEndHorizontal,
    tooltip: "Align end horizontally",
  },
  "align-end-vertical": {
    icon: AlignEndVertical,
    handler: alignEndVertical,
    tooltip: "Align end vertically",
  },
  "align-start-horizontal": {
    icon: AlignStartHorizontal,
    handler: alignStartHorizontal,
    tooltip: "Align start horizontally",
  },
  "align-start-vertical": {
    icon: AlignStartVertical,
    handler: alignStartVertical,
    tooltip: "Align start vertically",
  },
};

export default function Align() {
  const selectedComponents = useSelected();
  const { updateCoordinates } = useComponentActions();

  const handleAlign = (
    value: (typeof AlignOptions)[keyof typeof AlignOptions],
  ) => {
    const alignedComponents = value.handler(selectedComponents);
    alignedComponents.forEach((c) => {
      updateCoordinates(c.id, {
        x: c.coordinates.x,
        y: c.coordinates.y,
      });
    });
  };

  if (selectedComponents.length === 1) return null;

  return (
    <Section title="Align">
      <ToggleGroup type="single" className="justify-start flex-wrap">
        <TooltipProvider>
          {Object.entries(AlignOptions).map(([key, value]) => (
            <Tooltip key={key}>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  value={key}
                  aria-label={key}
                  onClick={() => handleAlign(value)}
                >
                  <value.icon className="size-4" />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent>{value.tooltip}</TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </ToggleGroup>
    </Section>
  );
}
