import { Button } from "@/components/ui/button.tsx";
import { HelpCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="flex items-center justify-end w-screen px-4 fixed h-header bottom-0">
      <Button variant="secondary" size="icon">
        <HelpCircle className="size-4" />
      </Button>
    </footer>
  );
}
