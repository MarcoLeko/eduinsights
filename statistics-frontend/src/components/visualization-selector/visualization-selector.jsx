import React from "react";
import { Button } from "@material-ui/core";
import PublicTwoToneIcon from "@material-ui/icons/PublicTwoTone";
import MapTwoToneIcon from "@material-ui/icons/MapTwoTone";
import Typography from "@material-ui/core/Typography";
import "./visualization-selector.scss";
import { SwipeableCards } from "../swipeable-cards/swipeable-cards";

const visualizations = [
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

export function VisualizationSelector({ addNextQueryParam }) {
  return (
    <SwipeableCards
      items={visualizations.map((visualization) => (
        <div
          key={visualization.key}
          className="visualization-selector-container"
        >
          <Typography variant="overline" component="h6" color={"textPrimary"}>
            {visualization.label}
          </Typography>
          {visualization.icon}
          <Button
            onClick={() =>
              addNextQueryParam({ visualization: visualization.key })
            }
            size={"small"}
            variant="contained"
            className="primary-button"
          >
            Select
          </Button>
        </div>
      ))}
    />
  );
}
