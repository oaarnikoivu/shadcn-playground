import {
  Download,
  Folder,
  HelpCircle,
  ImageDown,
  MenuIcon,
  Monitor,
  Moon,
  Sun,
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
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useState } from "react";

type Theme = "light" | "dark" | "system";

export default function Menu() {
  const [theme, setTheme] = useState<Theme>("light");

  const handleThemeChange = (value?: Theme) => {
    switch (value) {
      case "dark":
        if (!document.body.classList.contains("dark")) {
          document.body.classList.add("dark");
        }
        break;
      case "light":
        if (document.body.classList.contains("dark")) {
          document.body.classList.remove("dark");
        }
        break;
    }

    if (value) {
      setTheme(value);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon">
          <MenuIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 ml-4">
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
        <DropdownMenuItem>
          <Trash2 className="size-3 mr-2" />
          Reset canvas
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="font-medium flex items-center justify-between">
          Theme
          <ToggleGroup
            type="single"
            size="sm"
            value={theme}
            defaultValue="light"
            onValueChange={handleThemeChange}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <ToggleGroupItem value="light" aria-label="Toggle light">
                    <Sun className="size-3" />
                  </ToggleGroupItem>
                </TooltipTrigger>
                <TooltipContent>Light mode</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <ToggleGroupItem value="dark" aria-label="Toggle dark">
                    <Moon className="size-3" />
                  </ToggleGroupItem>
                </TooltipTrigger>
                <TooltipContent>Dark mode</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <ToggleGroupItem value="system" aria-label="Toggle system">
                    <Monitor className="size-3" />
                  </ToggleGroupItem>
                </TooltipTrigger>
                <TooltipContent>System mode</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </ToggleGroup>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
