import { Button } from "@/components/ui/button.tsx";
import { HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";
import useStore from "@/stores";

export default function Footer() {
  const selectedComponents = useStore((state) => state.getSelectedComponents());

  return (
    <footer className="flex items-center justify-between w-screen px-4 fixed h-header bottom-0">
      <div />
      {selectedComponents.length > 0 && (
        <Input id="prompt" className="w-[40%]" placeholder="Prompt..." />
      )}
      <Button variant="secondary" size="icon">
        <HelpCircle className="size-4" />
      </Button>
    </footer>
  );
}
