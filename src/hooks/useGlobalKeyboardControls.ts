import { useEffect } from "react";
import useCopy from "./useCopy";
import useCut from "./useCut";
import usePaste from "./usePaste";

export default function useGlobalKeyboardControls() {
  const { copiedComponents, setCopiedComponents } = useCopy();
  const { cutComponents, setCutComponents } = useCut();

  useEffect(() => {
    if (copiedComponents.length) {
      setCutComponents([]);
    }

    if (cutComponents.length) {
      setCopiedComponents([]);
    }
  }, [
    copiedComponents.length,
    cutComponents.length,
    setCopiedComponents,
    setCutComponents,
  ]);

  usePaste(copiedComponents.length ? copiedComponents : cutComponents);
}
