import { AlignCenterHorizontal, AlignCenterVertical } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group.tsx";
import { useComponentActions, useSelected } from "@/stores";
import Section from "@/components/editor/section.tsx";
import { alignCenterHorizontal, alignCenterVertical } from "@/utils/align.ts";

const AlignOptions = {
  "align-center-horizontal": AlignCenterHorizontal,
  "align-center-vertical": AlignCenterVertical,
};

export default function Align() {
  const selectedComponents = useSelected();
  const { updateCoordinates } = useComponentActions();

  const handleAlign = (key: keyof typeof AlignOptions) => {
    switch (key) {
      case "align-center-horizontal": {
        const alignedComponents = alignCenterHorizontal(selectedComponents);
        alignedComponents.forEach((c) => {
          updateCoordinates(c.id, { x: c.coordinates.x, y: c.coordinates.y });
        });
        break;
      }
      case "align-center-vertical": {
        const alignedComponents = alignCenterVertical(selectedComponents);
        alignedComponents.forEach((c) => {
          updateCoordinates(c.id, { x: c.coordinates.x, y: c.coordinates.y });
        });
        break;
      }
      default:
        break;
    }
  };

  if (selectedComponents.length === 1) return null;

  return (
    <Section title="Align">
      <ToggleGroup type="single" className="justify-start">
        {Object.entries(AlignOptions).map(([key, Icon]) => (
          <ToggleGroupItem
            key={key}
            value={key}
            aria-label={key}
            onClick={() => handleAlign(key as keyof typeof AlignOptions)}
          >
            <Icon className="size-4" />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </Section>
  );
}
