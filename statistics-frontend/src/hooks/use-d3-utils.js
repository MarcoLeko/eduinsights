import { useMediaQuery, useTheme } from "@material-ui/core";

export const useD3Utils = () => {
  const muiTheme = useTheme();

  const midSmallViewport = useMediaQuery(
    muiTheme.breakpoints.between("sm", 1000)
  );

  const mediumViewport = useMediaQuery(
    muiTheme.breakpoints.between(1001, "md")
  );

  const largeViewport = useMediaQuery(muiTheme.breakpoints.between("md", "lg"));

  function getVisualizationHeight() {
    // Viewport is rotated e.g. Mobile/tablet
    if (window.orientation === 90 || window.orientation === -90) {
      return "100%";
    }

    if (midSmallViewport) {
      return "550px";
    }
    if (mediumViewport) {
      return "600px";
    }
    if (largeViewport) {
      return "640px";
    }

    return "100%";
  }

  return {
    getVisualizationHeight,
  };
};
