import { useCallback, useEffect, useRef, useState } from "react";
import { useMediaQuery, useTheme } from "@material-ui/core";

export function useScrollYObserver(observerEnabled, targetElement, root) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [scrollDirection, setScrollDirection] = useState(null);
  const materialUiTheme = useTheme();
  const matches = useMediaQuery(materialUiTheme.breakpoints.down("xs"));
  const rootMarginTop = matches ? -52 : -105;
  const intersectionObserver = useRef(null);

  const getScrollDirection = useCallback(
    (entry) => {
      if (
        entry.isIntersecting === false &&
        entry.intersectionRect.y + rootMarginTop === 0
      ) {
        return "toTop";
      }
      if (
        entry.isIntersecting &&
        entry.intersectionRect.y + rootMarginTop >= 0
      ) {
        return "toTop";
      }
      return "toBottom";
    },
    [rootMarginTop]
  );

  useEffect(() => {
    intersectionObserver.current = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        setScrollDirection(getScrollDirection(entry));
      },
      {
        threshold: 1.0,
        rootMargin: `${rootMarginTop}px 0px 0px 0px`,
      }
    );

    if (targetElement && observerEnabled) {
      intersectionObserver.current.observe(targetElement);
    }

    return function disconnectIntersectionObserver() {
      intersectionObserver.current.disconnect();
    };
  }, [
    targetElement,
    setIsIntersecting,
    root,
    observerEnabled,
    rootMarginTop,
    getScrollDirection,
  ]);

  return { isIntersecting, scrollDirection };
}
