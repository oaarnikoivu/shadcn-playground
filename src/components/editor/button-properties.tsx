import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group.tsx";
import { BUTTON_SIZES, BUTTON_VARIANTS } from "@/constants.ts";
import { VariantProps } from "class-variance-authority";
import { Button } from "@/components/ui/button.tsx";
import useStore from "@/stores";
import { ButtonProperties as TButtonProperties } from "@/types/component.ts";
import Section from "@/components/editor/section.tsx";

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
      <Section title="Size">
        <ToggleGroup
          type="single"
          value={
            componentsToUpdate.length === 1
              ? String(
                  (componentsToUpdate[0].properties as TButtonProperties).size,
                )
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
      </Section>
      <Section title="Variant">
        <ToggleGroup
          type="single"
          value={
            componentsToUpdate.length === 1
              ? String(
                  (componentsToUpdate[0].properties as TButtonProperties)
                    .variant,
                )
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
      </Section>
    </>
  );
}