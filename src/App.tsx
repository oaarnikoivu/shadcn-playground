import BoundingBox from "./components/bounding-box";
import DragSelection from "./components/drag-selection";
import Header from "./components/header";
import Editor from "@/components/editor";
import Footer from "@/components/footer";
import useTheme from "@/hooks/useTheme.ts";
import Canvas from "@/components/canvas.tsx";
import useInitializeStoreFromLink from "@/hooks/useInitializeStoreFromLink.ts";
import { Toaster } from "@/components/ui/sonner.tsx";
import { CheckCircle2 } from "lucide-react";

function App() {
  useInitializeStoreFromLink();
  useTheme();

  return (
    <>
      <Header />
      <Editor />
      <DragSelection />
      <BoundingBox />
      <Canvas />
      <Footer />
      <Toaster
        toastOptions={{
          classNames: {
            success:
              "bg-teal-100 border border-teal-200 shadow-sm text-teal-700",
            description: "text-teal-600",
          },
        }}
        icons={{
          success: <CheckCircle2 className="size-4" />,
        }}
      />
    </>
  );
}

export default App;
