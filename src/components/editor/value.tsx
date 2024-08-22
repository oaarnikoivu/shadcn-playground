import useStore from "@/stores";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import React, { useState } from "react";

export default function Value() {
  const componentsToUpdate = useStore((state) =>
    state.getSelectedComponents(),
  ).filter((c) => c.selected);
  const updateComponents = useStore((state) => state.updateComponents);

  const [value, setValue] = useState(
    componentsToUpdate.length === 1
      ? componentsToUpdate[0].properties.value
      : "",
  );

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);

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
