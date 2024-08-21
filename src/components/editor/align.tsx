import { AlignCenterHorizontal, AlignCenterVertical } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group.tsx";
import { alignCenterHorizontal, alignCenterVertical } from "@/utils";
import useStore from "@/stores";
import Section from "@/components/editor/section.tsx";

const AlignOptions = {
  "align-center-horizontal": AlignCenterHorizontal,
  "align-center-vertical": AlignCenterVertical,
};

export default function Align() {
  const boundingBox = useStore((state) => state.boundingBox);
  const selectedComponents = useStore((state) => state.getSelectedComponents());
  const updateComponents = useStore((state) => state.updateComponents);

  const handleAlign = (key: keyof typeof AlignOptions) => {
    if (!boundingBox) return;

    switch (key) {
      case "align-center-horizontal":
        updateComponents(
          alignCenterHorizontal(boundingBox, selectedComponents),
        );
        break;
      case "align-center-vertical":
        updateComponents(alignCenterVertical(boundingBox, selectedComponents));
        break;
      default:
        break;
    }
  };

  if (!boundingBox) return null;

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
