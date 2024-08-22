import useStore from "@/stores";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import React, { useEffect, useState } from "react";

export default function Value() {
  const componentsToUpdate = useStore((state) =>
    state.getSelectedComponents(),
  ).filter((c) => c.selected);
  const updateComponents = useStore((state) => state.updateComponents);

  const [value, setValue] = useState("");

  useEffect(() => {
    if (componentsToUpdate.length === 1) {
      setValue(componentsToUpdate[0].properties.value);
    }
  }, [componentsToUpdate]);

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValue(value);

    updateComponents(
      componentsToUpdate.map((c) => ({
        ...c,
        properties: {
          ...c.properties,
          value,
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
