import { useMediaQuery, useTheme } from "@material-ui/core";
import { useCallback, useState } from "react";

export const useD3Utils = (wrapperRef) => {
  const muiTheme = useTheme();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [toolTipPos, setToolTipPos] = useState({ pageX: null, pageY: null });

  const midSmallViewport = useMediaQuery(
    muiTheme.breakpoints.between("sm", 1000)
  );

  const mediumViewport = useMediaQuery(
    muiTheme.breakpoints.between(1001, "md")
  );

  const largeViewport = useMediaQuery(muiTheme.breakpoints.up("md"));

  const setSelectedCountryHandler = useCallback(
    (e, feature) => {
      setSelectedCountry(selectedCountry === feature ? null : feature);
      const rect = wrapperRef.current?.getBoundingClientRect();
      setToolTipPos({
        pageX: e.clientX - rect.left,
        pageY: e.clientY - rect.top,
      });
    },
    [selectedCountry, wrapperRef]
  );

  const resetSelectedCountryHandler = useCallback(() => {
    setSelectedCountry(null);
  }, []);

  function getVisualizationHeight() {
    // Viewport is rotated e.g. Mobile/tablet
    if (window.orientation === 90 || window.orientation === -90) {
      return "60vw";
    }

    if (midSmallViewport) {
      return "50vh";
    }

    if (mediumViewport) {
      return "600px";
    }

    if (largeViewport) {
      return "640px";
    }

    return "50vh";
  }

  return {
    getVisualizationHeight,
    setSelectedCountryHandler,
    resetSelectedCountryHandler,
    toolTipPos,
    selectedCountry,
  };
};
