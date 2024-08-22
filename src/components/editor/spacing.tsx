import Section from "@/components/editor/section.tsx";
import useStore from "@/stores";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import React from "react";
import {
  horizontalSpacing,
  horizontalSpacingContainerWidth,
  verticalSpacing,
  verticalSpacingContainerHeight,
} from "@/utils/spacing.ts";

const spacingTypes = ["horizontal", "vertical"] as const;

export default function Spacing() {
  const componentsToUpdate = useStore((state) => state.getSelectedComponents());
  const updateComponents = useStore((state) => state.updateComponents);
  const boundingBox = useStore((state) => state.boundingBox);
  const setBoundingBox = useStore((state) => state.setBoundingBox);

  const handleHorizontalSpacingChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const spacing = parseFloat(e.target.value);
    if (isNaN(spacing)) return;

    const spacedComponents = horizontalSpacing(
      spacing,
      componentsToUpdate.map((c) => ({
        ...c,
        coordinates: { ...c.coordinates },
      })),
    );

    const totalWidth = horizontalSpacingContainerWidth(
      spacedComponents,
      spacing,
    );

    if (boundingBox && totalWidth) {
      setBoundingBox({
        ...boundingBox,
        width: totalWidth,
      });
    }

    updateComponents(spacedComponents);
  };

  const handleVerticalSpacingChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const spacing = parseFloat(e.target.value);
    if (isNaN(spacing)) return;

    const spacedComponents = verticalSpacing(
      spacing,
      componentsToUpdate.map((c) => ({
        ...c,
        coordinates: { ...c.coordinates },
      })),
    );

    const totalHeight = verticalSpacingContainerHeight(
      spacedComponents,
      spacing,
    );

    if (boundingBox && totalHeight) {
      setBoundingBox({
        ...boundingBox,
        height: totalHeight,
      });
    }

    updateComponents(spacedComponents);
  };

  if (componentsToUpdate.length <= 1) return null;

  return (
    <Section title="Spacing (px)">
      {spacingTypes.map((type) => (
        <div key={type} className="grid grid-cols-3 items-center">
          <Label htmlFor={`${type}-spacing`}>{type}</Label>
          <Input
            id={`${type}-spacing`}
            className="h-8 col-span-2"
            onChange={(e) =>
              type === "horizontal"
                ? handleHorizontalSpacingChange(e)
                : handleVerticalSpacingChange(e)
            }
          />
        </div>
      ))}
    </Section>
  );
}
