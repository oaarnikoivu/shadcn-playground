import ComponentsSheet from "./components-sheet";
import Menu from "./menu";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 h-header">
      <Menu />
      <ComponentsSheet />
    </header>
  );
}
