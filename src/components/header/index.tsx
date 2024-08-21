import ComponentsSheet from "./components-sheet";
import Menu from "./menu";
import ShareableLinkToast from "@/components/header/shareable-link-toast.tsx";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 h-header sticky top-0">
      <Menu />
      <div className="flex items-center gap-2">
        <ShareableLinkToast />
        <ComponentsSheet />
      </div>
    </header>
  );
}
