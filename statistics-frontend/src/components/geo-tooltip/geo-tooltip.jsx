import React from "react";
import { Paper, Typography } from "@material-ui/core";
import "./geo-tooltip.scss";

function GeoToolTip({ selectedCountry, tooltipPos, unit }) {
  return (
    Boolean(selectedCountry && tooltipPos) && (
      <Paper
        className="tooltip p-1"
        style={{
          left: tooltipPos.pageX + 20,
          top: tooltipPos.pageY + 20,
        }}
      >
        <Typography component="p" color="textSecondary">
          {"Country: " + selectedCountry.properties.name}
        </Typography>
        <Typography component="p" color="textSecondary" variant="h5">
          {selectedCountry.properties.value === null
            ? "No values found"
            : "Value: " +
              selectedCountry.properties.value +
              (unit === "Percentage" ? "%" : "")}
        </Typography>
      </Paper>
    )
  );
}

export { GeoToolTip };
