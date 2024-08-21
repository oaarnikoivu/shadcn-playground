import useStore from "@/stores";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import React from "react";

export default function Value() {
  const componentsToUpdate = useStore((state) =>
    state.getSelectedComponents(),
  ).filter((c) => c.selected);
  const updateComponents = useStore((state) => state.updateComponents);

  const currentValue =
    componentsToUpdate.length === 1
      ? componentsToUpdate[0].properties.value
      : "";

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    updateComponents(
      componentsToUpdate.map((c) => ({
        ...c,
        properties: {
          ...c.properties,
          value: value,
        },
      })),
    );
  };

  return (
    <div className="space-y-1">
      <Label className="font-semibold">Value</Label>
      <Input value={currentValue} onChange={handleValueChange} />
    </div>
  );
}
