import useComponentStore from "@/stores/component.store";
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
import { useState } from "react";
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

const THEMES = ["light", "dark", "system"] as const;

type Theme = (typeof THEMES)[number];

export default function Menu() {
  const { clearCanvas } = useComponentStore();
  const [theme, setTheme] = useState<Theme>("light");

  const handleThemeChange = (value?: string) => {
    const bodyHasDarkClass = document.body.classList.contains("dark");

    switch (value) {
      case "dark":
        if (!bodyHasDarkClass) {
          document.body.classList.add("dark");
        }
        break;
      case "light":
        if (bodyHasDarkClass) {
          document.body.classList.remove("dark");
        }
        break;
      case "system": {
        const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
        if (darkThemeMq.matches) {
          if (!bodyHasDarkClass) {
            document.body.classList.add("dark");
          }
        } else {
          if (bodyHasDarkClass) {
            document.body.classList.remove("dark");
          }
        }
        break;
      }
      default:
        break;
    }

    if (value) {
      setTheme(value as Theme);
    }
  };

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
          <ToggleGroup
            type="single"
            size="sm"
            value={theme}
            defaultValue="light"
            onValueChange={handleThemeChange}
          >
            <TooltipProvider>
              {THEMES.map((th) => (
                <Tooltip key={th}>
                  <TooltipTrigger>
                    <ToggleGroupItem value={th} aria-label={`Toggle ${th}`}>
                      {th === "light" && <Sun className="size-3" />}
                      {th === "dark" && <Moon className="size-3" />}
                      {th === "system" && <Monitor className="size-3" />}
                    </ToggleGroupItem>
                  </TooltipTrigger>
                  <TooltipContent>
                    {th.charAt(0).toUpperCase() + th.slice(1, th.length)} mode
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </ToggleGroup>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
