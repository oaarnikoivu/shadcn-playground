import ComponentsSheet from "./components-sheet";
import Menu from "./menu";
import ShareableLinkToast from "@/components/header/shareable-link-toast.tsx";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group.tsx";
import { Hand, LayoutGrid, MousePointer } from "lucide-react";
import { Separator } from "@/components/ui/separator.tsx";
import { useComponentActions } from "@/stores";

export default function Header() {
  const { updateGridView } = useComponentActions();

  const handleToggleGridView = (value: string) =>
    updateGridView(value === "grid");

  return (
    <header className="flex items-center justify-between px-4 h-header sticky top-0">
      <Menu />
      <div className="flex items-center gap-2 rounded-md border shadow-md p-1">
        <ToggleGroup type="single" onValueChange={handleToggleGridView}>
          <ToggleGroupItem value="grid">
            <LayoutGrid className="size-4" />
          </ToggleGroupItem>
        </ToggleGroup>
        <Separator orientation="vertical" className="text-red-500 h-6" />
        <ToggleGroup type="single" className="">
          <ToggleGroupItem value="hand">
            <Hand className="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="pointer">
            <MousePointer className="size-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="flex items-center gap-2">
        <ShareableLinkToast />
        <ComponentsSheet />
      </div>
    </header>
  );
}
