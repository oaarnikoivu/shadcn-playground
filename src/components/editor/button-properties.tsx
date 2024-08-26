import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group.tsx";
import { BUTTON_SIZES, BUTTON_VARIANTS } from "@/constants.ts";
import { VariantProps } from "class-variance-authority";
import { Button } from "@/components/ui/button.tsx";
import { useComponentActions, useSelectedByType } from "@/stores";
import { ButtonProperties as TButtonProperties } from "@/types/component.ts";
import Section from "@/components/editor/section.tsx";
import { useMemo } from "react";

export default function ButtonProperties() {
  const componentsToUpdate = useSelectedByType("button");
  const { updateProperties } = useComponentActions();

  const size = useMemo(() => {
    if (!componentsToUpdate.length) return "";

    const firstComponentSize = (
      componentsToUpdate[0].properties as TButtonProperties
    ).size;

    if (componentsToUpdate.length > 1) {
      const isSameSize = componentsToUpdate.every(
        (c) => (c.properties as TButtonProperties).size === firstComponentSize,
      );
      return isSameSize ? firstComponentSize : undefined;
    }

    return firstComponentSize;
  }, [componentsToUpdate]);

  const variant = useMemo(() => {
    if (!componentsToUpdate.length) return "";

    const firstComponentVariant = (
      componentsToUpdate[0].properties as TButtonProperties
    ).variant;

    if (componentsToUpdate.length > 1) {
      const isSameVariant = componentsToUpdate.every(
        (c) =>
          (c.properties as TButtonProperties).variant === firstComponentVariant,
      );
      return isSameVariant ? firstComponentVariant : undefined;
    }

    return firstComponentVariant;
  }, [componentsToUpdate]);

  const handleSizeChange = (value: string) => {
    componentsToUpdate.forEach((c) => {
      updateProperties(c.id, {
        ...c.properties,
        size: value as VariantProps<typeof Button>["size"],
      });
    });
  };

  const handleVariantChange = (value: string) => {
    componentsToUpdate.forEach((c) => {
      updateProperties(c.id, {
        ...c.properties,
        variant: value as VariantProps<typeof Button>["variant"],
      });
    });
  };

  return (
    <>
      <Section title="Size">
        <ToggleGroup
          type="single"
          value={String(size)}
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
          value={String(variant)}
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
