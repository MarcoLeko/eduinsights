import React from "react";
import { Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import "./visualization-selector.scss";
import { SwipeableCards } from "../swipeable-cards/swipeable-cards";
import clsx from "clsx";

export function VisualizationSelector({
  onVisualizationClick,
  visualizations,
  showDemo = false,
}) {
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
            onClick={() => onVisualizationClick(visualization)}
            size={"small"}
            variant="contained"
            className={clsx(
              "primary-button",
              showDemo && "pulse-effect-primary"
            )}
          >
            Select
          </Button>
        </div>
      ))}
    />
  );
}
