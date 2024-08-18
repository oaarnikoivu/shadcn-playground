import ComponentsSheet from "./components-sheet";
import Menu from "./menu";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 sticky">
      <Menu />
      <ComponentsSheet />
    </header>
  );
}
