import Section from "@/components/editor/section.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group.tsx";
import { BUTTON_SIZES, BUTTON_VARIANTS } from "@/constants.ts";
import { useComponentActions, useSelectedByType } from "@/stores";
import {
  PlaygroundUIComponent,
  ButtonProperties as TButtonProperties,
} from "@/types/component.ts";
import { VariantProps } from "class-variance-authority";
import { useMemo } from "react";
import Value from "./value";

export default function ButtonProperties() {
  const componentsToUpdate = useSelectedByType("button");
  const { updateComponents } = useComponentActions();

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
    updateComponents(
      componentsToUpdate.reduce(
        (acc, c) => {
          acc[c.id] = {
            ...c,
            properties: {
              ...c.properties,
              size: value as VariantProps<typeof Button>["size"],
            },
          };
          return acc;
        },
        {} as Record<string, PlaygroundUIComponent>,
      ),
    );
  };

  const handleVariantChange = (value: string) => {
    updateComponents(
      componentsToUpdate.reduce(
        (acc, c) => {
          acc[c.id] = {
            ...c,
            properties: {
              ...c.properties,
              variant: value as VariantProps<typeof Button>["variant"],
            },
          };
          return acc;
        },
        {} as Record<string, PlaygroundUIComponent>,
      ),
    );
  };

  return (
    <>
      <Value />
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
