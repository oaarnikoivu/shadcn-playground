import { Popover, PopoverContent } from "@/components/ui/popover.tsx";
import useComponentStore from "@/stores/component.store.ts";
import { Label } from "@/components/ui/label.tsx";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group.tsx";
import { Button } from "@/components/ui/button.tsx";
import { VariantProps } from "class-variance-authority";
import { BUTTON_SIZES, BUTTON_VARIANTS } from "@/constants.ts";

export default function Editor() {
  const selectedComponents = useComponentStore((state) =>
    state.getSelectedComponents(),
  );
  const updateComponent = useComponentStore((state) => state.updateComponent);

  const component = selectedComponents[0];

  const handleSizeChange = (value: string) => {
    updateComponent({
      ...component,
      properties: {
        ...component.properties,
        size: value as VariantProps<typeof Button>["size"],
      },
    });
  };

  const handleVariantChange = (value: string) => {
    updateComponent({
      ...component,
      properties: {
        ...component.properties,
        variant: value as VariantProps<typeof Button>["variant"],
      },
    });
  };

  return (
    <Popover open={selectedComponents.length > 0}>
      <PopoverContent
        id="editor"
        className="w-[280px] absolute left-4 top-20"
        asChild
      >
        <div className="flex flex-col gap-2">
          <div className="space-y-1">
            <Label className="font-semibold">Size</Label>
            <ToggleGroup
              type="single"
              defaultValue={component?.properties.size ?? "default"}
              className="justify-start"
            >
              {Object.entries(BUTTON_SIZES).map(([key, value]) => (
                <ToggleGroupItem
                  value={key}
                  aria-label={value}
                  onClick={() => handleSizeChange(key)}
                >
                  {value}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          <div className="space-y-1">
            <Label className="font-semibold">Variant</Label>
            <ToggleGroup
              type="single"
              defaultValue={component?.properties.variant ?? "default"}
              className="justify-start flex-wrap"
            >
              {Object.entries(BUTTON_VARIANTS).map(([key, value]) => (
                <ToggleGroupItem
                  value={key}
                  aria-label={value}
                  onClick={() => handleVariantChange(key)}
                >
                  {value}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
