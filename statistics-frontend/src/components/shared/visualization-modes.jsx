import MapTwoToneIcon from "@material-ui/icons/MapTwoTone";
import PublicTwoToneIcon from "@material-ui/icons/PublicTwoTone";
import React from "react";

const visualizationModes = [
  {
    label: "2D Display",
    icon: <MapTwoToneIcon className="visualization-selector-container-icon" />,
    key: "map",
  },
  {
    label: "3D Display",
    icon: (
      <PublicTwoToneIcon className="visualization-selector-container-icon" />
    ),
    key: "globe",
  },
];

export { visualizationModes };
