import React from "react";
import { getColor } from "../shared/getColor";
import "./map-legend.scss";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    padding: theme.spacing(1),
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 2,
    color: "inherit",
    opacity: 0.8,
    background: "rgba(255, 255, 255, 0.8) !important",
  },
}));

function GlobeLegend({ selectedStatisticMetaData }) {
  const classes = useStyles();

  return (
    <Paper classes={{ root: classes.root }}>
      {selectedStatisticMetaData.evaluation.map((evaluation) => {
        const range = evaluation.key;
        const from = evaluation.value[0];
        const to = evaluation.value[1];

        return (
          <div className="legend-item-wrapper" key={range}>
            <i
              className="legend-color-box"
              style={{ background: getColor(range) }}
            />
            <span>{from + (to ? " - " + to : " > ")}</span>
          </div>
        );
      })}
    </Paper>
  );
}

export default GlobeLegend;
