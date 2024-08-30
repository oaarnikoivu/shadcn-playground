import { useToolbarActions } from "@/stores";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group.tsx";
import { LayoutGrid } from "lucide-react";

export default function GridSelect() {
  const { toggleGridView } = useToolbarActions();

  return (
    <ToggleGroup type="single" onValueChange={toggleGridView}>
      <ToggleGroupItem value="grid">
        <LayoutGrid className="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
