import Section from "@/components/editor/section.tsx";
import useStore from "@/stores";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import React from "react";
import { horizontalSpacing, verticalSpacing } from "@/utils/spacing.ts";

const spacingTypes = ["horizontal", "vertical"] as const;

export default function Spacing() {
  const componentsToUpdate = useStore((state) => state.getSelectedComponents());
  const updateComponents = useStore((state) => state.updateComponents);

  const handleHorizontalSpacingChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const spacing = parseFloat(e.currentTarget.value);
    if (isNaN(spacing)) return;

    updateComponents(horizontalSpacing(spacing, componentsToUpdate));
  };

  const handleVerticalSpacingChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const spacing = parseFloat(e.currentTarget.value);
    if (isNaN(spacing)) return;

    updateComponents(verticalSpacing(spacing, componentsToUpdate));
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
