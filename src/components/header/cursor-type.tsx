import { useComponentActions, useCursorType } from "@/stores";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group.tsx";
import { Hand, MousePointer } from "lucide-react";

export default function CursorType() {
  const cursorType = useCursorType();
  const { updateCursorType } = useComponentActions();

  const handleToggleCursorType = (value?: string) => {
    if (!value) return;

    const newCursorType = value as "cursor" | "grab";

    if (newCursorType === "grab") {
      document.body.style.cursor = "grab";
    } else {
      document.body.style.cursor = "auto";
    }

    updateCursorType(newCursorType);
  };

  return (
    <ToggleGroup
      type="single"
      value={cursorType}
      defaultValue="cursor"
      onValueChange={handleToggleCursorType}
    >
      <ToggleGroupItem value="grab">
        <Hand className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="cursor">
        <MousePointer className="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
