import BoundingBox from "./components/bounding-box";
import DragSelection from "./components/drag-selection";
import Header from "./components/header";
import Editor from "@/components/editor";
import Footer from "@/components/footer";
import useTheme from "@/hooks/useTheme.ts";
import Canvas from "@/components/canvas.tsx";

function App() {
  useTheme();

  return (
    <>
      <Header />
      <Editor />
      <DragSelection />
      <BoundingBox />
      <Canvas />
      <Footer />
    </>
  );
}

export default App;
