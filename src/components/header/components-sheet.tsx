import { BookOpen } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { useState } from "react";

const components = [
  {
    value: "accordion",
    label: "Accordion",
    kbd: "AC",
  },
  {
    value: "avatar",
    label: "Avatar",
    kbd: "AV",
  },
  {
    value: "button",
    label: "Button",
    kbd: "B",
  },
  {
    value: "input",
    label: "Input",
    kbd: "I",
  },
];

export default function ComponentsSheet() {
  const [value, setValue] = useState("");

  return (
    <Sheet modal={false}>
      <SheetTrigger>
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
              {components.map((component, index) => (
                <CommandItem
                  key={component.value}
                  value={component.value}
                  className="cursor-pointer flex items-center justify-between"
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                  }}
                >
                  {component.label}
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
