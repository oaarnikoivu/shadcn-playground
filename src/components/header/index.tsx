import ComponentsSheet from "./components-sheet";
import Menu from "./menu";
import ShareableLinkToast from "@/components/header/shareable-link-toast.tsx";
import CursorType from "@/components/header/cursor-type.tsx";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 h-header fixed top-0 left-0 right-0 z-10 bg-transparent">
      <Menu />
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <div className="flex items-center gap-2 rounded-md border shadow-md p-1 bg-background">
          <CursorType />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <ShareableLinkToast />
        <ComponentsSheet />
      </div>
    </header>
  );
}
