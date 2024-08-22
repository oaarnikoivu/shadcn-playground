import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group.tsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";
import { THEMES } from "@/constants.ts";
import { Monitor, Moon, Sun } from "lucide-react";
import useStore from "@/stores";

export default function ThemeToggleGroup() {
  const theme = useStore((state) => state.theme);
  const setTheme = useStore((state) => state.setTheme);

  return (
    <ToggleGroup
      type="single"
      size="sm"
      value={theme}
      defaultValue="light"
      onValueChange={setTheme}
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
  );
}