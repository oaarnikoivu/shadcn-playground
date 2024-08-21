import { AlignCenterHorizontal } from "lucide-react";
import { Label } from "@/components/ui/label.tsx";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group.tsx";
import { alignCenterHorizontal } from "@/utils";
import useStore from "@/stores";

const AlignOptions = {
  "align-center-horizontal": AlignCenterHorizontal,
};

export default function Align() {
  const boundingBox = useStore((state) => state.boundingBox);
  const selectedComponents = useStore((state) => state.getSelectedComponents());
  const updateComponents = useStore((state) => state.updateComponents);

  const handleAlign = () => {
    if (!boundingBox) return;
    updateComponents(alignCenterHorizontal(boundingBox, selectedComponents));
  };

  return (
    <div className="space-y-1">
      <Label className="font-semibold">Align</Label>
      <ToggleGroup type="single" className="justify-start">
        {Object.entries(AlignOptions).map(([key, Icon]) => (
          <ToggleGroupItem
            key={key}
            value={key}
            aria-label={key}
            onClick={handleAlign}
          >
            <Icon className="size-4" />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
