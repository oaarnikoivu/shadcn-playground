import { useComponentActions, useSelected } from "@/stores";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import React, { useMemo } from "react";
import { PlaygroundUIComponent } from "@/types/component";

export default function Value() {
  const componentsToUpdate = useSelected();
  const { updateComponents } = useComponentActions();

  const value = useMemo(() => {
    if (!componentsToUpdate.length) return "";

    const firstComponentValue = componentsToUpdate[0].properties.value;

    if (componentsToUpdate.length > 1) {
      const allValuesAreEqual = componentsToUpdate.every(
        (c) => c.properties.value === firstComponentValue,
      );
      return allValuesAreEqual ? firstComponentValue : "";
    }

    return firstComponentValue;
  }, [componentsToUpdate]);

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    updateComponents(
      componentsToUpdate.reduce(
        (acc, c) => {
          acc[c.id] = {
            ...c,
            properties: {
              ...c.properties,
              value: newValue,
            },
          };
          return acc;
        },
        {} as Record<string, PlaygroundUIComponent>,
      ),
    );
  };

  return (
    <div className="space-y-1">
      <Label className="font-semibold">Value</Label>
      <Input value={value} onChange={handleValueChange} />
    </div>
  );
}
