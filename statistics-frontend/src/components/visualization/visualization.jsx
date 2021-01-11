import React from "react";
import { Button, Grid, Paper } from "@material-ui/core";
import PublicTwoToneIcon from "@material-ui/icons/PublicTwoTone";
import MapTwoToneIcon from "@material-ui/icons/MapTwoTone";
import Typography from "@material-ui/core/Typography";
import "./visualization.scss";

const visualizations = [
  {
    label: "2D Display",
    icon: <MapTwoToneIcon className="svg-icon" />,
    key: "map",
  },
  {
    label: "3D Display",
    icon: <PublicTwoToneIcon className="svg-icon" />,
    key: "globe",
  },
];

export function Visualization({ addNextQueryParam }) {
  return (
    <Grid container justify="center" spacing={2} wrap="nowrap">
      {visualizations.map((visualization) => (
        <Grid key={visualization.key} item>
          <Paper className="paper-root">
            {visualization.icon}
            <Typography variant="overline" component="h6" color={"textPrimary"}>
              {visualization.label}
            </Typography>
            <Button
              onClick={() =>
                addNextQueryParam({ visualization: visualization.key })
              }
              size={"small"}
              variant="contained"
              className="visualization-button"
            >
              Select
            </Button>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
