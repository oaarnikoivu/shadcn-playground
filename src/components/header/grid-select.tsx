import { useComponentActions } from "@/stores";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group.tsx";
import { LayoutGrid } from "lucide-react";

export default function GridSelect() {
  const { updateGridView } = useComponentActions();

  const handleToggleGridView = (value: string) =>
    updateGridView(value === "grid");

  return (
    <ToggleGroup type="single" onValueChange={handleToggleGridView}>
      <ToggleGroupItem value="grid">
        <LayoutGrid className="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
