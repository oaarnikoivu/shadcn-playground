import Section from "@/components/editor/section.tsx";
import useStore from "@/stores";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import React from "react";
import { horizontalSpacing } from "@/utils/spacing.ts";

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

  if (componentsToUpdate.length <= 1) return null;

  return (
    <Section title="Spacing (px)">
      <div className="grid grid-cols-3 items-center">
        <Label htmlFor="vertical-spacing">Vertical</Label>
        <Input id="vertical-spacing" className="h-8 col-span-2" />
      </div>
      <div className="grid grid-cols-3 items-center">
        <Label htmlFor="horizontal-spacing">Horizontal</Label>
        <Input
          id="horizontal-spacing"
          className="h-8 col-span-2"
          onChange={handleHorizontalSpacingChange}
        />
      </div>
    </Section>
  );
}
