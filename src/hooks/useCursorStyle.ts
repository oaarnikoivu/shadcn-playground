import { useEffect, useState } from "react";

export default function useCursorStyle() {
  const [cursorStyle, setCursorStyle] = useState(document.body.style.cursor);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "style"
        ) {
          setCursorStyle(document.body.style.cursor);
        }
      });
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
    });

    return () => observer.disconnect();
  }, []);

  return cursorStyle;
}
