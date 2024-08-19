import { Label } from "@/components/ui/label.tsx";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group.tsx";
import { BUTTON_SIZES, BUTTON_VARIANTS } from "@/constants.ts";
import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button.tsx";

type ButtonPropertiesProps = {
  defaultVariant?: VariantProps<typeof buttonVariants>["variant"];
  defaultSize?: VariantProps<typeof buttonVariants>["size"];
  onVariantChange: (value: string) => void;
  onSizeChange: (value: string) => void;
};

export default function ButtonProperties({
  defaultVariant,
  defaultSize,
  onVariantChange,
  onSizeChange,
}: ButtonPropertiesProps) {
  return (
    <>
      <div className="space-y-1">
        <Label className="font-semibold">Size</Label>
        <ToggleGroup
          type="single"
          value={defaultSize ?? undefined}
          className="justify-start"
        >
          {Object.entries(BUTTON_SIZES).map(([key, value]) => (
            <ToggleGroupItem
              value={key}
              aria-label={value}
              onClick={() => onSizeChange(key)}
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
          value={defaultVariant ?? undefined}
          className="justify-start flex-wrap"
        >
          {Object.entries(BUTTON_VARIANTS).map(([key, value]) => (
            <ToggleGroupItem
              value={key}
              aria-label={value}
              onClick={() => onVariantChange(key)}
            >
              {value}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </>
  );
}
