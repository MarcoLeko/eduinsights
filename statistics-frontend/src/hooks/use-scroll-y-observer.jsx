import { useCallback, useEffect, useState } from "react";

export function useScrollYObserver(condition) {
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const onScroll = useCallback(function handleScroll() {
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;

    setIsScrolledToBottom(windowBottom >= docHeight);
  }, []);

  useEffect(() => {
    if (condition) {
      window.addEventListener("scroll", onScroll, false);
      return () => window.removeEventListener("scroll", onScroll, false);
    }
  }, [onScroll, condition]);
  return { isScrolledToBottom };
}
