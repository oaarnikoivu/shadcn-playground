import { useEffect } from "react";
import useStore from "@/stores";

export default function useInitializeStoreFromLink() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedState = urlParams.get("state");

    if (encodedState) {
      try {
        const serializedState = atob(encodedState);
        const state = JSON.parse(serializedState);
        useStore.setState(state);
      } catch (error) {
        console.error("Error parsing state from URL", error);
      }
    }
  }, []);
}
