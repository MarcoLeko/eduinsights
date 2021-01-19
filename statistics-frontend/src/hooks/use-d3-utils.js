import { useMediaQuery, useTheme } from "@material-ui/core";
import { useCallback, useState } from "react";

export const useD3Utils = (wrapperRef) => {
  const muiTheme = useTheme();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [toolTipPos, setToolTipPos] = useState(null);

  const xSmallViewport = useMediaQuery(
      muiTheme.breakpoints.between(0, 361)
  );

  const smallViewport = useMediaQuery(
      muiTheme.breakpoints.between(361, 600)
  );

  const mediumViewport = useMediaQuery(
    muiTheme.breakpoints.between(601, "md")
  );

  const largeViewport = useMediaQuery(muiTheme.breakpoints.up("md"));

  const setSelectedCountryHandler = useCallback(
    (e, feature) => {
      setSelectedCountry(selectedCountry === feature ? null : feature);
      const rect = wrapperRef.current?.getBoundingClientRect();
      const pageX = e.clientX - rect.left;
      const pageY = e.clientY - rect.top;
      setToolTipPos({ pageX, pageY });
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

    if (xSmallViewport) {
      return "240px";
    }

    if (smallViewport) {
      return "320px";
    }

    if (mediumViewport) {
      return "580px";
    }

    if (largeViewport) {
      return "640px";
    }

    return "60vw";
  }

  return {
    getVisualizationHeight,
    setSelectedCountryHandler,
    resetSelectedCountryHandler,
    toolTipPos,
    selectedCountry,
  };
};
