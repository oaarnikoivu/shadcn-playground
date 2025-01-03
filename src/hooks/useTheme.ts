import { useEffect } from "react";
import { useStoreTheme } from "@/stores";

export default function useTheme() {
  const theme = useStoreTheme();

  useEffect(() => {
    const bodyHasDarkClass = document.body.classList.contains("dark");

    switch (theme) {
      case "light": {
        if (bodyHasDarkClass) {
          document.body.classList.remove("dark");
        }
        break;
      }
      case "dark": {
        if (!bodyHasDarkClass) {
          document.body.classList.add("dark");
        }
        break;
      }
      case "system": {
        const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
        if (darkThemeMq.matches) {
          if (!bodyHasDarkClass) {
            document.body.classList.add("dark");
          }
        } else {
          if (bodyHasDarkClass) {
            document.body.classList.remove("dark");
          }
        }
        break;
      }
      default:
        break;
    }
  }, [theme]);
}
