import useStore from "@/stores";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import React, { useMemo } from "react";

export default function Value() {
  const componentsToUpdate = useStore((state) =>
    state.getSelectedComponents(),
  ).filter((c) => c.selected);
  const updateComponents = useStore((state) => state.updateComponents);

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
      componentsToUpdate.map((c) => ({
        ...c,
        properties: {
          ...c.properties,
          value: newValue,
        },
      })),
    );
  };

  return (
    <div className="space-y-1">
      <Label className="font-semibold">Value</Label>
      <Input value={value} onChange={handleValueChange} />
    </div>
  );
}
