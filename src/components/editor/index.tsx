import { Popover, PopoverContent } from "@/components/ui/popover.tsx";
import useComponentStore from "@/stores/component.store.ts";
import { Button } from "@/components/ui/button.tsx";
import { VariantProps } from "class-variance-authority";
import ButtonProperties from "@/components/editor/button-properties.tsx";

export default function Editor() {
  const selectedComponents = useComponentStore((state) =>
    state.getSelectedComponents(),
  );
  const updateComponents = useComponentStore((state) => state.updateComponents);

  const handleSizeChange = (value: string) => {
    const componentsToUpdate = selectedComponents.filter(
      (c) => c.type === "button",
    );
    updateComponents(
      componentsToUpdate.map((c) => ({
        ...c,
        properties: {
          ...c.properties,
          size: value as VariantProps<typeof Button>["size"],
        },
      })),
    );
  };

  const handleVariantChange = (value: string) => {
    const componentsToUpdate = selectedComponents.filter(
      (c) => c.type === "button",
    );
    updateComponents(
      componentsToUpdate.map((c) => ({
        ...c,
        properties: {
          ...c.properties,
          variant: value as VariantProps<typeof Button>["variant"],
        },
      })),
    );
  };

  return (
    <Popover open={selectedComponents.length > 0}>
      <PopoverContent
        id="editor"
        className="w-[280px] absolute left-4 top-20"
        asChild
      >
        <div className="flex flex-col gap-2">
          <ButtonProperties
            defaultVariant={
              selectedComponents.length === 1
                ? selectedComponents[0].properties.variant
                : undefined
            }
            defaultSize={
              selectedComponents.length === 1
                ? selectedComponents[0].properties.size
                : undefined
            }
            onVariantChange={handleVariantChange}
            onSizeChange={handleSizeChange}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
