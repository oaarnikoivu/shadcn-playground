import {
  useComponentActions,
  useCursorType,
  useToolbarActions,
} from "@/stores";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group.tsx";
import { Hand, MousePointer } from "lucide-react";

export default function CursorType() {
  const { unselectAllComponents } = useComponentActions();
  const cursorType = useCursorType();
  const { updateCursor } = useToolbarActions();

  const handleToggleCursorType = (value?: string) => {
    if (!value) return;

    const newCursorType = value as typeof cursorType;

    if (newCursorType === "grab") {
      document.body.style.cursor = "grab";
      unselectAllComponents();
    } else {
      document.body.style.cursor = "auto";
    }

    updateCursor(newCursorType);
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
