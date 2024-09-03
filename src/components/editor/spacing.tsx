import Section from "@/components/editor/section.tsx";
import { useComponentActions, useSelected } from "@/stores";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import React from "react";
import { horizontalSpacing, verticalSpacing } from "@/utils/spacing.ts";
import isGroup from "@/utils/isGroup";

const spacingTypes = ["horizontal", "vertical"] as const;

export default function Spacing() {
  const componentsToUpdate = useSelected();
  const { updateCoordinates } = useComponentActions();

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

    spacedComponents.forEach((c) => {
      updateCoordinates(c.id, { x: c.coordinates.x, y: c.coordinates.y });
    });
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

    spacedComponents.forEach((c) => {
      updateCoordinates(c.id, { x: c.coordinates.x, y: c.coordinates.y });
    });
  };

  if (componentsToUpdate.length <= 1 || isGroup(componentsToUpdate))
    return null;

  return (
    <Section title="Spacing (px)">
      {spacingTypes.map((type) => (
        <div key={type} className="grid grid-cols-3 items-center">
          <Label htmlFor={`${type}-spacing`} className="capitalize">
            {type}
          </Label>
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
