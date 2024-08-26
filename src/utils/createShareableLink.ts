import { useStore } from "@/stores";

export function createShareableLink() {
  const state = useStore.getState();
  const serializedState = JSON.stringify(state);
  const hash = btoa(serializedState);
  return `${window.location.origin}?state=${hash}`;
}
