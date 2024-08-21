import { Label } from "@/components/ui/label.tsx";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group.tsx";
import { BUTTON_SIZES, BUTTON_VARIANTS } from "@/constants.ts";
import { VariantProps } from "class-variance-authority";
import { Button } from "@/components/ui/button.tsx";
import Actions from "@/components/editor/actions.tsx";
import Align from "@/components/editor/align.tsx";
import useStore from "@/stores";

export default function ButtonProperties() {
  const componentsToUpdate = useStore((state) =>
    state.getSelectedComponents(),
  ).filter((c) => c.selected && c.type === "button");
  const updateComponents = useStore((state) => state.updateComponents);

  const handleSizeChange = (value: string) => {
    updateComponents(
      componentsToUpdate.map((c) => ({
        ...c,
        properties: {
          ...c.properties,
          size: value as VariantProps<typeof Button>["size"],
        },
      })),
    );
  };

  const handleVariantChange = (value: string) => {
    updateComponents(
      componentsToUpdate.map((c) => ({
        ...c,
        properties: {
          ...c.properties,
          variant: value as VariantProps<typeof Button>["variant"],
        },
      })),
    );
  };

  return (
    <>
      <div className="space-y-1">
        <Label className="font-semibold">Size</Label>
        <ToggleGroup
          type="single"
          value={
            componentsToUpdate.length === 1
              ? String(componentsToUpdate[0].properties.size)
              : undefined
          }
          className="justify-start"
        >
          {Object.entries(BUTTON_SIZES).map(([key, value]) => (
            <ToggleGroupItem
              key={key}
              value={key}
              aria-label={value}
              onClick={() => handleSizeChange(key)}
            >
              {value}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <div className="space-y-1">
        <Label className="font-semibold">Variant</Label>
        <ToggleGroup
          type="single"
          value={
            componentsToUpdate.length === 1
              ? String(componentsToUpdate[0].properties.variant)
              : undefined
          }
          className="justify-start flex-wrap"
        >
          {Object.entries(BUTTON_VARIANTS).map(([key, value]) => (
            <ToggleGroupItem
              key={key}
              value={key}
              aria-label={value}
              onClick={() => handleVariantChange(key)}
            >
              {value}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <Align />
      <Actions />
    </>
  );
}
