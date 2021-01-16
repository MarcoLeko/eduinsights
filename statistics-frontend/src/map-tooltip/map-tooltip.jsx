import React, { memo } from "react";
import { Paper, Typography } from "@material-ui/core";
import "./map-tooltip.scss";

// TODO: In order to save performance make position fixed use also in geo globe
function ToolTip({ selectedCountry, tooltipPos }) {
  return (
    Boolean(selectedCountry && tooltipPos.pageX) && (
      <Paper
        className="tooltip"
        style={{
          left: tooltipPos.pageX + 20,
          top: tooltipPos.pageY + 20,
        }}
      >
        <Typography component="p" color="textSecondary">
          {"Country: " + selectedCountry.properties.name}
        </Typography>
        <Typography component="p" color="textSecondary">
          {"Capital: " + selectedCountry.properties.capital}
        </Typography>
        <Typography component="p" color="textSecondary">
          {selectedCountry.properties.value === null
            ? "No values found"
            : "Value: " + selectedCountry.properties.value + "%"}
        </Typography>
      </Paper>
    )
  );
}

export const MapToolTip = memo(ToolTip);
