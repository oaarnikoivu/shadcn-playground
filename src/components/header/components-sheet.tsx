import { Button } from "@/components/ui/button";
import { SUPPORTED_COMPONENTS } from "@/constants";
import { useComponentActions } from "@/stores";
import { BookOpen } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

export default function ComponentsSheet() {
  const { addComponents } = useComponentActions();

  const handleSelectComponent = (componentType: string) =>
    addComponents([
      {
        id: crypto.randomUUID(),
        type: componentType as (typeof SUPPORTED_COMPONENTS)[number],
        // TODO: get valid coordinates
        coordinates: { x: 0, y: 88 },
        properties: {
          size: "default",
          variant: "default",
          value: "Hi, world",
          source:
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          fallback: "PG",
        },
      },
    ]);

  return (
    <Sheet modal={false}>
      <SheetTrigger asChild>
        <Button variant="secondary" className="flex items-center gap-2">
          <BookOpen className="size-3" />
          Components
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Components</SheetTitle>
          <SheetDescription>
            Select components to add to your canvas here.
          </SheetDescription>
        </SheetHeader>
        <Command className="mt-4">
          <CommandInput placeholder="Search component..." />
          <CommandList>
            <CommandEmpty>No component found.</CommandEmpty>
            <CommandGroup>
              {SUPPORTED_COMPONENTS.map((component, index) => (
                <CommandItem
                  key={component}
                  value={component}
                  className="cursor-pointer flex items-center justify-between capitalize"
                  onSelect={handleSelectComponent}
                >
                  {component}
                  <kbd className="border px-1.5 rounded-md uppercase">
                    {index + 1}
                  </kbd>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </SheetContent>
    </Sheet>
  );
}
