import BoundingBox from "./components/bounding-box";
import DragSelection from "./components/drag-selection";
import Draggable from "./components/draggable";
import Header from "./components/header";
import useComponentStore from "./stores/component.store";
import Editor from "@/components/editor.tsx";
import Footer from "@/components/footer";

function App() {
  const { components } = useComponentStore();

  return (
    <>
      <Header />
      <Editor />
      <DragSelection />
      <BoundingBox />
      <main id="canvas" className="w-screen h-[calc(100vh-80px)] relative">
        {components.map((component) => (
          <Draggable key={component.id} component={component} />
        ))}
      </main>
      <Footer />
    </>
  );
}

export default App;
