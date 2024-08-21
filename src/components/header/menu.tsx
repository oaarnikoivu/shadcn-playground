import {
  Download,
  Folder,
  HelpCircle,
  ImageDown,
  MenuIcon,
  Trash2,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import ThemeToggleGroup from "@/components/header/theme-toggle-group.tsx";
import useStore from "@/stores";

export default function Menu() {
  const clearCanvas = useStore((state) => state.clearCanvas);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon">
          <MenuIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent id="menu" className="w-56 ml-4">
        <DropdownMenuItem>
          <Folder className="size-3 mr-2" />
          Open
          <DropdownMenuShortcut>⌘O</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Download className="size-3 mr-2" />
          Save to...
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ImageDown className="size-3 mr-2" />
          Export image
          <DropdownMenuShortcut>⌘⇧E</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <HelpCircle className="size-3 mr-2" />
          Help
        </DropdownMenuItem>
        <DropdownMenuItem onClick={clearCanvas}>
          <Trash2 className="size-3 mr-2" />
          Reset canvas
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="font-medium flex items-center justify-between">
          Theme
          <ThemeToggleGroup />
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
